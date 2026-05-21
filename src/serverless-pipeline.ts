import * as cdk from 'aws-cdk-lib';
import * as dms from 'aws-cdk-lib/aws-dms';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { ensureDmsCloudWatchRole, ensureDmsVpcRole } from './dms-roles';
import { DmsEndpoint, IDmsEndpoint } from './endpoint';
import { EndpointType, MigrationType } from './enums';
import { SourceEndpointOptions, TargetEndpointOptions } from './migration-pipeline';
import { TableMappings } from './table-mappings';

// ---------------------------------------------------------------------------
// Valid capacity unit values — documented in the DMS API reference
// ---------------------------------------------------------------------------
const VALID_CAPACITY_UNITS = new Set([1, 2, 4, 8, 16, 32, 64, 128, 192, 256, 384]);

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/** Props for {@link DmsServerlessPipeline}. */
export interface DmsServerlessPipelineProps {
  // -------------------------------------------------------------------------
  // Networking
  // -------------------------------------------------------------------------

  /**
   * VPC in which to place the serverless replication config.
   * The config is placed in private subnets.
   */
  readonly vpc: ec2.IVpc;

  /**
   * Subnet selection for the replication subnet group.
   * @default private subnets with egress
   */
  readonly vpcSubnets?: ec2.SubnetSelection;

  /**
   * Security groups to attach to the serverless replication config.
   * A new security group is created if none are provided.
   */
  readonly securityGroups?: ec2.ISecurityGroup[];

  // -------------------------------------------------------------------------
  // Compute config
  // -------------------------------------------------------------------------

  /**
   * Maximum number of DMS Capacity Units (DCUs) the serverless replication may
   * scale up to.
   *
   * Valid values: 1, 2, 4, 8, 16, 32, 64, 128, 192, 256, 384.
   */
  readonly maxCapacityUnits: number;

  /**
   * Minimum number of DCUs DMS will provision at start-up.
   * @default DMS auto-determines based on workload
   */
  readonly minCapacityUnits?: number;

  /**
   * Whether the serverless replication is Multi-AZ.
   * @default false
   */
  readonly multiAz?: boolean;

  /**
   * Preferred maintenance window, e.g. "sun:04:00-sun:04:30".
   */
  readonly preferredMaintenanceWindow?: string;

  // -------------------------------------------------------------------------
  // Encryption
  // -------------------------------------------------------------------------

  /**
   * KMS key used to encrypt replication storage at rest.
   * A new key is created if not provided.
   */
  readonly kmsKey?: kms.IKey;

  // -------------------------------------------------------------------------
  // Endpoints
  // -------------------------------------------------------------------------

  /**
   * Source endpoint configuration.
   * Provide this OR `existingSourceEndpoint` — not both.
   */
  readonly sourceEndpoint?: SourceEndpointOptions;

  /**
   * An existing {@link IDmsEndpoint} to use as the source.
   * Provide this OR `sourceEndpoint` — not both.
   */
  readonly existingSourceEndpoint?: IDmsEndpoint;

  /**
   * Target endpoint configuration.
   * Provide this OR `existingTargetEndpoint` — not both.
   */
  readonly targetEndpoint?: TargetEndpointOptions;

  /**
   * An existing {@link IDmsEndpoint} to use as the target.
   * Provide this OR `targetEndpoint` — not both.
   */
  readonly existingTargetEndpoint?: IDmsEndpoint;

  // -------------------------------------------------------------------------
  // Migration config
  // -------------------------------------------------------------------------

  /** The type of migration to perform. */
  readonly migrationType: MigrationType;

  /**
   * Table mappings JSON string.
   * Use {@link TableMappings} to build this.
   * Defaults to "include all tables in all schemas" if not provided.
   */
  readonly tableMappings?: string;

  /**
   * Replication settings JSON string (equivalent to task settings for classic DMS).
   * Use {@link TaskSettings} to build this.
   * Sensible defaults are applied by DMS if not provided.
   *
   * @remarks DMS Serverless does not support setting CDC start/stop positions
   * via CloudFormation. To start replication from a specific LSN or timestamp
   * after the replication config has been created, call the
   * `StartReplication` API with `StartReplicationTaskType` set to
   * `start-replication` and supply `CdcStartPosition` or `CdcStartTime`.
   */
  readonly taskSettings?: string;

  // -------------------------------------------------------------------------
  // Observability
  // -------------------------------------------------------------------------

  /**
   * Whether to create a CloudWatch log group for the replication config.
   * @default true
   */
  readonly enableCloudWatchLogs?: boolean;

  /**
   * Retention period for the CloudWatch log group.
   * @default logs.RetentionDays.ONE_MONTH
   */
  readonly logRetention?: logs.RetentionDays;

  // -------------------------------------------------------------------------
  // IAM / service roles
  // -------------------------------------------------------------------------

  /**
   * Whether to create the two account-level DMS service roles (`dms-vpc-role`
   * and `dms-cloudwatch-logs-role`) required by DMS.
   *
   * Set to `false` if the roles already exist — for example, because a
   * `DmsMigrationPipeline` or a prior manual deployment already created them.
   * Attempting to create roles with the same name twice causes a CloudFormation
   * `EntityAlreadyExists` error.
   *
   * @default true
   */
  readonly createDmsServiceRoles?: boolean;

  // -------------------------------------------------------------------------
  // Naming / lifecycle
  // -------------------------------------------------------------------------

  /**
   * Logical identifier for the replication config resource.
   * @default unique name derived from the construct id
   */
  readonly replicationConfigIdentifier?: string;

  /**
   * Removal policy applied to all resources in the pipeline.
   * @default cdk.RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: cdk.RemovalPolicy;
}

// ---------------------------------------------------------------------------
// Construct
// ---------------------------------------------------------------------------

/**
 * An L3 CDK pattern construct that provisions a DMS Serverless replication
 * pipeline:
 *
 * - **Replication config** — backed by `CfnReplicationConfig`; DMS auto-scales
 *   capacity between `minCapacityUnits` and `maxCapacityUnits`.
 * - **Source endpoint** — supports every engine DMS supports.
 * - **Target endpoint** — supports every engine DMS supports.
 * - **Subnet group** — private subnet placement.
 * - **KMS key** — storage encryption at rest (created if not provided).
 * - **Security group** — dedicated group (created if not provided).
 * - **IAM roles** — `dms-vpc-role` and `dms-cloudwatch-logs-role`.
 * - **CloudWatch log group** — (optional) retains replication logs.
 *
 * > **CDC start/stop position limitation**: `CfnReplicationConfig` does not
 * > expose `cdcStartTime` / `cdcStartPosition` / `cdcStopPosition`. To start
 * > from a specific position, call the `StartReplication` API directly after
 * > the config is created (e.g. from a Lambda custom resource or CLI).
 *
 * @example
 * const pipeline = new DmsServerlessPipeline(this, 'ServerlessPipeline', {
 *   vpc,
 *   maxCapacityUnits: 8,
 *   migrationType: MigrationType.FULL_LOAD_AND_CDC,
 *   sourceEndpoint: {
 *     engine: EndpointEngine.MYSQL,
 *     serverName: 'mysql.example.com',
 *     port: 3306,
 *     username: 'dms_user',
 *     password: cdk.SecretValue.secretsManager('mysql-dms-secret'),
 *   },
 *   targetEndpoint: {
 *     engine: EndpointEngine.AURORA_POSTGRESQL,
 *     serverName: cluster.clusterEndpoint.hostname,
 *     port: 5432,
 *     username: 'dms_user',
 *     password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
 *   },
 * });
 */
export class DmsServerlessPipeline extends Construct {
  /** The underlying `CfnReplicationConfig` resource. */
  readonly cfnReplicationConfig: dms.CfnReplicationConfig;

  /** The ARN of the replication config. */
  readonly replicationConfigArn: string;

  /** The source endpoint used by this pipeline. */
  readonly source: IDmsEndpoint;

  /** The target endpoint used by this pipeline. */
  readonly target: IDmsEndpoint;

  /** The replication subnet group created for this pipeline. */
  readonly subnetGroup: dms.CfnReplicationSubnetGroup;

  /** The KMS key used for storage encryption. */
  readonly encryptionKey: kms.IKey;

  /** The security group attached to this pipeline. */
  readonly securityGroup: ec2.ISecurityGroup;

  /** CloudWatch log group for the replication config (if enableCloudWatchLogs is true). */
  readonly logGroup?: logs.LogGroup;

  /**
   * Construct wrapping the custom resources that created the `dms-cloudwatch-logs-role`.
   * `undefined` when `createDmsServiceRoles` is `false`.
   */
  readonly dmsCloudWatchRole?: Construct;

  /**
   * Construct wrapping the custom resources that created the `dms-vpc-role`.
   * `undefined` when `createDmsServiceRoles` is `false`.
   */
  readonly dmsVpcRole?: Construct;

  constructor(scope: Construct, id: string, props: DmsServerlessPipelineProps) {
    super(scope, id);

    this.validateProps(props);

    const removalPolicy = props.removalPolicy ?? cdk.RemovalPolicy.DESTROY;
    const createRoles = props.createDmsServiceRoles ?? true;

    // -----------------------------------------------------------------------
    // dms-vpc-role — required by DMS to place the config inside a VPC.
    // -----------------------------------------------------------------------
    if (createRoles) {
      this.dmsVpcRole = ensureDmsVpcRole(cdk.Stack.of(this));
    }

    // -----------------------------------------------------------------------
    // CloudWatch log group & IAM role
    // -----------------------------------------------------------------------
    const enableLogs = props.enableCloudWatchLogs ?? true;

    if (enableLogs) {
      this.logGroup = new logs.LogGroup(this, 'LogGroup', {
        logGroupName: `/aws/dms/serverless/${id}`,
        retention: props.logRetention ?? logs.RetentionDays.ONE_MONTH,
        removalPolicy,
      });

      if (createRoles) {
        this.dmsCloudWatchRole = ensureDmsCloudWatchRole(cdk.Stack.of(this));
      }
    }

    // -----------------------------------------------------------------------
    // KMS key
    // -----------------------------------------------------------------------
    this.encryptionKey =
      props.kmsKey ??
      new kms.Key(this, 'EncryptionKey', {
        description: `DMS serverless replication encryption key for ${id}`,
        enableKeyRotation: true,
        removalPolicy,
      });

    // -----------------------------------------------------------------------
    // Security group
    // -----------------------------------------------------------------------
    const providedSgs = props.securityGroups ?? [];
    if (providedSgs.length === 0) {
      this.securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
        vpc: props.vpc,
        description: `DMS serverless replication security group for ${id}`,
        allowAllOutbound: true,
      });
    } else {
      this.securityGroup = providedSgs[0];
    }

    const securityGroupIds =
      providedSgs.length > 0
        ? providedSgs.map((sg) => sg.securityGroupId)
        : [this.securityGroup.securityGroupId];

    // -----------------------------------------------------------------------
    // Subnet group
    // -----------------------------------------------------------------------
    const subnetSelection = props.vpcSubnets ?? {
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };
    const subnets = props.vpc.selectSubnets(subnetSelection);

    this.subnetGroup = new dms.CfnReplicationSubnetGroup(this, 'SubnetGroup', {
      replicationSubnetGroupDescription: `DMS serverless subnet group for ${id}`,
      subnetIds: subnets.subnetIds,
    });

    // -----------------------------------------------------------------------
    // Source endpoint
    // -----------------------------------------------------------------------
    if (props.existingSourceEndpoint) {
      this.source = props.existingSourceEndpoint;
    } else {
      const sourceOpts = props.sourceEndpoint!;
      this.source = new DmsEndpoint(this, 'SourceEndpoint', {
        endpointType: EndpointType.SOURCE,
        engine: sourceOpts.engine,
        endpointIdentifier: sourceOpts.endpointIdentifier,
        serverName: sourceOpts.serverName,
        port: sourceOpts.port,
        username: sourceOpts.username,
        password: sourceOpts.password,
        databaseName: sourceOpts.databaseName,
        extraConnectionAttributes: sourceOpts.extraConnectionAttributes,
        certificateArn: sourceOpts.certificateArn,
        sslMode: sourceOpts.sslMode,
        mySqlSettings: sourceOpts.mySqlSettings,
        postgreSqlSettings: sourceOpts.postgreSqlSettings,
        oracleSettings: sourceOpts.oracleSettings,
        sqlServerSettings: sourceOpts.sqlServerSettings,
        sapAseSettings: sourceOpts.sapAseSettings,
        db2Settings: sourceOpts.db2Settings,
        mongoDbSettings: sourceOpts.mongoDbSettings,
        s3Settings: sourceOpts.s3Settings,
        removalPolicy,
      });
    }

    // -----------------------------------------------------------------------
    // Target endpoint
    // -----------------------------------------------------------------------
    if (props.existingTargetEndpoint) {
      this.target = props.existingTargetEndpoint;
    } else {
      const targetOpts = props.targetEndpoint!;
      this.target = new DmsEndpoint(this, 'TargetEndpoint', {
        endpointType: EndpointType.TARGET,
        engine: targetOpts.engine,
        endpointIdentifier: targetOpts.endpointIdentifier,
        serverName: targetOpts.serverName,
        port: targetOpts.port,
        username: targetOpts.username,
        password: targetOpts.password,
        databaseName: targetOpts.databaseName,
        extraConnectionAttributes: targetOpts.extraConnectionAttributes,
        certificateArn: targetOpts.certificateArn,
        sslMode: targetOpts.sslMode,
        mySqlSettings: targetOpts.mySqlSettings,
        postgreSqlSettings: targetOpts.postgreSqlSettings,
        oracleSettings: targetOpts.oracleSettings,
        sqlServerSettings: targetOpts.sqlServerSettings,
        sapAseSettings: targetOpts.sapAseSettings,
        db2Settings: targetOpts.db2Settings,
        mongoDbSettings: targetOpts.mongoDbSettings,
        s3Settings: targetOpts.s3Settings,
        dynamoDbSettings: targetOpts.dynamoDbSettings,
        redshiftSettings: targetOpts.redshiftSettings,
        kinesisSettings: targetOpts.kinesisSettings,
        kafkaSettings: targetOpts.kafkaSettings,
        openSearchSettings: targetOpts.openSearchSettings,
        neptuneSettings: targetOpts.neptuneSettings,
        redisSettings: targetOpts.redisSettings,
        removalPolicy,
      });
    }

    // -----------------------------------------------------------------------
    // Table mappings — default to "include everything"
    // -----------------------------------------------------------------------
    const tableMappingsJson =
      props.tableMappings ?? new TableMappings().includeSchema('%').toJson();
    // CfnReplicationConfig.tableMappings expects a JSON object, not a string.
    const tableMappingsObj = JSON.parse(tableMappingsJson);

    const replicationSettingsObj =
      props.taskSettings !== undefined ? JSON.parse(props.taskSettings) : undefined;

    // -----------------------------------------------------------------------
    // Replication config identifier
    // -----------------------------------------------------------------------
    const configIdentifier =
      props.replicationConfigIdentifier ??
      cdk.Names.uniqueResourceName(this, { maxLength: 63 }).toLowerCase();

    // -----------------------------------------------------------------------
    // CfnReplicationConfig
    // -----------------------------------------------------------------------
    this.cfnReplicationConfig = new dms.CfnReplicationConfig(this, 'Resource', {
      replicationConfigIdentifier: configIdentifier,
      replicationType: props.migrationType,
      sourceEndpointArn: this.source.endpointArn,
      targetEndpointArn: this.target.endpointArn,
      tableMappings: tableMappingsObj,
      replicationSettings: replicationSettingsObj,
      computeConfig: {
        maxCapacityUnits: props.maxCapacityUnits,
        minCapacityUnits: props.minCapacityUnits,
        multiAz: props.multiAz ?? false,
        kmsKeyId: this.encryptionKey.keyArn,
        replicationSubnetGroupId: this.subnetGroup.ref,
        vpcSecurityGroupIds: securityGroupIds,
        preferredMaintenanceWindow: props.preferredMaintenanceWindow,
      },
    });
    this.cfnReplicationConfig.applyRemovalPolicy(removalPolicy);

    // dms-vpc-role must exist before DMS can describe VPC subnets (subnet group)
    // or place the replication config inside a VPC.
    if (this.dmsVpcRole) {
      this.subnetGroup.node.addDependency(this.dmsVpcRole);
      this.cfnReplicationConfig.node.addDependency(this.dmsVpcRole);
    }

    this.replicationConfigArn = this.cfnReplicationConfig.ref;
  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private validateProps(props: DmsServerlessPipelineProps): void {
    if (!VALID_CAPACITY_UNITS.has(props.maxCapacityUnits)) {
      throw new Error(
        `maxCapacityUnits must be one of ${[...VALID_CAPACITY_UNITS].join(', ')}. Got: ${props.maxCapacityUnits}`,
      );
    }
    if (
      props.minCapacityUnits !== undefined &&
      !VALID_CAPACITY_UNITS.has(props.minCapacityUnits)
    ) {
      throw new Error(
        `minCapacityUnits must be one of ${[...VALID_CAPACITY_UNITS].join(', ')}. Got: ${props.minCapacityUnits}`,
      );
    }
    if (
      props.minCapacityUnits !== undefined &&
      props.minCapacityUnits > props.maxCapacityUnits
    ) {
      throw new Error(
        `minCapacityUnits (${props.minCapacityUnits}) must be <= maxCapacityUnits (${props.maxCapacityUnits}).`,
      );
    }

    const hasSource = !!props.sourceEndpoint;
    const hasExistingSource = !!props.existingSourceEndpoint;
    if (hasSource && hasExistingSource) {
      throw new Error('Provide either `sourceEndpoint` or `existingSourceEndpoint`, not both.');
    }
    if (!hasSource && !hasExistingSource) {
      throw new Error('One of `sourceEndpoint` or `existingSourceEndpoint` is required.');
    }

    const hasTarget = !!props.targetEndpoint;
    const hasExistingTarget = !!props.existingTargetEndpoint;
    if (hasTarget && hasExistingTarget) {
      throw new Error('Provide either `targetEndpoint` or `existingTargetEndpoint`, not both.');
    }
    if (!hasTarget && !hasExistingTarget) {
      throw new Error('One of `targetEndpoint` or `existingTargetEndpoint` is required.');
    }
  }
}

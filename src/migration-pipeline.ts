import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { ensureDmsCloudWatchRole, ensureDmsVpcRole } from './dms-roles';
import { DmsEndpoint, DmsEndpointProps, IDmsEndpoint } from './endpoint';
import { EndpointType, MigrationType, ReplicationInstanceClass } from './enums';
import { DmsReplicationInstance } from './replication-instance';
import { DmsReplicationTask } from './replication-task';
import { TableMappings } from './table-mappings';
import { TaskSettings } from './task-settings';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

/**
 * Properties for the source endpoint of a {@link DmsMigrationPipeline}.
 * Extends {@link DmsEndpointProps} but omits `endpointType` (always SOURCE).
 */
export interface SourceEndpointOptions {
  readonly engine: DmsEndpointProps['engine'];
  readonly endpointIdentifier?: string;
  readonly serverName?: string;
  readonly port?: number;
  readonly username?: string;
  /**
   * Database password. The resolved value is stored as **plaintext** in the
   * CloudFormation template. Prefer `secretsManagerSecretId` in the
   * engine-specific settings for production workloads.
   */
  readonly password?: cdk.SecretValue;
  readonly databaseName?: string;
  readonly extraConnectionAttributes?: string;
  readonly certificateArn?: string;
  readonly sslMode?: string;
  readonly mySqlSettings?: DmsEndpointProps['mySqlSettings'];
  readonly postgreSqlSettings?: DmsEndpointProps['postgreSqlSettings'];
  readonly oracleSettings?: DmsEndpointProps['oracleSettings'];
  readonly sqlServerSettings?: DmsEndpointProps['sqlServerSettings'];
  readonly sapAseSettings?: DmsEndpointProps['sapAseSettings'];
  readonly db2Settings?: DmsEndpointProps['db2Settings'];
  readonly mongoDbSettings?: DmsEndpointProps['mongoDbSettings'];
  readonly s3Settings?: DmsEndpointProps['s3Settings'];
}

/**
 * Properties for the target endpoint of a {@link DmsMigrationPipeline}.
 * Extends {@link DmsEndpointProps} but omits `endpointType` (always TARGET).
 */
export interface TargetEndpointOptions {
  readonly engine: DmsEndpointProps['engine'];
  readonly endpointIdentifier?: string;
  readonly serverName?: string;
  readonly port?: number;
  readonly username?: string;
  /**
   * Database password. The resolved value is stored as **plaintext** in the
   * CloudFormation template. Prefer `secretsManagerSecretId` in the
   * engine-specific settings for production workloads.
   */
  readonly password?: cdk.SecretValue;
  readonly databaseName?: string;
  readonly extraConnectionAttributes?: string;
  readonly certificateArn?: string;
  readonly sslMode?: string;
  readonly mySqlSettings?: DmsEndpointProps['mySqlSettings'];
  readonly postgreSqlSettings?: DmsEndpointProps['postgreSqlSettings'];
  readonly oracleSettings?: DmsEndpointProps['oracleSettings'];
  readonly sqlServerSettings?: DmsEndpointProps['sqlServerSettings'];
  readonly sapAseSettings?: DmsEndpointProps['sapAseSettings'];
  readonly db2Settings?: DmsEndpointProps['db2Settings'];
  readonly mongoDbSettings?: DmsEndpointProps['mongoDbSettings'];
  readonly s3Settings?: DmsEndpointProps['s3Settings'];
  readonly dynamoDbSettings?: DmsEndpointProps['dynamoDbSettings'];
  readonly redshiftSettings?: DmsEndpointProps['redshiftSettings'];
  readonly kinesisSettings?: DmsEndpointProps['kinesisSettings'];
  readonly kafkaSettings?: DmsEndpointProps['kafkaSettings'];
  readonly openSearchSettings?: DmsEndpointProps['openSearchSettings'];
  readonly neptuneSettings?: DmsEndpointProps['neptuneSettings'];
  readonly redisSettings?: DmsEndpointProps['redisSettings'];
}

/** Top-level props for {@link DmsMigrationPipeline}. */
export interface DmsMigrationPipelineProps {
  // -------------------------------------------------------------------------
  // Replication instance
  // -------------------------------------------------------------------------

  /**
   * VPC in which to place the replication instance.
   * The instance is placed in private subnets.
   */
  readonly vpc: ec2.IVpc;

  /**
   * Subnet selection for the replication instance.
   * @default private subnets with egress
   */
  readonly vpcSubnets?: ec2.SubnetSelection;

  /**
   * Replication instance class.
   * @default ReplicationInstanceClass.R6I_LARGE
   */
  readonly replicationInstanceClass?: ReplicationInstanceClass;

  /**
   * Allocated storage for the replication instance in GB.
   * @default 100
   */
  readonly allocatedStorage?: number;

  /**
   * Whether the replication instance is Multi-AZ.
   * @default false
   */
  readonly multiAz?: boolean;

  /**
   * Engine version for the replication instance.
   * @default latest version available in the region (chosen by DMS)
   */
  readonly engineVersion?: string;

  /**
   * KMS key for encrypting the replication instance storage at rest.
   * A new key is created if not provided.
   */
  readonly encryptionKey?: kms.IKey;

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
  // Replication task
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
   * Task settings JSON string.
   * Use {@link TaskSettings} to build this.
   * Sensible defaults are applied if not provided.
   */
  readonly taskSettings?: string;

  /**
   * CDC start time (ISO-8601 string or Unix epoch seconds).
   * Only used when migrationType includes CDC.
   */
  readonly cdcStartTime?: string;

  /**
   * CDC start position (LSN or equivalent).
   * Only used when migrationType includes CDC.
   */
  readonly cdcStartPosition?: string;

  /**
   * CDC stop position.
   * Only used when migrationType includes CDC.
   */
  readonly cdcStopPosition?: string;

  // -------------------------------------------------------------------------
  // Observability
  // -------------------------------------------------------------------------

  /**
   * Whether to create a CloudWatch log group for the task.
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
   * Set this to `false` if the roles already exist in the AWS account — for
   * example, because another CDK stack (or a manual deployment) already
   * created them. Attempting to create roles with the same name twice in the
   * same account causes a CloudFormation `EntityAlreadyExists` error.
   *
   * When `false`, the construct expects the roles to already be present and
   * skips creating them. The `dmsVpcRole` and `dmsCloudWatchRole` properties
   * will be `undefined`.
   *
   * @default true
   */
  readonly createDmsServiceRoles?: boolean;

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

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
 * An L3 CDK pattern construct that provisions a complete DMS migration pipeline:
 *
 * - **Replication instance** — placed in private subnets with KMS encryption
 *   and a dedicated security group.
 * - **Source endpoint** — supports every engine DMS supports.
 * - **Target endpoint** — supports every engine DMS supports.
 * - **Replication task** — wires the instance, endpoints, table mappings and
 *   task settings together.
 * - **IAM role** — grants DMS permission to write to CloudWatch Logs.
 * - **CloudWatch log group** — (optional) retains task logs.
 *
 * @example
 * // MySQL → Aurora PostgreSQL, full-load-and-CDC
 * const pipeline = new DmsMigrationPipeline(this, 'MigrationPipeline', {
 *   vpc,
 *   migrationType: MigrationType.FULL_LOAD_AND_CDC,
 *   sourceEndpoint: {
 *     engine: EndpointEngine.MYSQL,
 *     serverName: 'mysql.example.com',
 *     port: 3306,
 *     username: 'dms_user',
 *     password: cdk.SecretValue.secretsManager('mysql-dms-secret'),
 *     databaseName: 'mydb',
 *   },
 *   targetEndpoint: {
 *     engine: EndpointEngine.AURORA_POSTGRESQL,
 *     serverName: cluster.clusterEndpoint.hostname,
 *     port: 5432,
 *     username: 'dms_user',
 *     password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
 *     databaseName: 'mydb',
 *   },
 *   tableMappings: new TableMappings().includeSchema('public').toJson(),
 * });
 */
export class DmsMigrationPipeline extends Construct {
  // ---------------------------------------------------------------------------
  // Instance fields
  // ---------------------------------------------------------------------------

  /** The replication instance provisioned by this pipeline. */
  readonly replicationInstance: DmsReplicationInstance;

  /** The source endpoint used by this pipeline. */
  readonly source: IDmsEndpoint;

  /** The target endpoint used by this pipeline. */
  readonly target: IDmsEndpoint;

  /** The replication task that drives the migration. */
  readonly replicationTask: DmsReplicationTask;

  /** CloudWatch log group for the task (if enableCloudWatchLogs is true). */
  readonly logGroup?: logs.LogGroup;

  /**
   * IAM role that allows DMS to write to CloudWatch Logs.
   * `undefined` when `createDmsServiceRoles` is `false`.
   */
  readonly dmsCloudWatchRole?: iam.Role;

  /**
   * IAM role that allows DMS to manage VPC resources (dms-vpc-role).
   * `undefined` when `createDmsServiceRoles` is `false`.
   */
  readonly dmsVpcRole?: iam.Role;

  constructor(scope: Construct, id: string, props: DmsMigrationPipelineProps) {
    super(scope, id);

    this.validateProps(props);

    const removalPolicy = props.removalPolicy ?? cdk.RemovalPolicy.DESTROY;
    const createRoles = props.createDmsServiceRoles ?? true;

    // -----------------------------------------------------------------------
    // dms-vpc-role — account-level singleton required by DMS to place
    // replication instances inside a VPC. Must exist before the first
    // CfnReplicationInstance is created in the account.
    // Skip when createDmsServiceRoles is false (roles already exist).
    // -----------------------------------------------------------------------
    if (createRoles) {
      this.dmsVpcRole = ensureDmsVpcRole(cdk.Stack.of(this));
    }

    // -----------------------------------------------------------------------
    // CloudWatch log group & IAM role
    // -----------------------------------------------------------------------
    const enableLogs = props.enableCloudWatchLogs ?? true;

    if (enableLogs) {
      this.logGroup = new logs.LogGroup(this, 'TaskLogGroup', {
        logGroupName: `/aws/dms/tasks/${id}`,
        retention: props.logRetention ?? logs.RetentionDays.ONE_MONTH,
        removalPolicy,
      });

      if (createRoles) {
        // dms-cloudwatch-logs-role is an account-level singleton — DMS requires
        // this exact name. Guard with a stack-level singleton so deploying multiple
        // pipelines in the same stack doesn't create duplicate roles.
        this.dmsCloudWatchRole = ensureDmsCloudWatchRole(cdk.Stack.of(this));
      }
    }

    // -----------------------------------------------------------------------
    // Replication instance
    // -----------------------------------------------------------------------
    this.replicationInstance = new DmsReplicationInstance(this, 'ReplicationInstance', {
      vpc: props.vpc,
      vpcSubnets: props.vpcSubnets,
      replicationInstanceClass: props.replicationInstanceClass,
      allocatedStorage: props.allocatedStorage,
      multiAz: props.multiAz,
      engineVersion: props.engineVersion,
      kmsKey: props.encryptionKey,
      removalPolicy,
    });
    // The replication instance cannot be placed in a VPC until dms-vpc-role exists.
    // Only add the dependency when we created the role ourselves.
    if (this.dmsVpcRole) {
      this.replicationInstance.cfnReplicationInstance.addDependency(
        this.dmsVpcRole.node.defaultChild as cdk.CfnResource,
      );
    }

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
    const tableMappings =
      props.tableMappings ?? new TableMappings().includeSchema('%').toJson();

    // -----------------------------------------------------------------------
    // Replication task
    // -----------------------------------------------------------------------
    this.replicationTask = new DmsReplicationTask(this, 'ReplicationTask', {
      replicationInstanceArn: this.replicationInstance.replicationInstanceArn,
      sourceEndpoint: this.source,
      targetEndpoint: this.target,
      migrationType: props.migrationType,
      tableMappings,
      taskSettings: props.taskSettings,
      cdcStartTime: props.cdcStartTime,
      cdcStartPosition: props.cdcStartPosition,
      cdcStopPosition: props.cdcStopPosition,
      removalPolicy,
    });

  }

  // ---------------------------------------------------------------------------
  // Private helpers
  // ---------------------------------------------------------------------------

  private validateProps(props: DmsMigrationPipelineProps): void {
    const hasSource = !!props.sourceEndpoint;
    const hasExistingSource = !!props.existingSourceEndpoint;
    if (hasSource && hasExistingSource) {
      throw new Error(
        'Provide either `sourceEndpoint` or `existingSourceEndpoint`, not both.',
      );
    }
    if (!hasSource && !hasExistingSource) {
      throw new Error(
        'One of `sourceEndpoint` or `existingSourceEndpoint` is required.',
      );
    }

    const hasTarget = !!props.targetEndpoint;
    const hasExistingTarget = !!props.existingTargetEndpoint;
    if (hasTarget && hasExistingTarget) {
      throw new Error(
        'Provide either `targetEndpoint` or `existingTargetEndpoint`, not both.',
      );
    }
    if (!hasTarget && !hasExistingTarget) {
      throw new Error(
        'One of `targetEndpoint` or `existingTargetEndpoint` is required.',
      );
    }
  }
}

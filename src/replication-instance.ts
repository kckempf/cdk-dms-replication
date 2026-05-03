import * as cdk from 'aws-cdk-lib';
import * as dms from 'aws-cdk-lib/aws-dms';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { ReplicationInstanceClass } from './enums';

/** Props for {@link DmsReplicationInstance}. */
export interface DmsReplicationInstanceProps {
  /**
   * Instance class for the replication instance.
   * @default ReplicationInstanceClass.R5_LARGE
   */
  readonly replicationInstanceClass?: ReplicationInstanceClass;

  /**
   * VPC in which to place the replication instance.
   * The construct creates a dedicated subnet group from the private subnets.
   */
  readonly vpc: ec2.IVpc;

  /**
   * Specific subnets to use for the replication subnet group.
   * Defaults to all private subnets in the VPC.
   */
  readonly vpcSubnets?: ec2.SubnetSelection;

  /**
   * Security groups to attach to the replication instance.
   * A new security group is created if none are provided.
   */
  readonly securityGroups?: ec2.ISecurityGroup[];

  /**
   * KMS key used to encrypt the replication instance storage at rest.
   * A new key is created if not provided.
   */
  readonly kmsKey?: kms.IKey;

  /**
   * Allocated storage in GB.
   * @default 100
   */
  readonly allocatedStorage?: number;

  /**
   * Whether the replication instance is Multi-AZ.
   * @default false
   */
  readonly multiAz?: boolean;

  /**
   * Whether the replication instance is publicly accessible.
   * Setting this to true is strongly discouraged for production workloads.
   * @default false
   */
  readonly publiclyAccessible?: boolean;

  /**
   * Whether to allow minor version upgrades to be applied automatically during maintenance.
   * @default true
   */
  readonly autoMinorVersionUpgrade?: boolean;

  /**
   * Preferred maintenance window, e.g. "sun:04:00-sun:04:30".
   */
  readonly preferredMaintenanceWindow?: string;

  /**
   * Replication engine version.
   * @default "3.5.3"
   */
  readonly engineVersion?: string;

  /**
   * Logical name of the replication instance.
   * Used in the replication instance identifier and resource naming.
   * @default id of the construct
   */
  readonly replicationInstanceIdentifier?: string;

  /**
   * Removal policy applied to the replication instance.
   * @default cdk.RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: cdk.RemovalPolicy;
}

/**
 * An L2-style construct that provisions a DMS replication instance with:
 * - Private subnet placement via a dedicated subnet group
 * - KMS encryption at rest (key created if not provided)
 * - A dedicated security group (created if not provided)
 */
export class DmsReplicationInstance extends Construct {
  /** The underlying CloudFormation replication instance resource. */
  readonly cfnReplicationInstance: dms.CfnReplicationInstance;

  /** The replication subnet group created for this instance. */
  readonly subnetGroup: dms.CfnReplicationSubnetGroup;

  /** The KMS key used for storage encryption. */
  readonly encryptionKey: kms.IKey;

  /** The security group attached to this instance. */
  readonly securityGroup: ec2.ISecurityGroup;

  /** The replication instance ARN. */
  readonly replicationInstanceArn: string;

  constructor(scope: Construct, id: string, props: DmsReplicationInstanceProps) {
    super(scope, id);

    // -----------------------------------------------------------------------
    // KMS key
    // -----------------------------------------------------------------------
    this.encryptionKey =
      props.kmsKey ??
      new kms.Key(this, 'EncryptionKey', {
        description: `DMS replication instance encryption key for ${id}`,
        enableKeyRotation: true,
        removalPolicy: props.removalPolicy ?? cdk.RemovalPolicy.DESTROY,
      });

    // -----------------------------------------------------------------------
    // Security group
    // -----------------------------------------------------------------------
    const provided = props.securityGroups ?? [];
    if (provided.length === 0) {
      const sg = new ec2.SecurityGroup(this, 'SecurityGroup', {
        vpc: props.vpc,
        description: `DMS replication instance security group for ${id}`,
        allowAllOutbound: true,
      });
      this.securityGroup = sg;
    } else {
      this.securityGroup = provided[0];
    }

    const securityGroupIds = provided.length > 0
      ? provided.map((sg) => sg.securityGroupId)
      : [this.securityGroup.securityGroupId];

    // -----------------------------------------------------------------------
    // Subnet group
    // -----------------------------------------------------------------------
    const subnetSelection = props.vpcSubnets ?? {
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };
    const subnets = props.vpc.selectSubnets(subnetSelection);

    this.subnetGroup = new dms.CfnReplicationSubnetGroup(this, 'SubnetGroup', {
      replicationSubnetGroupDescription: `DMS subnet group for ${id}`,
      subnetIds: subnets.subnetIds,
    });

    // -----------------------------------------------------------------------
    // Replication instance
    // -----------------------------------------------------------------------
    const instanceIdentifier =
      props.replicationInstanceIdentifier ?? cdk.Names.uniqueResourceName(this, { maxLength: 63 }).toLowerCase();

    this.cfnReplicationInstance = new dms.CfnReplicationInstance(this, 'Resource', {
      replicationInstanceClass: props.replicationInstanceClass ?? ReplicationInstanceClass.R5_LARGE,
      replicationInstanceIdentifier: instanceIdentifier,
      allocatedStorage: props.allocatedStorage ?? 100,
      engineVersion: props.engineVersion ?? '3.5.3',
      kmsKeyId: this.encryptionKey.keyArn,
      multiAz: props.multiAz ?? false,
      publiclyAccessible: props.publiclyAccessible ?? false,
      autoMinorVersionUpgrade: props.autoMinorVersionUpgrade ?? true,
      replicationSubnetGroupIdentifier: this.subnetGroup.ref,
      vpcSecurityGroupIds: securityGroupIds,
      preferredMaintenanceWindow: props.preferredMaintenanceWindow,
    });
    this.cfnReplicationInstance.applyRemovalPolicy(
      props.removalPolicy ?? cdk.RemovalPolicy.DESTROY,
    );

    this.replicationInstanceArn = this.cfnReplicationInstance.ref;
  }

  /**
   * Allow inbound access to the replication instance on a given port from a peer.
   * Useful when the source or target database security group needs to trust the instance.
   */
  allowInboundFrom(peer: ec2.IPeer, port: ec2.Port, description?: string): void {
    if (this.securityGroup instanceof ec2.SecurityGroup) {
      this.securityGroup.addIngressRule(peer, port, description ?? 'Allow DMS replication instance');
    }
  }
}

import * as cdk from 'aws-cdk-lib';
import * as dms from 'aws-cdk-lib/aws-dms';
import { Construct } from 'constructs';
import { IDmsEndpoint } from './endpoint';
import { MigrationType } from './enums';
import { TableMappings } from './table-mappings';
import { TaskSettings } from './task-settings';

/** Props for {@link DmsReplicationTask}. */
export interface DmsReplicationTaskProps {
  /** ARN of the replication instance to use. */
  readonly replicationInstanceArn: string;

  /** Source endpoint. */
  readonly sourceEndpoint: IDmsEndpoint;

  /** Target endpoint. */
  readonly targetEndpoint: IDmsEndpoint;

  /** The migration type. */
  readonly migrationType: MigrationType;

  /**
   * Table mappings JSON string.
   * Use {@link TableMappings} to build this, or provide a raw JSON string.
   *
   * @example
   * tableMappings: new TableMappings().includeSchema('public').toJson()
   */
  readonly tableMappings: string;

  /**
   * Task settings JSON string.
   * Use {@link TaskSettings} to build this, or provide a raw JSON string.
   * A sensible default is applied if not provided.
   */
  readonly taskSettings?: string;

  /**
   * Logical name for the replication task.
   * Auto-generated from the construct ID if not provided.
   */
  readonly replicationTaskIdentifier?: string;

  /**
   * CDC start time as an ISO-8601 string or Unix epoch number.
   * Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.
   * Mutually exclusive with cdcStartPosition.
   */
  readonly cdcStartTime?: string;

  /**
   * CDC start position (log sequence number or similar).
   * Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.
   * Mutually exclusive with cdcStartTime.
   */
  readonly cdcStartPosition?: string;

  /**
   * CDC stop position.  The task stops once this position is reached.
   * Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.
   */
  readonly cdcStopPosition?: string;

  /**
   * Removal policy for this resource.
   * @default cdk.RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: cdk.RemovalPolicy;

  /**
   * Tags to apply to the task resource.
   */
  readonly tags?: cdk.CfnTag[];
}

/**
 * A DMS replication task that ties a replication instance to a source and
 * target endpoint and defines what data to migrate and how.
 */
export class DmsReplicationTask extends Construct {
  /** The underlying CloudFormation replication task resource. */
  readonly cfnReplicationTask: dms.CfnReplicationTask;

  /** ARN of the replication task. */
  readonly replicationTaskArn: string;

  constructor(scope: Construct, id: string, props: DmsReplicationTaskProps) {
    super(scope, id);

    const taskIdentifier =
      props.replicationTaskIdentifier ??
      cdk.Names.uniqueResourceName(this, { maxLength: 63 }).toLowerCase();

    const taskSettings = props.taskSettings ?? new TaskSettings().toJson();

    // DMS expects cdcStartTime as a Unix epoch number (seconds since epoch)
    let cdcStartTime: number | undefined;
    if (props.cdcStartTime !== undefined) {
      const parsed = Date.parse(props.cdcStartTime);
      cdcStartTime = isNaN(parsed) ? Number(props.cdcStartTime) : Math.floor(parsed / 1000);
    }

    this.cfnReplicationTask = new dms.CfnReplicationTask(this, 'Resource', {
      replicationInstanceArn: props.replicationInstanceArn,
      sourceEndpointArn: props.sourceEndpoint.endpointArn,
      targetEndpointArn: props.targetEndpoint.endpointArn,
      migrationType: props.migrationType,
      tableMappings: props.tableMappings,
      replicationTaskSettings: taskSettings,
      replicationTaskIdentifier: taskIdentifier,
      cdcStartTime,
      cdcStartPosition: props.cdcStartPosition,
      cdcStopPosition: props.cdcStopPosition,
      tags: props.tags,
    });

    this.cfnReplicationTask.applyRemovalPolicy(
      props.removalPolicy ?? cdk.RemovalPolicy.DESTROY,
    );

    this.replicationTaskArn = this.cfnReplicationTask.ref;
  }
}

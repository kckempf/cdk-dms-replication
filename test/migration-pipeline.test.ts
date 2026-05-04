import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {
  DmsEndpoint,
  DmsMigrationPipeline,
  DmsReplicationInstance,
  DmsReplicationTask,
  EndpointEngine,
  EndpointType,
  MigrationType,
  ReplicationInstanceClass,
  TableMappings,
  TaskSettings,
  LobMode,
  ErrorAction,
  ColumnDataType,
} from '../src';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeStack() {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack', {
    env: { account: '123456789012', region: 'us-east-1' },
  });
  const vpc = new ec2.Vpc(stack, 'Vpc', { maxAzs: 2 });
  return { app, stack, vpc };
}

// ---------------------------------------------------------------------------
// DmsReplicationInstance
// ---------------------------------------------------------------------------

describe('DmsReplicationInstance', () => {
  test('creates replication instance with defaults', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', { vpc });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DMS::ReplicationInstance', {
      ReplicationInstanceClass: ReplicationInstanceClass.R6I_LARGE,
      AllocatedStorage: 100,
      MultiAZ: false,
      PubliclyAccessible: false,
      AutoMinorVersionUpgrade: true,
    });
  });

  test('creates a subnet group', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', { vpc });
    Template.fromStack(stack).resourceCountIs('AWS::DMS::ReplicationSubnetGroup', 1);
  });

  test('creates a KMS key when none is provided', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', { vpc });
    Template.fromStack(stack).resourceCountIs('AWS::KMS::Key', 1);
  });

  test('creates a security group when none is provided', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', { vpc });
    // SecurityGroup is created alongside the VPC's default SG, count >= 1
    const template = Template.fromStack(stack);
    const sgs = template.findResources('AWS::EC2::SecurityGroup');
    expect(Object.keys(sgs).length).toBeGreaterThanOrEqual(1);
  });

  test('respects custom instance class', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', {
      vpc,
      replicationInstanceClass: ReplicationInstanceClass.C5_2XLARGE,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationInstance', {
      ReplicationInstanceClass: ReplicationInstanceClass.C5_2XLARGE,
    });
  });

  test('supports Multi-AZ', () => {
    const { stack, vpc } = makeStack();
    new DmsReplicationInstance(stack, 'RI', { vpc, multiAz: true });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationInstance', {
      MultiAZ: true,
    });
  });
});

// ---------------------------------------------------------------------------
// DmsEndpoint
// ---------------------------------------------------------------------------

describe('DmsEndpoint', () => {
  test('creates a MySQL source endpoint', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.MYSQL,
      serverName: 'mysql.example.com',
      port: 3306,
      username: 'dms_user',
      password: cdk.SecretValue.unsafePlainText('password'),
      databaseName: 'mydb',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      EndpointType: 'source',
      EngineName: 'mysql',
      ServerName: 'mysql.example.com',
      Port: 3306,
      DatabaseName: 'mydb',
    });
  });

  test('creates an S3 target endpoint', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.S3,
      s3Settings: {
        bucketName: 'my-migration-bucket',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3-role',
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      EndpointType: 'target',
      EngineName: 's3',
    });
  });

  test('creates a Kinesis target endpoint', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.KINESIS,
      kinesisSettings: {
        streamArn: 'arn:aws:kinesis:us-east-1:123456789012:stream/my-stream',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-kinesis-role',
        messageFormat: 'json' as any,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      EndpointType: 'target',
      EngineName: 'kinesis',
    });
  });

  test('creates a PostgreSQL endpoint with CDC settings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.POSTGRES,
      serverName: 'pg.example.com',
      port: 5432,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'appdb',
      postgreSqlSettings: {
        captureDdls: true,
        slotName: 'dms_slot',
        pluginName: 'pglogical' as any,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      EngineName: 'postgres',
    });
  });
});

// ---------------------------------------------------------------------------
// TableMappings
// ---------------------------------------------------------------------------

describe('TableMappings', () => {
  test('include-all produces valid JSON with selection rule', () => {
    const json = new TableMappings().includeSchema('%').toJson();
    const parsed = JSON.parse(json);
    expect(parsed.rules).toHaveLength(1);
    expect(parsed.rules[0]['rule-type']).toBe('selection');
    expect(parsed.rules[0]['rule-action']).toBe('include');
  });

  test('exclude adds exclusion rule', () => {
    const json = new TableMappings()
      .includeSchema('public')
      .excludeTable('public', 'audit_log')
      .toJson();
    const parsed = JSON.parse(json);
    const exclusion = parsed.rules.find((r: any) => r['rule-action'] === 'exclude');
    expect(exclusion).toBeDefined();
    expect(exclusion['object-locator']['table-name']).toBe('audit_log');
  });

  test('transformation rules are added', () => {
    const json = new TableMappings()
      .includeSchema('public')
      .renameSchema('public', 'prod')
      .toLowerCaseTable('public', '%')
      .toJson();
    const parsed = JSON.parse(json);
    const transforms = parsed.rules.filter((r: any) => r['rule-type'] === 'transformation');
    expect(transforms).toHaveLength(2);
  });

  test('addColumn generates correct data-type block', () => {
    const json = new TableMappings()
      .includeSchema('public')
      .addColumn('public', 'orders', {
        columnName: 'migrated_at',
        columnType: ColumnDataType.DATETIME,
        expression: '$timestamp',
      })
      .toJson();
    const parsed = JSON.parse(json);
    const addCol = parsed.rules.find((r: any) => r['rule-action'] === 'add-column');
    expect(addCol).toBeDefined();
    expect(addCol['data-type'].type).toBe('datetime');
  });
});

// ---------------------------------------------------------------------------
// TaskSettings
// ---------------------------------------------------------------------------

describe('TaskSettings', () => {
  test('build produces valid JSON', () => {
    const json = new TaskSettings().toJson();
    const parsed = JSON.parse(json);
    expect(parsed).toHaveProperty('TargetMetadata');
    expect(parsed).toHaveProperty('FullLoadSettings');
    expect(parsed).toHaveProperty('Logging');
    expect(parsed).toHaveProperty('ErrorBehavior');
  });

  test('withLobMode sets full LOB mode', () => {
    const json = new TaskSettings().withLobMode(LobMode.FULL_LOB).toJson();
    const parsed = JSON.parse(json);
    expect(parsed.TargetMetadata.FullLobMode).toBe(true);
  });

  test('withBatchApply enables batch apply', () => {
    const json = new TaskSettings().withBatchApply(true, 5, 60).toJson();
    const parsed = JSON.parse(json);
    expect(parsed.ChangeProcessingTuning.BatchApplyTimeoutMin).toBe(5);
    expect(parsed.ChangeProcessingTuning.BatchApplyTimeoutMax).toBe(60);
  });

  test('withDataErrorPolicy sets error action', () => {
    const json = new TaskSettings()
      .withDataErrorPolicy(ErrorAction.IGNORE_RECORD, 100)
      .toJson();
    const parsed = JSON.parse(json);
    expect(parsed.ErrorBehavior.DataErrorPolicy).toBe(ErrorAction.IGNORE_RECORD);
    expect(parsed.ErrorBehavior.DataErrorEscalationCount).toBe(100);
  });

  test('withFullLoadSubTasks configures parallel tasks', () => {
    const json = new TaskSettings().withFullLoadSubTasks(16).toJson();
    const parsed = JSON.parse(json);
    expect(parsed.FullLoadSettings.MaxFullLoadSubTasks).toBe(16);
  });
});

// ---------------------------------------------------------------------------
// DmsReplicationTask
// ---------------------------------------------------------------------------

describe('DmsReplicationTask', () => {
  test('creates replication task resource', () => {
    const { stack, vpc } = makeStack();

    const instance = new DmsReplicationInstance(stack, 'RI', { vpc });

    const source = new DmsEndpoint(stack, 'Source', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.MYSQL,
      serverName: 'mysql.example.com',
      port: 3306,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
    });

    const target = new DmsEndpoint(stack, 'Target', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.S3,
      s3Settings: {
        bucketName: 'my-bucket',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3',
      },
    });

    new DmsReplicationTask(stack, 'Task', {
      replicationInstanceArn: instance.replicationInstanceArn,
      sourceEndpoint: source,
      targetEndpoint: target,
      migrationType: MigrationType.FULL_LOAD_AND_CDC,
      tableMappings: new TableMappings().includeSchema('public').toJson(),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationTask', {
      MigrationType: 'full-load-and-cdc',
    });
  });
});

// ---------------------------------------------------------------------------
// DmsMigrationPipeline (L3)
// ---------------------------------------------------------------------------

describe('DmsMigrationPipeline', () => {
  test('synthesises all expected resources for MySQL → PostgreSQL', () => {
    const { stack, vpc } = makeStack();

    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD_AND_CDC,
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.POSTGRES,
        serverName: 'pg.example.com',
        port: 5432,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      tableMappings: new TableMappings().includeSchema('public').toJson(),
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::DMS::ReplicationInstance', 1);
    template.resourceCountIs('AWS::DMS::Endpoint', 2);
    template.resourceCountIs('AWS::DMS::ReplicationTask', 1);
    template.resourceCountIs('AWS::DMS::ReplicationSubnetGroup', 1);
    template.resourceCountIs('AWS::KMS::Key', 1);
    template.resourceCountIs('AWS::Logs::LogGroup', 1);
  });

  test('synthesises Oracle → Redshift pipeline', () => {
    const { stack, vpc } = makeStack();

    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      sourceEndpoint: {
        engine: EndpointEngine.ORACLE,
        serverName: 'oracle.example.com',
        port: 1521,
        username: 'dms_user',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'ORCL',
        oracleSettings: {
          addSupplementalLogging: true,
          useLogminerReader: true,
        },
      },
      targetEndpoint: {
        engine: EndpointEngine.REDSHIFT,
        serverName: 'redshift.cluster.us-east-1.redshift.amazonaws.com',
        port: 5439,
        username: 'dms_user',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'dev',
        redshiftSettings: {
          bucketName: 'my-staging-bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-redshift',
        },
      },
    });

    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::DMS::ReplicationInstance', 1);
    template.resourceCountIs('AWS::DMS::Endpoint', 2);
    template.resourceCountIs('AWS::DMS::ReplicationTask', 1);
  });

  test('accepts existing endpoints via existingSourceEndpoint / existingTargetEndpoint', () => {
    const { stack, vpc } = makeStack();

    const source = new DmsEndpoint(stack, 'Src', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.MYSQL,
      serverName: 'mysql.example.com',
      port: 3306,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
    });

    const target = new DmsEndpoint(stack, 'Tgt', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.S3,
      s3Settings: {
        bucketName: 'my-bucket',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3',
      },
    });

    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      existingSourceEndpoint: source,
      existingTargetEndpoint: target,
    });

    // Still creates the replication instance and task
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::DMS::ReplicationInstance', 1);
    template.resourceCountIs('AWS::DMS::ReplicationTask', 1);
    template.resourceCountIs('AWS::DMS::Endpoint', 2);
  });

  test('throws when both sourceEndpoint and existingSourceEndpoint are provided', () => {
    const { stack, vpc } = makeStack();

    const existing = new DmsEndpoint(stack, 'Src', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.MYSQL,
      serverName: 'mysql.example.com',
      port: 3306,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
    });

    expect(() => {
      new DmsMigrationPipeline(stack, 'Pipeline', {
        vpc,
        migrationType: MigrationType.FULL_LOAD,
        sourceEndpoint: {
          engine: EndpointEngine.MYSQL,
          serverName: 'mysql.example.com',
        },
        existingSourceEndpoint: existing,
        targetEndpoint: {
          engine: EndpointEngine.S3,
          s3Settings: {
            bucketName: 'bucket',
            serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
          },
        },
      });
    }).toThrow('Provide either `sourceEndpoint` or `existingSourceEndpoint`, not both.');
  });

  test('disables CloudWatch logs when enableCloudWatchLogs is false', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      enableCloudWatchLogs: false,
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.S3,
        s3Settings: {
          bucketName: 'bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      },
    });
    Template.fromStack(stack).resourceCountIs('AWS::Logs::LogGroup', 0);
  });

  test('synthesises MongoDB → DocumentDB pipeline', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD_AND_CDC,
      sourceEndpoint: {
        engine: EndpointEngine.MONGODB,
        serverName: 'mongo.example.com',
        port: 27017,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        mongoDbSettings: {
          authType: 'password' as any,
          authMechanism: 'default' as any,
          nestingLevel: 'none' as any,
        },
      },
      targetEndpoint: {
        engine: EndpointEngine.DOCDB,
        serverName: 'docdb.cluster.us-east-1.docdb.amazonaws.com',
        port: 27017,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
      },
    });
    Template.fromStack(stack).resourceCountIs('AWS::DMS::Endpoint', 2);
  });
});

// ---------------------------------------------------------------------------
// DmsEndpoint — engine/type validation
// ---------------------------------------------------------------------------

describe('DmsEndpoint engine validation', () => {
  test('throws when a target-only engine is used as a source', () => {
    const { stack } = makeStack();
    expect(() => {
      new DmsEndpoint(stack, 'Ep', {
        endpointType: EndpointType.SOURCE,
        engine: EndpointEngine.DYNAMODB,
        dynamoDbSettings: { serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r' },
      });
    }).toThrow("Engine 'dynamodb' is only supported as a TARGET endpoint");
  });

  test('throws for Kinesis used as source', () => {
    const { stack } = makeStack();
    expect(() => {
      new DmsEndpoint(stack, 'Ep', {
        endpointType: EndpointType.SOURCE,
        engine: EndpointEngine.KINESIS,
        kinesisSettings: {
          streamArn: 'arn:aws:kinesis:us-east-1:123456789012:stream/s',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      });
    }).toThrow("Engine 'kinesis' is only supported as a TARGET endpoint");
  });

  test('throws for Neptune used as source', () => {
    const { stack } = makeStack();
    expect(() => {
      new DmsEndpoint(stack, 'Ep', {
        endpointType: EndpointType.SOURCE,
        engine: EndpointEngine.NEPTUNE,
        neptuneSettings: {
          s3BucketName: 'bucket',
          s3BucketFolder: 'folder',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      });
    }).toThrow("Engine 'neptune' is only supported as a TARGET endpoint");
  });

  test('does not throw for valid source/target combinations', () => {
    const { stack } = makeStack();
    expect(() => {
      new DmsEndpoint(stack, 'Ep', {
        endpointType: EndpointType.SOURCE,
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      });
    }).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// DmsMigrationPipeline — service roles
// ---------------------------------------------------------------------------

describe('DmsMigrationPipeline service roles', () => {
  test('creates dms-vpc-role', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.S3,
        s3Settings: {
          bucketName: 'bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'dms-vpc-role',
    });
  });

  test('creates dms-cloudwatch-logs-role when logging enabled', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      enableCloudWatchLogs: true,
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.S3,
        s3Settings: {
          bucketName: 'bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::IAM::Role', {
      RoleName: 'dms-cloudwatch-logs-role',
    });
  });

  test('creates dms-vpc-role only once when two pipelines share a stack', () => {
    const { stack, vpc } = makeStack();
    const commonEndpoints = {
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.S3,
        s3Settings: {
          bucketName: 'bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      },
    };

    new DmsMigrationPipeline(stack, 'PipelineA', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      ...commonEndpoints,
    });
    new DmsMigrationPipeline(stack, 'PipelineB', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      ...commonEndpoints,
    });

    // Should be exactly one dms-vpc-role despite two pipelines
    const template = Template.fromStack(stack);
    const vpcRoles = template.findResources('AWS::IAM::Role', {
      Properties: { RoleName: 'dms-vpc-role' },
    });
    expect(Object.keys(vpcRoles)).toHaveLength(1);
  });

  test('skips service role creation when createDmsServiceRoles is false', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Pipeline', {
      vpc,
      migrationType: MigrationType.FULL_LOAD,
      createDmsServiceRoles: false,
      sourceEndpoint: {
        engine: EndpointEngine.MYSQL,
        serverName: 'mysql.example.com',
        port: 3306,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      },
      targetEndpoint: {
        engine: EndpointEngine.S3,
        s3Settings: {
          bucketName: 'bucket',
          serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r',
        },
      },
    });
    const template = Template.fromStack(stack);
    const vpcRoles = template.findResources('AWS::IAM::Role', {
      Properties: { RoleName: 'dms-vpc-role' },
    });
    expect(Object.keys(vpcRoles)).toHaveLength(0);
    const cwRoles = template.findResources('AWS::IAM::Role', {
      Properties: { RoleName: 'dms-cloudwatch-logs-role' },
    });
    expect(Object.keys(cwRoles)).toHaveLength(0);
  });
});

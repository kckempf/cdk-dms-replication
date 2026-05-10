import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {
  DmsEndpoint,
  DmsMigrationPipeline,
  DmsReplicationInstance,
  DmsReplicationTask,
  EncryptionMode,
  EndpointEngine,
  EndpointType,
  KafkaSecurityProtocol,
  LobMode,
  LoggingLevel,
  MessageFormat,
  MigrationType,
  MongoAuthMechanism,
  MongoAuthType,
  MongoNestingLevel,
  PostgresCdcPlugin,
  ReplicationInstanceClass,
  S3DataFormat,
  SqlServerSafeguardPolicy,
  TableMappings,
  TaskSettings,
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

  test('allowInboundFrom adds an ingress rule to the security group', () => {
    const { stack, vpc } = makeStack();
    const ri = new DmsReplicationInstance(stack, 'RI', { vpc });
    ri.allowInboundFrom(ec2.Peer.ipv4('10.0.0.0/8'), ec2.Port.tcp(5432));
    Template.fromStack(stack).hasResourceProperties('AWS::EC2::SecurityGroup', {
      SecurityGroupIngress: Match.arrayWith([
        Match.objectLike({
          CidrIp: '10.0.0.0/8',
          FromPort: 5432,
          ToPort: 5432,
          IpProtocol: 'tcp',
        }),
      ]),
    });
  });

  test('uses provided security group instead of creating one', () => {
    const { stack, vpc } = makeStack();
    const sg = new ec2.SecurityGroup(stack, 'CustomSG', { vpc, description: 'custom' });
    const ri = new DmsReplicationInstance(stack, 'RI', { vpc, securityGroups: [sg] });
    expect(ri.securityGroup).toBe(sg);
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

  // Selection rules

  test('excludeSchema uses exclude action', () => {
    const json = new TableMappings().excludeSchema('audit').toJson();
    const rule = JSON.parse(json).rules[0];
    expect(rule['rule-type']).toBe('selection');
    expect(rule['rule-action']).toBe('exclude');
    expect(rule['object-locator']['schema-name']).toBe('audit');
  });

  test('includeTable targets a specific table with include action', () => {
    const json = new TableMappings().includeTable('public', 'orders').toJson();
    const rule = JSON.parse(json).rules[0];
    expect(rule['rule-action']).toBe('include');
    expect(rule['object-locator']['table-name']).toBe('orders');
  });

  test('explicitTable uses explicit action', () => {
    const json = new TableMappings().explicitTable('public', 'orders').toJson();
    expect(JSON.parse(json).rules[0]['rule-action']).toBe('explicit');
  });

  // Schema transformations

  test('toLowerCaseSchema emits convert-lowercase on schema target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('PUBLIC').toLowerCaseSchema('PUBLIC').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('convert-lowercase');
    expect(rule['rule-target']).toBe('schema');
  });

  test('toUpperCaseSchema emits convert-uppercase on schema target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').toUpperCaseSchema('public').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('convert-uppercase');
    expect(rule['rule-target']).toBe('schema');
  });

  test('addPrefixToSchema emits add-prefix with the value', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').addPrefixToSchema('public', 'prod_').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('add-prefix');
    expect(rule['rule-target']).toBe('schema');
    expect(rule.value).toBe('prod_');
  });

  test('addSuffixToSchema emits add-suffix with the value', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').addSuffixToSchema('public', '_v2').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('add-suffix');
    expect(rule['rule-target']).toBe('schema');
    expect(rule.value).toBe('_v2');
  });

  // Table transformations

  test('renameTable emits rename on table target with new name as value', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').renameTable('public', 'orders', 'orders_v2').toJson(),
    ).rules.find((r: any) => r['rule-action'] === 'rename');
    expect(rule['rule-target']).toBe('table');
    expect(rule['object-locator']['table-name']).toBe('orders');
    expect(rule.value).toBe('orders_v2');
  });

  test('toUpperCaseTable emits convert-uppercase on table target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').toUpperCaseTable('public', '%').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('convert-uppercase');
    expect(rule['rule-target']).toBe('table');
  });

  test('addPrefixToTable emits add-prefix on table target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').addPrefixToTable('public', '%', 'tbl_').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('add-prefix');
    expect(rule['rule-target']).toBe('table');
    expect(rule.value).toBe('tbl_');
  });

  test('addSuffixToTable emits add-suffix on table target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').addSuffixToTable('public', '%', '_bak').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('add-suffix');
    expect(rule['rule-target']).toBe('table');
    expect(rule.value).toBe('_bak');
  });

  // Column transformations

  test('renameColumn puts column-name in locator and new name as value', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').renameColumn('public', 'orders', 'id', 'order_id').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('rename');
    expect(rule['rule-target']).toBe('column');
    expect(rule['object-locator']['column-name']).toBe('id');
    expect(rule.value).toBe('order_id');
  });

  test('toLowerCaseColumn emits convert-lowercase on column target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').toLowerCaseColumn('public', 'orders', '%').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('convert-lowercase');
    expect(rule['rule-target']).toBe('column');
    expect(rule['object-locator']['column-name']).toBe('%');
  });

  test('toUpperCaseColumn emits convert-uppercase on column target', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').toUpperCaseColumn('public', 'orders', '%').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('convert-uppercase');
    expect(rule['rule-target']).toBe('column');
  });

  test('removeColumn emits remove-column with no value', () => {
    const rule = JSON.parse(
      new TableMappings().includeSchema('public').removeColumn('public', 'orders', 'secret_col').toJson(),
    ).rules.find((r: any) => r['rule-type'] === 'transformation');
    expect(rule['rule-action']).toBe('remove-column');
    expect(rule['rule-target']).toBe('column');
    expect(rule['object-locator']['column-name']).toBe('secret_col');
    expect(rule.value).toBeUndefined();
  });

  test('addColumn with columnValue sets column name in value and wraps literal in expression', () => {
    const rule = JSON.parse(
      new TableMappings()
        .includeSchema('public')
        .addColumn('public', 'orders', {
          columnName: 'source_system',
          columnType: ColumnDataType.STRING,
          columnValue: 'migration',
        })
        .toJson(),
    ).rules.find((r: any) => r['rule-action'] === 'add-column');
    expect(rule.value).toBe('source_system');
    expect(rule.expression).toBe("'migration'");
  });

  test('addColumn with columnValue escapes single quotes in the literal', () => {
    const rule = JSON.parse(
      new TableMappings()
        .includeSchema('public')
        .addColumn('public', 'orders', {
          columnName: 'label',
          columnType: ColumnDataType.STRING,
          columnValue: "it's here",
        })
        .toJson(),
    ).rules.find((r: any) => r['rule-action'] === 'add-column');
    expect(rule.value).toBe('label');
    expect(rule.expression).toBe("'it''s here'");
  });

  test('addColumn with numeric type includes precision and scale in data-type', () => {
    const rule = JSON.parse(
      new TableMappings()
        .includeSchema('public')
        .addColumn('public', 'orders', {
          columnName: 'amount',
          columnType: ColumnDataType.NUMERIC,
          columnPrecision: 10,
          columnScale: 2,
        })
        .toJson(),
    ).rules.find((r: any) => r['rule-action'] === 'add-column');
    expect(rule['data-type'].type).toBe('numeric');
    expect(rule['data-type'].precision).toBe(10);
    expect(rule['data-type'].scale).toBe(2);
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

  test('withLobMode NONE disables LOB support entirely', () => {
    const parsed = JSON.parse(new TaskSettings().withLobMode(LobMode.NONE).toJson());
    expect(parsed.TargetMetadata.SupportLobs).toBe(false);
    expect(parsed.TargetMetadata.FullLobMode).toBe(false);
    expect(parsed.TargetMetadata.LimitedSizeLobMode).toBe(false);
  });

  test('withTargetTablePrepMode sets TargetTablePrepMode', () => {
    const parsed = JSON.parse(new TaskSettings().withTargetTablePrepMode('TRUNCATE_BEFORE_LOAD').toJson());
    expect(parsed.FullLoadSettings.TargetTablePrepMode).toBe('TRUNCATE_BEFORE_LOAD');
  });

  test('withCommitRate sets CommitRate', () => {
    const parsed = JSON.parse(new TaskSettings().withCommitRate(50000).toJson());
    expect(parsed.FullLoadSettings.CommitRate).toBe(50000);
  });

  test('withRecovery sets RecoverableErrorCount and RecoverableErrorInterval', () => {
    const parsed = JSON.parse(new TaskSettings().withRecovery(10, 30).toJson());
    expect(parsed.ErrorBehavior.RecoverableErrorCount).toBe(10);
    expect(parsed.ErrorBehavior.RecoverableErrorInterval).toBe(30);
  });

  test('withLoggingEnabled(false) disables CloudWatch logging', () => {
    const parsed = JSON.parse(new TaskSettings().withLoggingEnabled(false).toJson());
    expect(parsed.Logging.EnableLogging).toBe(false);
  });

  test('withLogging sets a named log component at the given level', () => {
    const parsed = JSON.parse(
      new TaskSettings().withLogging('SOURCE_UNLOAD', LoggingLevel.LOGGER_SEVERITY_DEBUG).toJson(),
    );
    expect(parsed.Logging.LogComponents).toHaveLength(1);
    expect(parsed.Logging.LogComponents[0].Id).toBe('SOURCE_UNLOAD');
    expect(parsed.Logging.LogComponents[0].Severity).toBe(LoggingLevel.LOGGER_SEVERITY_DEBUG);
  });

  test('withLogging replaces the default three-component list', () => {
    const parsed = JSON.parse(
      new TaskSettings()
        .withLogging('SOURCE_UNLOAD', LoggingLevel.LOGGER_SEVERITY_DETAILED_DEBUG)
        .withLogging('TARGET_LOAD', LoggingLevel.LOGGER_SEVERITY_WARNING)
        .toJson(),
    );
    expect(parsed.Logging.LogComponents).toHaveLength(2);
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

  test('converts ISO-8601 cdcStartTime to Unix epoch seconds', () => {
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
      s3Settings: { bucketName: 'b', serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r' },
    });
    new DmsReplicationTask(stack, 'Task', {
      replicationInstanceArn: instance.replicationInstanceArn,
      sourceEndpoint: source,
      targetEndpoint: target,
      migrationType: MigrationType.CDC,
      tableMappings: new TableMappings().includeSchema('%').toJson(),
      cdcStartTime: '2024-01-15T00:00:00.000Z',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationTask', {
      CdcStartTime: 1705276800,
    });
  });

  test('accepts a numeric string cdcStartTime as raw epoch', () => {
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
      s3Settings: { bucketName: 'b', serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/r' },
    });
    new DmsReplicationTask(stack, 'Task', {
      replicationInstanceArn: instance.replicationInstanceArn,
      sourceEndpoint: source,
      targetEndpoint: target,
      migrationType: MigrationType.CDC,
      tableMappings: new TableMappings().includeSchema('%').toJson(),
      cdcStartTime: '1705276800',
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationTask', {
      CdcStartTime: 1705276800,
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

  test('throws for IBM Db2 z/OS used as a target', () => {
    const { stack } = makeStack();
    expect(() => {
      new DmsEndpoint(stack, 'Ep', {
        endpointType: EndpointType.TARGET,
        engine: EndpointEngine.IBM_DB2_ZOS,
        serverName: 'db2.example.com',
        port: 446,
        username: 'dms',
        password: cdk.SecretValue.unsafePlainText('pass'),
        databaseName: 'mydb',
      });
    }).toThrow("Engine 'db2-zos' is only supported as a SOURCE endpoint");
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

// ---------------------------------------------------------------------------
// DmsEndpoint — engine-specific settings mapping
// ---------------------------------------------------------------------------

describe('DmsEndpoint engine-specific settings mapping', () => {
  test('maps Oracle settings to CFN OracleSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.ORACLE,
      serverName: 'oracle.example.com',
      port: 1521,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'ORCL',
      oracleSettings: {
        addSupplementalLogging: true,
        useLogminerReader: true,
        archivedLogDestId: 1,
        parallelAsmReadThreads: 2,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      OracleSettings: {
        AddSupplementalLogging: true,
        UseLogminerReader: true,
        ArchivedLogDestId: 1,
        ParallelAsmReadThreads: 2,
      },
    });
  });

  test('maps SQL Server settings to CFN MicrosoftSqlServerSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.SQLSERVER,
      serverName: 'sqlserver.example.com',
      port: 1433,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
      sqlServerSettings: {
        trimSpaceInChar: true,
        tlogAccessMode: 'BackupOnly',
        readBackupOnly: true,
        safeguardPolicy: SqlServerSafeguardPolicy.RELY_ON_SQL_SERVER_REPLICATION_AGENT,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      MicrosoftSqlServerSettings: {
        TrimSpaceInChar: true,
        TlogAccessMode: 'BackupOnly',
        ReadBackupOnly: true,
        SafeguardPolicy: SqlServerSafeguardPolicy.RELY_ON_SQL_SERVER_REPLICATION_AGENT,
      },
    });
  });

  test('maps PostgreSQL settings to CFN PostgreSqlSettings', () => {
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
        pluginName: PostgresCdcPlugin.PG_LOGICAL,
        heartbeatEnable: true,
        mapBooleanAsBoolean: true,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      PostgreSqlSettings: {
        CaptureDdls: true,
        SlotName: 'dms_slot',
        PluginName: PostgresCdcPlugin.PG_LOGICAL,
        HeartbeatEnable: true,
        MapBooleanAsBoolean: true,
      },
    });
  });

  test('maps Redshift settings to CFN RedshiftSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.REDSHIFT,
      serverName: 'cluster.us-east-1.redshift.amazonaws.com',
      port: 5439,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'dev',
      redshiftSettings: {
        bucketName: 'staging-bucket',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-rs',
        encryptionMode: EncryptionMode.SSE_S3,
        maxFileSize: 32768,
        truncateColumns: true,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      RedshiftSettings: {
        BucketName: 'staging-bucket',
        ServiceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-rs',
        EncryptionMode: EncryptionMode.SSE_S3,
        MaxFileSize: 32768,
        TruncateColumns: true,
      },
    });
  });

  test('maps S3 settings to CFN S3Settings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.S3,
      s3Settings: {
        bucketName: 'my-bucket',
        bucketFolder: 'cdc',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3',
        dataFormat: S3DataFormat.PARQUET,
        datePartitionEnabled: true,
        includeOpForFullLoad: true,
        cdcInsertsAndUpdates: true,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      S3Settings: {
        BucketName: 'my-bucket',
        BucketFolder: 'cdc',
        ServiceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3',
        DataFormat: S3DataFormat.PARQUET,
        DatePartitionEnabled: true,
        IncludeOpForFullLoad: true,
        CdcInsertsAndUpdates: true,
      },
    });
  });

  test('maps Kafka settings to CFN KafkaSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.KAFKA,
      kafkaSettings: {
        broker: 'b-1.msk-cluster.abc123.kafka.us-east-1.amazonaws.com:9092',
        topic: 'dms-topic',
        securityProtocol: KafkaSecurityProtocol.SASL_SSL,
        messageFormat: MessageFormat.JSON,
        includeTransactionDetails: true,
        noHexPrefix: true,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      KafkaSettings: {
        Broker: 'b-1.msk-cluster.abc123.kafka.us-east-1.amazonaws.com:9092',
        Topic: 'dms-topic',
        SecurityProtocol: KafkaSecurityProtocol.SASL_SSL,
        MessageFormat: MessageFormat.JSON,
        IncludeTransactionDetails: true,
        NoHexPrefix: true,
      },
    });
  });

  test('maps OpenSearch settings to CFN ElasticsearchSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.OPENSEARCH,
      openSearchSettings: {
        endpointUri: 'https://my-domain.us-east-1.es.amazonaws.com',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-es',
        errorRetryDuration: 300,
        fullLoadErrorPercentage: 10,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      ElasticsearchSettings: {
        EndpointUri: 'https://my-domain.us-east-1.es.amazonaws.com',
        ServiceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-es',
        ErrorRetryDuration: 300,
        FullLoadErrorPercentage: 10,
      },
    });
  });

  test('maps Neptune settings to CFN NeptuneSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.NEPTUNE,
      neptuneSettings: {
        s3BucketName: 'neptune-staging',
        s3BucketFolder: 'migration',
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-neptune',
        iamAuthEnabled: true,
        maxRetryCount: 5,
        errorRetryDuration: 300,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      NeptuneSettings: {
        S3BucketName: 'neptune-staging',
        S3BucketFolder: 'migration',
        ServiceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-neptune',
        IamAuthEnabled: true,
        MaxRetryCount: 5,
        ErrorRetryDuration: 300,
      },
    });
  });

  test('maps Redis settings to CFN RedisSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.REDIS,
      redisSettings: {
        serverName: 'redis.abc123.cache.amazonaws.com',
        port: 6380,
        authType: 'auth-token',
        authPassword: cdk.SecretValue.unsafePlainText('my-token'),
        sslSecurityProtocol: 'ssl-encryption',
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      RedisSettings: {
        ServerName: 'redis.abc123.cache.amazonaws.com',
        Port: 6380,
        AuthType: 'auth-token',
        SslSecurityProtocol: 'ssl-encryption',
      },
    });
  });

  test('maps DynamoDB settings to CFN DynamoDbSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.TARGET,
      engine: EndpointEngine.DYNAMODB,
      dynamoDbSettings: {
        serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-dynamo',
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      DynamoDbSettings: {
        ServiceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-dynamo',
      },
    });
  });

  test('maps SAP ASE settings to CFN SybaseSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.SAP_ASE,
      serverName: 'ase.example.com',
      port: 5000,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
      sapAseSettings: {
        secretsManagerAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-ase',
        secretsManagerSecretId: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:ase-secret',
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      SybaseSettings: {
        SecretsManagerAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-ase',
        SecretsManagerSecretId: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:ase-secret',
      },
    });
  });

  test('maps Db2 settings to CFN IbmDb2Settings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.IBM_DB2,
      serverName: 'db2.example.com',
      port: 50000,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      databaseName: 'mydb',
      db2Settings: {
        currentLsn: '0000:0000:0000:0000:0001',
        setDataCaptureChanges: true,
        maxKBytesPerRead: 64,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      IbmDb2Settings: {
        CurrentLsn: '0000:0000:0000:0000:0001',
        SetDataCaptureChanges: true,
        MaxKBytesPerRead: 64,
      },
    });
  });

  test('maps MongoDB settings to CFN MongoDbSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.MONGODB,
      serverName: 'mongo.example.com',
      port: 27017,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      mongoDbSettings: {
        authType: MongoAuthType.PASSWORD,
        authMechanism: MongoAuthMechanism.SCRAM_SHA_1,
        nestingLevel: MongoNestingLevel.ONE,
        docsToInvestigate: 1000,
        extractDocId: true,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      MongoDbSettings: {
        AuthType: MongoAuthType.PASSWORD,
        AuthMechanism: MongoAuthMechanism.SCRAM_SHA_1,
        NestingLevel: MongoNestingLevel.ONE,
        DocsToInvestigate: '1000',
        ExtractDocId: 'true',
      },
    });
  });

  test('maps DocumentDB mongoDbSettings to CFN DocDbSettings', () => {
    const { stack } = makeStack();
    new DmsEndpoint(stack, 'Ep', {
      endpointType: EndpointType.SOURCE,
      engine: EndpointEngine.DOCDB,
      serverName: 'docdb.cluster.us-east-1.docdb.amazonaws.com',
      port: 27017,
      username: 'dms',
      password: cdk.SecretValue.unsafePlainText('pass'),
      mongoDbSettings: {
        nestingLevel: MongoNestingLevel.ONE,
        extractDocId: true,
        docsToInvestigate: 500,
      },
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::Endpoint', {
      DocDbSettings: {
        NestingLevel: MongoNestingLevel.ONE,
        ExtractDocId: true,
        DocsToInvestigate: 500,
      },
    });
  });
});

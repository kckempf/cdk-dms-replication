import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as kms from 'aws-cdk-lib/aws-kms';
import {
  DmsMigrationPipeline,
  DmsReplicationInstance,
  DmsServerlessPipeline,
  EndpointEngine,
  MigrationType,
  ReplicationInstanceClass,
  TableMappings,
  TaskSettings,
  LobMode,
  ErrorAction,
} from '../src';

const app = new cdk.App();

// ---------------------------------------------------------------------------
// Stack 1: Classic DmsMigrationPipeline — MySQL → Aurora PostgreSQL
// ---------------------------------------------------------------------------
const classicStack = new cdk.Stack(app, 'IntegClassicPipeline');

const classicVpc = new ec2.Vpc(classicStack, 'Vpc', {
  maxAzs: 2,
  natGateways: 1,
});

new DmsMigrationPipeline(classicStack, 'MySqlToAurora', {
  vpc: classicVpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  replicationInstanceClass: ReplicationInstanceClass.R6I_LARGE,
  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.example.com',
    port: 3306,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('mysql-dms-secret'),
    databaseName: 'mydb',
  },
  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: 'aurora.cluster.us-east-1.rds.amazonaws.com',
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
    databaseName: 'mydb',
  },
  tableMappings: new TableMappings().includeSchema('public').toJson(),
  taskSettings: new TaskSettings()
    .withLobMode(LobMode.LIMITED_LOB, 32)
    .withFullLoadSubTasks(16)
    .withBatchApply(true, 5, 60)
    .withDataErrorPolicy(ErrorAction.IGNORE_RECORD, 100)
    .toJson(),
  multiAz: true,
});

// ---------------------------------------------------------------------------
// Stack 2: Classic pipeline — Oracle → S3 (no CDC roles, shared KMS key)
// ---------------------------------------------------------------------------
const oracleStack = new cdk.Stack(app, 'IntegOracleToS3');

const oracleVpc = new ec2.Vpc(oracleStack, 'Vpc', { maxAzs: 2, natGateways: 1 });
const sharedKey = new kms.Key(oracleStack, 'SharedKey', { enableKeyRotation: true });

new DmsMigrationPipeline(oracleStack, 'OracleToS3', {
  vpc: oracleVpc,
  migrationType: MigrationType.FULL_LOAD,
  replicationInstanceClass: ReplicationInstanceClass.C6I_2XLARGE,
  encryptionKey: sharedKey,
  sourceEndpoint: {
    engine: EndpointEngine.ORACLE,
    serverName: 'oracle.example.com',
    port: 1521,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('oracle-dms-secret'),
    databaseName: 'ORCL',
    oracleSettings: {
      addSupplementalLogging: true,
      useLogminerReader: true,
    },
  },
  targetEndpoint: {
    engine: EndpointEngine.S3,
    s3Settings: {
      bucketName: 'my-dms-target-bucket',
      serviceAccessRoleArn: 'arn:aws:iam::123456789012:role/dms-s3-role',
      dataFormat: 'parquet' as any,
      datePartitionEnabled: true,
    },
  },
  createDmsServiceRoles: false,
});

// ---------------------------------------------------------------------------
// Stack 3: Serverless pipeline — PostgreSQL → Redshift
// ---------------------------------------------------------------------------
const serverlessStack = new cdk.Stack(app, 'IntegServerlessPipeline');

const serverlessVpc = new ec2.Vpc(serverlessStack, 'Vpc', { maxAzs: 2, natGateways: 1 });

new DmsServerlessPipeline(serverlessStack, 'PgToRedshift', {
  vpc: serverlessVpc,
  maxCapacityUnits: 16,
  minCapacityUnits: 2,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  sourceEndpoint: {
    engine: EndpointEngine.POSTGRES,
    serverName: 'pg.example.com',
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('pg-dms-secret'),
    databaseName: 'mydb',
    postgreSqlSettings: {
      pluginName: 'pglogical' as any,
      heartbeatEnable: true,
    },
  },
  targetEndpoint: {
    engine: EndpointEngine.REDSHIFT,
    serverName: 'redshift.cluster.us-east-1.redshift.amazonaws.com',
    port: 5439,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('redshift-dms-secret'),
    databaseName: 'mydb',
  },
  tableMappings: new TableMappings().includeSchema('public').toJson(),
});

// ---------------------------------------------------------------------------
// Stack 4: Standalone DmsReplicationInstance (escape-hatch usage)
// ---------------------------------------------------------------------------
const instanceStack = new cdk.Stack(app, 'IntegReplicationInstance');

const instanceVpc = new ec2.Vpc(instanceStack, 'Vpc', { maxAzs: 2, natGateways: 1 });

const ri = new DmsReplicationInstance(instanceStack, 'Instance', {
  vpc: instanceVpc,
  replicationInstanceClass: ReplicationInstanceClass.T3_MEDIUM,
  allocatedStorage: 50,
  engineVersion: '3.5.4',
});

ri.allowInboundFrom(
  ec2.Peer.ipv4('10.0.0.0/8'),
  ec2.Port.tcp(5432),
  'Allow internal PostgreSQL',
);

app.synth();

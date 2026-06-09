# cdk-dms-replication

[![npm version](https://badge.fury.io/js/cdk-dms-replication.svg)](https://badge.fury.io/js/cdk-dms-replication)
[![PyPI version](https://badge.fury.io/py/cdk-dms-replication.svg)](https://badge.fury.io/py/cdk-dms-replication)
[![build](https://github.com/kckempf/cdk-dms-replication/actions/workflows/build.yml/badge.svg)](https://github.com/kckempf/cdk-dms-replication/actions/workflows/build.yml)

L3 CDK constructs for [Amazon Database Migration Service (DMS)](https://aws.amazon.com/dms/). Provision a complete migration pipeline — replication instance, endpoints, and task — in a few lines of code, with secure defaults and full support for all DMS-supported engines and migration patterns.

## Features

- **All migration patterns** — full load, CDC, and full-load-and-CDC
- **Classic and Serverless** — `DmsMigrationPipeline` (fixed instance) or `DmsServerlessPipeline` (auto-scales DCUs)
- **All DMS engines** — MySQL, PostgreSQL, Oracle, SQL Server, SAP ASE, IBM Db2, MongoDB, DocumentDB, S3, DynamoDB, Redshift, Kinesis, Kafka, OpenSearch, Neptune, Redis
- **Secure defaults** — replication instance placed in private subnets, KMS encryption at rest, security group auto-created
- **Fluent builders** — `TableMappings` and `TaskSettings` builders produce the JSON DMS expects without hand-crafting strings
- **Multi-language** — TypeScript, Python, Java, .NET, Go (via JSII)
- **Escape hatches** — pass existing endpoints or a pre-existing replication instance

## Installation

### TypeScript / JavaScript

```bash
npm install cdk-dms-replication
```

### Python

```bash
pip install cdk-dms-replication
```

### Java

```xml
<dependency>
  <groupId>io.github.kckempf</groupId>
  <artifactId>cdk-dms-replication</artifactId>
  <version>VERSION</version>
</dependency>
```

### .NET

```bash
dotnet add package KcKempf.CdkDmsReplication
```

### Go

```bash
go get github.com/kckempf/cdk-dms-replication-go
```

---

## Quick start

### Classic pipeline (fixed replication instance)

`DmsMigrationPipeline` provisions a replication instance, both endpoints, and a replication task in one construct.

```typescript
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {
  DmsMigrationPipeline,
  EndpointEngine,
  MigrationType,
  TableMappings,
} from 'cdk-dms-replication';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'MigrationStack');

const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', { isDefault: false });

new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,

  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.internal.example.com',
    port: 3306,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('mysql-dms-password'),
    databaseName: 'orders',
  },

  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: cluster.clusterEndpoint.hostname,
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-password'),
    databaseName: 'orders',
  },

  tableMappings: new TableMappings()
    .includeSchema('public')
    .excludeTable('public', 'audit_log')
    .toJson(),
});
```

> **Note:** The `tableMappings` default (when omitted) is to include all tables in all schemas.

### Serverless pipeline (auto-scaling)

`DmsServerlessPipeline` uses DMS Serverless, which automatically scales capacity (measured in DMS Capacity Units — DCUs) between a configurable minimum and maximum. There is no replication instance to size or manage.

```typescript
import {
  DmsServerlessPipeline,
  EndpointEngine,
  MigrationType,
} from 'cdk-dms-replication';

new DmsServerlessPipeline(stack, 'Pipeline', {
  vpc,
  maxCapacityUnits: 16,           // required; valid values: 1,2,4,8,16,32,64,128,192,256,384
  minCapacityUnits: 2,            // optional; DMS auto-determines if omitted
  migrationType: MigrationType.FULL_LOAD_AND_CDC,

  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.internal.example.com',
    port: 3306,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('mysql-dms-password'),
    databaseName: 'orders',
  },

  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: cluster.clusterEndpoint.hostname,
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-password'),
    databaseName: 'orders',
  },
});
```

> **CDC start/stop position limitation:** `DmsServerlessPipeline` does not support `cdcStartPosition` or `cdcStartTime` at the CloudFormation level. To start replication from a specific LSN or timestamp, call the [`StartReplication` API](https://docs.aws.amazon.com/dms/latest/APIReference/API_StartReplication.html) after the config is created.

---

## Migration patterns

### Full load

Migrates all existing data once, then stops.

```typescript
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD,
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

### CDC only

Replicates ongoing changes starting from a specific position or time. The target must already be seeded with data.

```typescript
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.CDC,
  cdcStartPosition: 'mysql-bin-changelog.000024:373',  // binlog position
  // — or —
  cdcStartTime: '2024-01-01T00:00:00Z',                // ISO-8601 timestamp
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

### Full load then CDC

Migrates existing data, then automatically switches to continuous replication.

```typescript
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

---

## Endpoint examples

### MySQL / MariaDB / Aurora MySQL

```typescript
sourceEndpoint: {
  engine: EndpointEngine.MYSQL,          // or MARIADB, AURORA_MYSQL
  serverName: 'mysql.example.com',
  port: 3306,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('db-secret'),
  databaseName: 'mydb',
  mySqlSettings: {
    parallelLoadThreads: 4,
    serverTimezone: 'UTC',
  },
},
```

### PostgreSQL / Aurora PostgreSQL

```typescript
sourceEndpoint: {
  engine: EndpointEngine.POSTGRES,       // or AURORA_POSTGRESQL
  serverName: 'pg.example.com',
  port: 5432,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('db-secret'),
  databaseName: 'appdb',
  postgreSqlSettings: {
    captureDdls: true,
    slotName: 'dms_replication_slot',
    pluginName: PostgresCdcPlugin.PG_LOGICAL,
    heartbeatEnable: true,
  },
},
```

### Oracle

```typescript
sourceEndpoint: {
  engine: EndpointEngine.ORACLE,
  serverName: 'oracle.example.com',
  port: 1521,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('oracle-secret'),
  databaseName: 'ORCL',
  oracleSettings: {
    addSupplementalLogging: true,
    useLogminerReader: true,   // true = LogMiner, false = BinaryReader
  },
},
```

### SQL Server

```typescript
sourceEndpoint: {
  engine: EndpointEngine.SQLSERVER,
  serverName: 'sqlserver.example.com',
  port: 1433,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('sqlserver-secret'),
  databaseName: 'AdventureWorks',
  sqlServerSettings: {
    readBackupOnly: false,
    safeguardPolicy: SqlServerSafeguardPolicy.RELY_ON_SQL_SERVER_REPLICATION_AGENT,
  },
},
```

### MongoDB / DocumentDB

```typescript
sourceEndpoint: {
  engine: EndpointEngine.MONGODB,        // or DOCDB
  serverName: 'mongo.example.com',
  port: 27017,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('mongo-secret'),
  mongoDbSettings: {
    authType: MongoAuthType.PASSWORD,
    authMechanism: MongoAuthMechanism.SCRAM_SHA_1,
    nestingLevel: MongoNestingLevel.ONE,
  },
},
```

### Amazon S3 (source or target)

```typescript
// As a target
targetEndpoint: {
  engine: EndpointEngine.S3,
  s3Settings: {
    bucketName: 'my-migration-data',
    bucketFolder: 'dms-output',
    serviceAccessRoleArn: s3Role.roleArn,
    dataFormat: S3DataFormat.PARQUET,
    parquetVersion: ParquetVersion.PARQUET_2_0,
    datePartitionEnabled: true,
    datePartitionSequence: DatePartitionSequence.YYYYMMDD,
    encryptionMode: EncryptionMode.SSE_KMS,
    serverSideEncryptionKmsKeyId: myKey.keyArn,
  },
},
```

### Amazon Redshift

```typescript
targetEndpoint: {
  engine: EndpointEngine.REDSHIFT,
  serverName: 'my-cluster.abc123.us-east-1.redshift.amazonaws.com',
  port: 5439,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('redshift-secret'),
  databaseName: 'dev',
  redshiftSettings: {
    bucketName: 'my-redshift-staging',
    serviceAccessRoleArn: redshiftRole.roleArn,
    encryptionMode: EncryptionMode.SSE_KMS,
    serverSideEncryptionKmsKeyId: myKey.keyArn,
    truncateColumns: true,
    emptyAsNull: true,
  },
},
```

### Amazon Kinesis Data Streams

```typescript
targetEndpoint: {
  engine: EndpointEngine.KINESIS,
  kinesisSettings: {
    streamArn: stream.streamArn,
    serviceAccessRoleArn: kinesisRole.roleArn,
    messageFormat: MessageFormat.JSON,
    includeTransactionDetails: true,
    includeTableAlterOperations: true,
  },
},
```

### Apache Kafka / Amazon MSK

```typescript
targetEndpoint: {
  engine: EndpointEngine.KAFKA,
  kafkaSettings: {
    broker: 'b-1.my-cluster.abc123.kafka.us-east-1.amazonaws.com:9092',
    topic: 'dms-changes',
    messageFormat: MessageFormat.JSON,
    securityProtocol: KafkaSecurityProtocol.SASL_SSL,
    saslUsername: 'dms_user',
    saslPassword: cdk.SecretValue.secretsManager('kafka-sasl-password'),
  },
},
```

### Amazon OpenSearch Service

```typescript
targetEndpoint: {
  engine: EndpointEngine.OPENSEARCH,
  openSearchSettings: {
    endpointUri: 'https://search-my-domain.us-east-1.es.amazonaws.com',
    serviceAccessRoleArn: openSearchRole.roleArn,
    fullLoadErrorPercentage: 10,
    errorRetryDuration: 300,
  },
},
```

### Amazon Neptune

```typescript
targetEndpoint: {
  engine: EndpointEngine.NEPTUNE,
  neptuneSettings: {
    s3BucketName: 'my-neptune-staging',
    s3BucketFolder: 'dms',
    serviceAccessRoleArn: neptuneRole.roleArn,
    iamAuthEnabled: true,
  },
},
```

### Amazon DynamoDB

```typescript
targetEndpoint: {
  engine: EndpointEngine.DYNAMODB,
  dynamoDbSettings: {
    serviceAccessRoleArn: dynamoRole.roleArn,
  },
},
```

DynamoDB targets also require an `object-mapping` rule per source table in the
table mappings. See [DynamoDB target (object mapping)](#dynamodb-target-object-mapping)
below.

---

## Table mappings

Use the `TableMappings` fluent builder to control which tables are migrated and how they are named on the target.

### Selection rules

```typescript
new TableMappings()
  .includeSchema('public')               // include all tables in 'public'
  .includeSchema('%')                    // include all schemas (wildcard)
  .excludeTable('public', 'audit_log')  // exclude a specific table
  .excludeSchema('internal')            // exclude an entire schema
  .explicitTable('public', 'orders')    // migrate only this one table
  .toJson()
```

### Transformation rules

```typescript
new TableMappings()
  .includeSchema('%')
  .renameSchema('legacy', 'v2')          // rename schema on target
  .toLowerCaseTable('public', '%')       // lowercase all table names
  .toUpperCaseSchema('%')                // uppercase all schema names
  .addPrefixToTable('public', '%', 'migrated_')
  .renameTable('public', 'usr', 'users') // rename a specific table
  .renameColumn('public', 'orders', 'cust_id', 'customer_id')
  .removeColumn('public', 'orders', 'internal_notes')
  .toJson()
```

### Adding columns

```typescript
new TableMappings()
  .includeSchema('public')
  .addColumn('public', 'orders', {
    columnName: 'migrated_at',
    columnType: ColumnDataType.DATETIME,
    expression: '$timestamp',       // DMS built-in expression
  })
  .addColumn('public', 'orders', {
    columnName: 'migration_version',
    columnType: ColumnDataType.STRING,
    columnLength: 10,
    columnValue: 'v2.0',           // constant value
  })
  .toJson()
```

### DynamoDB target (object mapping)

When the target endpoint is DynamoDB, DMS requires an `object-mapping` rule per
source table that defines the partition key (and optionally a sort key) and
how source columns become DynamoDB attributes. Use `mapToDynamoDb()` alongside
the usual `includeTable()`:

```typescript
new TableMappings()
  .includeTable('public', 'orders')
  .mapToDynamoDb('public', 'orders', {
    targetTableName: 'Orders',
    partitionKey: {
      sourceColumn: 'order_id',
      targetAttributeName: 'OrderId',
      attributeSubType: DynamoDbAttributeSubType.STRING,
    },
    sortKey: {
      sourceColumn: 'created_at',
      targetAttributeName: 'CreatedAt',
      attributeSubType: DynamoDbAttributeSubType.STRING,
    },
    excludeColumns: ['internal_flag'],
    attributeMappings: [
      {
        sourceColumn: 'customer_id',
        targetAttributeName: 'CustomerId',
        attributeSubType: DynamoDbAttributeSubType.STRING,
      },
    ],
  })
  .toJson()
```

Source columns not listed in `attributeMappings` or `excludeColumns` are
migrated under their source column name.

#### Composite key values

For DynamoDB single-table designs you often need composite keys built from a
literal prefix plus one or more source columns. Use `value` instead of
`sourceColumn` to provide a raw DMS expression:

```typescript
new TableMappings()
  .includeTable('public', 'orders')
  .mapToDynamoDb('public', 'orders', {
    targetTableName: 'AppTable',
    partitionKey: {
      value: 'CUSTOMER#${customer_id}',
      targetAttributeName: 'PK',
      attributeSubType: DynamoDbAttributeSubType.STRING,
    },
    sortKey: {
      value: 'ORDER#${order_id}',
      targetAttributeName: 'SK',
      attributeSubType: DynamoDbAttributeSubType.STRING,
    },
  })
  .toJson()
```

Exactly one of `sourceColumn` or `value` must be set on each key/attribute
mapping — the builder throws at synth time otherwise.

---

## Task settings

Use `TaskSettings` to tune LOB handling, error behaviour, full-load parallelism, and CDC batching.

```typescript
import { TaskSettings, LobMode, ErrorAction, LoggingLevel } from 'cdk-dms-replication';

const settings = new TaskSettings()
  // LOB handling
  .withLobMode(LobMode.LIMITED_LOB, 64)   // truncate LOBs at 64 KB

  // Full load tuning
  .withFullLoadSubTasks(16)                // 16 parallel table loads
  .withTargetTablePrepMode('DROP_AND_CREATE')
  .withCommitRate(50000)                   // commit every 50k rows

  // CDC batch apply
  .withBatchApply(true, 5, 60)            // batch changes, 5–60 second window

  // Error handling
  .withDataErrorPolicy(ErrorAction.IGNORE_RECORD, 1000)
  .withRecovery(-1, 5)                    // unlimited retries, 5s interval

  // Logging
  .withLogging('SOURCE_UNLOAD', LoggingLevel.LOGGER_SEVERITY_DEBUG)
  .withLogging('TARGET_LOAD', LoggingLevel.LOGGER_SEVERITY_DEFAULT)
  .toJson();

new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  taskSettings: settings,
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

---

## Replication instance options

```typescript
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,

  // Instance sizing (default: R6I_LARGE)
  replicationInstanceClass: ReplicationInstanceClass.R6I_4XLARGE,
  allocatedStorage: 500,        // GB

  // High availability
  multiAz: true,

  // Encryption — bring your own KMS key
  encryptionKey: myKmsKey,

  // Subnet placement
  vpcSubnets: {
    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
  },

  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

---

## Using lower-level constructs directly

If you need more control, use the individual constructs and wire them together yourself.

```typescript
import {
  DmsReplicationInstance,
  DmsEndpoint,
  DmsReplicationTask,
  EndpointType,
  EndpointEngine,
  MigrationType,
  TableMappings,
} from 'cdk-dms-replication';

// 1. Replication instance
const instance = new DmsReplicationInstance(stack, 'Instance', {
  vpc,
  replicationInstanceClass: ReplicationInstanceClass.R6I_LARGE,
  multiAz: true,
});

// Allow the source DB security group to accept connections from DMS
instance.allowInboundFrom(
  ec2.Peer.securityGroupId(myDbSg.securityGroupId),
  ec2.Port.tcp(3306),
);

// 2. Endpoints
const source = new DmsEndpoint(stack, 'Source', {
  endpointType: EndpointType.SOURCE,
  engine: EndpointEngine.MYSQL,
  serverName: 'mysql.example.com',
  port: 3306,
  username: 'dms_user',
  password: cdk.SecretValue.secretsManager('db-secret'),
  databaseName: 'mydb',
});

const target = new DmsEndpoint(stack, 'Target', {
  endpointType: EndpointType.TARGET,
  engine: EndpointEngine.S3,
  s3Settings: {
    bucketName: 'my-bucket',
    serviceAccessRoleArn: s3Role.roleArn,
  },
});

// 3. Replication task
new DmsReplicationTask(stack, 'Task', {
  replicationInstanceArn: instance.replicationInstanceArn,
  sourceEndpoint: source,
  targetEndpoint: target,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  tableMappings: new TableMappings().includeSchema('public').toJson(),
});
```

---

## Using existing endpoints

Bring your own endpoints if they already exist (e.g., created outside CDK or in a different stack):

```typescript
import { IDmsEndpoint } from 'cdk-dms-replication';

// Reference an existing endpoint by ARN
const existingSource: IDmsEndpoint = {
  endpointArn: 'arn:aws:dms:us-east-1:123456789012:endpoint:ABCDEF',
};

new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.CDC,
  existingSourceEndpoint: existingSource,
  targetEndpoint: {
    engine: EndpointEngine.S3,
    s3Settings: { ... },
  },
});
```

---

## Secrets Manager integration

For production workloads, store credentials in AWS Secrets Manager and let DMS retrieve them directly (no plaintext in CloudFormation):

```typescript
sourceEndpoint: {
  engine: EndpointEngine.MYSQL,
  serverName: 'mysql.example.com',
  port: 3306,
  mySqlSettings: {
    secretsManagerSecretId: 'arn:aws:secretsmanager:us-east-1:123456789012:secret:dms/mysql-abc123',
    secretsManagerAccessRoleArn: dmsSecretsRole.roleArn,
  },
},
```

The secret must contain `username` and `password` keys. See [Using AWS Secrets Manager to access database credentials](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Security.html#security-iam-secretsmanager) for the required secret format and IAM permissions.

---

## Cross-account migrations

DMS supports migrating data between AWS accounts. The replication instance always lives in one account (the **DMS account**) and connects to source and target databases over the network, regardless of which account owns them.

### Prerequisites

Two things must be true before the construct can help:

1. **Network connectivity** — The replication instance's VPC must be able to reach both endpoints. Establish this with [VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html), [AWS Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html), or [AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html) before deploying. The construct has no visibility into routing — it will synthesise correctly regardless, but the task will fail at runtime if the endpoints are unreachable.

2. **IAM cross-account trust** — For AWS-managed targets (S3, Kinesis, Redshift, DynamoDB, etc.) owned by a different account, DMS needs an IAM role in the **target account** that trusts the DMS service principal in the **DMS account**.

### CDK stack setup

CDK cannot pass constructs like `ec2.IVpc` across account boundaries. Use `Vpc.fromLookup` in the DMS account stack to reference the VPC by ID:

```typescript
// DMS account stack (e.g. account 111111111111)
const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', {
  vpcId: 'vpc-0abc1234def567890',
});
```

### Database endpoints (any engine)

For source or target databases running in another account, provide the hostname that is reachable from the replication instance's VPC (private IP, private DNS name, or VPC peering DNS). No special construct configuration is needed beyond what you would use for a same-account migration.

```typescript
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,

  // Source DB in account 222222222222, reachable via Transit Gateway
  sourceEndpoint: {
    engine: EndpointEngine.ORACLE,
    serverName: '10.1.2.3',           // private IP from peered VPC
    port: 1521,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('oracle-dms-secret'),
    databaseName: 'ORCL',
  },

  // Target in the same DMS account — normal config
  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: cluster.clusterEndpoint.hostname,
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
    databaseName: 'mydb',
  },
});
```

### AWS-managed targets in another account (S3, Kinesis, Redshift, etc.)

When the target service lives in a different account, create an IAM role in the **target account** that DMS (running in the DMS account) can assume. Pass its ARN via `serviceAccessRoleArn`.

**Step 1 — Create the cross-account role in the target account (222222222222):**

```typescript
// In a stack deployed to the TARGET account (222222222222)
const crossAccountDmsRole = new iam.Role(targetStack, 'DmsCrossAccountRole', {
  assumedBy: new iam.CompositePrincipal(
    // Allow DMS in the DMS account to assume this role
    new iam.ArnPrincipal(`arn:aws:iam::111111111111:role/dms-vpc-role`),
    new iam.ServicePrincipal('dms.amazonaws.com'),
  ),
  inlinePolicies: {
    S3Access: new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: ['s3:PutObject', 's3:DeleteObject', 's3:ListBucket'],
          resources: [
            targetBucket.bucketArn,
            `${targetBucket.bucketArn}/*`,
          ],
        }),
      ],
    }),
  },
});
```

**Step 2 — Reference the role ARN in the DMS account stack:**

```typescript
// In the DMS account stack (111111111111)
new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD,
  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.internal.example.com',
    port: 3306,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('mysql-dms-secret'),
    databaseName: 'orders',
  },
  targetEndpoint: {
    engine: EndpointEngine.S3,
    s3Settings: {
      bucketName: 'target-account-bucket',   // bucket in account 222222222222
      serviceAccessRoleArn: 'arn:aws:iam::222222222222:role/DmsCrossAccountRole',
    },
  },
});
```

The same pattern applies to Kinesis, Redshift, DynamoDB, and other AWS-managed targets — create the role in the target account, grant it the permissions that service needs, and pass its ARN to the relevant `serviceAccessRoleArn` field.

### Cross-account Secrets Manager

If the database credentials are stored in Secrets Manager in the source account (222222222222) but DMS runs in a different account (111111111111):

1. Add a [resource-based policy](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_resource-based-policies.html) to the secret in account 222222222222 that allows the DMS account's role to call `secretsmanager:GetSecretValue`.
2. Pass the full secret ARN and the cross-account access role ARN to the endpoint settings:

```typescript
sourceEndpoint: {
  engine: EndpointEngine.MYSQL,
  serverName: 'mysql.internal.example.com',
  port: 3306,
  mySqlSettings: {
    secretsManagerSecretId:
      'arn:aws:secretsmanager:us-east-1:222222222222:secret:dms/mysql-abc123',
    secretsManagerAccessRoleArn:
      'arn:aws:iam::111111111111:role/DmsSecretsManagerRole',
  },
},
```

### Cross-account KMS encryption

The construct creates a KMS key in the DMS account for replication instance storage. If you need the replication instance to write to a KMS-encrypted target in another account, bring your own key and add a cross-account statement to its key policy:

```typescript
// Key in the DMS account (111111111111), with cross-account decrypt permission
const encryptionKey = new kms.Key(stack, 'ReplicationKey', {
  enableKeyRotation: true,
  policy: new iam.PolicyDocument({
    statements: [
      // Standard key admin/use permissions ...
      new iam.PolicyStatement({
        principals: [new iam.AccountPrincipal('222222222222')],
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
        resources: ['*'],
      }),
    ],
  }),
});

new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  encryptionKey,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

### Summary of cross-account responsibilities

| Concern | Who sets it up | How to configure |
|---------|---------------|-----------------|
| Network connectivity | You (VPC peering / TGW / PrivateLink) | Prerequisite — no construct prop |
| Database endpoint hostname | You | `serverName` — use private IP or private DNS |
| Cross-account service role (S3, Kinesis, etc.) | You (role in target account) | `serviceAccessRoleArn` |
| Cross-account Secrets Manager | You (resource policy on secret) | `secretsManagerSecretId` + `secretsManagerAccessRoleArn` |
| Cross-account KMS | You (key policy) | `encryptionKey` (bring your own) |
| Replication instance, subnet group, task | This construct | Fully managed |

---

## Observability

A CloudWatch Logs log group is created by default. Customise the retention period or disable it:

```typescript
import * as logs from 'aws-cdk-lib/aws-logs';

new DmsMigrationPipeline(stack, 'Pipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  enableCloudWatchLogs: true,
  logRetention: logs.RetentionDays.THREE_MONTHS,
  sourceEndpoint: { ... },
  targetEndpoint: { ... },
});
```

---

## API reference

Full API documentation is available in [API.md](https://github.com/kckempf/cdk-dms-replication/blob/main/API.md) and on [Construct Hub](https://constructs.dev/packages/cdk-dms-replication).

---

## Supported source engines

| Engine | `EndpointEngine` value |
|--------|----------------------|
| MySQL | `MYSQL` |
| Amazon Aurora (MySQL) | `AURORA_MYSQL` |
| PostgreSQL | `POSTGRES` |
| Amazon Aurora (PostgreSQL) | `AURORA_POSTGRESQL` |
| Oracle | `ORACLE` |
| Microsoft SQL Server | `SQLSERVER` |
| MariaDB | `MARIADB` |
| SAP ASE (Sybase) | `SAP_ASE` |
| IBM Db2 LUW | `IBM_DB2` |
| IBM Db2 for z/OS | `IBM_DB2_ZOS` |
| MongoDB | `MONGODB` |
| Amazon DocumentDB | `DOCDB` |
| Amazon S3 | `S3` |

## Supported target engines

All source engines above, plus:

| Engine | `EndpointEngine` value |
|--------|----------------------|
| Amazon S3 | `S3` |
| Amazon DynamoDB | `DYNAMODB` |
| Amazon Redshift | `REDSHIFT` |
| Amazon Kinesis Data Streams | `KINESIS` |
| Apache Kafka / Amazon MSK | `KAFKA` |
| Amazon OpenSearch Service | `OPENSEARCH` |
| Amazon Neptune | `NEPTUNE` |
| Amazon ElastiCache for Redis | `REDIS` |

---

## Security considerations

- The replication instance is placed in **private subnets** by default. Set `publiclyAccessible: true` only if required.
- Storage is encrypted at rest using a **KMS customer-managed key** (auto-created if you don't provide one).
- **Do not use the `password` prop in production.** The resolved value is written as plaintext into the CloudFormation template and state file. Use Secrets Manager instead: set `secretsManagerSecretId` and `secretsManagerAccessRoleArn` in the engine-specific settings and omit `password` entirely.
- Grant DMS only the minimum IAM permissions required for each target engine.
- For CDC with PostgreSQL, the replication user needs the `rds_replication` role (RDS) or `REPLICATION` privilege (self-managed).
- For CDC with Oracle, supplemental logging must be enabled on the source database.
- **`dms-vpc-role` and `dms-cloudwatch-logs-role`** are account-level IAM roles required by DMS. When `createDmsServiceRoles` is `true` (the default), they are created idempotently via a custom resource — if they already exist in the account (created by another stack or manually), the existing roles are silently reused and their trust policies corrected if necessary. The roles are created with `RemovalPolicy.RETAIN` and are **not** lifecycle-managed by the deploying stack; they will not be deleted when the stack is destroyed. If you require the roles to be lifecycle-managed, create them in a dedicated stack and set `createDmsServiceRoles: false`.

---

## Contributing

Bug reports and pull requests are welcome. Please open an issue at [github.com/kckempf/cdk-dms-replication/issues](https://github.com/kckempf/cdk-dms-replication/issues) before starting significant work.

---

## Author

[Kevin Kempf](https://github.com/kckempf)

---

## License

Apache-2.0 — see [LICENSE](https://github.com/kckempf/cdk-dms-replication/blob/main/LICENSE)

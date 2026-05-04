/**
 * The type of database migration to perform.
 */
export enum MigrationType {
  /** Migrate all existing data from source to target (one-time). */
  FULL_LOAD = 'full-load',
  /** Replicate ongoing changes from source to target using CDC. */
  CDC = 'cdc',
  /** Perform a full load first, then replicate ongoing changes. */
  FULL_LOAD_AND_CDC = 'full-load-and-cdc',
}

/**
 * Whether an endpoint is a migration source or target.
 */
export enum EndpointType {
  SOURCE = 'source',
  TARGET = 'target',
}

/**
 * Database engine for a DMS endpoint.
 */
export enum EndpointEngine {
  // Relational sources & targets
  MYSQL = 'mysql',
  AURORA_MYSQL = 'aurora',
  POSTGRES = 'postgres',
  AURORA_POSTGRESQL = 'aurora-postgresql',
  ORACLE = 'oracle',
  SQLSERVER = 'sqlserver',
  MARIADB = 'mariadb',
  SAP_ASE = 'sybase',
  IBM_DB2 = 'db2',
  IBM_DB2_ZOS = 'db2-zos',

  // Document / NoSQL sources & targets
  MONGODB = 'mongodb',
  DOCDB = 'docdb',

  // AWS managed targets
  S3 = 's3',
  DYNAMODB = 'dynamodb',
  REDSHIFT = 'redshift',
  KINESIS = 'kinesis',
  KAFKA = 'kafka',
  OPENSEARCH = 'opensearch',
  NEPTUNE = 'neptune',
  REDIS = 'redis',
}

/**
 * DMS replication instance class.
 * @see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.Types.html
 */
export enum ReplicationInstanceClass {
  // T3 — burstable general purpose (up to t3.large for DMS)
  T3_MICRO = 'dms.t3.micro',
  T3_SMALL = 'dms.t3.small',
  T3_MEDIUM = 'dms.t3.medium',
  T3_LARGE = 'dms.t3.large',

  // C5 — compute optimized (previous generation)
  C5_LARGE = 'dms.c5.large',
  C5_XLARGE = 'dms.c5.xlarge',
  C5_2XLARGE = 'dms.c5.2xlarge',
  C5_4XLARGE = 'dms.c5.4xlarge',
  C5_9XLARGE = 'dms.c5.9xlarge',
  C5_12XLARGE = 'dms.c5.12xlarge',
  C5_18XLARGE = 'dms.c5.18xlarge',
  C5_24XLARGE = 'dms.c5.24xlarge',

  // C6i — compute optimized (current generation)
  C6I_LARGE = 'dms.c6i.large',
  C6I_XLARGE = 'dms.c6i.xlarge',
  C6I_2XLARGE = 'dms.c6i.2xlarge',
  C6I_4XLARGE = 'dms.c6i.4xlarge',
  C6I_8XLARGE = 'dms.c6i.8xlarge',
  C6I_12XLARGE = 'dms.c6i.12xlarge',
  C6I_16XLARGE = 'dms.c6i.16xlarge',
  C6I_24XLARGE = 'dms.c6i.24xlarge',
  C6I_32XLARGE = 'dms.c6i.32xlarge',

  // C7i — compute optimized (latest generation)
  C7I_LARGE = 'dms.c7i.large',
  C7I_XLARGE = 'dms.c7i.xlarge',
  X7I_2XLARGE = 'dms.x7i.2xlarge',
  X7I_4XLARGE = 'dms.x7i.4xlarge',
  X7I_8XLARGE = 'dms.x7i.8xlarge',
  X7I_12XLARGE = 'dms.x7i.12xlarge',
  X7I_16XLARGE = 'dms.x7i.16xlarge',
  X7I_24XLARGE = 'dms.x7i.24xlarge',
  X7I_48XLARGE = 'dms.x7i.48xlarge',

  // R5 — memory optimized (previous generation)
  R5_LARGE = 'dms.r5.large',
  R5_XLARGE = 'dms.r5.xlarge',
  R5_2XLARGE = 'dms.r5.2xlarge',
  R5_4XLARGE = 'dms.r5.4xlarge',
  R5_8XLARGE = 'dms.r5.8xlarge',
  R5_12XLARGE = 'dms.r5.12xlarge',
  R5_16XLARGE = 'dms.r5.16xlarge',
  R5_24XLARGE = 'dms.r5.24xlarge',

  // R6i — memory optimized (current generation)
  R6I_LARGE = 'dms.r6i.large',
  R6I_XLARGE = 'dms.r6i.xlarge',
  R6I_2XLARGE = 'dms.r6i.2xlarge',
  R6I_4XLARGE = 'dms.r6i.4xlarge',
  R6I_8XLARGE = 'dms.r6i.8xlarge',
  R6I_12XLARGE = 'dms.r6i.12xlarge',
  R6I_16XLARGE = 'dms.r6i.16xlarge',
  R6I_24XLARGE = 'dms.r6i.24xlarge',
  R6I_32XLARGE = 'dms.r6i.32xlarge',

  // R7i — memory optimized (latest generation)
  R7I_LARGE = 'dms.r7i.large',
  R7I_XLARGE = 'dms.r7i.xlarge',
  R7I_2XLARGE = 'dms.r7i.2xlarge',
  R7I_4XLARGE = 'dms.r7i.4xlarge',
  R7I_8XLARGE = 'dms.r7i.8xlarge',
  R7I_12XLARGE = 'dms.r7i.12xlarge',
  R7I_16XLARGE = 'dms.r7i.16xlarge',
  R7I_24XLARGE = 'dms.r7i.24xlarge',
  R7I_48XLARGE = 'dms.r7i.48xlarge',
}

/**
 * Encryption mode used when writing data to an S3 bucket or Redshift cluster.
 */
export enum EncryptionMode {
  /** Server-side encryption using S3-managed keys (SSE-S3). */
  SSE_S3 = 'SSE_S3',
  /** Server-side encryption using AWS KMS-managed keys (SSE-KMS). */
  SSE_KMS = 'SSE_KMS',
}

/**
 * Data format for S3 endpoint output.
 */
export enum S3DataFormat {
  CSV = 'csv',
  PARQUET = 'parquet',
}

/**
 * Parquet version for S3 endpoint output.
 */
export enum ParquetVersion {
  PARQUET_1_0 = 'parquet-1-0',
  PARQUET_2_0 = 'parquet-2-0',
}

/**
 * Encoding type for S3 parquet output.
 */
export enum EncodingType {
  PLAIN = 'plain',
  PLAIN_DICTIONARY = 'plain-dictionary',
  RLE_DICTIONARY = 'rle-dictionary',
}

/**
 * Message format emitted to Kinesis or Kafka.
 */
export enum MessageFormat {
  JSON = 'json',
  JSON_UNFORMATTED = 'json-unformatted',
}

/**
 * Security protocol for Kafka endpoints.
 */
export enum KafkaSecurityProtocol {
  PLAINTEXT = 'plaintext',
  SSL = 'ssl',
  SASL_SSL = 'sasl-ssl',
  SSL_AUTHENTICATION = 'ssl-authentication',
}

/**
 * SASL mechanism for Kafka SASL_SSL connections.
 */
export enum KafkaSaslMechanism {
  SCRAM_SHA_512 = 'scram-sha-512',
  PLAIN = 'plain',
}

/**
 * Oracle LogMiner CDC plugin.
 */
export enum OracleCdcPlugin {
  LOGMINER = 'LogMiner',
  BINARY_READER = 'BinaryReader',
}

/**
 * PostgreSQL CDC plugin.
 */
export enum PostgresCdcPlugin {
  PG_LOGICAL = 'pglogical',
  TEST_DECODING = 'test-decoding',
}

/**
 * MongoDB authentication mechanism.
 */
export enum MongoAuthMechanism {
  DEFAULT = 'default',
  MONGODB_CR = 'mongodb-cr',
  SCRAM_SHA_1 = 'scram-sha-1',
}

/**
 * MongoDB authentication type.
 */
export enum MongoAuthType {
  NO = 'no',
  PASSWORD = 'password',
}

/**
 * MongoDB document nesting level.
 */
export enum MongoNestingLevel {
  NONE = 'none',
  ONE = 'one',
}

/**
 * Date partition delimiter for S3 date-partitioned output.
 */
export enum DatePartitionDelimiter {
  SLASH = 'SLASH',
  UNDERSCORE = 'UNDERSCORE',
  DASH = 'DASH',
  NONE = 'NONE',
}

/**
 * Date partition sequence for S3 date-partitioned output.
 */
export enum DatePartitionSequence {
  YYYYMMDD = 'YYYYMMDD',
  YYYYMMDDHH = 'YYYYMMDDHH',
  YYYYMM = 'YYYYMM',
  MMYYYYDD = 'MMYYYYDD',
  DDMMYYYY = 'DDMMYYYY',
}

/**
 * Redshift safeguard policy for SQL Server CDC.
 */
export enum SqlServerSafeguardPolicy {
  RELY_ON_SQL_SERVER_REPLICATION_AGENT = 'rely-on-sql-server-replication-agent',
  EXCLUSIVE_AUTOMATIC_TRUNCATION = 'exclusive-automatic-truncation',
  SHARED_AUTOMATIC_TRUNCATION = 'shared-automatic-truncation',
}

/**
 * Target DB type for MySQL target endpoints.
 */
export enum MySqlTargetDbType {
  SPECIFIC_DATABASE = 'specific-database',
  MULTIPLE_DATABASES = 'multiple-databases',
}

/**
 * Oracle number datatype scale option.
 */
export enum OracleNumberDatatypeScale {
  /** Use -1 to preserve the original Oracle precision. */
  FLOAT = -1,
  /** Use -2 to map NUMBER to DOUBLE. */
  DOUBLE = -2,
}

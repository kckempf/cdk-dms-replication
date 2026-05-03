import * as cdk from 'aws-cdk-lib';
import {
  DatePartitionDelimiter,
  DatePartitionSequence,
  EncodingType,
  EncryptionMode,
  KafkaSaslMechanism,
  KafkaSecurityProtocol,
  MessageFormat,
  MongoAuthMechanism,
  MongoAuthType,
  MongoNestingLevel,
  MySqlTargetDbType,
  OracleCdcPlugin,
  ParquetVersion,
  PostgresCdcPlugin,
  S3DataFormat,
  SqlServerSafeguardPolicy,
} from './enums';

// ---------------------------------------------------------------------------
// MySQL / MariaDB
// ---------------------------------------------------------------------------

/** Settings for MySQL and MariaDB endpoints. */
export interface MySqlSettings {
  /** SQL to run after connecting to the endpoint. */
  readonly afterConnectScript?: string;
  /** Remove metadata from source that differs from target during full load. */
  readonly cleanSourceMetadataOnMismatch?: boolean;
  /** Interval in seconds between polls for source events during CDC. */
  readonly eventsPollInterval?: number;
  /** Maximum file size (in KB) for CSV files created during full load. */
  readonly maxFileSize?: number;
  /** Number of parallel threads to use for a full load. */
  readonly parallelLoadThreads?: number;
  /** ARN of the IAM role that provides access to the Secrets Manager secret. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the secret in AWS Secrets Manager containing the endpoint connection details. */
  readonly secretsManagerSecretId?: string;
  /** Specifies the time zone for source MySQL. */
  readonly serverTimezone?: string;
  /** For a MySQL target, specifies how tables are created. */
  readonly targetDbType?: MySqlTargetDbType;
}

// ---------------------------------------------------------------------------
// PostgreSQL / Aurora PostgreSQL
// ---------------------------------------------------------------------------

/** Settings for PostgreSQL and Aurora PostgreSQL endpoints. */
export interface PostgreSqlSettings {
  /** SQL to run after connecting. */
  readonly afterConnectScript?: string;
  /** Whether DMS captures DDL events and creates a replication slot. */
  readonly captureDdls?: boolean;
  /** Schema in which the operational DDL database artifacts are created. */
  readonly ddlArtifactsSchema?: string;
  /** Sets the client statement timeout for the PostgreSQL instance. */
  readonly executeTimeout?: number;
  /** Whether DMS fails tasks that attempt to truncate a LOB. */
  readonly failTasksOnLobTruncation?: boolean;
  /** Whether DMS enables heartbeat signals. */
  readonly heartbeatEnable?: boolean;
  /** The number of seconds between heartbeat signal calls. */
  readonly heartbeatFrequency?: number;
  /** Schema to store the heartbeat table. */
  readonly heartbeatSchema?: string;
  /** When true, maps boolean as boolean instead of varchar(5). */
  readonly mapBooleanAsBoolean?: boolean;
  /** Maximum file size (in KB) for CSV files created during full load. */
  readonly maxFileSize?: number;
  /** CDC plugin to use. */
  readonly pluginName?: PostgresCdcPlugin;
  /** ARN of the IAM role that provides access to Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
  /** Name of the logical replication slot created for CDC. */
  readonly slotName?: string;
  /** Enables DMS to migrate data that has the TIMESTAMP WITH TIME ZONE data type. */
  readonly convertTimestampWithZoneToUtc?: boolean;
  /** Maps STRING_FORMAT to VARCHAR for Babelfish endpoints. */
  readonly mapUnboundedNumericAsString?: boolean;
}

// ---------------------------------------------------------------------------
// Oracle
// ---------------------------------------------------------------------------

/** Settings for Oracle endpoints. */
export interface OracleSettings {
  /** Set to true to access the supplemental log directly. */
  readonly accessAlternateDirectly?: boolean;
  /** Whether DMS adds supplemental logging. */
  readonly addSupplementalLogging?: boolean;
  /** Additional archived redo log destination ID. */
  readonly additionalArchivedLogDestId?: number;
  /** Allows DMS to access SELECT on nested tables. */
  readonly allowSelectNestedTables?: boolean;
  /** Destination ID of the archived redo log. */
  readonly archivedLogDestId?: number;
  /** Reads changes only from archived redo logs (no online redo). */
  readonly archivedLogsOnly?: boolean;
  /** ASM password. */
  readonly asmPassword?: cdk.SecretValue;
  /** ASM server address. */
  readonly asmServer?: string;
  /** ASM user name. */
  readonly asmUser?: string;
  /** CDC plugin to use: LogMiner or BinaryReader. */
  readonly cdcPlugin?: OracleCdcPlugin;
  /** Semantics for char length: BYTE or CHAR. */
  readonly charLengthSemantics?: string;
  /** Convert TIMESTAMP WITH TIME ZONE to UTC. */
  readonly convertTimestampWithZoneToUtc?: boolean;
  /** Whether DMS uses direct path full load. */
  readonly directPathNoLog?: boolean;
  /** Whether to load in parallel using direct path. */
  readonly directPathParallelLoad?: boolean;
  /** Specifies whether Oracle homogeneous tablespace migration is enabled. */
  readonly enableHomogenousTablespace?: boolean;
  /** Extra archived log destination IDs (up to 10). */
  readonly extraArchivedLogDestIds?: number[];
  /** Whether tasks fail if a LOB column is truncated. */
  readonly failTasksOnLobTruncation?: boolean;
  /** Precision to use when converting Oracle NUMBER to Amazon Redshift NUMERIC. */
  readonly numberDatatypeScale?: number;
  /** Path prefix used for the location of the online redo log. */
  readonly oraclePathPrefix?: string;
  /** Number of threads for parallel ASM reading. */
  readonly parallelAsmReadThreads?: number;
  /** Number of read-ahead blocks. */
  readonly readAheadBlocks?: number;
  /** Read the tablespace name from the online redo log. */
  readonly readTableSpaceName?: boolean;
  /** Retry interval in seconds when no archivelog is found. */
  readonly retryInterval?: number;
  /** ARN of IAM role for accessing Secrets Manager (main secret). */
  readonly secretsManagerAccessRoleArn?: string;
  /** ARN of IAM role for accessing the ASM Secrets Manager secret. */
  readonly secretsManagerOracleAsmAccessRoleArn?: string;
  /** Full ARN of the ASM secret in Secrets Manager. */
  readonly secretsManagerOracleAsmSecretId?: string;
  /** Full ARN of the main Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
  /** Name of the transparent data encryption (TDE) wallet. */
  readonly securityDbEncryptionName?: string;
  /** Use an alternate folder for online redo logs. */
  readonly useAlternateFolderForOnline?: boolean;
  /** Use B-file for large object replication. */
  readonly useBFile?: boolean;
  /** Use direct path full load. */
  readonly useDirectPathFullLoad?: boolean;
  /** Use LogMiner for CDC. */
  readonly useLogminerReader?: boolean;
  /** Use a path prefix for the location of the online redo log. */
  readonly usePathPrefix?: string;
}

// ---------------------------------------------------------------------------
// SQL Server
// ---------------------------------------------------------------------------

/** Settings for Microsoft SQL Server endpoints. */
export interface SqlServerSettings {
  /** Maximum number of bytes per BCP packet. */
  readonly bcpPacketSize?: number;
  /** Filegroup in SQL Server for control tables. */
  readonly controlTablesFileGroup?: string;
  /** Database name on the SQL Server endpoint. */
  readonly databaseName?: string;
  /** Whether to query a single AlwaysOn node. */
  readonly querySingleAlwaysOnNode?: boolean;
  /** Whether to use backup files for CDC. */
  readonly readBackupOnly?: boolean;
  /** Safeguard policy for SQL Server CDC. */
  readonly safeguardPolicy?: SqlServerSafeguardPolicy;
  /** ARN of IAM role for Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
  /** Use BCP full load. */
  readonly useBcpFullLoad?: boolean;
  /** Use third-party backup device. */
  readonly useThirdPartyBackupDevice?: boolean;
  /** Trim spaces from varchar/nvarchar columns. */
  readonly trimSpaceInChar?: boolean;
  /** Access mode for transaction log. */
  readonly tlogAccessMode?: string;
}

// ---------------------------------------------------------------------------
// SAP ASE (Sybase)
// ---------------------------------------------------------------------------

/** Settings for SAP Adaptive Server Enterprise (Sybase) endpoints. */
export interface SapAseSettings {
  /** SQL to run after connecting. */
  readonly afterConnectScript?: string;
  /** Whether DMS enables password encryption. */
  readonly enableUnicode?: boolean;
  /** Whether DMS strips the double quotes from the result set. */
  readonly trimAltText?: boolean;
  /** ARN of IAM role for Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
}

// ---------------------------------------------------------------------------
// IBM Db2 LUW
// ---------------------------------------------------------------------------

/** Settings for IBM Db2 LUW endpoints. */
export interface Db2Settings {
  /** The database name on the Db2 endpoint. */
  readonly databaseName?: string;
  /** Maximum number of bytes per read operation. */
  readonly maxKBytesPerRead?: number;
  /** Enables ongoing replication (CDC) for Db2. */
  readonly setDataCaptureChanges?: boolean;
  /** Current LSN as of which DMS should start reading. */
  readonly currentLsn?: string;
  /** ARN of IAM role for Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
}

// ---------------------------------------------------------------------------
// MongoDB / DocumentDB
// ---------------------------------------------------------------------------

/** Settings shared by MongoDB and DocumentDB endpoints. */
export interface MongoDbSettings {
  /** Authentication mechanism for the MongoDB endpoint. */
  readonly authMechanism?: MongoAuthMechanism;
  /** Database that MongoDB uses to authenticate. */
  readonly authSource?: string;
  /** Authentication type. */
  readonly authType?: MongoAuthType;
  /** Number of documents to preview to determine data structure. */
  readonly docsToInvestigate?: number;
  /** Specifies the document ID, which DMS includes as the primary key. */
  readonly extractDocId?: boolean;
  /** Nesting level for MongoDB documents. */
  readonly nestingLevel?: MongoNestingLevel;
  /** ARN of IAM role for Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
}

// ---------------------------------------------------------------------------
// Amazon S3
// ---------------------------------------------------------------------------

/** Settings for Amazon S3 endpoints (source or target). */
export interface S3Settings {
  /** S3 bucket name. */
  readonly bucketName: string;
  /** Folder path prefix within the bucket. */
  readonly bucketFolder?: string;
  /** IAM role ARN that DMS uses to access the S3 bucket. */
  readonly serviceAccessRoleArn: string;
  /** Whether DMS adds a column name field to CSV output. */
  readonly addColumnName?: boolean;
  /** Whether DMS adds trailing padding characters to data. */
  readonly addTrailingPaddingCharacter?: boolean;
  /** Include CDC inserts and updates in the target. */
  readonly cdcInsertsAndUpdates?: boolean;
  /** Include only inserts (not updates or deletes) in the target. */
  readonly cdcInsertsOnly?: boolean;
  /** Maximum interval in seconds between CDC mini-batches (1-360). */
  readonly cdcMaxBatchInterval?: number;
  /** Minimum file size (in KB) to trigger a CDC file write. */
  readonly cdcMinFileSize?: number;
  /** CDC path in the source S3 bucket. */
  readonly cdcPath?: string;
  /** Column delimiter character for CSV output. Default: comma. */
  readonly csvDelimiter?: string;
  /** String used for null values when no-sup-value applies. */
  readonly csvNoSupValue?: string;
  /** String used for null values in CSV output. */
  readonly csvNullValue?: string;
  /** Row delimiter for CSV output. Default: newline. */
  readonly csvRowDelimiter?: string;
  /** Output data format: CSV or Parquet. */
  readonly dataFormat?: S3DataFormat;
  /** Date partition delimiter. */
  readonly datePartitionDelimiter?: DatePartitionDelimiter;
  /** Whether to partition output files by date. */
  readonly datePartitionEnabled?: boolean;
  /** Date partition sequence. */
  readonly datePartitionSequence?: DatePartitionSequence;
  /** Dictionary page size (in bytes) for Parquet. */
  readonly dictPageSizeLimit?: number;
  /** Whether to enable statistics for Parquet row groups. */
  readonly enableStatistics?: boolean;
  /** Encoding type for Parquet. */
  readonly encodingType?: EncodingType;
  /** Encryption mode for data at rest in S3. */
  readonly encryptionMode?: EncryptionMode;
  /** JSON structure defining external tables (for S3 source). */
  readonly externalTableDefinition?: string;
  /** Whether DMS generates Glue Data Catalog metadata. */
  readonly glueCatalogGeneration?: boolean;
  /** Number of header rows to ignore in the S3 source. */
  readonly ignoreHeaderRows?: number;
  /** Whether to include the operation column for full-load rows. */
  readonly includeOpForFullLoad?: boolean;
  /** Maximum file size (in KB) for data files. */
  readonly maxFileSize?: number;
  /** Whether timestamps in Parquet use milliseconds instead of microseconds. */
  readonly parquetTimestampInMillisecond?: boolean;
  /** Parquet format version. */
  readonly parquetVersion?: ParquetVersion;
  /** Whether DMS preserves transaction boundaries (for CDC). */
  readonly preserveTransactions?: boolean;
  /** Whether to use RFC 4180 compliant CSV format. */
  readonly rfc4180?: boolean;
  /** Number of rows per Parquet row group. */
  readonly rowGroupLength?: number;
  /** KMS key ARN for SSE-KMS encryption. */
  readonly serverSideEncryptionKmsKeyId?: string;
  /** Column name for operation timestamps. */
  readonly timestampColumnName?: string;
  /** Whether to use CSV no-sup-value. */
  readonly useCsvNoSupValue?: boolean;
  /** Whether to use the task start time instead of transaction start time for full load. */
  readonly useTaskStartTimeForFullLoadTimestamp?: boolean;
}

// ---------------------------------------------------------------------------
// Amazon DynamoDB
// ---------------------------------------------------------------------------

/** Settings for Amazon DynamoDB target endpoints. */
export interface DynamoDbSettings {
  /** ARN of the IAM role that provides DMS access to DynamoDB. */
  readonly serviceAccessRoleArn: string;
}

// ---------------------------------------------------------------------------
// Amazon Redshift
// ---------------------------------------------------------------------------

/** Settings for Amazon Redshift target endpoints. */
export interface RedshiftSettings {
  /** Whether to accept dates in a specific format. */
  readonly acceptAnyDate?: boolean;
  /** SQL to run after connecting. */
  readonly afterConnectScript?: string;
  /** S3 intermediate bucket folder path. */
  readonly bucketFolder?: string;
  /** S3 bucket name used for the intermediate storage. */
  readonly bucketName?: string;
  /** Whether to enable case-sensitive column names. */
  readonly caseSensitiveNames?: boolean;
  /** Whether to enable automatic compression. */
  readonly compUpdate?: boolean;
  /** Timeout in seconds for database connections. */
  readonly connectionTimeout?: number;
  /** The name of the Amazon Redshift data warehouse. */
  readonly databaseName?: string;
  /** Date format for the DATEFORMAT option. */
  readonly dateFormat?: string;
  /** Whether to load empty strings as NULL. */
  readonly emptyAsNull?: boolean;
  /** Encryption mode for data at rest. */
  readonly encryptionMode?: EncryptionMode;
  /** Whether to allow explicit ID values in the COPY command. */
  readonly explicitIds?: boolean;
  /** Number of upload streams for parallel loading. */
  readonly fileTransferUploadStreams?: number;
  /** Timeout (in seconds) for loading data. */
  readonly loadTimeout?: number;
  /** Maximum file size (in KB) for each intermediate file. */
  readonly maxFileSize?: number;
  /** Whether to remove quoted data. */
  readonly removeQuotes?: boolean;
  /** Character to use to replace invalid UTF-8 characters. */
  readonly replaceInvalidChars?: string;
  /** Character to replace a specific character with. */
  readonly replaceChars?: string;
  /** ARN of IAM role for accessing Secrets Manager. */
  readonly secretsManagerAccessRoleArn?: string;
  /** Full ARN or name of the Secrets Manager secret. */
  readonly secretsManagerSecretId?: string;
  /** KMS key ARN for SSE-KMS. */
  readonly serverSideEncryptionKmsKeyId?: string;
  /** ARN of the IAM role that provides DMS access to the S3 staging bucket. */
  readonly serviceAccessRoleArn?: string;
  /** Date format for the TIMEFORMAT option. */
  readonly timeFormat?: string;
  /** Whether to remove trailing blanks from VARCHAR columns. */
  readonly trimBlanks?: boolean;
  /** Whether to truncate VARCHAR columns to the maximum length. */
  readonly truncateColumns?: boolean;
  /** Size of the write buffer (in KB). */
  readonly writeBufferSize?: number;
}

// ---------------------------------------------------------------------------
// Amazon Kinesis Data Streams
// ---------------------------------------------------------------------------

/** Settings for Amazon Kinesis Data Streams target endpoints. */
export interface KinesisSettings {
  /** ARN of the Kinesis stream. */
  readonly streamArn: string;
  /** ARN of the IAM role that provides DMS access to Kinesis. */
  readonly serviceAccessRoleArn: string;
  /** Whether to include control details in messages. */
  readonly includeControlDetails?: boolean;
  /** Whether to include null and empty columns in messages. */
  readonly includeNullAndEmpty?: boolean;
  /** Whether to include the partition value in messages. */
  readonly includePartitionValue?: boolean;
  /** Whether to include table ALTER operations in messages. */
  readonly includeTableAlterOperations?: boolean;
  /** Whether to include transaction details in messages. */
  readonly includeTransactionDetails?: boolean;
  /** Message format. */
  readonly messageFormat?: MessageFormat;
  /** Whether to omit the hex prefix from binary values. */
  readonly noHexPrefix?: boolean;
  /** Whether to include the schema name in the partition key. */
  readonly partitionIncludeSchemaTable?: boolean;
}

// ---------------------------------------------------------------------------
// Apache Kafka
// ---------------------------------------------------------------------------

/** Settings for Apache Kafka (and Amazon MSK) target endpoints. */
export interface KafkaSettings {
  /** Kafka broker(s), e.g. "b-1.msk-cluster.abc123.kafka.us-east-1.amazonaws.com:9092". */
  readonly broker: string;
  /** Topic name to publish to. */
  readonly topic?: string;
  /** Whether to include control details in messages. */
  readonly includeControlDetails?: boolean;
  /** Whether to include null and empty columns in messages. */
  readonly includeNullAndEmpty?: boolean;
  /** Whether to include the partition value in messages. */
  readonly includePartitionValue?: boolean;
  /** Whether to include table ALTER operations. */
  readonly includeTableAlterOperations?: boolean;
  /** Whether to include transaction details. */
  readonly includeTransactionDetails?: boolean;
  /** Message format. */
  readonly messageFormat?: MessageFormat;
  /** Maximum message size in bytes. */
  readonly messageMaxBytes?: number;
  /** Whether to omit the hex prefix from binary values. */
  readonly noHexPrefix?: boolean;
  /** Whether to include the schema name in the partition key. */
  readonly partitionIncludeSchemaTable?: boolean;
  /** Security protocol for the Kafka connection. */
  readonly securityProtocol?: KafkaSecurityProtocol;
  /** SASL mechanism for SASL_SSL connections. */
  readonly saslMechanism?: KafkaSaslMechanism;
  /** SASL username. */
  readonly saslUsername?: string;
  /** SASL password. */
  readonly saslPassword?: cdk.SecretValue;
  /** ARN of the Secrets Manager secret holding the CA certificate. */
  readonly sslCaCertificateArn?: string;
  /** ARN of the Secrets Manager secret holding the client certificate. */
  readonly sslClientCertificateArn?: string;
  /** ARN of the Secrets Manager secret holding the client key. */
  readonly sslClientKeyArn?: string;
  /** Password for the client key. */
  readonly sslClientKeyPassword?: cdk.SecretValue;
}

// ---------------------------------------------------------------------------
// Amazon OpenSearch Service
// ---------------------------------------------------------------------------

/** Settings for Amazon OpenSearch Service target endpoints. */
export interface OpenSearchSettings {
  /** Endpoint URL of the OpenSearch cluster (e.g. https://my-domain.us-east-1.es.amazonaws.com). */
  readonly endpointUri: string;
  /** ARN of the IAM role that provides DMS access to OpenSearch. */
  readonly serviceAccessRoleArn: string;
  /** Number of seconds to retry on errors before failing. */
  readonly errorRetryDuration?: number;
  /** Maximum percentage of records that may fail before the task is stopped. */
  readonly fullLoadErrorPercentage?: number;
  /** Enables DMS to migrate data from shard 0 on. */
  readonly useNewMappingType?: boolean;
}

// ---------------------------------------------------------------------------
// Amazon Neptune
// ---------------------------------------------------------------------------

/** Settings for Amazon Neptune target endpoints. */
export interface NeptuneSettings {
  /** S3 bucket where DMS stages the migration data. */
  readonly s3BucketName: string;
  /** Folder within the S3 bucket for Neptune staging data. */
  readonly s3BucketFolder: string;
  /** ARN of the IAM role that provides DMS access to S3 and Neptune. */
  readonly serviceAccessRoleArn: string;
  /** Number of seconds to retry on errors before failing the task. */
  readonly errorRetryDuration?: number;
  /** Whether IAM auth is enabled on the Neptune cluster. */
  readonly iamAuthEnabled?: boolean;
  /** Maximum number of files per request to the Neptune bulk-load API. */
  readonly maxFileSize?: number;
  /** Maximum number of retries on endpoint exceptions. */
  readonly maxRetryCount?: number;
}

// ---------------------------------------------------------------------------
// Amazon ElastiCache for Redis
// ---------------------------------------------------------------------------

/** Settings for Amazon ElastiCache for Redis target endpoints. */
export interface RedisSettings {
  /** Redis server name or cluster endpoint. */
  readonly serverName: string;
  /** Redis port. Default: 6379. */
  readonly port?: number;
  /** SSL security protocol. */
  readonly sslSecurityProtocol?: string;
  /** Authentication type: none, auth-token, or auth-role. */
  readonly authType?: string;
  /** IAM role ARN for auth-role authentication. */
  readonly authUserName?: string;
  /** Auth token for auth-token authentication. */
  readonly authPassword?: cdk.SecretValue;
  /** ARN of the SSL CA certificate stored in Secrets Manager. */
  readonly sslCaCertificateArn?: string;
}

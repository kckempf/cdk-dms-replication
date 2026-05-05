import * as cdk from 'aws-cdk-lib';
import * as dms from 'aws-cdk-lib/aws-dms';
import { Construct } from 'constructs';
import {
  Db2Settings,
  DynamoDbSettings,
  KafkaSettings,
  KinesisSettings,
  MongoDbSettings,
  MySqlSettings,
  NeptuneSettings,
  OpenSearchSettings,
  OracleSettings,
  PostgreSqlSettings,
  RedisSettings,
  RedshiftSettings,
  S3Settings,
  SapAseSettings,
  SqlServerSettings,
} from './endpoint-settings';
import { EndpointEngine, EndpointType } from './enums';

/**
 * Minimal contract for a DMS endpoint that can be used as a source or target
 * in a {@link DmsReplicationTask} or {@link DmsMigrationPipeline}.
 *
 * Use this interface when referencing an endpoint created outside of this
 * construct (e.g. by ARN). For endpoints created by this library, use the
 * concrete {@link DmsEndpoint} class directly — it exposes `cfnEndpoint`
 * for L1 escape-hatch access.
 */
export interface IDmsEndpoint {
  /** ARN of the DMS endpoint. */
  readonly endpointArn: string;
}

/** Props for {@link DmsEndpoint}. */
export interface DmsEndpointProps {
  /** Whether this is a source or target endpoint. */
  readonly endpointType: EndpointType;

  /** Database engine for this endpoint. */
  readonly engine: EndpointEngine;

  /**
   * Logical identifier of the endpoint (used as the DMS endpoint identifier).
   * Auto-generated from the construct ID if not provided.
   */
  readonly endpointIdentifier?: string;

  // -------------------------------------------------------------------------
  // Common connection settings (used for most engine types)
  // -------------------------------------------------------------------------

  /** Database server hostname or IP address. */
  readonly serverName?: string;

  /** Database port. */
  readonly port?: number;

  /** Database user name. Used when not using Secrets Manager. */
  readonly username?: string;

  /**
   * Database password.
   *
   * @warning The resolved value is stored as **plaintext** in the CloudFormation
   * template and state file. For production workloads, use Secrets Manager
   * instead: set `secretsManagerSecretId` and `secretsManagerAccessRoleArn`
   * in the engine-specific settings (e.g. `mySqlSettings`, `postgreSqlSettings`)
   * and omit this property entirely.
   */
  readonly password?: cdk.SecretValue;

  /** Database name on the endpoint. */
  readonly databaseName?: string;

  /**
   * Extra connection attributes as a semicolon-separated string.
   * Refer to the DMS documentation for engine-specific attributes.
   */
  readonly extraConnectionAttributes?: string;

  /**
   * ARN of the SSL certificate authority certificate.
   * Required when sslMode is 'verify-ca' or 'verify-full'.
   */
  readonly certificateArn?: string;

  /**
   * SSL mode for the connection.
   * @default "none"
   */
  readonly sslMode?: string;

  // -------------------------------------------------------------------------
  // Engine-specific settings (set only the one matching `engine`)
  // -------------------------------------------------------------------------

  /** Settings for MySQL or MariaDB endpoints. */
  readonly mySqlSettings?: MySqlSettings;

  /** Settings for PostgreSQL or Aurora PostgreSQL endpoints. */
  readonly postgreSqlSettings?: PostgreSqlSettings;

  /** Settings for Oracle endpoints. */
  readonly oracleSettings?: OracleSettings;

  /** Settings for Microsoft SQL Server endpoints. */
  readonly sqlServerSettings?: SqlServerSettings;

  /** Settings for SAP ASE (Sybase) endpoints. */
  readonly sapAseSettings?: SapAseSettings;

  /** Settings for IBM Db2 LUW endpoints. */
  readonly db2Settings?: Db2Settings;

  /** Settings for MongoDB or Amazon DocumentDB endpoints. */
  readonly mongoDbSettings?: MongoDbSettings;

  /** Settings for Amazon S3 endpoints. */
  readonly s3Settings?: S3Settings;

  /** Settings for Amazon DynamoDB target endpoints. */
  readonly dynamoDbSettings?: DynamoDbSettings;

  /** Settings for Amazon Redshift target endpoints. */
  readonly redshiftSettings?: RedshiftSettings;

  /** Settings for Amazon Kinesis Data Streams target endpoints. */
  readonly kinesisSettings?: KinesisSettings;

  /** Settings for Apache Kafka (and Amazon MSK) target endpoints. */
  readonly kafkaSettings?: KafkaSettings;

  /** Settings for Amazon OpenSearch Service target endpoints. */
  readonly openSearchSettings?: OpenSearchSettings;

  /** Settings for Amazon Neptune target endpoints. */
  readonly neptuneSettings?: NeptuneSettings;

  /** Settings for Amazon ElastiCache for Redis target endpoints. */
  readonly redisSettings?: RedisSettings;

  /**
   * Removal policy for the endpoint resource.
   * @default cdk.RemovalPolicy.DESTROY
   */
  readonly removalPolicy?: cdk.RemovalPolicy;
}

/**
 * A DMS endpoint construct supporting every engine that DMS supports.
 *
 * Set `engine` to the desired {@link EndpointEngine} and supply the
 * matching `*Settings` property. All other `*Settings` properties are
 * ignored at runtime.
 *
 * @example
 * // MySQL source
 * new DmsEndpoint(this, 'Source', {
 *   endpointType: EndpointType.SOURCE,
 *   engine: EndpointEngine.MYSQL,
 *   serverName: 'mysql.example.com',
 *   port: 3306,
 *   username: 'dms_user',
 *   password: cdk.SecretValue.ssmSecure('/dms/mysql/password'),
 *   databaseName: 'mydb',
 * });
 */
export class DmsEndpoint extends Construct implements IDmsEndpoint {
  // ---------------------------------------------------------------------------
  // Static validation data — declared first to satisfy member-ordering rules
  // ---------------------------------------------------------------------------

  private static readonly TARGET_ONLY_ENGINES: EndpointEngine[] = [
    EndpointEngine.DYNAMODB,
    EndpointEngine.KINESIS,
    EndpointEngine.KAFKA,
    EndpointEngine.OPENSEARCH,
    EndpointEngine.NEPTUNE,
    EndpointEngine.REDIS,
  ];

  private static readonly SOURCE_ONLY_ENGINES: EndpointEngine[] = [
    EndpointEngine.IBM_DB2_ZOS,
  ];

  private static validateEngineEndpointType(
    engine: EndpointEngine,
    endpointType: EndpointType,
  ): void {
    if (
      endpointType === EndpointType.SOURCE &&
      DmsEndpoint.TARGET_ONLY_ENGINES.includes(engine)
    ) {
      throw new Error(
        `Engine '${engine}' is only supported as a TARGET endpoint, not as a SOURCE.`,
      );
    }
    if (
      endpointType === EndpointType.TARGET &&
      DmsEndpoint.SOURCE_ONLY_ENGINES.includes(engine)
    ) {
      throw new Error(
        `Engine '${engine}' is only supported as a SOURCE endpoint, not as a TARGET.`,
      );
    }
  }

  // ---------------------------------------------------------------------------
  // Instance fields
  // ---------------------------------------------------------------------------

  /** The underlying CloudFormation endpoint resource. */
  readonly cfnEndpoint: dms.CfnEndpoint;

  /** ARN of the DMS endpoint. */
  readonly endpointArn: string;

  constructor(scope: Construct, id: string, props: DmsEndpointProps) {
    super(scope, id);

    DmsEndpoint.validateEngineEndpointType(props.engine, props.endpointType);

    const endpointIdentifier =
      props.endpointIdentifier ??
      cdk.Names.uniqueResourceName(this, { maxLength: 63 }).toLowerCase();

    this.cfnEndpoint = new dms.CfnEndpoint(this, 'Resource', {
      endpointType: props.endpointType,
      engineName: props.engine,
      endpointIdentifier,
      serverName: props.serverName,
      port: props.port,
      username: props.username,
      password: props.password?.unsafeUnwrap(),
      databaseName: props.databaseName,
      extraConnectionAttributes: props.extraConnectionAttributes,
      certificateArn: props.certificateArn,
      sslMode: props.sslMode ?? 'none',

      // Engine-specific settings — only one should be set per endpoint
      mySqlSettings: this.buildMySqlSettings(props),
      postgreSqlSettings: this.buildPostgreSqlSettings(props),
      oracleSettings: this.buildOracleSettings(props),
      microsoftSqlServerSettings: this.buildSqlServerSettings(props),
      sybaseSettings: this.buildSapAseSettings(props),
      ibmDb2Settings: this.buildDb2Settings(props),
      mongoDbSettings: this.buildMongoDbSettings(props),
      s3Settings: this.buildS3Settings(props),
      dynamoDbSettings: this.buildDynamoDbSettings(props),
      redshiftSettings: this.buildRedshiftSettings(props),
      kinesisSettings: this.buildKinesisSettings(props),
      kafkaSettings: this.buildKafkaSettings(props),
      elasticsearchSettings: this.buildOpenSearchSettings(props),
      neptuneSettings: this.buildNeptuneSettings(props),
      redisSettings: this.buildRedisSettings(props),
      docDbSettings: this.buildDocDbSettings(props),
    });

    this.cfnEndpoint.applyRemovalPolicy(props.removalPolicy ?? cdk.RemovalPolicy.DESTROY);
    this.endpointArn = this.cfnEndpoint.ref;
  }

  // ---------------------------------------------------------------------------
  // Private mapping helpers — translate typed interfaces to CFN property shapes
  // ---------------------------------------------------------------------------

  private buildMySqlSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.MySqlSettingsProperty | undefined {
    const s = props.mySqlSettings;
    if (!s) return undefined;
    return {
      afterConnectScript: s.afterConnectScript,
      cleanSourceMetadataOnMismatch: s.cleanSourceMetadataOnMismatch,
      eventsPollInterval: s.eventsPollInterval,
      maxFileSize: s.maxFileSize,
      parallelLoadThreads: s.parallelLoadThreads,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
      serverTimezone: s.serverTimezone,
      targetDbType: s.targetDbType,
    };
  }

  private buildPostgreSqlSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.PostgreSqlSettingsProperty | undefined {
    const s = props.postgreSqlSettings;
    if (!s) return undefined;
    return {
      afterConnectScript: s.afterConnectScript,
      captureDdls: s.captureDdls,
      ddlArtifactsSchema: s.ddlArtifactsSchema,
      executeTimeout: s.executeTimeout,
      failTasksOnLobTruncation: s.failTasksOnLobTruncation,
      heartbeatEnable: s.heartbeatEnable,
      heartbeatFrequency: s.heartbeatFrequency,
      heartbeatSchema: s.heartbeatSchema,
      mapBooleanAsBoolean: s.mapBooleanAsBoolean,
      maxFileSize: s.maxFileSize,
      pluginName: s.pluginName,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
      slotName: s.slotName,
    };
  }

  private buildOracleSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.OracleSettingsProperty | undefined {
    const s = props.oracleSettings;
    if (!s) return undefined;
    return {
      accessAlternateDirectly: s.accessAlternateDirectly,
      addSupplementalLogging: s.addSupplementalLogging,
      additionalArchivedLogDestId: s.additionalArchivedLogDestId,
      allowSelectNestedTables: s.allowSelectNestedTables,
      archivedLogDestId: s.archivedLogDestId,
      archivedLogsOnly: s.archivedLogsOnly,
      asmPassword: s.asmPassword?.unsafeUnwrap(),
      asmServer: s.asmServer,
      asmUser: s.asmUser,
      charLengthSemantics: s.charLengthSemantics,
      directPathNoLog: s.directPathNoLog,
      directPathParallelLoad: s.directPathParallelLoad,
      enableHomogenousTablespace: s.enableHomogenousTablespace,
      extraArchivedLogDestIds: s.extraArchivedLogDestIds,
      failTasksOnLobTruncation: s.failTasksOnLobTruncation,
      numberDatatypeScale: s.numberDatatypeScale,
      oraclePathPrefix: s.oraclePathPrefix,
      parallelAsmReadThreads: s.parallelAsmReadThreads,
      readAheadBlocks: s.readAheadBlocks,
      readTableSpaceName: s.readTableSpaceName,
      retryInterval: s.retryInterval,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerOracleAsmAccessRoleArn: s.secretsManagerOracleAsmAccessRoleArn,
      secretsManagerOracleAsmSecretId: s.secretsManagerOracleAsmSecretId,
      secretsManagerSecretId: s.secretsManagerSecretId,
      securityDbEncryptionName: s.securityDbEncryptionName,
      useAlternateFolderForOnline: s.useAlternateFolderForOnline,
      useBFile: s.useBFile,
      useDirectPathFullLoad: s.useDirectPathFullLoad,
      useLogminerReader: s.useLogminerReader,
      usePathPrefix: s.usePathPrefix,
    };
  }

  private buildSqlServerSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.MicrosoftSqlServerSettingsProperty | undefined {
    const s = props.sqlServerSettings;
    if (!s) return undefined;
    return {
      bcpPacketSize: s.bcpPacketSize,
      controlTablesFileGroup: s.controlTablesFileGroup,
      querySingleAlwaysOnNode: s.querySingleAlwaysOnNode,
      readBackupOnly: s.readBackupOnly,
      safeguardPolicy: s.safeguardPolicy,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
      useBcpFullLoad: s.useBcpFullLoad,
      useThirdPartyBackupDevice: s.useThirdPartyBackupDevice,
      trimSpaceInChar: s.trimSpaceInChar,
      tlogAccessMode: s.tlogAccessMode,
    };
  }

  private buildSapAseSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.SybaseSettingsProperty | undefined {
    const s = props.sapAseSettings;
    if (!s) return undefined;
    return {
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
    };
  }

  private buildDb2Settings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.IbmDb2SettingsProperty | undefined {
    const s = props.db2Settings;
    if (!s) return undefined;
    return {
      currentLsn: s.currentLsn,
      maxKBytesPerRead: s.maxKBytesPerRead,
      setDataCaptureChanges: s.setDataCaptureChanges,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
    };
  }

  private buildMongoDbSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.MongoDbSettingsProperty | undefined {
    const s = props.mongoDbSettings;
    if (!s) return undefined;
    return {
      authMechanism: s.authMechanism,
      authSource: s.authSource,
      authType: s.authType,
      docsToInvestigate: s.docsToInvestigate?.toString(),
      extractDocId: s.extractDocId?.toString(),
      nestingLevel: s.nestingLevel,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
    };
  }

  private buildDocDbSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.DocDbSettingsProperty | undefined {
    if (props.engine !== EndpointEngine.DOCDB) return undefined;
    const s = props.mongoDbSettings;
    if (!s) return undefined;
    return {
      docsToInvestigate: s.docsToInvestigate,
      extractDocId: s.extractDocId,
      nestingLevel: s.nestingLevel,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
    };
  }

  private buildS3Settings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.S3SettingsProperty | undefined {
    const s = props.s3Settings;
    if (!s) return undefined;
    return {
      bucketName: s.bucketName,
      bucketFolder: s.bucketFolder,
      serviceAccessRoleArn: s.serviceAccessRoleArn,
      addColumnName: s.addColumnName,
      cdcInsertsAndUpdates: s.cdcInsertsAndUpdates,
      cdcInsertsOnly: s.cdcInsertsOnly,
      cdcMaxBatchInterval: s.cdcMaxBatchInterval,
      cdcMinFileSize: s.cdcMinFileSize,
      cdcPath: s.cdcPath,
      csvDelimiter: s.csvDelimiter,
      csvNoSupValue: s.csvNoSupValue,
      csvNullValue: s.csvNullValue,
      csvRowDelimiter: s.csvRowDelimiter,
      dataFormat: s.dataFormat,
      datePartitionDelimiter: s.datePartitionDelimiter,
      datePartitionEnabled: s.datePartitionEnabled,
      datePartitionSequence: s.datePartitionSequence,
      dictPageSizeLimit: s.dictPageSizeLimit,
      enableStatistics: s.enableStatistics,
      encodingType: s.encodingType,
      encryptionMode: s.encryptionMode,
      externalTableDefinition: s.externalTableDefinition,
      ignoreHeaderRows: s.ignoreHeaderRows,
      includeOpForFullLoad: s.includeOpForFullLoad,
      maxFileSize: s.maxFileSize,
      parquetTimestampInMillisecond: s.parquetTimestampInMillisecond,
      parquetVersion: s.parquetVersion,
      preserveTransactions: s.preserveTransactions,
      rfc4180: s.rfc4180,
      rowGroupLength: s.rowGroupLength,
      serverSideEncryptionKmsKeyId: s.serverSideEncryptionKmsKeyId,
      timestampColumnName: s.timestampColumnName,
      useCsvNoSupValue: s.useCsvNoSupValue,
      useTaskStartTimeForFullLoadTimestamp: s.useTaskStartTimeForFullLoadTimestamp,
    };
  }

  private buildDynamoDbSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.DynamoDbSettingsProperty | undefined {
    const s = props.dynamoDbSettings;
    if (!s) return undefined;
    return { serviceAccessRoleArn: s.serviceAccessRoleArn };
  }

  private buildRedshiftSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.RedshiftSettingsProperty | undefined {
    const s = props.redshiftSettings;
    if (!s) return undefined;
    return {
      acceptAnyDate: s.acceptAnyDate,
      afterConnectScript: s.afterConnectScript,
      bucketFolder: s.bucketFolder,
      bucketName: s.bucketName,
      caseSensitiveNames: s.caseSensitiveNames,
      compUpdate: s.compUpdate,
      connectionTimeout: s.connectionTimeout,
      dateFormat: s.dateFormat,
      emptyAsNull: s.emptyAsNull,
      encryptionMode: s.encryptionMode,
      explicitIds: s.explicitIds,
      fileTransferUploadStreams: s.fileTransferUploadStreams,
      loadTimeout: s.loadTimeout,
      maxFileSize: s.maxFileSize,
      removeQuotes: s.removeQuotes,
      replaceInvalidChars: s.replaceInvalidChars,
      replaceChars: s.replaceChars,
      secretsManagerAccessRoleArn: s.secretsManagerAccessRoleArn,
      secretsManagerSecretId: s.secretsManagerSecretId,
      serverSideEncryptionKmsKeyId: s.serverSideEncryptionKmsKeyId,
      serviceAccessRoleArn: s.serviceAccessRoleArn,
      timeFormat: s.timeFormat,
      trimBlanks: s.trimBlanks,
      truncateColumns: s.truncateColumns,
      writeBufferSize: s.writeBufferSize,
    };
  }

  private buildKinesisSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.KinesisSettingsProperty | undefined {
    const s = props.kinesisSettings;
    if (!s) return undefined;
    return {
      streamArn: s.streamArn,
      serviceAccessRoleArn: s.serviceAccessRoleArn,
      includeControlDetails: s.includeControlDetails,
      includeNullAndEmpty: s.includeNullAndEmpty,
      includePartitionValue: s.includePartitionValue,
      includeTableAlterOperations: s.includeTableAlterOperations,
      includeTransactionDetails: s.includeTransactionDetails,
      messageFormat: s.messageFormat,
      noHexPrefix: s.noHexPrefix,
      partitionIncludeSchemaTable: s.partitionIncludeSchemaTable,
    };
  }

  private buildKafkaSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.KafkaSettingsProperty | undefined {
    const s = props.kafkaSettings;
    if (!s) return undefined;
    return {
      broker: s.broker,
      topic: s.topic,
      includeControlDetails: s.includeControlDetails,
      includeNullAndEmpty: s.includeNullAndEmpty,
      includePartitionValue: s.includePartitionValue,
      includeTableAlterOperations: s.includeTableAlterOperations,
      includeTransactionDetails: s.includeTransactionDetails,
      messageFormat: s.messageFormat,
      messageMaxBytes: s.messageMaxBytes,
      noHexPrefix: s.noHexPrefix,
      partitionIncludeSchemaTable: s.partitionIncludeSchemaTable,
      securityProtocol: s.securityProtocol,
      saslUserName: s.saslUsername,
      saslPassword: s.saslPassword?.unsafeUnwrap(),
      sslCaCertificateArn: s.sslCaCertificateArn,
      sslClientCertificateArn: s.sslClientCertificateArn,
      sslClientKeyArn: s.sslClientKeyArn,
      sslClientKeyPassword: s.sslClientKeyPassword?.unsafeUnwrap(),
    };
  }

  private buildOpenSearchSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.ElasticsearchSettingsProperty | undefined {
    const s = props.openSearchSettings;
    if (!s) return undefined;
    return {
      endpointUri: s.endpointUri,
      serviceAccessRoleArn: s.serviceAccessRoleArn,
      errorRetryDuration: s.errorRetryDuration,
      fullLoadErrorPercentage: s.fullLoadErrorPercentage,
    };
  }

  private buildNeptuneSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.NeptuneSettingsProperty | undefined {
    const s = props.neptuneSettings;
    if (!s) return undefined;
    return {
      s3BucketName: s.s3BucketName,
      s3BucketFolder: s.s3BucketFolder,
      serviceAccessRoleArn: s.serviceAccessRoleArn,
      errorRetryDuration: s.errorRetryDuration,
      iamAuthEnabled: s.iamAuthEnabled,
      maxFileSize: s.maxFileSize,
      maxRetryCount: s.maxRetryCount,
    };
  }

  private buildRedisSettings(
    props: DmsEndpointProps,
  ): dms.CfnEndpoint.RedisSettingsProperty | undefined {
    const s = props.redisSettings;
    if (!s) return undefined;
    return {
      serverName: s.serverName,
      port: s.port ?? 6379,
      sslSecurityProtocol: s.sslSecurityProtocol,
      authType: s.authType,
      authUserName: s.authUserName,
      authPassword: s.authPassword?.unsafeUnwrap(),
      sslCaCertificateArn: s.sslCaCertificateArn,
    };
  }

}

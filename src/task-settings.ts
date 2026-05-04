/**
 * Builder for DMS replication task settings.
 *
 * The DMS task settings JSON controls logging, LOB handling, error handling,
 * full-load tuning, and CDC tuning. This builder exposes the most commonly
 * tuned knobs and produces the JSON string expected by a replication task.
 *
 * @see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TaskSettings.html
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** LOB (Large Object) handling mode. */
export enum LobMode {
  /** No LOB support. */
  NONE = 'none',
  /** All LOBs are migrated as inline data (full LOB mode). */
  FULL_LOB = 'full-lob',
  /** LOBs are truncated at a configurable size. */
  LIMITED_LOB = 'limited-lob',
}

/** Logging verbosity for DMS task log components. */
export enum LoggingLevel {
  LOGGER_SEVERITY_DEFAULT = 'LOGGER_SEVERITY_DEFAULT',
  LOGGER_SEVERITY_DEBUG = 'LOGGER_SEVERITY_DEBUG',
  LOGGER_SEVERITY_DETAILED_DEBUG = 'LOGGER_SEVERITY_DETAILED_DEBUG',
  LOGGER_SEVERITY_ERROR = 'LOGGER_SEVERITY_ERROR',
  LOGGER_SEVERITY_WARNING = 'LOGGER_SEVERITY_WARNING',
}

/** Action to take on a recoverable error. */
export enum ErrorAction {
  /** Ignore the error and continue. */
  IGNORE = 'IGNORE',
  /** Ignore the row, continue with the next. */
  IGNORE_RECORD = 'IGNORE_RECORD',
  /** Stop the task. */
  STOP_TASK = 'STOP_TASK',
}

// ---------------------------------------------------------------------------
// Props interfaces
// ---------------------------------------------------------------------------

/** Logging configuration for a single DMS log component. */
export interface LogComponentSettings {
  /** Logging level for this component. */
  readonly loggingLevel?: LoggingLevel;
}

/** Controls how the task handles full-load data. */
export interface FullLoadSettings {
  /**
   * Maximum number of tables to load in parallel.
   * @default 8
   */
  readonly maxFullLoadSubTasks?: number;
  /**
   * Number of rows to load before a commit.
   * @default 10000
   */
  readonly transactionConsistencyTimeout?: number;
  /**
   * Whether to create target tables if they don't exist.
   * @default true
   */
  readonly targetTablePrepMode?: string;
  /**
   * Whether to stop the task after the full load completes (only relevant for
   * full-load tasks without CDC).
   * @default false
   */
  readonly stopTaskCachedChangesApplied?: boolean;
  /** Whether DMS commits the full load in a single transaction. */
  readonly commitRate?: number;
}

/** Controls CDC behaviour. */
export interface CdcSettings {
  /**
   * Offset in seconds from current time to use as the CDC start position.
   * Ignored when `cdcStartPosition` is set on the task.
   */
  readonly enableTestMode?: boolean;
  /**
   * Whether DMS applies changes immediately (false) or batches them (true).
   * @default false
   */
  readonly batchApplyEnabled?: boolean;
  /**
   * Number of seconds DMS waits before applying batched changes.
   * Only relevant when `batchApplyEnabled` is true.
   * @default 1
   */
  readonly batchApplyTimeoutMin?: number;
  /**
   * Maximum number of seconds DMS waits before applying batched changes.
   * @default 30
   */
  readonly batchApplyTimeoutMax?: number;
  /** Memory limit (in MB) for the apply task. @default 500 */
  readonly batchApplyMemoryLimit?: number;
  /** Whether to preserve transactions during CDC. @default true */
  readonly failOnNoTablesCaptured?: boolean;
}

/** Controls error handling behaviour. */
export interface ErrorHandlingSettings {
  /**
   * Action to take when DMS encounters a data error (e.g. duplicate key).
   * @default ErrorAction.STOP_TASK
   */
  readonly dataErrorPolicy?: ErrorAction;
  /**
   * Maximum number of data errors before stopping.
   * @default 0 (unlimited)
   */
  readonly dataErrorEscalationCount?: number;
  /**
   * Action to take after `dataErrorEscalationCount` errors are hit.
   * @default ErrorAction.STOP_TASK
   */
  readonly dataErrorEscalationPolicy?: ErrorAction;
  /**
   * Action when DMS encounters a table error.
   * @default ErrorAction.STOP_TASK
   */
  readonly tableErrorPolicy?: ErrorAction;
  /**
   * Maximum number of table errors before escalation.
   * @default 0
   */
  readonly tableErrorEscalationCount?: number;
  /**
   * Action after `tableErrorEscalationCount` table errors.
   * @default ErrorAction.STOP_TASK
   */
  readonly tableErrorEscalationPolicy?: ErrorAction;
  /**
   * Whether to recover from recoverable errors.
   * @default true
   */
  readonly recoverableErrorCount?: number;
  /**
   * Interval in seconds between recovery attempts.
   * @default 5
   */
  readonly recoverableErrorInterval?: number;
  /**
   * Throttle factor applied to recovery intervals.
   * @default 2
   */
  readonly recoverableErrorThrottling?: boolean;
  /**
   * Maximum interval (seconds) between recovery attempts.
   * @default 360
   */
  readonly recoverableErrorThrottlingMax?: number;
}

// ---------------------------------------------------------------------------
// Builder
// ---------------------------------------------------------------------------

/**
 * Fluent builder for DMS task settings.
 *
 * @example
 * const settings = new TaskSettings()
 *   .withLobMode(LobMode.LIMITED_LOB, 32)
 *   .withFullLoadSubTasks(16)
 *   .withBatchApply(true, 5, 60)
 *   .withDataErrorPolicy(ErrorAction.IGNORE_RECORD, 100)
 *   .withLogging('SOURCE_UNLOAD', LoggingLevel.LOGGER_SEVERITY_DEFAULT)
 *   .toJson();
 */
export class TaskSettings {
  private lobMode: LobMode = LobMode.LIMITED_LOB;
  private lobMaxSize: number = 32;
  private fullLoadSettings: FullLoadSettings = {};
  private cdcSettings: CdcSettings = {};
  private errorHandlingSettings: ErrorHandlingSettings = {};
  private loggingEnabled: boolean = true;
  private logComponents: Record<string, string> = {};

  // -------------------------------------------------------------------------
  // LOB handling
  // -------------------------------------------------------------------------

  /**
   * Configure LOB handling.
   *
   * @param mode       How LOBs are handled.
   * @param maxSizeKb  Maximum LOB size in KB when mode is LIMITED_LOB. Ignored otherwise.
   */
  withLobMode(mode: LobMode, maxSizeKb?: number): TaskSettings {
    this.lobMode = mode;
    if (maxSizeKb !== undefined) {
      this.lobMaxSize = maxSizeKb;
    }
    return this;
  }

  // -------------------------------------------------------------------------
  // Full load
  // -------------------------------------------------------------------------

  /**
   * Set the maximum number of tables loaded in parallel.
   * @param count Default 8.
   */
  withFullLoadSubTasks(count: number): TaskSettings {
    this.fullLoadSettings = { ...this.fullLoadSettings, maxFullLoadSubTasks: count };
    return this;
  }

  /**
   * Set the full-load target table prepare mode.
   * Common values: "DROP_AND_CREATE", "TRUNCATE_BEFORE_LOAD", "DO_NOTHING".
   */
  withTargetTablePrepMode(mode: string): TaskSettings {
    this.fullLoadSettings = { ...this.fullLoadSettings, targetTablePrepMode: mode };
    return this;
  }

  /**
   * Set the commit rate (number of rows per commit) during full load.
   */
  withCommitRate(rows: number): TaskSettings {
    this.fullLoadSettings = { ...this.fullLoadSettings, commitRate: rows };
    return this;
  }

  // -------------------------------------------------------------------------
  // CDC / batch apply
  // -------------------------------------------------------------------------

  /**
   * Enable or disable CDC batch apply mode and configure its timeouts.
   *
   * @param enabled    Whether batch apply is on.
   * @param minSeconds Minimum seconds before applying a batch (default 1).
   * @param maxSeconds Maximum seconds before applying a batch (default 30).
   */
  withBatchApply(enabled: boolean, minSeconds?: number, maxSeconds?: number): TaskSettings {
    this.cdcSettings = {
      ...this.cdcSettings,
      batchApplyEnabled: enabled,
      batchApplyTimeoutMin: minSeconds ?? 1,
      batchApplyTimeoutMax: maxSeconds ?? 30,
    };
    return this;
  }

  // -------------------------------------------------------------------------
  // Error handling
  // -------------------------------------------------------------------------

  /**
   * Configure the action taken on data errors.
   *
   * @param policy         Action when a data error is encountered.
   * @param escalationCount After this many errors, apply the escalation policy (0 = immediate).
   * @param escalationPolicy Action after `escalationCount` errors.
   */
  withDataErrorPolicy(
    policy: ErrorAction,
    escalationCount?: number,
    escalationPolicy?: ErrorAction,
  ): TaskSettings {
    this.errorHandlingSettings = {
      ...this.errorHandlingSettings,
      dataErrorPolicy: policy,
      dataErrorEscalationCount: escalationCount ?? 0,
      dataErrorEscalationPolicy: escalationPolicy ?? policy,
    };
    return this;
  }

  /**
   * Configure recovery from transient errors.
   *
   * @param count    Maximum recovery attempts (-1 = unlimited).
   * @param interval Seconds between attempts.
   */
  withRecovery(count: number, interval?: number): TaskSettings {
    this.errorHandlingSettings = {
      ...this.errorHandlingSettings,
      recoverableErrorCount: count,
      recoverableErrorInterval: interval ?? 5,
    };
    return this;
  }

  // -------------------------------------------------------------------------
  // Logging
  // -------------------------------------------------------------------------

  /**
   * Enable or disable CloudWatch logging for the task.
   * @default true
   */
  withLoggingEnabled(enabled: boolean): TaskSettings {
    this.loggingEnabled = enabled;
    return this;
  }

  /**
   * Set the logging level for a named DMS log component.
   *
   * Common component names: SOURCE_UNLOAD, TARGET_LOAD, TASK_MANAGER,
   * SOURCE_CAPTURE, TARGET_APPLY, REST_SERVER, TRANSFORMATION.
   */
  withLogging(component: string, level: LoggingLevel): TaskSettings {
    this.logComponents[component] = level;
    return this;
  }

  // -------------------------------------------------------------------------
  // Output
  // -------------------------------------------------------------------------

  /**
   * Produce the JSON string that DMS expects for `replicationTaskSettings`.
   */
  toJson(): string {
    const lobSettings: Record<string, unknown> =
      this.lobMode === LobMode.NONE
        ? { SupportLobs: false }
        : {
          SupportLobs: true,
          LobMode: this.lobMode === LobMode.FULL_LOB ? 2 : 1,
          LobMaxSize: this.lobMode === LobMode.LIMITED_LOB ? this.lobMaxSize : 0,
        };

    const logComponentList = Object.entries(this.logComponents).map(([id, level]) => ({
      Id: id,
      Severity: level,
    }));

    const settings: Record<string, unknown> = {
      TargetMetadata: {
        SupportLobs: lobSettings.SupportLobs,
        FullLobMode: this.lobMode === LobMode.FULL_LOB,
        LobChunkSize: 0,
        LimitedSizeLobMode: this.lobMode === LobMode.LIMITED_LOB,
        LobMaxSize: lobSettings.LobMaxSize ?? 0,
      },
      FullLoadSettings: {
        TargetTablePrepMode: this.fullLoadSettings.targetTablePrepMode ?? 'DROP_AND_CREATE',
        CreatePkAfterFullLoad: false,
        StopTaskCachedChangesApplied: this.fullLoadSettings.stopTaskCachedChangesApplied ?? false,
        StopTaskCachedChangesNotApplied: false,
        MaxFullLoadSubTasks: this.fullLoadSettings.maxFullLoadSubTasks ?? 8,
        TransactionConsistencyTimeout: this.fullLoadSettings.transactionConsistencyTimeout ?? 600,
        CommitRate: this.fullLoadSettings.commitRate ?? 10000,
      },
      Logging: {
        EnableLogging: this.loggingEnabled,
        LogComponents: logComponentList.length > 0 ? logComponentList : [
          { Id: 'SOURCE_UNLOAD', Severity: LoggingLevel.LOGGER_SEVERITY_DEFAULT },
          { Id: 'TARGET_LOAD', Severity: LoggingLevel.LOGGER_SEVERITY_DEFAULT },
          { Id: 'TASK_MANAGER', Severity: LoggingLevel.LOGGER_SEVERITY_DEFAULT },
        ],
      },
      ControlTablesSettings: {
        historyTimeslotInMinutes: 5,
        StatusTableEnabled: false,
        SuspendedTablesTableEnabled: false,
        historyTableEnabled: false,
        replicationTaskTableEnabled: false,
        statusTableEnabled: false,
        suspendedTablesTableEnabled: false,
      },
      StreamBufferSettings: {
        StreamBufferCount: 3,
        StreamBufferSizeInMB: 8,
        CtrlStreamBufferSizeInMB: 5,
      },
      ChangeProcessingDdlHandlingPolicy: {
        HandleSourceTableDropped: true,
        HandleSourceTableTruncated: true,
        HandleSourceTableAltered: true,
      },
      ErrorBehavior: {
        DataErrorPolicy: this.errorHandlingSettings.dataErrorPolicy ?? ErrorAction.STOP_TASK,
        DataErrorEscalationPolicy:
          this.errorHandlingSettings.dataErrorEscalationPolicy ?? ErrorAction.STOP_TASK,
        DataErrorEscalationCount: this.errorHandlingSettings.dataErrorEscalationCount ?? 0,
        TableErrorPolicy: this.errorHandlingSettings.tableErrorPolicy ?? ErrorAction.STOP_TASK,
        TableErrorEscalationPolicy:
          this.errorHandlingSettings.tableErrorEscalationPolicy ?? ErrorAction.STOP_TASK,
        TableErrorEscalationCount: this.errorHandlingSettings.tableErrorEscalationCount ?? 0,
        RecoverableErrorCount: this.errorHandlingSettings.recoverableErrorCount ?? -1,
        RecoverableErrorInterval: this.errorHandlingSettings.recoverableErrorInterval ?? 5,
        RecoverableErrorThrottling:
          this.errorHandlingSettings.recoverableErrorThrottling ?? true,
        RecoverableErrorThrottlingMax:
          this.errorHandlingSettings.recoverableErrorThrottlingMax ?? 1800,
        RecoverableErrorStopRetryAfterThrottlingMax: true,
        ApplyErrorDeletePolicy: ErrorAction.IGNORE_RECORD,
        ApplyErrorInsertPolicy: ErrorAction.IGNORE_RECORD,
        ApplyErrorUpdatePolicy: ErrorAction.IGNORE_RECORD,
        ApplyErrorEscalationPolicy: ErrorAction.STOP_TASK,
        ApplyErrorEscalationCount: 0,
        ApplyErrorFailOnTruncationDdl: false,
        FailOnNoTablesCaptured: this.cdcSettings.failOnNoTablesCaptured ?? true,
        FailOnTransactionConsistencyBreached: false,
        FullLoadIgnoreConflicts: true,
      },
      ChangeProcessingTuning: {
        BatchApplyEnabled: this.cdcSettings.batchApplyEnabled ?? false,
        BatchApplyPreserveTransaction: true,
        BatchApplyTimeoutMin: this.cdcSettings.batchApplyTimeoutMin ?? 1,
        BatchApplyTimeoutMax: this.cdcSettings.batchApplyTimeoutMax ?? 30,
        BatchApplyMemoryLimit: this.cdcSettings.batchApplyMemoryLimit ?? 500,
        BatchSplitSize: 0,
        MinTransactionSize: 1000,
        CommitTimeout: 1,
        MemoryLimitTotal: 1024,
        MemoryKeepTime: 60,
        StatementCacheSize: 50,
      },
    };

    return JSON.stringify(settings, null, 2);
  }
}

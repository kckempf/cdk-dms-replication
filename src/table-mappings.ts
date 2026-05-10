/**
 * Table mappings define which schemas/tables DMS migrates and how they are
 * transformed. This builder produces the JSON string that DMS expects for
 * the `tableMappings` property of a replication task.
 *
 * @see https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Tasks.CustomizingTasks.TableMapping.html
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/** Whether the rule selects or excludes objects. */
export enum SelectionAction {
  INCLUDE = 'include',
  EXCLUDE = 'exclude',
  EXPLICIT = 'explicit',
}

/** Table-level transformation actions. */
export enum TransformationAction {
  /** Convert the name to lowercase. */
  CONVERT_LOWERCASE = 'convert-lowercase',
  /** Convert the name to uppercase. */
  CONVERT_UPPERCASE = 'convert-uppercase',
  /** Add a prefix to the name. */
  ADD_PREFIX = 'add-prefix',
  /** Remove a prefix from the name. */
  REMOVE_PREFIX = 'remove-prefix',
  /** Add a suffix to the name. */
  ADD_SUFFIX = 'add-suffix',
  /** Remove a suffix from the name. */
  REMOVE_SUFFIX = 'remove-suffix',
  /** Rename the object. */
  RENAME = 'rename',
  /** Remove the column. */
  REMOVE_COLUMN = 'remove-column',
  /** Add a column. */
  ADD_COLUMN = 'add-column',
  /** Include the column. */
  INCLUDE_COLUMN = 'include-column',
}

/** The object type a rule targets. */
export enum RuleObjectLocator {
  SCHEMA = 'schema',
  TABLE = 'table',
  COLUMN = 'column',
  TABLE_TABLESPACE = 'table-tablespace',
  INDEX_TABLESPACE = 'index-tablespace',
}

/** Data type for added columns. */
export enum ColumnDataType {
  STRING = 'string',
  INT4 = 'int4',
  INT8 = 'int8',
  FLOAT4 = 'float4',
  FLOAT8 = 'float8',
  NUMERIC = 'numeric',
  DATETIME = 'datetime',
  BYTES = 'bytes',
  BLOB = 'blob',
}

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/** A column added via an ADD_COLUMN transformation. */
export interface AddColumnDefinition {
  /** Name of the new column. */
  readonly columnName: string;
  /** Data type of the new column. */
  readonly columnType: ColumnDataType;
  /** Character length for string columns. */
  readonly columnLength?: number;
  /** Precision for numeric columns. */
  readonly columnPrecision?: number;
  /** Scale for numeric columns. */
  readonly columnScale?: number;
  /**
   * Constant string value to populate the column with. Emitted as a
   * single-quoted DMS expression literal — use only for string column types.
   * For numeric or datetime types, use `expression` with an unquoted literal
   * (e.g. `expression: '42'`).
   * Exactly one of `columnValue` or `expression` must be set.
   */
  readonly columnValue?: string;
  /**
   * DMS expression to populate the column (e.g. `$timestamp`,
   * `'ENTITY#' || $id`, or an unquoted numeric literal like `42`).
   * Exactly one of `columnValue` or `expression` must be set.
   */
  readonly expression?: string;
}

/** Object locator identifying the schema, table, and optional column a rule targets. */
export interface RuleObjectLocatorValue {
  readonly schemaName: string;
  readonly tableName?: string;
  readonly columnName?: string;
}

/** Represents a single, fully built rule in the table-mappings JSON. */
export interface TableMappingRule {
  readonly ruleType: string;
  readonly ruleId: string;
  readonly ruleName: string;
  readonly objectLocator: RuleObjectLocatorValue;
  readonly ruleAction: string;
  readonly value?: string;
  readonly oldValue?: string;
}

// ---------------------------------------------------------------------------
// Builder
// ---------------------------------------------------------------------------

/**
 * Fluent builder for DMS table mappings.
 *
 * @example
 * const mappings = new TableMappings()
 *   .includeSchema('public')
 *   .includeTable('public', 'orders')
 *   .excludeTable('public', 'audit_log')
 *   .renameSchema('public', 'prod')
 *   .toLowerCaseTable('public', '%')
 *   .toJson();
 */
export class TableMappings {
  private readonly rules: Record<string, unknown>[] = [];
  private nextId: number = 1;

  // -------------------------------------------------------------------------
  // Selection rules
  // -------------------------------------------------------------------------

  /**
   * Include all tables in a schema.
   * Use `%` as a wildcard for `schemaName` to include all schemas.
   */
  includeSchema(schemaName: string): TableMappings {
    return this.addSelectionRule(schemaName, '%', SelectionAction.INCLUDE);
  }

  /** Exclude all tables in a schema. */
  excludeSchema(schemaName: string): TableMappings {
    return this.addSelectionRule(schemaName, '%', SelectionAction.EXCLUDE);
  }

  /**
   * Include a specific table (or a wildcard pattern) within a schema.
   * Use `%` for `tableName` to match all tables in the schema.
   */
  includeTable(schemaName: string, tableName: string): TableMappings {
    return this.addSelectionRule(schemaName, tableName, SelectionAction.INCLUDE);
  }

  /** Exclude a specific table (or wildcard) within a schema. */
  excludeTable(schemaName: string, tableName: string): TableMappings {
    return this.addSelectionRule(schemaName, tableName, SelectionAction.EXCLUDE);
  }

  /**
   * Explicitly include a single table. Unlike `include`, `explicit` means DMS
   * only migrates this one table regardless of other `include` rules.
   */
  explicitTable(schemaName: string, tableName: string): TableMappings {
    return this.addSelectionRule(schemaName, tableName, SelectionAction.EXPLICIT);
  }

  private addSelectionRule(
    schemaName: string,
    tableName: string,
    action: SelectionAction,
  ): TableMappings {
    const id = this.nextId++;
    this.rules.push({
      'rule-type': 'selection',
      'rule-id': String(id),
      'rule-name': `${id}`,
      'object-locator': {
        'schema-name': schemaName,
        'table-name': tableName,
      },
      'rule-action': action,
    });
    return this;
  }

  // -------------------------------------------------------------------------
  // Transformation rules — schema
  // -------------------------------------------------------------------------

  /** Rename a schema. */
  renameSchema(schemaName: string, newName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      '%',
      undefined,
      RuleObjectLocator.SCHEMA,
      TransformationAction.RENAME,
      newName,
    );
  }

  /** Convert all schema names to lowercase. */
  toLowerCaseSchema(schemaName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      '%',
      undefined,
      RuleObjectLocator.SCHEMA,
      TransformationAction.CONVERT_LOWERCASE,
    );
  }

  /** Convert all schema names to uppercase. */
  toUpperCaseSchema(schemaName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      '%',
      undefined,
      RuleObjectLocator.SCHEMA,
      TransformationAction.CONVERT_UPPERCASE,
    );
  }

  /** Add a prefix to schema names. */
  addPrefixToSchema(schemaName: string, prefix: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      '%',
      undefined,
      RuleObjectLocator.SCHEMA,
      TransformationAction.ADD_PREFIX,
      prefix,
    );
  }

  /** Add a suffix to schema names. */
  addSuffixToSchema(schemaName: string, suffix: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      '%',
      undefined,
      RuleObjectLocator.SCHEMA,
      TransformationAction.ADD_SUFFIX,
      suffix,
    );
  }

  // -------------------------------------------------------------------------
  // Transformation rules — table
  // -------------------------------------------------------------------------

  /** Rename a table. */
  renameTable(schemaName: string, tableName: string, newName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      undefined,
      RuleObjectLocator.TABLE,
      TransformationAction.RENAME,
      newName,
    );
  }

  /** Convert matching table names to lowercase. Use `%` to match all tables. */
  toLowerCaseTable(schemaName: string, tableName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      undefined,
      RuleObjectLocator.TABLE,
      TransformationAction.CONVERT_LOWERCASE,
    );
  }

  /** Convert matching table names to uppercase. */
  toUpperCaseTable(schemaName: string, tableName: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      undefined,
      RuleObjectLocator.TABLE,
      TransformationAction.CONVERT_UPPERCASE,
    );
  }

  /** Add a prefix to table names. */
  addPrefixToTable(schemaName: string, tableName: string, prefix: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      undefined,
      RuleObjectLocator.TABLE,
      TransformationAction.ADD_PREFIX,
      prefix,
    );
  }

  /** Add a suffix to table names. */
  addSuffixToTable(schemaName: string, tableName: string, suffix: string): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      undefined,
      RuleObjectLocator.TABLE,
      TransformationAction.ADD_SUFFIX,
      suffix,
    );
  }

  // -------------------------------------------------------------------------
  // Transformation rules — column
  // -------------------------------------------------------------------------

  /** Rename a column in a table. */
  renameColumn(
    schemaName: string,
    tableName: string,
    columnName: string,
    newName: string,
  ): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      columnName,
      RuleObjectLocator.COLUMN,
      TransformationAction.RENAME,
      newName,
    );
  }

  /** Convert matching column names to lowercase. */
  toLowerCaseColumn(
    schemaName: string,
    tableName: string,
    columnName: string,
  ): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      columnName,
      RuleObjectLocator.COLUMN,
      TransformationAction.CONVERT_LOWERCASE,
    );
  }

  /** Convert matching column names to uppercase. */
  toUpperCaseColumn(
    schemaName: string,
    tableName: string,
    columnName: string,
  ): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      columnName,
      RuleObjectLocator.COLUMN,
      TransformationAction.CONVERT_UPPERCASE,
    );
  }

  /** Remove a column from a table. */
  removeColumn(
    schemaName: string,
    tableName: string,
    columnName: string,
  ): TableMappings {
    return this.addTransformationRule(
      schemaName,
      tableName,
      columnName,
      RuleObjectLocator.COLUMN,
      TransformationAction.REMOVE_COLUMN,
    );
  }

  /**
   * Add a new column to a table.
   *
   * @example
   * mappings.addColumn('public', 'orders', {
   *   columnName: 'migration_ts',
   *   columnType: ColumnDataType.DATETIME,
   *   expression: '$timestamp',
   * });
   */
  addColumn(
    schemaName: string,
    tableName: string,
    column: AddColumnDefinition,
  ): TableMappings {
    const id = this.nextId++;
    const objectLocator: Record<string, string> = {
      'schema-name': schemaName,
      'table-name': tableName,
    };

    const rule: Record<string, unknown> = {
      'rule-type': 'transformation',
      'rule-id': String(id),
      'rule-name': `${id}`,
      'object-locator': objectLocator,
      'rule-action': TransformationAction.ADD_COLUMN,
      'rule-target': 'column',
      'value': column.columnName,
      'data-type': this.buildDataType(column),
    };

    if (column.expression) {
      rule.expression = column.expression;
    } else if (column.columnValue !== undefined) {
      // DMS expression syntax: string literals use single quotes (escape ' as '')
      rule.expression = `'${column.columnValue.replace(/'/g, "''")}'`;
    }

    this.rules.push(rule);
    return this;
  }

  private buildDataType(column: AddColumnDefinition): Record<string, unknown> {
    const dt: Record<string, unknown> = { type: column.columnType };
    if (column.columnLength !== undefined) dt.length = column.columnLength;
    if (column.columnPrecision !== undefined) dt.precision = column.columnPrecision;
    if (column.columnScale !== undefined) dt.scale = column.columnScale;
    return dt;
  }

  private addTransformationRule(
    schemaName: string,
    tableName: string,
    columnName: string | undefined,
    ruleTarget: RuleObjectLocator,
    action: TransformationAction,
    value?: string,
  ): TableMappings {
    const id = this.nextId++;
    const objectLocator: Record<string, string> = {
      'schema-name': schemaName,
      'table-name': tableName,
    };
    if (columnName !== undefined) {
      objectLocator['column-name'] = columnName;
    }

    const rule: Record<string, unknown> = {
      'rule-type': 'transformation',
      'rule-id': String(id),
      'rule-name': `${id}`,
      'rule-target': ruleTarget,
      'object-locator': objectLocator,
      'rule-action': action,
    };
    if (value !== undefined) {
      rule.value = value;
    }

    this.rules.push(rule);
    return this;
  }

  // -------------------------------------------------------------------------
  // Output
  // -------------------------------------------------------------------------

  /**
   * Serialise the accumulated rules to the JSON string expected by DMS.
   * Passes the result directly to `replicationTaskSettings` or
   * `DmsReplicationTask.tableMappings`.
   */
  toJson(): string {
    return JSON.stringify({ rules: this.rules }, null, 2);
  }
}

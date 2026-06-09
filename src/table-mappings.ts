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

/** DynamoDB attribute sub-type for object-mapping rules. */
export enum DynamoDbAttributeSubType {
  STRING = 'string',
  NUMBER = 'number',
  BINARY = 'binary',
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

/**
 * Mapping from a source column (or DMS expression) to a DynamoDB partition or
 * sort key attribute. Exactly one of `sourceColumn` or `value` must be set.
 */
export interface DynamoDbKeyMapping {
  /**
   * Name of a single column on the relational source. The builder wraps this
   * in the DMS expression `${sourceColumn}`. Mutually exclusive with `value`.
   */
  readonly sourceColumn?: string;
  /**
   * Raw DMS value expression, used verbatim. Use this for composite keys or
   * other expressions like `'CUSTOMER#${customer_id}'`. Mutually exclusive
   * with `sourceColumn`.
   */
  readonly value?: string;
  /** Name of the partition/sort key attribute on the DynamoDB target item. */
  readonly targetAttributeName: string;
  /** DynamoDB attribute sub-type (`string`, `number`, or `binary`). */
  readonly attributeSubType: DynamoDbAttributeSubType;
}

/**
 * Mapping from a source column (or DMS expression) to a non-key attribute on
 * the DynamoDB target. Exactly one of `sourceColumn` or `value` must be set.
 * Source columns not listed in `attributeMappings` or `excludeColumns` pass
 * through with the source column name.
 */
export interface DynamoDbAttributeMapping {
  /**
   * Name of a single column on the relational source. The builder wraps this
   * in the DMS expression `${sourceColumn}`. Mutually exclusive with `value`.
   */
  readonly sourceColumn?: string;
  /**
   * Raw DMS value expression, used verbatim. Use this for composite values or
   * other expressions like `'STATUS#${status}'`. Mutually exclusive with
   * `sourceColumn`.
   */
  readonly value?: string;
  /** Name of the attribute on the DynamoDB target item. */
  readonly targetAttributeName: string;
  /** DynamoDB attribute sub-type (`string`, `number`, or `binary`). */
  readonly attributeSubType: DynamoDbAttributeSubType;
}

/** Options for `TableMappings.mapToDynamoDb`. */
export interface DynamoDbObjectMappingOptions {
  /** Name of the target DynamoDB table. */
  readonly targetTableName: string;
  /** Mapping for the DynamoDB partition (hash) key. Required. */
  readonly partitionKey: DynamoDbKeyMapping;
  /** Mapping for the DynamoDB sort (range) key. Optional. */
  readonly sortKey?: DynamoDbKeyMapping;
  /** Source columns to exclude from the migrated item. */
  readonly excludeColumns?: string[];
  /**
   * Additional column-to-attribute mappings. Use this to rename non-key
   * columns or change their DynamoDB sub-type. Columns not listed here pass
   * through with the source column name.
   */
  readonly attributeMappings?: DynamoDbAttributeMapping[];
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

  // -------------------------------------------------------------------------
  // DynamoDB object mapping
  // -------------------------------------------------------------------------

  /**
   * Map a relational source table to a DynamoDB target table.
   *
   * Emits a DMS `object-mapping` rule with `rule-action: map-record-to-record`.
   * DMS requires this rule type when the target endpoint is DynamoDB; the
   * partition key (and optional sort key) tell DMS how to build the item key
   * from source columns.
   *
   * Source columns not listed in `attributeMappings` or `excludeColumns` are
   * migrated with the source column name as the attribute name.
   *
   * For each key or attribute mapping, set either `sourceColumn` (a single
   * column wrapped as `${col}`) or `value` (a raw DMS expression, e.g.
   * `'CUSTOMER#${customer_id}'` for composite keys). Exactly one is required.
   *
   * Calling this method twice with the same `schemaName`/`tableName` emits two
   * separate rules; DMS will reject duplicate object-mapping rules at deploy
   * time. Call it once per source table.
   *
   * @example
   * const mappings = new TableMappings()
   *   .includeTable('public', 'orders')
   *   .mapToDynamoDb('public', 'orders', {
   *     targetTableName: 'Orders',
   *     // Composite partition key from a literal prefix + source column:
   *     partitionKey: {
   *       value: 'CUSTOMER#${customer_id}',
   *       targetAttributeName: 'PK',
   *       attributeSubType: DynamoDbAttributeSubType.STRING,
   *     },
   *     // Bare source column for the sort key:
   *     sortKey: {
   *       sourceColumn: 'created_at',
   *       targetAttributeName: 'CreatedAt',
   *       attributeSubType: DynamoDbAttributeSubType.STRING,
   *     },
   *     excludeColumns: ['internal_flag'],
   *     attributeMappings: [
   *       {
   *         sourceColumn: 'customer_id',
   *         targetAttributeName: 'CustomerId',
   *         attributeSubType: DynamoDbAttributeSubType.STRING,
   *       },
   *     ],
   *   })
   *   .toJson();
   */
  mapToDynamoDb(
    schemaName: string,
    tableName: string,
    options: DynamoDbObjectMappingOptions,
  ): TableMappings {
    const excluded = new Set(options.excludeColumns ?? []);
    this.checkNotExcluded(options.partitionKey, excluded);
    if (options.sortKey) {
      this.checkNotExcluded(options.sortKey, excluded);
    }
    for (const mapping of options.attributeMappings ?? []) {
      this.checkNotExcluded(mapping, excluded);
    }

    const id = this.nextId++;

    const attributeMappings: Record<string, string>[] = [
      this.buildAttributeMapping(options.partitionKey),
    ];
    if (options.sortKey) {
      attributeMappings.push(this.buildAttributeMapping(options.sortKey));
    }
    if (options.attributeMappings) {
      for (const mapping of options.attributeMappings) {
        attributeMappings.push(this.buildAttributeMapping(mapping));
      }
    }

    const mappingParameters: Record<string, unknown> = {
      'partition-key-name': options.partitionKey.targetAttributeName,
    };
    if (options.sortKey) {
      mappingParameters['sort-key-name'] = options.sortKey.targetAttributeName;
    }
    if (options.excludeColumns && options.excludeColumns.length > 0) {
      mappingParameters['exclude-columns'] = options.excludeColumns;
    }
    mappingParameters['attribute-mappings'] = attributeMappings;

    this.rules.push({
      'rule-type': 'object-mapping',
      'rule-id': String(id),
      'rule-name': `${id}`,
      'rule-action': 'map-record-to-record',
      'object-locator': {
        'schema-name': schemaName,
        'table-name': tableName,
      },
      'target-table-name': options.targetTableName,
      'mapping-parameters': mappingParameters,
    });
    return this;
  }

  private checkNotExcluded(
    mapping: DynamoDbKeyMapping | DynamoDbAttributeMapping,
    excluded: Set<string>,
  ): void {
    if (mapping.sourceColumn !== undefined && excluded.has(mapping.sourceColumn)) {
      throw new Error(
        `DynamoDB attribute mapping for '${mapping.targetAttributeName}' uses ` +
        `sourceColumn '${mapping.sourceColumn}', which also appears in ` +
        'excludeColumns. Remove it from one or the other.',
      );
    }
  }

  private buildAttributeMapping(
    mapping: DynamoDbKeyMapping | DynamoDbAttributeMapping,
  ): Record<string, string> {
    const hasSource = mapping.sourceColumn !== undefined;
    const hasValue = mapping.value !== undefined;
    if (hasSource === hasValue) {
      throw new Error(
        `DynamoDB attribute mapping for '${mapping.targetAttributeName}': ` +
        'exactly one of sourceColumn or value must be set.',
      );
    }
    const value = hasValue ? mapping.value! : `\${${mapping.sourceColumn}}`;
    return {
      'target-attribute-name': mapping.targetAttributeName,
      'attribute-type': 'scalar',
      'attribute-sub-type': mapping.attributeSubType,
      'value': value,
    };
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

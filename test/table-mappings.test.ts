import {
  ColumnDataType,
  DynamoDbAttributeSubType,
  TableMappings,
} from '../src';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface Rules {
  rules: Array<Record<string, any>>;
}

function parse(json: string): Rules {
  return JSON.parse(json) as Rules;
}

// ---------------------------------------------------------------------------
// Selection rules (sanity)
// ---------------------------------------------------------------------------

describe('TableMappings selection rules', () => {
  test('includeTable emits a selection rule with include action', () => {
    const out = parse(new TableMappings().includeTable('public', 'orders').toJson());
    expect(out.rules).toHaveLength(1);
    expect(out.rules[0]).toMatchObject({
      'rule-type': 'selection',
      'rule-action': 'include',
      'object-locator': { 'schema-name': 'public', 'table-name': 'orders' },
    });
  });

  test('excludeTable emits a selection rule with exclude action', () => {
    const out = parse(new TableMappings().excludeTable('public', 'audit_log').toJson());
    expect(out.rules[0]['rule-action']).toBe('exclude');
  });

  test('includeSchema uses % as the table-name wildcard', () => {
    const out = parse(new TableMappings().includeSchema('public').toJson());
    expect(out.rules[0]['object-locator']).toEqual({
      'schema-name': 'public',
      'table-name': '%',
    });
  });
});

// ---------------------------------------------------------------------------
// Transformation rules (sanity)
// ---------------------------------------------------------------------------

describe('TableMappings transformation rules', () => {
  test('renameTable emits a transformation rule with the new name', () => {
    const out = parse(
      new TableMappings().renameTable('public', 'orders', 'Orders').toJson(),
    );
    expect(out.rules[0]).toMatchObject({
      'rule-type': 'transformation',
      'rule-action': 'rename',
      'rule-target': 'table',
      'value': 'Orders',
    });
  });

  test('addColumn emits a transformation rule with data-type and expression', () => {
    const out = parse(new TableMappings()
      .addColumn('public', 'orders', {
        columnName: 'migration_ts',
        columnType: ColumnDataType.DATETIME,
        expression: '$timestamp',
      })
      .toJson());
    expect(out.rules[0]).toMatchObject({
      'rule-action': 'add-column',
      'value': 'migration_ts',
      'data-type': { type: 'datetime' },
      'expression': '$timestamp',
    });
  });
});

// ---------------------------------------------------------------------------
// DynamoDB object mapping
// ---------------------------------------------------------------------------

describe('TableMappings.mapToDynamoDb', () => {
  test('emits object-mapping rule with partition key only', () => {
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
      })
      .toJson());

    expect(out.rules).toHaveLength(1);
    expect(out.rules[0]).toMatchObject({
      'rule-type': 'object-mapping',
      'rule-action': 'map-record-to-record',
      'object-locator': { 'schema-name': 'public', 'table-name': 'orders' },
      'target-table-name': 'Orders',
      'mapping-parameters': {
        'partition-key-name': 'OrderId',
        'attribute-mappings': [
          {
            'target-attribute-name': 'OrderId',
            'attribute-type': 'scalar',
            'attribute-sub-type': 'string',
            'value': '${order_id}',
          },
        ],
      },
    });
    expect(out.rules[0]['mapping-parameters']).not.toHaveProperty('sort-key-name');
    expect(out.rules[0]['mapping-parameters']).not.toHaveProperty('exclude-columns');
  });

  test('emits partition and sort key with both attribute mappings', () => {
    const out = parse(new TableMappings()
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
      })
      .toJson());

    expect(out.rules[0]['mapping-parameters']).toMatchObject({
      'partition-key-name': 'OrderId',
      'sort-key-name': 'CreatedAt',
    });
    expect(out.rules[0]['mapping-parameters']['attribute-mappings']).toHaveLength(2);
    expect(out.rules[0]['mapping-parameters']['attribute-mappings'][1]).toMatchObject({
      'target-attribute-name': 'CreatedAt',
      'value': '${created_at}',
    });
  });

  test('emits excludeColumns in mapping-parameters', () => {
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        excludeColumns: ['internal_flag', 'debug_col'],
      })
      .toJson());

    expect(out.rules[0]['mapping-parameters']['exclude-columns']).toEqual([
      'internal_flag',
      'debug_col',
    ]);
  });

  test('appends user attributeMappings after partition/sort keys', () => {
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        attributeMappings: [
          {
            sourceColumn: 'customer_id',
            targetAttributeName: 'CustomerId',
            attributeSubType: DynamoDbAttributeSubType.STRING,
          },
          {
            sourceColumn: 'amount_cents',
            targetAttributeName: 'AmountCents',
            attributeSubType: DynamoDbAttributeSubType.NUMBER,
          },
        ],
      })
      .toJson());

    const mappings = out.rules[0]['mapping-parameters']['attribute-mappings'];
    expect(mappings).toHaveLength(3);
    expect(mappings[1]).toMatchObject({
      'target-attribute-name': 'CustomerId',
      'attribute-sub-type': 'string',
      'value': '${customer_id}',
    });
    expect(mappings[2]).toMatchObject({
      'target-attribute-name': 'AmountCents',
      'attribute-sub-type': 'number',
      'value': '${amount_cents}',
    });
  });

  test('rule-id increments and composes with prior selection rules', () => {
    const out = parse(new TableMappings()
      .includeTable('public', 'orders')
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
      })
      .toJson());

    expect(out.rules).toHaveLength(2);
    expect(out.rules[0]['rule-type']).toBe('selection');
    expect(out.rules[0]['rule-id']).toBe('1');
    expect(out.rules[1]['rule-type']).toBe('object-mapping');
    expect(out.rules[1]['rule-id']).toBe('2');
    expect(out.rules[0]['object-locator']).toEqual(out.rules[1]['object-locator']);
  });

  test('supports composite value expressions for keys', () => {
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
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
      .toJson());

    const mappings = out.rules[0]['mapping-parameters']['attribute-mappings'];
    expect(mappings[0]).toMatchObject({
      'target-attribute-name': 'PK',
      'value': 'CUSTOMER#${customer_id}',
    });
    expect(mappings[1]).toMatchObject({
      'target-attribute-name': 'SK',
      'value': 'ORDER#${order_id}',
    });
  });

  test('supports composite value expressions for non-key attribute mappings', () => {
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        attributeMappings: [
          {
            value: 'STATUS#${status}#${created_at}',
            targetAttributeName: 'StatusKey',
            attributeSubType: DynamoDbAttributeSubType.STRING,
          },
        ],
      })
      .toJson());

    const mappings = out.rules[0]['mapping-parameters']['attribute-mappings'];
    expect(mappings[1]).toMatchObject({
      'target-attribute-name': 'StatusKey',
      'value': 'STATUS#${status}#${created_at}',
    });
  });

  test('throws when neither sourceColumn nor value is provided', () => {
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          targetAttributeName: 'PK',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        } as any,
      });
    }).toThrow(/sourceColumn.*value/);
  });

  test('throws when both sourceColumn and value are provided', () => {
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          value: '${order_id}',
          targetAttributeName: 'PK',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
      });
    }).toThrow(/sourceColumn.*value/);
  });

  test('throws when partition key source column is in excludeColumns', () => {
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        excludeColumns: ['order_id'],
      });
    }).toThrow(/order_id.*excludeColumns/);
  });

  test('throws when sort key source column is in excludeColumns', () => {
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
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
        excludeColumns: ['created_at'],
      });
    }).toThrow(/created_at.*excludeColumns/);
  });

  test('throws when attributeMapping source column is in excludeColumns', () => {
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        excludeColumns: ['customer_id'],
        attributeMappings: [
          {
            sourceColumn: 'customer_id',
            targetAttributeName: 'CustomerId',
            attributeSubType: DynamoDbAttributeSubType.STRING,
          },
        ],
      });
    }).toThrow(/customer_id.*excludeColumns/);
  });

  test('does not validate value-based mappings against excludeColumns', () => {
    // value expressions can legitimately reference excluded columns (e.g. as
    // part of a composite that also concatenates a literal), and parsing DMS
    // expressions to detect ${col} references is out of scope.
    expect(() => {
      new TableMappings().mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          value: 'CUSTOMER#${customer_id}',
          targetAttributeName: 'PK',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
        excludeColumns: ['customer_id'],
      });
    }).not.toThrow();
  });

  test('calling mapToDynamoDb twice on the same table emits two rules', () => {
    // Documents current behavior: the builder does not deduplicate. DMS will
    // reject duplicate object-mapping rules at deploy time. If users need
    // different DynamoDB targets for the same source, they should call this
    // method once with the desired configuration.
    const out = parse(new TableMappings()
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'Orders',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
      })
      .mapToDynamoDb('public', 'orders', {
        targetTableName: 'OrdersV2',
        partitionKey: {
          sourceColumn: 'order_id',
          targetAttributeName: 'OrderId',
          attributeSubType: DynamoDbAttributeSubType.STRING,
        },
      })
      .toJson());

    expect(out.rules).toHaveLength(2);
    expect(out.rules[0]['target-table-name']).toBe('Orders');
    expect(out.rules[1]['target-table-name']).toBe('OrdersV2');
    expect(out.rules[0]['rule-id']).toBe('1');
    expect(out.rules[1]['rule-id']).toBe('2');
  });
});

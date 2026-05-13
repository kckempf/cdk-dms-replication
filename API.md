# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### DmsEndpoint <a name="DmsEndpoint" id="cdk-dms-replication.DmsEndpoint"></a>

- *Implements:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

A DMS endpoint construct supporting every engine that DMS supports.

Set `engine` to the desired {@link EndpointEngine} and supply the
matching `*Settings` property. All other `*Settings` properties are
ignored at runtime.

*Example*

```typescript
// MySQL source
new DmsEndpoint(this, 'Source', {
  endpointType: EndpointType.SOURCE,
  engine: EndpointEngine.MYSQL,
  serverName: 'mysql.example.com',
  port: 3306,
  username: 'dms_user',
  password: cdk.SecretValue.ssmSecure('/dms/mysql/password'),
  databaseName: 'mydb',
});
```


#### Initializers <a name="Initializers" id="cdk-dms-replication.DmsEndpoint.Initializer"></a>

```typescript
import { DmsEndpoint } from 'cdk-dms-replication'

new DmsEndpoint(scope: Construct, id: string, props: DmsEndpointProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsEndpoint.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsEndpoint.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsEndpoint.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-dms-replication.DmsEndpointProps">DmsEndpointProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-dms-replication.DmsEndpoint.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-dms-replication.DmsEndpoint.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-dms-replication.DmsEndpoint.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-dms-replication.DmsEndpointProps">DmsEndpointProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsEndpoint.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-dms-replication.DmsEndpoint.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-dms-replication.DmsEndpoint.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-dms-replication.DmsEndpoint.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-dms-replication.DmsEndpoint.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsEndpoint.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-dms-replication.DmsEndpoint.isConstruct"></a>

```typescript
import { DmsEndpoint } from 'cdk-dms-replication'

DmsEndpoint.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-dms-replication.DmsEndpoint.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsEndpoint.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-dms-replication.DmsEndpoint.property.cfnEndpoint">cfnEndpoint</a></code> | <code>aws-cdk-lib.aws_dms.CfnEndpoint</code> | The underlying CloudFormation endpoint resource. |
| <code><a href="#cdk-dms-replication.DmsEndpoint.property.endpointArn">endpointArn</a></code> | <code>string</code> | ARN of the DMS endpoint. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-dms-replication.DmsEndpoint.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfnEndpoint`<sup>Required</sup> <a name="cfnEndpoint" id="cdk-dms-replication.DmsEndpoint.property.cfnEndpoint"></a>

```typescript
public readonly cfnEndpoint: CfnEndpoint;
```

- *Type:* aws-cdk-lib.aws_dms.CfnEndpoint

The underlying CloudFormation endpoint resource.

---

##### `endpointArn`<sup>Required</sup> <a name="endpointArn" id="cdk-dms-replication.DmsEndpoint.property.endpointArn"></a>

```typescript
public readonly endpointArn: string;
```

- *Type:* string

ARN of the DMS endpoint.

---


### DmsMigrationPipeline <a name="DmsMigrationPipeline" id="cdk-dms-replication.DmsMigrationPipeline"></a>

An L3 CDK pattern construct that provisions a complete DMS migration pipeline:.

**Replication instance** — placed in private subnets with KMS encryption
  and a dedicated security group.
- **Source endpoint** — supports every engine DMS supports.
- **Target endpoint** — supports every engine DMS supports.
- **Replication task** — wires the instance, endpoints, table mappings and
  task settings together.
- **IAM role** — grants DMS permission to write to CloudWatch Logs.
- **CloudWatch log group** — (optional) retains task logs.

*Example*

```typescript
// MySQL → Aurora PostgreSQL, full-load-and-CDC
const pipeline = new DmsMigrationPipeline(this, 'MigrationPipeline', {
  vpc,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
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
    serverName: cluster.clusterEndpoint.hostname,
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
    databaseName: 'mydb',
  },
  tableMappings: new TableMappings().includeSchema('public').toJson(),
});
```


#### Initializers <a name="Initializers" id="cdk-dms-replication.DmsMigrationPipeline.Initializer"></a>

```typescript
import { DmsMigrationPipeline } from 'cdk-dms-replication'

new DmsMigrationPipeline(scope: Construct, id: string, props: DmsMigrationPipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps">DmsMigrationPipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-dms-replication.DmsMigrationPipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-dms-replication.DmsMigrationPipelineProps">DmsMigrationPipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-dms-replication.DmsMigrationPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-dms-replication.DmsMigrationPipeline.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-dms-replication.DmsMigrationPipeline.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-dms-replication.DmsMigrationPipeline.isConstruct"></a>

```typescript
import { DmsMigrationPipeline } from 'cdk-dms-replication'

DmsMigrationPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-dms-replication.DmsMigrationPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.replicationInstance">replicationInstance</a></code> | <code><a href="#cdk-dms-replication.DmsReplicationInstance">DmsReplicationInstance</a></code> | The replication instance provisioned by this pipeline. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.replicationTask">replicationTask</a></code> | <code><a href="#cdk-dms-replication.DmsReplicationTask">DmsReplicationTask</a></code> | The replication task that drives the migration. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.source">source</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | The source endpoint used by this pipeline. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.target">target</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | The target endpoint used by this pipeline. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.dmsCloudWatchRole">dmsCloudWatchRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM role that allows DMS to write to CloudWatch Logs. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.dmsVpcRole">dmsVpcRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM role that allows DMS to manage VPC resources (dms-vpc-role). |
| <code><a href="#cdk-dms-replication.DmsMigrationPipeline.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.LogGroup</code> | CloudWatch log group for the task (if enableCloudWatchLogs is true). |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-dms-replication.DmsMigrationPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `replicationInstance`<sup>Required</sup> <a name="replicationInstance" id="cdk-dms-replication.DmsMigrationPipeline.property.replicationInstance"></a>

```typescript
public readonly replicationInstance: DmsReplicationInstance;
```

- *Type:* <a href="#cdk-dms-replication.DmsReplicationInstance">DmsReplicationInstance</a>

The replication instance provisioned by this pipeline.

---

##### `replicationTask`<sup>Required</sup> <a name="replicationTask" id="cdk-dms-replication.DmsMigrationPipeline.property.replicationTask"></a>

```typescript
public readonly replicationTask: DmsReplicationTask;
```

- *Type:* <a href="#cdk-dms-replication.DmsReplicationTask">DmsReplicationTask</a>

The replication task that drives the migration.

---

##### `source`<sup>Required</sup> <a name="source" id="cdk-dms-replication.DmsMigrationPipeline.property.source"></a>

```typescript
public readonly source: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

The source endpoint used by this pipeline.

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-dms-replication.DmsMigrationPipeline.property.target"></a>

```typescript
public readonly target: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

The target endpoint used by this pipeline.

---

##### `dmsCloudWatchRole`<sup>Optional</sup> <a name="dmsCloudWatchRole" id="cdk-dms-replication.DmsMigrationPipeline.property.dmsCloudWatchRole"></a>

```typescript
public readonly dmsCloudWatchRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

IAM role that allows DMS to write to CloudWatch Logs.

`undefined` when `createDmsServiceRoles` is `false`.

---

##### `dmsVpcRole`<sup>Optional</sup> <a name="dmsVpcRole" id="cdk-dms-replication.DmsMigrationPipeline.property.dmsVpcRole"></a>

```typescript
public readonly dmsVpcRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

IAM role that allows DMS to manage VPC resources (dms-vpc-role).

`undefined` when `createDmsServiceRoles` is `false`.

---

##### `logGroup`<sup>Optional</sup> <a name="logGroup" id="cdk-dms-replication.DmsMigrationPipeline.property.logGroup"></a>

```typescript
public readonly logGroup: LogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.LogGroup

CloudWatch log group for the task (if enableCloudWatchLogs is true).

---


### DmsReplicationInstance <a name="DmsReplicationInstance" id="cdk-dms-replication.DmsReplicationInstance"></a>

An L2-style construct that provisions a DMS replication instance with: - Private subnet placement via a dedicated subnet group - KMS encryption at rest (key created if not provided) - A dedicated security group (created if not provided).

#### Initializers <a name="Initializers" id="cdk-dms-replication.DmsReplicationInstance.Initializer"></a>

```typescript
import { DmsReplicationInstance } from 'cdk-dms-replication'

new DmsReplicationInstance(scope: Construct, id: string, props: DmsReplicationInstanceProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps">DmsReplicationInstanceProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-dms-replication.DmsReplicationInstance.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-dms-replication.DmsReplicationInstanceProps">DmsReplicationInstanceProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.with">with</a></code> | Applies one or more mixins to this construct. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.allowInboundFrom">allowInboundFrom</a></code> | Allow inbound access to the replication instance on a given port from a peer. |

---

##### `toString` <a name="toString" id="cdk-dms-replication.DmsReplicationInstance.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-dms-replication.DmsReplicationInstance.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-dms-replication.DmsReplicationInstance.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

##### `allowInboundFrom` <a name="allowInboundFrom" id="cdk-dms-replication.DmsReplicationInstance.allowInboundFrom"></a>

```typescript
public allowInboundFrom(peer: IPeer, port: Port, description?: string): void
```

Allow inbound access to the replication instance on a given port from a peer.

Useful when the source or target database security group needs to trust the instance.

###### `peer`<sup>Required</sup> <a name="peer" id="cdk-dms-replication.DmsReplicationInstance.allowInboundFrom.parameter.peer"></a>

- *Type:* aws-cdk-lib.aws_ec2.IPeer

---

###### `port`<sup>Required</sup> <a name="port" id="cdk-dms-replication.DmsReplicationInstance.allowInboundFrom.parameter.port"></a>

- *Type:* aws-cdk-lib.aws_ec2.Port

---

###### `description`<sup>Optional</sup> <a name="description" id="cdk-dms-replication.DmsReplicationInstance.allowInboundFrom.parameter.description"></a>

- *Type:* string

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-dms-replication.DmsReplicationInstance.isConstruct"></a>

```typescript
import { DmsReplicationInstance } from 'cdk-dms-replication'

DmsReplicationInstance.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-dms-replication.DmsReplicationInstance.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.cfnReplicationInstance">cfnReplicationInstance</a></code> | <code>aws-cdk-lib.aws_dms.CfnReplicationInstance</code> | The underlying CloudFormation replication instance resource. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key used for storage encryption. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.replicationInstanceArn">replicationInstanceArn</a></code> | <code>string</code> | The replication instance ARN. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | The security group attached to this instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstance.property.subnetGroup">subnetGroup</a></code> | <code>aws-cdk-lib.aws_dms.CfnReplicationSubnetGroup</code> | The replication subnet group created for this instance. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-dms-replication.DmsReplicationInstance.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfnReplicationInstance`<sup>Required</sup> <a name="cfnReplicationInstance" id="cdk-dms-replication.DmsReplicationInstance.property.cfnReplicationInstance"></a>

```typescript
public readonly cfnReplicationInstance: CfnReplicationInstance;
```

- *Type:* aws-cdk-lib.aws_dms.CfnReplicationInstance

The underlying CloudFormation replication instance resource.

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="cdk-dms-replication.DmsReplicationInstance.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The KMS key used for storage encryption.

---

##### `replicationInstanceArn`<sup>Required</sup> <a name="replicationInstanceArn" id="cdk-dms-replication.DmsReplicationInstance.property.replicationInstanceArn"></a>

```typescript
public readonly replicationInstanceArn: string;
```

- *Type:* string

The replication instance ARN.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="cdk-dms-replication.DmsReplicationInstance.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

The security group attached to this instance.

---

##### `subnetGroup`<sup>Required</sup> <a name="subnetGroup" id="cdk-dms-replication.DmsReplicationInstance.property.subnetGroup"></a>

```typescript
public readonly subnetGroup: CfnReplicationSubnetGroup;
```

- *Type:* aws-cdk-lib.aws_dms.CfnReplicationSubnetGroup

The replication subnet group created for this instance.

---


### DmsReplicationTask <a name="DmsReplicationTask" id="cdk-dms-replication.DmsReplicationTask"></a>

A DMS replication task that ties a replication instance to a source and target endpoint and defines what data to migrate and how.

#### Initializers <a name="Initializers" id="cdk-dms-replication.DmsReplicationTask.Initializer"></a>

```typescript
import { DmsReplicationTask } from 'cdk-dms-replication'

new DmsReplicationTask(scope: Construct, id: string, props: DmsReplicationTaskProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-dms-replication.DmsReplicationTaskProps">DmsReplicationTaskProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-dms-replication.DmsReplicationTask.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-dms-replication.DmsReplicationTask.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-dms-replication.DmsReplicationTask.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-dms-replication.DmsReplicationTaskProps">DmsReplicationTaskProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-dms-replication.DmsReplicationTask.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-dms-replication.DmsReplicationTask.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-dms-replication.DmsReplicationTask.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-dms-replication.DmsReplicationTask.isConstruct"></a>

```typescript
import { DmsReplicationTask } from 'cdk-dms-replication'

DmsReplicationTask.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-dms-replication.DmsReplicationTask.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.property.cfnReplicationTask">cfnReplicationTask</a></code> | <code>aws-cdk-lib.aws_dms.CfnReplicationTask</code> | The underlying CloudFormation replication task resource. |
| <code><a href="#cdk-dms-replication.DmsReplicationTask.property.replicationTaskArn">replicationTaskArn</a></code> | <code>string</code> | ARN of the replication task. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-dms-replication.DmsReplicationTask.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfnReplicationTask`<sup>Required</sup> <a name="cfnReplicationTask" id="cdk-dms-replication.DmsReplicationTask.property.cfnReplicationTask"></a>

```typescript
public readonly cfnReplicationTask: CfnReplicationTask;
```

- *Type:* aws-cdk-lib.aws_dms.CfnReplicationTask

The underlying CloudFormation replication task resource.

---

##### `replicationTaskArn`<sup>Required</sup> <a name="replicationTaskArn" id="cdk-dms-replication.DmsReplicationTask.property.replicationTaskArn"></a>

```typescript
public readonly replicationTaskArn: string;
```

- *Type:* string

ARN of the replication task.

---


### DmsServerlessPipeline <a name="DmsServerlessPipeline" id="cdk-dms-replication.DmsServerlessPipeline"></a>

An L3 CDK pattern construct that provisions a DMS Serverless replication pipeline:.

**Replication config** — backed by `CfnReplicationConfig`; DMS auto-scales
  capacity between `minCapacityUnits` and `maxCapacityUnits`.
- **Source endpoint** — supports every engine DMS supports.
- **Target endpoint** — supports every engine DMS supports.
- **Subnet group** — private subnet placement.
- **KMS key** — storage encryption at rest (created if not provided).
- **Security group** — dedicated group (created if not provided).
- **IAM roles** — `dms-vpc-role` and `dms-cloudwatch-logs-role`.
- **CloudWatch log group** — (optional) retains replication logs.

> **CDC start/stop position limitation**: `CfnReplicationConfig` does not
> expose `cdcStartTime` / `cdcStartPosition` / `cdcStopPosition`. To start
> from a specific position, call the `StartReplication` API directly after
> the config is created (e.g. from a Lambda custom resource or CLI).

*Example*

```typescript
const pipeline = new DmsServerlessPipeline(this, 'ServerlessPipeline', {
  vpc,
  maxCapacityUnits: 8,
  migrationType: MigrationType.FULL_LOAD_AND_CDC,
  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.example.com',
    port: 3306,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('mysql-dms-secret'),
  },
  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: cluster.clusterEndpoint.hostname,
    port: 5432,
    username: 'dms_user',
    password: cdk.SecretValue.secretsManager('aurora-dms-secret'),
  },
});
```


#### Initializers <a name="Initializers" id="cdk-dms-replication.DmsServerlessPipeline.Initializer"></a>

```typescript
import { DmsServerlessPipeline } from 'cdk-dms-replication'

new DmsServerlessPipeline(scope: Construct, id: string, props: DmsServerlessPipelineProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps">DmsServerlessPipelineProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-dms-replication.DmsServerlessPipeline.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-dms-replication.DmsServerlessPipelineProps">DmsServerlessPipelineProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-dms-replication.DmsServerlessPipeline.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-dms-replication.DmsServerlessPipeline.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-dms-replication.DmsServerlessPipeline.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-dms-replication.DmsServerlessPipeline.isConstruct"></a>

```typescript
import { DmsServerlessPipeline } from 'cdk-dms-replication'

DmsServerlessPipeline.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-dms-replication.DmsServerlessPipeline.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.cfnReplicationConfig">cfnReplicationConfig</a></code> | <code>aws-cdk-lib.aws_dms.CfnReplicationConfig</code> | The underlying `CfnReplicationConfig` resource. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | The KMS key used for storage encryption. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.replicationConfigArn">replicationConfigArn</a></code> | <code>string</code> | The ARN of the replication config. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.securityGroup">securityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup</code> | The security group attached to this pipeline. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.source">source</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | The source endpoint used by this pipeline. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.subnetGroup">subnetGroup</a></code> | <code>aws-cdk-lib.aws_dms.CfnReplicationSubnetGroup</code> | The replication subnet group created for this pipeline. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.target">target</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | The target endpoint used by this pipeline. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.dmsCloudWatchRole">dmsCloudWatchRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM role that allows DMS to write to CloudWatch Logs. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.dmsVpcRole">dmsVpcRole</a></code> | <code>aws-cdk-lib.aws_iam.Role</code> | IAM role that allows DMS to manage VPC resources (dms-vpc-role). |
| <code><a href="#cdk-dms-replication.DmsServerlessPipeline.property.logGroup">logGroup</a></code> | <code>aws-cdk-lib.aws_logs.LogGroup</code> | CloudWatch log group for the replication config (if enableCloudWatchLogs is true). |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-dms-replication.DmsServerlessPipeline.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cfnReplicationConfig`<sup>Required</sup> <a name="cfnReplicationConfig" id="cdk-dms-replication.DmsServerlessPipeline.property.cfnReplicationConfig"></a>

```typescript
public readonly cfnReplicationConfig: CfnReplicationConfig;
```

- *Type:* aws-cdk-lib.aws_dms.CfnReplicationConfig

The underlying `CfnReplicationConfig` resource.

---

##### `encryptionKey`<sup>Required</sup> <a name="encryptionKey" id="cdk-dms-replication.DmsServerlessPipeline.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

The KMS key used for storage encryption.

---

##### `replicationConfigArn`<sup>Required</sup> <a name="replicationConfigArn" id="cdk-dms-replication.DmsServerlessPipeline.property.replicationConfigArn"></a>

```typescript
public readonly replicationConfigArn: string;
```

- *Type:* string

The ARN of the replication config.

---

##### `securityGroup`<sup>Required</sup> <a name="securityGroup" id="cdk-dms-replication.DmsServerlessPipeline.property.securityGroup"></a>

```typescript
public readonly securityGroup: ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup

The security group attached to this pipeline.

---

##### `source`<sup>Required</sup> <a name="source" id="cdk-dms-replication.DmsServerlessPipeline.property.source"></a>

```typescript
public readonly source: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

The source endpoint used by this pipeline.

---

##### `subnetGroup`<sup>Required</sup> <a name="subnetGroup" id="cdk-dms-replication.DmsServerlessPipeline.property.subnetGroup"></a>

```typescript
public readonly subnetGroup: CfnReplicationSubnetGroup;
```

- *Type:* aws-cdk-lib.aws_dms.CfnReplicationSubnetGroup

The replication subnet group created for this pipeline.

---

##### `target`<sup>Required</sup> <a name="target" id="cdk-dms-replication.DmsServerlessPipeline.property.target"></a>

```typescript
public readonly target: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

The target endpoint used by this pipeline.

---

##### `dmsCloudWatchRole`<sup>Optional</sup> <a name="dmsCloudWatchRole" id="cdk-dms-replication.DmsServerlessPipeline.property.dmsCloudWatchRole"></a>

```typescript
public readonly dmsCloudWatchRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

IAM role that allows DMS to write to CloudWatch Logs.

`undefined` when `createDmsServiceRoles` is `false`.

---

##### `dmsVpcRole`<sup>Optional</sup> <a name="dmsVpcRole" id="cdk-dms-replication.DmsServerlessPipeline.property.dmsVpcRole"></a>

```typescript
public readonly dmsVpcRole: Role;
```

- *Type:* aws-cdk-lib.aws_iam.Role

IAM role that allows DMS to manage VPC resources (dms-vpc-role).

`undefined` when `createDmsServiceRoles` is `false`.

---

##### `logGroup`<sup>Optional</sup> <a name="logGroup" id="cdk-dms-replication.DmsServerlessPipeline.property.logGroup"></a>

```typescript
public readonly logGroup: LogGroup;
```

- *Type:* aws-cdk-lib.aws_logs.LogGroup

CloudWatch log group for the replication config (if enableCloudWatchLogs is true).

---


## Structs <a name="Structs" id="Structs"></a>

### AddColumnDefinition <a name="AddColumnDefinition" id="cdk-dms-replication.AddColumnDefinition"></a>

A column added via an ADD_COLUMN transformation.

#### Initializer <a name="Initializer" id="cdk-dms-replication.AddColumnDefinition.Initializer"></a>

```typescript
import { AddColumnDefinition } from 'cdk-dms-replication'

const addColumnDefinition: AddColumnDefinition = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnName">columnName</a></code> | <code>string</code> | Name of the new column. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnType">columnType</a></code> | <code><a href="#cdk-dms-replication.ColumnDataType">ColumnDataType</a></code> | Data type of the new column. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnLength">columnLength</a></code> | <code>number</code> | Character length for string columns. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnPrecision">columnPrecision</a></code> | <code>number</code> | Precision for numeric columns. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnScale">columnScale</a></code> | <code>number</code> | Scale for numeric columns. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.columnValue">columnValue</a></code> | <code>string</code> | Constant string value to populate the column with. |
| <code><a href="#cdk-dms-replication.AddColumnDefinition.property.expression">expression</a></code> | <code>string</code> | DMS expression to populate the column (e.g. `$timestamp`, `'ENTITY#' \|\| $id`, or an unquoted numeric literal like `42`). Exactly one of `columnValue` or `expression` must be set. |

---

##### `columnName`<sup>Required</sup> <a name="columnName" id="cdk-dms-replication.AddColumnDefinition.property.columnName"></a>

```typescript
public readonly columnName: string;
```

- *Type:* string

Name of the new column.

---

##### `columnType`<sup>Required</sup> <a name="columnType" id="cdk-dms-replication.AddColumnDefinition.property.columnType"></a>

```typescript
public readonly columnType: ColumnDataType;
```

- *Type:* <a href="#cdk-dms-replication.ColumnDataType">ColumnDataType</a>

Data type of the new column.

---

##### `columnLength`<sup>Optional</sup> <a name="columnLength" id="cdk-dms-replication.AddColumnDefinition.property.columnLength"></a>

```typescript
public readonly columnLength: number;
```

- *Type:* number

Character length for string columns.

---

##### `columnPrecision`<sup>Optional</sup> <a name="columnPrecision" id="cdk-dms-replication.AddColumnDefinition.property.columnPrecision"></a>

```typescript
public readonly columnPrecision: number;
```

- *Type:* number

Precision for numeric columns.

---

##### `columnScale`<sup>Optional</sup> <a name="columnScale" id="cdk-dms-replication.AddColumnDefinition.property.columnScale"></a>

```typescript
public readonly columnScale: number;
```

- *Type:* number

Scale for numeric columns.

---

##### `columnValue`<sup>Optional</sup> <a name="columnValue" id="cdk-dms-replication.AddColumnDefinition.property.columnValue"></a>

```typescript
public readonly columnValue: string;
```

- *Type:* string

Constant string value to populate the column with.

Emitted as a
single-quoted DMS expression literal — use only for string column types.
For numeric or datetime types, use `expression` with an unquoted literal
(e.g. `expression: '42'`).
Exactly one of `columnValue` or `expression` must be set.

---

##### `expression`<sup>Optional</sup> <a name="expression" id="cdk-dms-replication.AddColumnDefinition.property.expression"></a>

```typescript
public readonly expression: string;
```

- *Type:* string

DMS expression to populate the column (e.g. `$timestamp`, `'ENTITY#' || $id`, or an unquoted numeric literal like `42`). Exactly one of `columnValue` or `expression` must be set.

---

### CdcSettings <a name="CdcSettings" id="cdk-dms-replication.CdcSettings"></a>

Controls CDC behaviour.

#### Initializer <a name="Initializer" id="cdk-dms-replication.CdcSettings.Initializer"></a>

```typescript
import { CdcSettings } from 'cdk-dms-replication'

const cdcSettings: CdcSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.CdcSettings.property.batchApplyEnabled">batchApplyEnabled</a></code> | <code>boolean</code> | Whether DMS applies changes immediately (false) or batches them (true). |
| <code><a href="#cdk-dms-replication.CdcSettings.property.batchApplyMemoryLimit">batchApplyMemoryLimit</a></code> | <code>number</code> | Memory limit (in MB) for the apply task. |
| <code><a href="#cdk-dms-replication.CdcSettings.property.batchApplyTimeoutMax">batchApplyTimeoutMax</a></code> | <code>number</code> | Maximum number of seconds DMS waits before applying batched changes. |
| <code><a href="#cdk-dms-replication.CdcSettings.property.batchApplyTimeoutMin">batchApplyTimeoutMin</a></code> | <code>number</code> | Number of seconds DMS waits before applying batched changes. |
| <code><a href="#cdk-dms-replication.CdcSettings.property.enableTestMode">enableTestMode</a></code> | <code>boolean</code> | Offset in seconds from current time to use as the CDC start position. |
| <code><a href="#cdk-dms-replication.CdcSettings.property.failOnNoTablesCaptured">failOnNoTablesCaptured</a></code> | <code>boolean</code> | Whether to preserve transactions during CDC. |

---

##### `batchApplyEnabled`<sup>Optional</sup> <a name="batchApplyEnabled" id="cdk-dms-replication.CdcSettings.property.batchApplyEnabled"></a>

```typescript
public readonly batchApplyEnabled: boolean;
```

- *Type:* boolean
- *Default:* false

Whether DMS applies changes immediately (false) or batches them (true).

---

##### `batchApplyMemoryLimit`<sup>Optional</sup> <a name="batchApplyMemoryLimit" id="cdk-dms-replication.CdcSettings.property.batchApplyMemoryLimit"></a>

```typescript
public readonly batchApplyMemoryLimit: number;
```

- *Type:* number
- *Default:* 500

Memory limit (in MB) for the apply task.

---

##### `batchApplyTimeoutMax`<sup>Optional</sup> <a name="batchApplyTimeoutMax" id="cdk-dms-replication.CdcSettings.property.batchApplyTimeoutMax"></a>

```typescript
public readonly batchApplyTimeoutMax: number;
```

- *Type:* number
- *Default:* 30

Maximum number of seconds DMS waits before applying batched changes.

---

##### `batchApplyTimeoutMin`<sup>Optional</sup> <a name="batchApplyTimeoutMin" id="cdk-dms-replication.CdcSettings.property.batchApplyTimeoutMin"></a>

```typescript
public readonly batchApplyTimeoutMin: number;
```

- *Type:* number
- *Default:* 1

Number of seconds DMS waits before applying batched changes.

Only relevant when `batchApplyEnabled` is true.

---

##### `enableTestMode`<sup>Optional</sup> <a name="enableTestMode" id="cdk-dms-replication.CdcSettings.property.enableTestMode"></a>

```typescript
public readonly enableTestMode: boolean;
```

- *Type:* boolean

Offset in seconds from current time to use as the CDC start position.

Ignored when `cdcStartPosition` is set on the task.

---

##### `failOnNoTablesCaptured`<sup>Optional</sup> <a name="failOnNoTablesCaptured" id="cdk-dms-replication.CdcSettings.property.failOnNoTablesCaptured"></a>

```typescript
public readonly failOnNoTablesCaptured: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to preserve transactions during CDC.

---

### Db2Settings <a name="Db2Settings" id="cdk-dms-replication.Db2Settings"></a>

Settings for IBM Db2 LUW endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.Db2Settings.Initializer"></a>

```typescript
import { Db2Settings } from 'cdk-dms-replication'

const db2Settings: Db2Settings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.Db2Settings.property.currentLsn">currentLsn</a></code> | <code>string</code> | Current LSN as of which DMS should start reading. |
| <code><a href="#cdk-dms-replication.Db2Settings.property.maxKBytesPerRead">maxKBytesPerRead</a></code> | <code>number</code> | Maximum number of bytes per read operation. |
| <code><a href="#cdk-dms-replication.Db2Settings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for Secrets Manager. |
| <code><a href="#cdk-dms-replication.Db2Settings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.Db2Settings.property.setDataCaptureChanges">setDataCaptureChanges</a></code> | <code>boolean</code> | Enables ongoing replication (CDC) for Db2. |

---

##### `currentLsn`<sup>Optional</sup> <a name="currentLsn" id="cdk-dms-replication.Db2Settings.property.currentLsn"></a>

```typescript
public readonly currentLsn: string;
```

- *Type:* string

Current LSN as of which DMS should start reading.

---

##### `maxKBytesPerRead`<sup>Optional</sup> <a name="maxKBytesPerRead" id="cdk-dms-replication.Db2Settings.property.maxKBytesPerRead"></a>

```typescript
public readonly maxKBytesPerRead: number;
```

- *Type:* number

Maximum number of bytes per read operation.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.Db2Settings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.Db2Settings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

##### `setDataCaptureChanges`<sup>Optional</sup> <a name="setDataCaptureChanges" id="cdk-dms-replication.Db2Settings.property.setDataCaptureChanges"></a>

```typescript
public readonly setDataCaptureChanges: boolean;
```

- *Type:* boolean

Enables ongoing replication (CDC) for Db2.

---

### DmsEndpointProps <a name="DmsEndpointProps" id="cdk-dms-replication.DmsEndpointProps"></a>

Props for {@link DmsEndpoint}.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DmsEndpointProps.Initializer"></a>

```typescript
import { DmsEndpointProps } from 'cdk-dms-replication'

const dmsEndpointProps: DmsEndpointProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.endpointType">endpointType</a></code> | <code><a href="#cdk-dms-replication.EndpointType">EndpointType</a></code> | Whether this is a source or target endpoint. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.engine">engine</a></code> | <code><a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a></code> | Database engine for this endpoint. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.certificateArn">certificateArn</a></code> | <code>string</code> | ARN of the SSL certificate authority certificate. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.databaseName">databaseName</a></code> | <code>string</code> | Database name on the endpoint. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.db2Settings">db2Settings</a></code> | <code><a href="#cdk-dms-replication.Db2Settings">Db2Settings</a></code> | Settings for IBM Db2 LUW endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.dynamoDbSettings">dynamoDbSettings</a></code> | <code><a href="#cdk-dms-replication.DynamoDbSettings">DynamoDbSettings</a></code> | Settings for Amazon DynamoDB target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.endpointIdentifier">endpointIdentifier</a></code> | <code>string</code> | Logical identifier of the endpoint (used as the DMS endpoint identifier). |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.extraConnectionAttributes">extraConnectionAttributes</a></code> | <code>string</code> | Extra connection attributes as a semicolon-separated string. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.kafkaSettings">kafkaSettings</a></code> | <code><a href="#cdk-dms-replication.KafkaSettings">KafkaSettings</a></code> | Settings for Apache Kafka (and Amazon MSK) target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.kinesisSettings">kinesisSettings</a></code> | <code><a href="#cdk-dms-replication.KinesisSettings">KinesisSettings</a></code> | Settings for Amazon Kinesis Data Streams target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.mongoDbSettings">mongoDbSettings</a></code> | <code><a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a></code> | Settings for MongoDB or Amazon DocumentDB endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.mySqlSettings">mySqlSettings</a></code> | <code><a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a></code> | Settings for MySQL or MariaDB endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.neptuneSettings">neptuneSettings</a></code> | <code><a href="#cdk-dms-replication.NeptuneSettings">NeptuneSettings</a></code> | Settings for Amazon Neptune target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.openSearchSettings">openSearchSettings</a></code> | <code><a href="#cdk-dms-replication.OpenSearchSettings">OpenSearchSettings</a></code> | Settings for Amazon OpenSearch Service target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.oracleSettings">oracleSettings</a></code> | <code><a href="#cdk-dms-replication.OracleSettings">OracleSettings</a></code> | Settings for Oracle endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.password">password</a></code> | <code>aws-cdk-lib.SecretValue</code> | Database password. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.port">port</a></code> | <code>number</code> | Database port. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.postgreSqlSettings">postgreSqlSettings</a></code> | <code><a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a></code> | Settings for PostgreSQL or Aurora PostgreSQL endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.redisSettings">redisSettings</a></code> | <code><a href="#cdk-dms-replication.RedisSettings">RedisSettings</a></code> | Settings for Amazon ElastiCache for Redis target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.redshiftSettings">redshiftSettings</a></code> | <code><a href="#cdk-dms-replication.RedshiftSettings">RedshiftSettings</a></code> | Settings for Amazon Redshift target endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for the endpoint resource. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.s3Settings">s3Settings</a></code> | <code><a href="#cdk-dms-replication.S3Settings">S3Settings</a></code> | Settings for Amazon S3 endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.sapAseSettings">sapAseSettings</a></code> | <code><a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a></code> | Settings for SAP ASE (Sybase) endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.serverName">serverName</a></code> | <code>string</code> | Database server hostname or IP address. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.sqlServerSettings">sqlServerSettings</a></code> | <code><a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a></code> | Settings for Microsoft SQL Server endpoints. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.sslMode">sslMode</a></code> | <code>string</code> | SSL mode for the connection. |
| <code><a href="#cdk-dms-replication.DmsEndpointProps.property.username">username</a></code> | <code>string</code> | Database user name. |

---

##### `endpointType`<sup>Required</sup> <a name="endpointType" id="cdk-dms-replication.DmsEndpointProps.property.endpointType"></a>

```typescript
public readonly endpointType: EndpointType;
```

- *Type:* <a href="#cdk-dms-replication.EndpointType">EndpointType</a>

Whether this is a source or target endpoint.

---

##### `engine`<sup>Required</sup> <a name="engine" id="cdk-dms-replication.DmsEndpointProps.property.engine"></a>

```typescript
public readonly engine: EndpointEngine;
```

- *Type:* <a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a>

Database engine for this endpoint.

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="cdk-dms-replication.DmsEndpointProps.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

ARN of the SSL certificate authority certificate.

Required when sslMode is 'verify-ca' or 'verify-full'.

---

##### `databaseName`<sup>Optional</sup> <a name="databaseName" id="cdk-dms-replication.DmsEndpointProps.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

Database name on the endpoint.

---

##### `db2Settings`<sup>Optional</sup> <a name="db2Settings" id="cdk-dms-replication.DmsEndpointProps.property.db2Settings"></a>

```typescript
public readonly db2Settings: Db2Settings;
```

- *Type:* <a href="#cdk-dms-replication.Db2Settings">Db2Settings</a>

Settings for IBM Db2 LUW endpoints.

---

##### `dynamoDbSettings`<sup>Optional</sup> <a name="dynamoDbSettings" id="cdk-dms-replication.DmsEndpointProps.property.dynamoDbSettings"></a>

```typescript
public readonly dynamoDbSettings: DynamoDbSettings;
```

- *Type:* <a href="#cdk-dms-replication.DynamoDbSettings">DynamoDbSettings</a>

Settings for Amazon DynamoDB target endpoints.

---

##### `endpointIdentifier`<sup>Optional</sup> <a name="endpointIdentifier" id="cdk-dms-replication.DmsEndpointProps.property.endpointIdentifier"></a>

```typescript
public readonly endpointIdentifier: string;
```

- *Type:* string

Logical identifier of the endpoint (used as the DMS endpoint identifier).

Auto-generated from the construct ID if not provided.

---

##### `extraConnectionAttributes`<sup>Optional</sup> <a name="extraConnectionAttributes" id="cdk-dms-replication.DmsEndpointProps.property.extraConnectionAttributes"></a>

```typescript
public readonly extraConnectionAttributes: string;
```

- *Type:* string

Extra connection attributes as a semicolon-separated string.

Refer to the DMS documentation for engine-specific attributes.

---

##### `kafkaSettings`<sup>Optional</sup> <a name="kafkaSettings" id="cdk-dms-replication.DmsEndpointProps.property.kafkaSettings"></a>

```typescript
public readonly kafkaSettings: KafkaSettings;
```

- *Type:* <a href="#cdk-dms-replication.KafkaSettings">KafkaSettings</a>

Settings for Apache Kafka (and Amazon MSK) target endpoints.

---

##### `kinesisSettings`<sup>Optional</sup> <a name="kinesisSettings" id="cdk-dms-replication.DmsEndpointProps.property.kinesisSettings"></a>

```typescript
public readonly kinesisSettings: KinesisSettings;
```

- *Type:* <a href="#cdk-dms-replication.KinesisSettings">KinesisSettings</a>

Settings for Amazon Kinesis Data Streams target endpoints.

---

##### `mongoDbSettings`<sup>Optional</sup> <a name="mongoDbSettings" id="cdk-dms-replication.DmsEndpointProps.property.mongoDbSettings"></a>

```typescript
public readonly mongoDbSettings: MongoDbSettings;
```

- *Type:* <a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a>

Settings for MongoDB or Amazon DocumentDB endpoints.

---

##### `mySqlSettings`<sup>Optional</sup> <a name="mySqlSettings" id="cdk-dms-replication.DmsEndpointProps.property.mySqlSettings"></a>

```typescript
public readonly mySqlSettings: MySqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a>

Settings for MySQL or MariaDB endpoints.

---

##### `neptuneSettings`<sup>Optional</sup> <a name="neptuneSettings" id="cdk-dms-replication.DmsEndpointProps.property.neptuneSettings"></a>

```typescript
public readonly neptuneSettings: NeptuneSettings;
```

- *Type:* <a href="#cdk-dms-replication.NeptuneSettings">NeptuneSettings</a>

Settings for Amazon Neptune target endpoints.

---

##### `openSearchSettings`<sup>Optional</sup> <a name="openSearchSettings" id="cdk-dms-replication.DmsEndpointProps.property.openSearchSettings"></a>

```typescript
public readonly openSearchSettings: OpenSearchSettings;
```

- *Type:* <a href="#cdk-dms-replication.OpenSearchSettings">OpenSearchSettings</a>

Settings for Amazon OpenSearch Service target endpoints.

---

##### `oracleSettings`<sup>Optional</sup> <a name="oracleSettings" id="cdk-dms-replication.DmsEndpointProps.property.oracleSettings"></a>

```typescript
public readonly oracleSettings: OracleSettings;
```

- *Type:* <a href="#cdk-dms-replication.OracleSettings">OracleSettings</a>

Settings for Oracle endpoints.

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk-dms-replication.DmsEndpointProps.property.password"></a>

```typescript
public readonly password: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Database password.

---

##### `port`<sup>Optional</sup> <a name="port" id="cdk-dms-replication.DmsEndpointProps.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

Database port.

---

##### `postgreSqlSettings`<sup>Optional</sup> <a name="postgreSqlSettings" id="cdk-dms-replication.DmsEndpointProps.property.postgreSqlSettings"></a>

```typescript
public readonly postgreSqlSettings: PostgreSqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a>

Settings for PostgreSQL or Aurora PostgreSQL endpoints.

---

##### `redisSettings`<sup>Optional</sup> <a name="redisSettings" id="cdk-dms-replication.DmsEndpointProps.property.redisSettings"></a>

```typescript
public readonly redisSettings: RedisSettings;
```

- *Type:* <a href="#cdk-dms-replication.RedisSettings">RedisSettings</a>

Settings for Amazon ElastiCache for Redis target endpoints.

---

##### `redshiftSettings`<sup>Optional</sup> <a name="redshiftSettings" id="cdk-dms-replication.DmsEndpointProps.property.redshiftSettings"></a>

```typescript
public readonly redshiftSettings: RedshiftSettings;
```

- *Type:* <a href="#cdk-dms-replication.RedshiftSettings">RedshiftSettings</a>

Settings for Amazon Redshift target endpoints.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-dms-replication.DmsEndpointProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* cdk.RemovalPolicy.DESTROY

Removal policy for the endpoint resource.

---

##### `s3Settings`<sup>Optional</sup> <a name="s3Settings" id="cdk-dms-replication.DmsEndpointProps.property.s3Settings"></a>

```typescript
public readonly s3Settings: S3Settings;
```

- *Type:* <a href="#cdk-dms-replication.S3Settings">S3Settings</a>

Settings for Amazon S3 endpoints.

---

##### `sapAseSettings`<sup>Optional</sup> <a name="sapAseSettings" id="cdk-dms-replication.DmsEndpointProps.property.sapAseSettings"></a>

```typescript
public readonly sapAseSettings: SapAseSettings;
```

- *Type:* <a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a>

Settings for SAP ASE (Sybase) endpoints.

---

##### `serverName`<sup>Optional</sup> <a name="serverName" id="cdk-dms-replication.DmsEndpointProps.property.serverName"></a>

```typescript
public readonly serverName: string;
```

- *Type:* string

Database server hostname or IP address.

---

##### `sqlServerSettings`<sup>Optional</sup> <a name="sqlServerSettings" id="cdk-dms-replication.DmsEndpointProps.property.sqlServerSettings"></a>

```typescript
public readonly sqlServerSettings: SqlServerSettings;
```

- *Type:* <a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a>

Settings for Microsoft SQL Server endpoints.

---

##### `sslMode`<sup>Optional</sup> <a name="sslMode" id="cdk-dms-replication.DmsEndpointProps.property.sslMode"></a>

```typescript
public readonly sslMode: string;
```

- *Type:* string
- *Default:* "none"

SSL mode for the connection.

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk-dms-replication.DmsEndpointProps.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

Database user name.

Used when not using Secrets Manager.

---

### DmsMigrationPipelineProps <a name="DmsMigrationPipelineProps" id="cdk-dms-replication.DmsMigrationPipelineProps"></a>

Top-level props for {@link DmsMigrationPipeline}.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DmsMigrationPipelineProps.Initializer"></a>

```typescript
import { DmsMigrationPipelineProps } from 'cdk-dms-replication'

const dmsMigrationPipelineProps: DmsMigrationPipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.migrationType">migrationType</a></code> | <code><a href="#cdk-dms-replication.MigrationType">MigrationType</a></code> | The type of migration to perform. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC in which to place the replication instance. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.allocatedStorage">allocatedStorage</a></code> | <code>number</code> | Allocated storage for the replication instance in GB. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStartPosition">cdcStartPosition</a></code> | <code>string</code> | CDC start position (LSN or equivalent). |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStartTime">cdcStartTime</a></code> | <code>string</code> | CDC start time (ISO-8601 string or Unix epoch seconds). |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStopPosition">cdcStopPosition</a></code> | <code>string</code> | CDC stop position. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.createDmsServiceRoles">createDmsServiceRoles</a></code> | <code>boolean</code> | Whether to create the two account-level DMS service roles (`dms-vpc-role` and `dms-cloudwatch-logs-role`) required by DMS. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.enableCloudWatchLogs">enableCloudWatchLogs</a></code> | <code>boolean</code> | Whether to create a CloudWatch log group for the task. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.encryptionKey">encryptionKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key for encrypting the replication instance storage at rest. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.engineVersion">engineVersion</a></code> | <code>string</code> | Engine version for the replication instance. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.existingSourceEndpoint">existingSourceEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | An existing {@link IDmsEndpoint} to use as the source. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.existingTargetEndpoint">existingTargetEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | An existing {@link IDmsEndpoint} to use as the target. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Retention period for the CloudWatch log group. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.multiAz">multiAz</a></code> | <code>boolean</code> | Whether the replication instance is Multi-AZ. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy applied to all resources in the pipeline. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.replicationInstanceClass">replicationInstanceClass</a></code> | <code><a href="#cdk-dms-replication.ReplicationInstanceClass">ReplicationInstanceClass</a></code> | Replication instance class. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.sourceEndpoint">sourceEndpoint</a></code> | <code><a href="#cdk-dms-replication.SourceEndpointOptions">SourceEndpointOptions</a></code> | Source endpoint configuration. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.tableMappings">tableMappings</a></code> | <code>string</code> | Table mappings JSON string. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.targetEndpoint">targetEndpoint</a></code> | <code><a href="#cdk-dms-replication.TargetEndpointOptions">TargetEndpointOptions</a></code> | Target endpoint configuration. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.taskSettings">taskSettings</a></code> | <code>string</code> | Task settings JSON string. |
| <code><a href="#cdk-dms-replication.DmsMigrationPipelineProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Subnet selection for the replication instance. |

---

##### `migrationType`<sup>Required</sup> <a name="migrationType" id="cdk-dms-replication.DmsMigrationPipelineProps.property.migrationType"></a>

```typescript
public readonly migrationType: MigrationType;
```

- *Type:* <a href="#cdk-dms-replication.MigrationType">MigrationType</a>

The type of migration to perform.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-dms-replication.DmsMigrationPipelineProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC in which to place the replication instance.

The instance is placed in private subnets.

---

##### `allocatedStorage`<sup>Optional</sup> <a name="allocatedStorage" id="cdk-dms-replication.DmsMigrationPipelineProps.property.allocatedStorage"></a>

```typescript
public readonly allocatedStorage: number;
```

- *Type:* number
- *Default:* 100

Allocated storage for the replication instance in GB.

---

##### `cdcStartPosition`<sup>Optional</sup> <a name="cdcStartPosition" id="cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStartPosition"></a>

```typescript
public readonly cdcStartPosition: string;
```

- *Type:* string

CDC start position (LSN or equivalent).

Only used when migrationType includes CDC.

---

##### `cdcStartTime`<sup>Optional</sup> <a name="cdcStartTime" id="cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStartTime"></a>

```typescript
public readonly cdcStartTime: string;
```

- *Type:* string

CDC start time (ISO-8601 string or Unix epoch seconds).

Only used when migrationType includes CDC.

---

##### `cdcStopPosition`<sup>Optional</sup> <a name="cdcStopPosition" id="cdk-dms-replication.DmsMigrationPipelineProps.property.cdcStopPosition"></a>

```typescript
public readonly cdcStopPosition: string;
```

- *Type:* string

CDC stop position.

Only used when migrationType includes CDC.

---

##### `createDmsServiceRoles`<sup>Optional</sup> <a name="createDmsServiceRoles" id="cdk-dms-replication.DmsMigrationPipelineProps.property.createDmsServiceRoles"></a>

```typescript
public readonly createDmsServiceRoles: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create the two account-level DMS service roles (`dms-vpc-role` and `dms-cloudwatch-logs-role`) required by DMS.

Set this to `false` if the roles already exist in the AWS account — for
example, because another CDK stack (or a manual deployment) already
created them. Attempting to create roles with the same name twice in the
same account causes a CloudFormation `EntityAlreadyExists` error.

When `false`, the construct expects the roles to already be present and
skips creating them. The `dmsVpcRole` and `dmsCloudWatchRole` properties
will be `undefined`.

---

##### `enableCloudWatchLogs`<sup>Optional</sup> <a name="enableCloudWatchLogs" id="cdk-dms-replication.DmsMigrationPipelineProps.property.enableCloudWatchLogs"></a>

```typescript
public readonly enableCloudWatchLogs: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create a CloudWatch log group for the task.

---

##### `encryptionKey`<sup>Optional</sup> <a name="encryptionKey" id="cdk-dms-replication.DmsMigrationPipelineProps.property.encryptionKey"></a>

```typescript
public readonly encryptionKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key for encrypting the replication instance storage at rest.

A new key is created if not provided.

---

##### `engineVersion`<sup>Optional</sup> <a name="engineVersion" id="cdk-dms-replication.DmsMigrationPipelineProps.property.engineVersion"></a>

```typescript
public readonly engineVersion: string;
```

- *Type:* string
- *Default:* latest version available in the region (chosen by DMS)

Engine version for the replication instance.

---

##### `existingSourceEndpoint`<sup>Optional</sup> <a name="existingSourceEndpoint" id="cdk-dms-replication.DmsMigrationPipelineProps.property.existingSourceEndpoint"></a>

```typescript
public readonly existingSourceEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

An existing {@link IDmsEndpoint} to use as the source.

Provide this OR `sourceEndpoint` — not both.

---

##### `existingTargetEndpoint`<sup>Optional</sup> <a name="existingTargetEndpoint" id="cdk-dms-replication.DmsMigrationPipelineProps.property.existingTargetEndpoint"></a>

```typescript
public readonly existingTargetEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

An existing {@link IDmsEndpoint} to use as the target.

Provide this OR `targetEndpoint` — not both.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="cdk-dms-replication.DmsMigrationPipelineProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.ONE_MONTH

Retention period for the CloudWatch log group.

---

##### `multiAz`<sup>Optional</sup> <a name="multiAz" id="cdk-dms-replication.DmsMigrationPipelineProps.property.multiAz"></a>

```typescript
public readonly multiAz: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the replication instance is Multi-AZ.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-dms-replication.DmsMigrationPipelineProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* cdk.RemovalPolicy.DESTROY

Removal policy applied to all resources in the pipeline.

---

##### `replicationInstanceClass`<sup>Optional</sup> <a name="replicationInstanceClass" id="cdk-dms-replication.DmsMigrationPipelineProps.property.replicationInstanceClass"></a>

```typescript
public readonly replicationInstanceClass: ReplicationInstanceClass;
```

- *Type:* <a href="#cdk-dms-replication.ReplicationInstanceClass">ReplicationInstanceClass</a>
- *Default:* ReplicationInstanceClass.R6I_LARGE

Replication instance class.

---

##### `sourceEndpoint`<sup>Optional</sup> <a name="sourceEndpoint" id="cdk-dms-replication.DmsMigrationPipelineProps.property.sourceEndpoint"></a>

```typescript
public readonly sourceEndpoint: SourceEndpointOptions;
```

- *Type:* <a href="#cdk-dms-replication.SourceEndpointOptions">SourceEndpointOptions</a>

Source endpoint configuration.

Provide this OR `existingSourceEndpoint` — not both.

---

##### `tableMappings`<sup>Optional</sup> <a name="tableMappings" id="cdk-dms-replication.DmsMigrationPipelineProps.property.tableMappings"></a>

```typescript
public readonly tableMappings: string;
```

- *Type:* string

Table mappings JSON string.

Use {@link TableMappings} to build this.
Defaults to "include all tables in all schemas" if not provided.

---

##### `targetEndpoint`<sup>Optional</sup> <a name="targetEndpoint" id="cdk-dms-replication.DmsMigrationPipelineProps.property.targetEndpoint"></a>

```typescript
public readonly targetEndpoint: TargetEndpointOptions;
```

- *Type:* <a href="#cdk-dms-replication.TargetEndpointOptions">TargetEndpointOptions</a>

Target endpoint configuration.

Provide this OR `existingTargetEndpoint` — not both.

---

##### `taskSettings`<sup>Optional</sup> <a name="taskSettings" id="cdk-dms-replication.DmsMigrationPipelineProps.property.taskSettings"></a>

```typescript
public readonly taskSettings: string;
```

- *Type:* string

Task settings JSON string.

Use {@link TaskSettings} to build this.
Sensible defaults are applied if not provided.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-dms-replication.DmsMigrationPipelineProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* private subnets with egress

Subnet selection for the replication instance.

---

### DmsReplicationInstanceProps <a name="DmsReplicationInstanceProps" id="cdk-dms-replication.DmsReplicationInstanceProps"></a>

Props for {@link DmsReplicationInstance}.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DmsReplicationInstanceProps.Initializer"></a>

```typescript
import { DmsReplicationInstanceProps } from 'cdk-dms-replication'

const dmsReplicationInstanceProps: DmsReplicationInstanceProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC in which to place the replication instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.allocatedStorage">allocatedStorage</a></code> | <code>number</code> | Allocated storage in GB. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.autoMinorVersionUpgrade">autoMinorVersionUpgrade</a></code> | <code>boolean</code> | Whether to allow minor version upgrades to be applied automatically during maintenance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.engineVersion">engineVersion</a></code> | <code>string</code> | Replication engine version. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key used to encrypt the replication instance storage at rest. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.multiAz">multiAz</a></code> | <code>boolean</code> | Whether the replication instance is Multi-AZ. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.preferredMaintenanceWindow">preferredMaintenanceWindow</a></code> | <code>string</code> | Preferred maintenance window, e.g. "sun:04:00-sun:04:30". |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.publiclyAccessible">publiclyAccessible</a></code> | <code>boolean</code> | Whether the replication instance is publicly accessible. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy applied to the replication instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.replicationInstanceClass">replicationInstanceClass</a></code> | <code><a href="#cdk-dms-replication.ReplicationInstanceClass">ReplicationInstanceClass</a></code> | Instance class for the replication instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.replicationInstanceIdentifier">replicationInstanceIdentifier</a></code> | <code>string</code> | Logical name of the replication instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups to attach to the replication instance. |
| <code><a href="#cdk-dms-replication.DmsReplicationInstanceProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Specific subnets to use for the replication subnet group. |

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-dms-replication.DmsReplicationInstanceProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC in which to place the replication instance.

The construct creates a dedicated subnet group from the private subnets.

---

##### `allocatedStorage`<sup>Optional</sup> <a name="allocatedStorage" id="cdk-dms-replication.DmsReplicationInstanceProps.property.allocatedStorage"></a>

```typescript
public readonly allocatedStorage: number;
```

- *Type:* number
- *Default:* 100

Allocated storage in GB.

---

##### `autoMinorVersionUpgrade`<sup>Optional</sup> <a name="autoMinorVersionUpgrade" id="cdk-dms-replication.DmsReplicationInstanceProps.property.autoMinorVersionUpgrade"></a>

```typescript
public readonly autoMinorVersionUpgrade: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to allow minor version upgrades to be applied automatically during maintenance.

---

##### `engineVersion`<sup>Optional</sup> <a name="engineVersion" id="cdk-dms-replication.DmsReplicationInstanceProps.property.engineVersion"></a>

```typescript
public readonly engineVersion: string;
```

- *Type:* string
- *Default:* latest version available in the region (chosen by DMS)

Replication engine version.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-dms-replication.DmsReplicationInstanceProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key used to encrypt the replication instance storage at rest.

A new key is created if not provided.

---

##### `multiAz`<sup>Optional</sup> <a name="multiAz" id="cdk-dms-replication.DmsReplicationInstanceProps.property.multiAz"></a>

```typescript
public readonly multiAz: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the replication instance is Multi-AZ.

---

##### `preferredMaintenanceWindow`<sup>Optional</sup> <a name="preferredMaintenanceWindow" id="cdk-dms-replication.DmsReplicationInstanceProps.property.preferredMaintenanceWindow"></a>

```typescript
public readonly preferredMaintenanceWindow: string;
```

- *Type:* string

Preferred maintenance window, e.g. "sun:04:00-sun:04:30".

---

##### `publiclyAccessible`<sup>Optional</sup> <a name="publiclyAccessible" id="cdk-dms-replication.DmsReplicationInstanceProps.property.publiclyAccessible"></a>

```typescript
public readonly publiclyAccessible: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the replication instance is publicly accessible.

Setting this to true is strongly discouraged for production workloads.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-dms-replication.DmsReplicationInstanceProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* cdk.RemovalPolicy.DESTROY

Removal policy applied to the replication instance.

---

##### `replicationInstanceClass`<sup>Optional</sup> <a name="replicationInstanceClass" id="cdk-dms-replication.DmsReplicationInstanceProps.property.replicationInstanceClass"></a>

```typescript
public readonly replicationInstanceClass: ReplicationInstanceClass;
```

- *Type:* <a href="#cdk-dms-replication.ReplicationInstanceClass">ReplicationInstanceClass</a>
- *Default:* ReplicationInstanceClass.R6I_LARGE

Instance class for the replication instance.

---

##### `replicationInstanceIdentifier`<sup>Optional</sup> <a name="replicationInstanceIdentifier" id="cdk-dms-replication.DmsReplicationInstanceProps.property.replicationInstanceIdentifier"></a>

```typescript
public readonly replicationInstanceIdentifier: string;
```

- *Type:* string
- *Default:* id of the construct

Logical name of the replication instance.

Used in the replication instance identifier and resource naming.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-dms-replication.DmsReplicationInstanceProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups to attach to the replication instance.

A new security group is created if none are provided.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-dms-replication.DmsReplicationInstanceProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection

Specific subnets to use for the replication subnet group.

Defaults to all private subnets in the VPC.

---

### DmsReplicationTaskProps <a name="DmsReplicationTaskProps" id="cdk-dms-replication.DmsReplicationTaskProps"></a>

Props for {@link DmsReplicationTask}.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DmsReplicationTaskProps.Initializer"></a>

```typescript
import { DmsReplicationTaskProps } from 'cdk-dms-replication'

const dmsReplicationTaskProps: DmsReplicationTaskProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.migrationType">migrationType</a></code> | <code><a href="#cdk-dms-replication.MigrationType">MigrationType</a></code> | The migration type. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.replicationInstanceArn">replicationInstanceArn</a></code> | <code>string</code> | ARN of the replication instance to use. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.sourceEndpoint">sourceEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | Source endpoint. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.tableMappings">tableMappings</a></code> | <code>string</code> | Table mappings JSON string. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.targetEndpoint">targetEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | Target endpoint. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.cdcStartPosition">cdcStartPosition</a></code> | <code>string</code> | CDC start position (log sequence number or similar). |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.cdcStartTime">cdcStartTime</a></code> | <code>string</code> | CDC start time as an ISO-8601 string or Unix epoch number. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.cdcStopPosition">cdcStopPosition</a></code> | <code>string</code> | CDC stop position. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy for this resource. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.replicationTaskIdentifier">replicationTaskIdentifier</a></code> | <code>string</code> | Logical name for the replication task. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.tags">tags</a></code> | <code>aws-cdk-lib.CfnTag[]</code> | Tags to apply to the task resource. |
| <code><a href="#cdk-dms-replication.DmsReplicationTaskProps.property.taskSettings">taskSettings</a></code> | <code>string</code> | Task settings JSON string. |

---

##### `migrationType`<sup>Required</sup> <a name="migrationType" id="cdk-dms-replication.DmsReplicationTaskProps.property.migrationType"></a>

```typescript
public readonly migrationType: MigrationType;
```

- *Type:* <a href="#cdk-dms-replication.MigrationType">MigrationType</a>

The migration type.

---

##### `replicationInstanceArn`<sup>Required</sup> <a name="replicationInstanceArn" id="cdk-dms-replication.DmsReplicationTaskProps.property.replicationInstanceArn"></a>

```typescript
public readonly replicationInstanceArn: string;
```

- *Type:* string

ARN of the replication instance to use.

---

##### `sourceEndpoint`<sup>Required</sup> <a name="sourceEndpoint" id="cdk-dms-replication.DmsReplicationTaskProps.property.sourceEndpoint"></a>

```typescript
public readonly sourceEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

Source endpoint.

---

##### `tableMappings`<sup>Required</sup> <a name="tableMappings" id="cdk-dms-replication.DmsReplicationTaskProps.property.tableMappings"></a>

```typescript
public readonly tableMappings: string;
```

- *Type:* string

Table mappings JSON string.

Use {@link TableMappings} to build this, or provide a raw JSON string.

---

*Example*

```typescript
tableMappings: new TableMappings().includeSchema('public').toJson()
```


##### `targetEndpoint`<sup>Required</sup> <a name="targetEndpoint" id="cdk-dms-replication.DmsReplicationTaskProps.property.targetEndpoint"></a>

```typescript
public readonly targetEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

Target endpoint.

---

##### `cdcStartPosition`<sup>Optional</sup> <a name="cdcStartPosition" id="cdk-dms-replication.DmsReplicationTaskProps.property.cdcStartPosition"></a>

```typescript
public readonly cdcStartPosition: string;
```

- *Type:* string

CDC start position (log sequence number or similar).

Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.
Mutually exclusive with cdcStartTime.

---

##### `cdcStartTime`<sup>Optional</sup> <a name="cdcStartTime" id="cdk-dms-replication.DmsReplicationTaskProps.property.cdcStartTime"></a>

```typescript
public readonly cdcStartTime: string;
```

- *Type:* string

CDC start time as an ISO-8601 string or Unix epoch number.

Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.
Mutually exclusive with cdcStartPosition.

---

##### `cdcStopPosition`<sup>Optional</sup> <a name="cdcStopPosition" id="cdk-dms-replication.DmsReplicationTaskProps.property.cdcStopPosition"></a>

```typescript
public readonly cdcStopPosition: string;
```

- *Type:* string

CDC stop position.

The task stops once this position is reached.
Only valid when migrationType is CDC or FULL_LOAD_AND_CDC.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-dms-replication.DmsReplicationTaskProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* cdk.RemovalPolicy.DESTROY

Removal policy for this resource.

---

##### `replicationTaskIdentifier`<sup>Optional</sup> <a name="replicationTaskIdentifier" id="cdk-dms-replication.DmsReplicationTaskProps.property.replicationTaskIdentifier"></a>

```typescript
public readonly replicationTaskIdentifier: string;
```

- *Type:* string

Logical name for the replication task.

Auto-generated from the construct ID if not provided.

---

##### `tags`<sup>Optional</sup> <a name="tags" id="cdk-dms-replication.DmsReplicationTaskProps.property.tags"></a>

```typescript
public readonly tags: CfnTag[];
```

- *Type:* aws-cdk-lib.CfnTag[]

Tags to apply to the task resource.

---

##### `taskSettings`<sup>Optional</sup> <a name="taskSettings" id="cdk-dms-replication.DmsReplicationTaskProps.property.taskSettings"></a>

```typescript
public readonly taskSettings: string;
```

- *Type:* string

Task settings JSON string.

Use {@link TaskSettings} to build this, or provide a raw JSON string.
A sensible default is applied if not provided.

---

### DmsServerlessPipelineProps <a name="DmsServerlessPipelineProps" id="cdk-dms-replication.DmsServerlessPipelineProps"></a>

Props for {@link DmsServerlessPipeline}.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DmsServerlessPipelineProps.Initializer"></a>

```typescript
import { DmsServerlessPipelineProps } from 'cdk-dms-replication'

const dmsServerlessPipelineProps: DmsServerlessPipelineProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.maxCapacityUnits">maxCapacityUnits</a></code> | <code>number</code> | Maximum number of DMS Capacity Units (DCUs) the serverless replication may scale up to. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.migrationType">migrationType</a></code> | <code><a href="#cdk-dms-replication.MigrationType">MigrationType</a></code> | The type of migration to perform. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | VPC in which to place the serverless replication config. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.createDmsServiceRoles">createDmsServiceRoles</a></code> | <code>boolean</code> | Whether to create the two account-level DMS service roles (`dms-vpc-role` and `dms-cloudwatch-logs-role`) required by DMS. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.enableCloudWatchLogs">enableCloudWatchLogs</a></code> | <code>boolean</code> | Whether to create a CloudWatch log group for the replication config. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.existingSourceEndpoint">existingSourceEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | An existing {@link IDmsEndpoint} to use as the source. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.existingTargetEndpoint">existingTargetEndpoint</a></code> | <code><a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a></code> | An existing {@link IDmsEndpoint} to use as the target. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.kmsKey">kmsKey</a></code> | <code>aws-cdk-lib.aws_kms.IKey</code> | KMS key used to encrypt replication storage at rest. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.logRetention">logRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | Retention period for the CloudWatch log group. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.minCapacityUnits">minCapacityUnits</a></code> | <code>number</code> | Minimum number of DCUs DMS will provision at start-up. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.multiAz">multiAz</a></code> | <code>boolean</code> | Whether the serverless replication is Multi-AZ. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.preferredMaintenanceWindow">preferredMaintenanceWindow</a></code> | <code>string</code> | Preferred maintenance window, e.g. "sun:04:00-sun:04:30". |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal policy applied to all resources in the pipeline. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.replicationConfigIdentifier">replicationConfigIdentifier</a></code> | <code>string</code> | Logical identifier for the replication config resource. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.securityGroups">securityGroups</a></code> | <code>aws-cdk-lib.aws_ec2.ISecurityGroup[]</code> | Security groups to attach to the serverless replication config. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.sourceEndpoint">sourceEndpoint</a></code> | <code><a href="#cdk-dms-replication.SourceEndpointOptions">SourceEndpointOptions</a></code> | Source endpoint configuration. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.tableMappings">tableMappings</a></code> | <code>string</code> | Table mappings JSON string. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.targetEndpoint">targetEndpoint</a></code> | <code><a href="#cdk-dms-replication.TargetEndpointOptions">TargetEndpointOptions</a></code> | Target endpoint configuration. |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.taskSettings">taskSettings</a></code> | <code>string</code> | Replication settings JSON string (equivalent to task settings for classic DMS). |
| <code><a href="#cdk-dms-replication.DmsServerlessPipelineProps.property.vpcSubnets">vpcSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetSelection</code> | Subnet selection for the replication subnet group. |

---

##### `maxCapacityUnits`<sup>Required</sup> <a name="maxCapacityUnits" id="cdk-dms-replication.DmsServerlessPipelineProps.property.maxCapacityUnits"></a>

```typescript
public readonly maxCapacityUnits: number;
```

- *Type:* number

Maximum number of DMS Capacity Units (DCUs) the serverless replication may scale up to.

Valid values: 1, 2, 4, 8, 16, 32, 64, 128, 192, 256, 384.

---

##### `migrationType`<sup>Required</sup> <a name="migrationType" id="cdk-dms-replication.DmsServerlessPipelineProps.property.migrationType"></a>

```typescript
public readonly migrationType: MigrationType;
```

- *Type:* <a href="#cdk-dms-replication.MigrationType">MigrationType</a>

The type of migration to perform.

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="cdk-dms-replication.DmsServerlessPipelineProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

VPC in which to place the serverless replication config.

The config is placed in private subnets.

---

##### `createDmsServiceRoles`<sup>Optional</sup> <a name="createDmsServiceRoles" id="cdk-dms-replication.DmsServerlessPipelineProps.property.createDmsServiceRoles"></a>

```typescript
public readonly createDmsServiceRoles: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create the two account-level DMS service roles (`dms-vpc-role` and `dms-cloudwatch-logs-role`) required by DMS.

Set to `false` if the roles already exist — for example, because a
`DmsMigrationPipeline` or a prior manual deployment already created them.
Attempting to create roles with the same name twice causes a CloudFormation
`EntityAlreadyExists` error.

---

##### `enableCloudWatchLogs`<sup>Optional</sup> <a name="enableCloudWatchLogs" id="cdk-dms-replication.DmsServerlessPipelineProps.property.enableCloudWatchLogs"></a>

```typescript
public readonly enableCloudWatchLogs: boolean;
```

- *Type:* boolean
- *Default:* true

Whether to create a CloudWatch log group for the replication config.

---

##### `existingSourceEndpoint`<sup>Optional</sup> <a name="existingSourceEndpoint" id="cdk-dms-replication.DmsServerlessPipelineProps.property.existingSourceEndpoint"></a>

```typescript
public readonly existingSourceEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

An existing {@link IDmsEndpoint} to use as the source.

Provide this OR `sourceEndpoint` — not both.

---

##### `existingTargetEndpoint`<sup>Optional</sup> <a name="existingTargetEndpoint" id="cdk-dms-replication.DmsServerlessPipelineProps.property.existingTargetEndpoint"></a>

```typescript
public readonly existingTargetEndpoint: IDmsEndpoint;
```

- *Type:* <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

An existing {@link IDmsEndpoint} to use as the target.

Provide this OR `targetEndpoint` — not both.

---

##### `kmsKey`<sup>Optional</sup> <a name="kmsKey" id="cdk-dms-replication.DmsServerlessPipelineProps.property.kmsKey"></a>

```typescript
public readonly kmsKey: IKey;
```

- *Type:* aws-cdk-lib.aws_kms.IKey

KMS key used to encrypt replication storage at rest.

A new key is created if not provided.

---

##### `logRetention`<sup>Optional</sup> <a name="logRetention" id="cdk-dms-replication.DmsServerlessPipelineProps.property.logRetention"></a>

```typescript
public readonly logRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* logs.RetentionDays.ONE_MONTH

Retention period for the CloudWatch log group.

---

##### `minCapacityUnits`<sup>Optional</sup> <a name="minCapacityUnits" id="cdk-dms-replication.DmsServerlessPipelineProps.property.minCapacityUnits"></a>

```typescript
public readonly minCapacityUnits: number;
```

- *Type:* number
- *Default:* DMS auto-determines based on workload

Minimum number of DCUs DMS will provision at start-up.

---

##### `multiAz`<sup>Optional</sup> <a name="multiAz" id="cdk-dms-replication.DmsServerlessPipelineProps.property.multiAz"></a>

```typescript
public readonly multiAz: boolean;
```

- *Type:* boolean
- *Default:* false

Whether the serverless replication is Multi-AZ.

---

##### `preferredMaintenanceWindow`<sup>Optional</sup> <a name="preferredMaintenanceWindow" id="cdk-dms-replication.DmsServerlessPipelineProps.property.preferredMaintenanceWindow"></a>

```typescript
public readonly preferredMaintenanceWindow: string;
```

- *Type:* string

Preferred maintenance window, e.g. "sun:04:00-sun:04:30".

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="cdk-dms-replication.DmsServerlessPipelineProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* cdk.RemovalPolicy.DESTROY

Removal policy applied to all resources in the pipeline.

---

##### `replicationConfigIdentifier`<sup>Optional</sup> <a name="replicationConfigIdentifier" id="cdk-dms-replication.DmsServerlessPipelineProps.property.replicationConfigIdentifier"></a>

```typescript
public readonly replicationConfigIdentifier: string;
```

- *Type:* string
- *Default:* unique name derived from the construct id

Logical identifier for the replication config resource.

---

##### `securityGroups`<sup>Optional</sup> <a name="securityGroups" id="cdk-dms-replication.DmsServerlessPipelineProps.property.securityGroups"></a>

```typescript
public readonly securityGroups: ISecurityGroup[];
```

- *Type:* aws-cdk-lib.aws_ec2.ISecurityGroup[]

Security groups to attach to the serverless replication config.

A new security group is created if none are provided.

---

##### `sourceEndpoint`<sup>Optional</sup> <a name="sourceEndpoint" id="cdk-dms-replication.DmsServerlessPipelineProps.property.sourceEndpoint"></a>

```typescript
public readonly sourceEndpoint: SourceEndpointOptions;
```

- *Type:* <a href="#cdk-dms-replication.SourceEndpointOptions">SourceEndpointOptions</a>

Source endpoint configuration.

Provide this OR `existingSourceEndpoint` — not both.

---

##### `tableMappings`<sup>Optional</sup> <a name="tableMappings" id="cdk-dms-replication.DmsServerlessPipelineProps.property.tableMappings"></a>

```typescript
public readonly tableMappings: string;
```

- *Type:* string

Table mappings JSON string.

Use {@link TableMappings} to build this.
Defaults to "include all tables in all schemas" if not provided.

---

##### `targetEndpoint`<sup>Optional</sup> <a name="targetEndpoint" id="cdk-dms-replication.DmsServerlessPipelineProps.property.targetEndpoint"></a>

```typescript
public readonly targetEndpoint: TargetEndpointOptions;
```

- *Type:* <a href="#cdk-dms-replication.TargetEndpointOptions">TargetEndpointOptions</a>

Target endpoint configuration.

Provide this OR `existingTargetEndpoint` — not both.

---

##### `taskSettings`<sup>Optional</sup> <a name="taskSettings" id="cdk-dms-replication.DmsServerlessPipelineProps.property.taskSettings"></a>

```typescript
public readonly taskSettings: string;
```

- *Type:* string

Replication settings JSON string (equivalent to task settings for classic DMS).

Use {@link TaskSettings } to build this.
Sensible defaults are applied by DMS if not provided.

---

##### `vpcSubnets`<sup>Optional</sup> <a name="vpcSubnets" id="cdk-dms-replication.DmsServerlessPipelineProps.property.vpcSubnets"></a>

```typescript
public readonly vpcSubnets: SubnetSelection;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetSelection
- *Default:* private subnets with egress

Subnet selection for the replication subnet group.

---

### DynamoDbSettings <a name="DynamoDbSettings" id="cdk-dms-replication.DynamoDbSettings"></a>

Settings for Amazon DynamoDB target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.DynamoDbSettings.Initializer"></a>

```typescript
import { DynamoDbSettings } from 'cdk-dms-replication'

const dynamoDbSettings: DynamoDbSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.DynamoDbSettings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides DMS access to DynamoDB. |

---

##### `serviceAccessRoleArn`<sup>Required</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.DynamoDbSettings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides DMS access to DynamoDB.

---

### ErrorHandlingSettings <a name="ErrorHandlingSettings" id="cdk-dms-replication.ErrorHandlingSettings"></a>

Controls error handling behaviour.

#### Initializer <a name="Initializer" id="cdk-dms-replication.ErrorHandlingSettings.Initializer"></a>

```typescript
import { ErrorHandlingSettings } from 'cdk-dms-replication'

const errorHandlingSettings: ErrorHandlingSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.dataErrorEscalationCount">dataErrorEscalationCount</a></code> | <code>number</code> | Maximum number of data errors before stopping. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.dataErrorEscalationPolicy">dataErrorEscalationPolicy</a></code> | <code><a href="#cdk-dms-replication.ErrorAction">ErrorAction</a></code> | Action to take after `dataErrorEscalationCount` errors are hit. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.dataErrorPolicy">dataErrorPolicy</a></code> | <code><a href="#cdk-dms-replication.ErrorAction">ErrorAction</a></code> | Action to take when DMS encounters a data error (e.g. duplicate key). |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorCount">recoverableErrorCount</a></code> | <code>number</code> | Whether to recover from recoverable errors. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorInterval">recoverableErrorInterval</a></code> | <code>number</code> | Interval in seconds between recovery attempts. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorThrottling">recoverableErrorThrottling</a></code> | <code>boolean</code> | Throttle factor applied to recovery intervals. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorThrottlingMax">recoverableErrorThrottlingMax</a></code> | <code>number</code> | Maximum interval (seconds) between recovery attempts. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.tableErrorEscalationCount">tableErrorEscalationCount</a></code> | <code>number</code> | Maximum number of table errors before escalation. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.tableErrorEscalationPolicy">tableErrorEscalationPolicy</a></code> | <code><a href="#cdk-dms-replication.ErrorAction">ErrorAction</a></code> | Action after `tableErrorEscalationCount` table errors. |
| <code><a href="#cdk-dms-replication.ErrorHandlingSettings.property.tableErrorPolicy">tableErrorPolicy</a></code> | <code><a href="#cdk-dms-replication.ErrorAction">ErrorAction</a></code> | Action when DMS encounters a table error. |

---

##### `dataErrorEscalationCount`<sup>Optional</sup> <a name="dataErrorEscalationCount" id="cdk-dms-replication.ErrorHandlingSettings.property.dataErrorEscalationCount"></a>

```typescript
public readonly dataErrorEscalationCount: number;
```

- *Type:* number
- *Default:* 0 (unlimited)

Maximum number of data errors before stopping.

---

##### `dataErrorEscalationPolicy`<sup>Optional</sup> <a name="dataErrorEscalationPolicy" id="cdk-dms-replication.ErrorHandlingSettings.property.dataErrorEscalationPolicy"></a>

```typescript
public readonly dataErrorEscalationPolicy: ErrorAction;
```

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>
- *Default:* ErrorAction.STOP_TASK

Action to take after `dataErrorEscalationCount` errors are hit.

---

##### `dataErrorPolicy`<sup>Optional</sup> <a name="dataErrorPolicy" id="cdk-dms-replication.ErrorHandlingSettings.property.dataErrorPolicy"></a>

```typescript
public readonly dataErrorPolicy: ErrorAction;
```

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>
- *Default:* ErrorAction.STOP_TASK

Action to take when DMS encounters a data error (e.g. duplicate key).

---

##### `recoverableErrorCount`<sup>Optional</sup> <a name="recoverableErrorCount" id="cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorCount"></a>

```typescript
public readonly recoverableErrorCount: number;
```

- *Type:* number
- *Default:* true

Whether to recover from recoverable errors.

---

##### `recoverableErrorInterval`<sup>Optional</sup> <a name="recoverableErrorInterval" id="cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorInterval"></a>

```typescript
public readonly recoverableErrorInterval: number;
```

- *Type:* number
- *Default:* 5

Interval in seconds between recovery attempts.

---

##### `recoverableErrorThrottling`<sup>Optional</sup> <a name="recoverableErrorThrottling" id="cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorThrottling"></a>

```typescript
public readonly recoverableErrorThrottling: boolean;
```

- *Type:* boolean
- *Default:* 2

Throttle factor applied to recovery intervals.

---

##### `recoverableErrorThrottlingMax`<sup>Optional</sup> <a name="recoverableErrorThrottlingMax" id="cdk-dms-replication.ErrorHandlingSettings.property.recoverableErrorThrottlingMax"></a>

```typescript
public readonly recoverableErrorThrottlingMax: number;
```

- *Type:* number
- *Default:* 360

Maximum interval (seconds) between recovery attempts.

---

##### `tableErrorEscalationCount`<sup>Optional</sup> <a name="tableErrorEscalationCount" id="cdk-dms-replication.ErrorHandlingSettings.property.tableErrorEscalationCount"></a>

```typescript
public readonly tableErrorEscalationCount: number;
```

- *Type:* number
- *Default:* 0

Maximum number of table errors before escalation.

---

##### `tableErrorEscalationPolicy`<sup>Optional</sup> <a name="tableErrorEscalationPolicy" id="cdk-dms-replication.ErrorHandlingSettings.property.tableErrorEscalationPolicy"></a>

```typescript
public readonly tableErrorEscalationPolicy: ErrorAction;
```

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>
- *Default:* ErrorAction.STOP_TASK

Action after `tableErrorEscalationCount` table errors.

---

##### `tableErrorPolicy`<sup>Optional</sup> <a name="tableErrorPolicy" id="cdk-dms-replication.ErrorHandlingSettings.property.tableErrorPolicy"></a>

```typescript
public readonly tableErrorPolicy: ErrorAction;
```

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>
- *Default:* ErrorAction.STOP_TASK

Action when DMS encounters a table error.

---

### FullLoadSettings <a name="FullLoadSettings" id="cdk-dms-replication.FullLoadSettings"></a>

Controls how the task handles full-load data.

#### Initializer <a name="Initializer" id="cdk-dms-replication.FullLoadSettings.Initializer"></a>

```typescript
import { FullLoadSettings } from 'cdk-dms-replication'

const fullLoadSettings: FullLoadSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.FullLoadSettings.property.commitRate">commitRate</a></code> | <code>number</code> | Whether DMS commits the full load in a single transaction. |
| <code><a href="#cdk-dms-replication.FullLoadSettings.property.maxFullLoadSubTasks">maxFullLoadSubTasks</a></code> | <code>number</code> | Maximum number of tables to load in parallel. |
| <code><a href="#cdk-dms-replication.FullLoadSettings.property.stopTaskCachedChangesApplied">stopTaskCachedChangesApplied</a></code> | <code>boolean</code> | Whether to stop the task after the full load completes (only relevant for full-load tasks without CDC). |
| <code><a href="#cdk-dms-replication.FullLoadSettings.property.targetTablePrepMode">targetTablePrepMode</a></code> | <code>string</code> | Whether to create target tables if they don't exist. |
| <code><a href="#cdk-dms-replication.FullLoadSettings.property.transactionConsistencyTimeout">transactionConsistencyTimeout</a></code> | <code>number</code> | Number of rows to load before a commit. |

---

##### `commitRate`<sup>Optional</sup> <a name="commitRate" id="cdk-dms-replication.FullLoadSettings.property.commitRate"></a>

```typescript
public readonly commitRate: number;
```

- *Type:* number

Whether DMS commits the full load in a single transaction.

---

##### `maxFullLoadSubTasks`<sup>Optional</sup> <a name="maxFullLoadSubTasks" id="cdk-dms-replication.FullLoadSettings.property.maxFullLoadSubTasks"></a>

```typescript
public readonly maxFullLoadSubTasks: number;
```

- *Type:* number
- *Default:* 8

Maximum number of tables to load in parallel.

---

##### `stopTaskCachedChangesApplied`<sup>Optional</sup> <a name="stopTaskCachedChangesApplied" id="cdk-dms-replication.FullLoadSettings.property.stopTaskCachedChangesApplied"></a>

```typescript
public readonly stopTaskCachedChangesApplied: boolean;
```

- *Type:* boolean
- *Default:* false

Whether to stop the task after the full load completes (only relevant for full-load tasks without CDC).

---

##### `targetTablePrepMode`<sup>Optional</sup> <a name="targetTablePrepMode" id="cdk-dms-replication.FullLoadSettings.property.targetTablePrepMode"></a>

```typescript
public readonly targetTablePrepMode: string;
```

- *Type:* string
- *Default:* true

Whether to create target tables if they don't exist.

---

##### `transactionConsistencyTimeout`<sup>Optional</sup> <a name="transactionConsistencyTimeout" id="cdk-dms-replication.FullLoadSettings.property.transactionConsistencyTimeout"></a>

```typescript
public readonly transactionConsistencyTimeout: number;
```

- *Type:* number
- *Default:* 10000

Number of rows to load before a commit.

---

### KafkaSettings <a name="KafkaSettings" id="cdk-dms-replication.KafkaSettings"></a>

Settings for Apache Kafka (and Amazon MSK) target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.KafkaSettings.Initializer"></a>

```typescript
import { KafkaSettings } from 'cdk-dms-replication'

const kafkaSettings: KafkaSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.broker">broker</a></code> | <code>string</code> | Kafka broker(s), e.g. "b-1.msk-cluster.abc123.kafka.us-east-1.amazonaws.com:9092". |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.includeControlDetails">includeControlDetails</a></code> | <code>boolean</code> | Whether to include control details in messages. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.includeNullAndEmpty">includeNullAndEmpty</a></code> | <code>boolean</code> | Whether to include null and empty columns in messages. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.includePartitionValue">includePartitionValue</a></code> | <code>boolean</code> | Whether to include the partition value in messages. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.includeTableAlterOperations">includeTableAlterOperations</a></code> | <code>boolean</code> | Whether to include table ALTER operations. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.includeTransactionDetails">includeTransactionDetails</a></code> | <code>boolean</code> | Whether to include transaction details. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.messageFormat">messageFormat</a></code> | <code><a href="#cdk-dms-replication.MessageFormat">MessageFormat</a></code> | Message format. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.messageMaxBytes">messageMaxBytes</a></code> | <code>number</code> | Maximum message size in bytes. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.noHexPrefix">noHexPrefix</a></code> | <code>boolean</code> | Whether to omit the hex prefix from binary values. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.partitionIncludeSchemaTable">partitionIncludeSchemaTable</a></code> | <code>boolean</code> | Whether to include the schema name in the partition key. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.saslPassword">saslPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | SASL password. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.saslUsername">saslUsername</a></code> | <code>string</code> | SASL username. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.securityProtocol">securityProtocol</a></code> | <code><a href="#cdk-dms-replication.KafkaSecurityProtocol">KafkaSecurityProtocol</a></code> | Security protocol for the Kafka connection. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.sslCaCertificateArn">sslCaCertificateArn</a></code> | <code>string</code> | ARN of the Secrets Manager secret holding the CA certificate. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.sslClientCertificateArn">sslClientCertificateArn</a></code> | <code>string</code> | ARN of the Secrets Manager secret holding the client certificate. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.sslClientKeyArn">sslClientKeyArn</a></code> | <code>string</code> | ARN of the Secrets Manager secret holding the client key. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.sslClientKeyPassword">sslClientKeyPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | Password for the client key. |
| <code><a href="#cdk-dms-replication.KafkaSettings.property.topic">topic</a></code> | <code>string</code> | Topic name to publish to. |

---

##### `broker`<sup>Required</sup> <a name="broker" id="cdk-dms-replication.KafkaSettings.property.broker"></a>

```typescript
public readonly broker: string;
```

- *Type:* string

Kafka broker(s), e.g. "b-1.msk-cluster.abc123.kafka.us-east-1.amazonaws.com:9092".

---

##### `includeControlDetails`<sup>Optional</sup> <a name="includeControlDetails" id="cdk-dms-replication.KafkaSettings.property.includeControlDetails"></a>

```typescript
public readonly includeControlDetails: boolean;
```

- *Type:* boolean

Whether to include control details in messages.

---

##### `includeNullAndEmpty`<sup>Optional</sup> <a name="includeNullAndEmpty" id="cdk-dms-replication.KafkaSettings.property.includeNullAndEmpty"></a>

```typescript
public readonly includeNullAndEmpty: boolean;
```

- *Type:* boolean

Whether to include null and empty columns in messages.

---

##### `includePartitionValue`<sup>Optional</sup> <a name="includePartitionValue" id="cdk-dms-replication.KafkaSettings.property.includePartitionValue"></a>

```typescript
public readonly includePartitionValue: boolean;
```

- *Type:* boolean

Whether to include the partition value in messages.

---

##### `includeTableAlterOperations`<sup>Optional</sup> <a name="includeTableAlterOperations" id="cdk-dms-replication.KafkaSettings.property.includeTableAlterOperations"></a>

```typescript
public readonly includeTableAlterOperations: boolean;
```

- *Type:* boolean

Whether to include table ALTER operations.

---

##### `includeTransactionDetails`<sup>Optional</sup> <a name="includeTransactionDetails" id="cdk-dms-replication.KafkaSettings.property.includeTransactionDetails"></a>

```typescript
public readonly includeTransactionDetails: boolean;
```

- *Type:* boolean

Whether to include transaction details.

---

##### `messageFormat`<sup>Optional</sup> <a name="messageFormat" id="cdk-dms-replication.KafkaSettings.property.messageFormat"></a>

```typescript
public readonly messageFormat: MessageFormat;
```

- *Type:* <a href="#cdk-dms-replication.MessageFormat">MessageFormat</a>

Message format.

---

##### `messageMaxBytes`<sup>Optional</sup> <a name="messageMaxBytes" id="cdk-dms-replication.KafkaSettings.property.messageMaxBytes"></a>

```typescript
public readonly messageMaxBytes: number;
```

- *Type:* number

Maximum message size in bytes.

---

##### `noHexPrefix`<sup>Optional</sup> <a name="noHexPrefix" id="cdk-dms-replication.KafkaSettings.property.noHexPrefix"></a>

```typescript
public readonly noHexPrefix: boolean;
```

- *Type:* boolean

Whether to omit the hex prefix from binary values.

---

##### `partitionIncludeSchemaTable`<sup>Optional</sup> <a name="partitionIncludeSchemaTable" id="cdk-dms-replication.KafkaSettings.property.partitionIncludeSchemaTable"></a>

```typescript
public readonly partitionIncludeSchemaTable: boolean;
```

- *Type:* boolean

Whether to include the schema name in the partition key.

---

##### `saslPassword`<sup>Optional</sup> <a name="saslPassword" id="cdk-dms-replication.KafkaSettings.property.saslPassword"></a>

```typescript
public readonly saslPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

SASL password.

---

##### `saslUsername`<sup>Optional</sup> <a name="saslUsername" id="cdk-dms-replication.KafkaSettings.property.saslUsername"></a>

```typescript
public readonly saslUsername: string;
```

- *Type:* string

SASL username.

---

##### `securityProtocol`<sup>Optional</sup> <a name="securityProtocol" id="cdk-dms-replication.KafkaSettings.property.securityProtocol"></a>

```typescript
public readonly securityProtocol: KafkaSecurityProtocol;
```

- *Type:* <a href="#cdk-dms-replication.KafkaSecurityProtocol">KafkaSecurityProtocol</a>

Security protocol for the Kafka connection.

---

##### `sslCaCertificateArn`<sup>Optional</sup> <a name="sslCaCertificateArn" id="cdk-dms-replication.KafkaSettings.property.sslCaCertificateArn"></a>

```typescript
public readonly sslCaCertificateArn: string;
```

- *Type:* string

ARN of the Secrets Manager secret holding the CA certificate.

---

##### `sslClientCertificateArn`<sup>Optional</sup> <a name="sslClientCertificateArn" id="cdk-dms-replication.KafkaSettings.property.sslClientCertificateArn"></a>

```typescript
public readonly sslClientCertificateArn: string;
```

- *Type:* string

ARN of the Secrets Manager secret holding the client certificate.

---

##### `sslClientKeyArn`<sup>Optional</sup> <a name="sslClientKeyArn" id="cdk-dms-replication.KafkaSettings.property.sslClientKeyArn"></a>

```typescript
public readonly sslClientKeyArn: string;
```

- *Type:* string

ARN of the Secrets Manager secret holding the client key.

---

##### `sslClientKeyPassword`<sup>Optional</sup> <a name="sslClientKeyPassword" id="cdk-dms-replication.KafkaSettings.property.sslClientKeyPassword"></a>

```typescript
public readonly sslClientKeyPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Password for the client key.

---

##### `topic`<sup>Optional</sup> <a name="topic" id="cdk-dms-replication.KafkaSettings.property.topic"></a>

```typescript
public readonly topic: string;
```

- *Type:* string

Topic name to publish to.

---

### KinesisSettings <a name="KinesisSettings" id="cdk-dms-replication.KinesisSettings"></a>

Settings for Amazon Kinesis Data Streams target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.KinesisSettings.Initializer"></a>

```typescript
import { KinesisSettings } from 'cdk-dms-replication'

const kinesisSettings: KinesisSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides DMS access to Kinesis. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.streamArn">streamArn</a></code> | <code>string</code> | ARN of the Kinesis stream. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.includeControlDetails">includeControlDetails</a></code> | <code>boolean</code> | Whether to include control details in messages. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.includeNullAndEmpty">includeNullAndEmpty</a></code> | <code>boolean</code> | Whether to include null and empty columns in messages. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.includePartitionValue">includePartitionValue</a></code> | <code>boolean</code> | Whether to include the partition value in messages. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.includeTableAlterOperations">includeTableAlterOperations</a></code> | <code>boolean</code> | Whether to include table ALTER operations in messages. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.includeTransactionDetails">includeTransactionDetails</a></code> | <code>boolean</code> | Whether to include transaction details in messages. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.messageFormat">messageFormat</a></code> | <code><a href="#cdk-dms-replication.MessageFormat">MessageFormat</a></code> | Message format. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.noHexPrefix">noHexPrefix</a></code> | <code>boolean</code> | Whether to omit the hex prefix from binary values. |
| <code><a href="#cdk-dms-replication.KinesisSettings.property.partitionIncludeSchemaTable">partitionIncludeSchemaTable</a></code> | <code>boolean</code> | Whether to include the schema name in the partition key. |

---

##### `serviceAccessRoleArn`<sup>Required</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.KinesisSettings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides DMS access to Kinesis.

---

##### `streamArn`<sup>Required</sup> <a name="streamArn" id="cdk-dms-replication.KinesisSettings.property.streamArn"></a>

```typescript
public readonly streamArn: string;
```

- *Type:* string

ARN of the Kinesis stream.

---

##### `includeControlDetails`<sup>Optional</sup> <a name="includeControlDetails" id="cdk-dms-replication.KinesisSettings.property.includeControlDetails"></a>

```typescript
public readonly includeControlDetails: boolean;
```

- *Type:* boolean

Whether to include control details in messages.

---

##### `includeNullAndEmpty`<sup>Optional</sup> <a name="includeNullAndEmpty" id="cdk-dms-replication.KinesisSettings.property.includeNullAndEmpty"></a>

```typescript
public readonly includeNullAndEmpty: boolean;
```

- *Type:* boolean

Whether to include null and empty columns in messages.

---

##### `includePartitionValue`<sup>Optional</sup> <a name="includePartitionValue" id="cdk-dms-replication.KinesisSettings.property.includePartitionValue"></a>

```typescript
public readonly includePartitionValue: boolean;
```

- *Type:* boolean

Whether to include the partition value in messages.

---

##### `includeTableAlterOperations`<sup>Optional</sup> <a name="includeTableAlterOperations" id="cdk-dms-replication.KinesisSettings.property.includeTableAlterOperations"></a>

```typescript
public readonly includeTableAlterOperations: boolean;
```

- *Type:* boolean

Whether to include table ALTER operations in messages.

---

##### `includeTransactionDetails`<sup>Optional</sup> <a name="includeTransactionDetails" id="cdk-dms-replication.KinesisSettings.property.includeTransactionDetails"></a>

```typescript
public readonly includeTransactionDetails: boolean;
```

- *Type:* boolean

Whether to include transaction details in messages.

---

##### `messageFormat`<sup>Optional</sup> <a name="messageFormat" id="cdk-dms-replication.KinesisSettings.property.messageFormat"></a>

```typescript
public readonly messageFormat: MessageFormat;
```

- *Type:* <a href="#cdk-dms-replication.MessageFormat">MessageFormat</a>

Message format.

---

##### `noHexPrefix`<sup>Optional</sup> <a name="noHexPrefix" id="cdk-dms-replication.KinesisSettings.property.noHexPrefix"></a>

```typescript
public readonly noHexPrefix: boolean;
```

- *Type:* boolean

Whether to omit the hex prefix from binary values.

---

##### `partitionIncludeSchemaTable`<sup>Optional</sup> <a name="partitionIncludeSchemaTable" id="cdk-dms-replication.KinesisSettings.property.partitionIncludeSchemaTable"></a>

```typescript
public readonly partitionIncludeSchemaTable: boolean;
```

- *Type:* boolean

Whether to include the schema name in the partition key.

---

### LogComponentSettings <a name="LogComponentSettings" id="cdk-dms-replication.LogComponentSettings"></a>

Logging configuration for a single DMS log component.

#### Initializer <a name="Initializer" id="cdk-dms-replication.LogComponentSettings.Initializer"></a>

```typescript
import { LogComponentSettings } from 'cdk-dms-replication'

const logComponentSettings: LogComponentSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.LogComponentSettings.property.loggingLevel">loggingLevel</a></code> | <code><a href="#cdk-dms-replication.LoggingLevel">LoggingLevel</a></code> | Logging level for this component. |

---

##### `loggingLevel`<sup>Optional</sup> <a name="loggingLevel" id="cdk-dms-replication.LogComponentSettings.property.loggingLevel"></a>

```typescript
public readonly loggingLevel: LoggingLevel;
```

- *Type:* <a href="#cdk-dms-replication.LoggingLevel">LoggingLevel</a>

Logging level for this component.

---

### MongoDbSettings <a name="MongoDbSettings" id="cdk-dms-replication.MongoDbSettings"></a>

Settings shared by MongoDB and DocumentDB endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.MongoDbSettings.Initializer"></a>

```typescript
import { MongoDbSettings } from 'cdk-dms-replication'

const mongoDbSettings: MongoDbSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.authMechanism">authMechanism</a></code> | <code><a href="#cdk-dms-replication.MongoAuthMechanism">MongoAuthMechanism</a></code> | Authentication mechanism for the MongoDB endpoint. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.authSource">authSource</a></code> | <code>string</code> | Database that MongoDB uses to authenticate. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.authType">authType</a></code> | <code><a href="#cdk-dms-replication.MongoAuthType">MongoAuthType</a></code> | Authentication type. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.docsToInvestigate">docsToInvestigate</a></code> | <code>number</code> | Number of documents to preview to determine data structure. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.extractDocId">extractDocId</a></code> | <code>boolean</code> | Specifies the document ID, which DMS includes as the primary key. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.nestingLevel">nestingLevel</a></code> | <code><a href="#cdk-dms-replication.MongoNestingLevel">MongoNestingLevel</a></code> | Nesting level for MongoDB documents. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for Secrets Manager. |
| <code><a href="#cdk-dms-replication.MongoDbSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |

---

##### `authMechanism`<sup>Optional</sup> <a name="authMechanism" id="cdk-dms-replication.MongoDbSettings.property.authMechanism"></a>

```typescript
public readonly authMechanism: MongoAuthMechanism;
```

- *Type:* <a href="#cdk-dms-replication.MongoAuthMechanism">MongoAuthMechanism</a>

Authentication mechanism for the MongoDB endpoint.

---

##### `authSource`<sup>Optional</sup> <a name="authSource" id="cdk-dms-replication.MongoDbSettings.property.authSource"></a>

```typescript
public readonly authSource: string;
```

- *Type:* string

Database that MongoDB uses to authenticate.

---

##### `authType`<sup>Optional</sup> <a name="authType" id="cdk-dms-replication.MongoDbSettings.property.authType"></a>

```typescript
public readonly authType: MongoAuthType;
```

- *Type:* <a href="#cdk-dms-replication.MongoAuthType">MongoAuthType</a>

Authentication type.

---

##### `docsToInvestigate`<sup>Optional</sup> <a name="docsToInvestigate" id="cdk-dms-replication.MongoDbSettings.property.docsToInvestigate"></a>

```typescript
public readonly docsToInvestigate: number;
```

- *Type:* number

Number of documents to preview to determine data structure.

---

##### `extractDocId`<sup>Optional</sup> <a name="extractDocId" id="cdk-dms-replication.MongoDbSettings.property.extractDocId"></a>

```typescript
public readonly extractDocId: boolean;
```

- *Type:* boolean

Specifies the document ID, which DMS includes as the primary key.

---

##### `nestingLevel`<sup>Optional</sup> <a name="nestingLevel" id="cdk-dms-replication.MongoDbSettings.property.nestingLevel"></a>

```typescript
public readonly nestingLevel: MongoNestingLevel;
```

- *Type:* <a href="#cdk-dms-replication.MongoNestingLevel">MongoNestingLevel</a>

Nesting level for MongoDB documents.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.MongoDbSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.MongoDbSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

### MySqlSettings <a name="MySqlSettings" id="cdk-dms-replication.MySqlSettings"></a>

Settings for MySQL and MariaDB endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.MySqlSettings.Initializer"></a>

```typescript
import { MySqlSettings } from 'cdk-dms-replication'

const mySqlSettings: MySqlSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.afterConnectScript">afterConnectScript</a></code> | <code>string</code> | SQL to run after connecting to the endpoint. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.cleanSourceMetadataOnMismatch">cleanSourceMetadataOnMismatch</a></code> | <code>boolean</code> | Remove metadata from source that differs from target during full load. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.eventsPollInterval">eventsPollInterval</a></code> | <code>number</code> | Interval in seconds between polls for source events during CDC. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.maxFileSize">maxFileSize</a></code> | <code>number</code> | Maximum file size (in KB) for CSV files created during full load. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.parallelLoadThreads">parallelLoadThreads</a></code> | <code>number</code> | Number of parallel threads to use for a full load. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides access to the Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the secret in AWS Secrets Manager containing the endpoint connection details. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.serverTimezone">serverTimezone</a></code> | <code>string</code> | Specifies the time zone for source MySQL. |
| <code><a href="#cdk-dms-replication.MySqlSettings.property.targetDbType">targetDbType</a></code> | <code><a href="#cdk-dms-replication.MySqlTargetDbType">MySqlTargetDbType</a></code> | For a MySQL target, specifies how tables are created. |

---

##### `afterConnectScript`<sup>Optional</sup> <a name="afterConnectScript" id="cdk-dms-replication.MySqlSettings.property.afterConnectScript"></a>

```typescript
public readonly afterConnectScript: string;
```

- *Type:* string

SQL to run after connecting to the endpoint.

---

##### `cleanSourceMetadataOnMismatch`<sup>Optional</sup> <a name="cleanSourceMetadataOnMismatch" id="cdk-dms-replication.MySqlSettings.property.cleanSourceMetadataOnMismatch"></a>

```typescript
public readonly cleanSourceMetadataOnMismatch: boolean;
```

- *Type:* boolean

Remove metadata from source that differs from target during full load.

---

##### `eventsPollInterval`<sup>Optional</sup> <a name="eventsPollInterval" id="cdk-dms-replication.MySqlSettings.property.eventsPollInterval"></a>

```typescript
public readonly eventsPollInterval: number;
```

- *Type:* number

Interval in seconds between polls for source events during CDC.

---

##### `maxFileSize`<sup>Optional</sup> <a name="maxFileSize" id="cdk-dms-replication.MySqlSettings.property.maxFileSize"></a>

```typescript
public readonly maxFileSize: number;
```

- *Type:* number

Maximum file size (in KB) for CSV files created during full load.

---

##### `parallelLoadThreads`<sup>Optional</sup> <a name="parallelLoadThreads" id="cdk-dms-replication.MySqlSettings.property.parallelLoadThreads"></a>

```typescript
public readonly parallelLoadThreads: number;
```

- *Type:* number

Number of parallel threads to use for a full load.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.MySqlSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides access to the Secrets Manager secret.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.MySqlSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the secret in AWS Secrets Manager containing the endpoint connection details.

---

##### `serverTimezone`<sup>Optional</sup> <a name="serverTimezone" id="cdk-dms-replication.MySqlSettings.property.serverTimezone"></a>

```typescript
public readonly serverTimezone: string;
```

- *Type:* string

Specifies the time zone for source MySQL.

---

##### `targetDbType`<sup>Optional</sup> <a name="targetDbType" id="cdk-dms-replication.MySqlSettings.property.targetDbType"></a>

```typescript
public readonly targetDbType: MySqlTargetDbType;
```

- *Type:* <a href="#cdk-dms-replication.MySqlTargetDbType">MySqlTargetDbType</a>

For a MySQL target, specifies how tables are created.

---

### NeptuneSettings <a name="NeptuneSettings" id="cdk-dms-replication.NeptuneSettings"></a>

Settings for Amazon Neptune target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.NeptuneSettings.Initializer"></a>

```typescript
import { NeptuneSettings } from 'cdk-dms-replication'

const neptuneSettings: NeptuneSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.s3BucketFolder">s3BucketFolder</a></code> | <code>string</code> | Folder within the S3 bucket for Neptune staging data. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.s3BucketName">s3BucketName</a></code> | <code>string</code> | S3 bucket where DMS stages the migration data. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides DMS access to S3 and Neptune. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.errorRetryDuration">errorRetryDuration</a></code> | <code>number</code> | Number of seconds to retry on errors before failing the task. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.iamAuthEnabled">iamAuthEnabled</a></code> | <code>boolean</code> | Whether IAM auth is enabled on the Neptune cluster. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.maxFileSize">maxFileSize</a></code> | <code>number</code> | Maximum number of files per request to the Neptune bulk-load API. |
| <code><a href="#cdk-dms-replication.NeptuneSettings.property.maxRetryCount">maxRetryCount</a></code> | <code>number</code> | Maximum number of retries on endpoint exceptions. |

---

##### `s3BucketFolder`<sup>Required</sup> <a name="s3BucketFolder" id="cdk-dms-replication.NeptuneSettings.property.s3BucketFolder"></a>

```typescript
public readonly s3BucketFolder: string;
```

- *Type:* string

Folder within the S3 bucket for Neptune staging data.

---

##### `s3BucketName`<sup>Required</sup> <a name="s3BucketName" id="cdk-dms-replication.NeptuneSettings.property.s3BucketName"></a>

```typescript
public readonly s3BucketName: string;
```

- *Type:* string

S3 bucket where DMS stages the migration data.

---

##### `serviceAccessRoleArn`<sup>Required</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.NeptuneSettings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides DMS access to S3 and Neptune.

---

##### `errorRetryDuration`<sup>Optional</sup> <a name="errorRetryDuration" id="cdk-dms-replication.NeptuneSettings.property.errorRetryDuration"></a>

```typescript
public readonly errorRetryDuration: number;
```

- *Type:* number

Number of seconds to retry on errors before failing the task.

---

##### `iamAuthEnabled`<sup>Optional</sup> <a name="iamAuthEnabled" id="cdk-dms-replication.NeptuneSettings.property.iamAuthEnabled"></a>

```typescript
public readonly iamAuthEnabled: boolean;
```

- *Type:* boolean

Whether IAM auth is enabled on the Neptune cluster.

---

##### `maxFileSize`<sup>Optional</sup> <a name="maxFileSize" id="cdk-dms-replication.NeptuneSettings.property.maxFileSize"></a>

```typescript
public readonly maxFileSize: number;
```

- *Type:* number

Maximum number of files per request to the Neptune bulk-load API.

---

##### `maxRetryCount`<sup>Optional</sup> <a name="maxRetryCount" id="cdk-dms-replication.NeptuneSettings.property.maxRetryCount"></a>

```typescript
public readonly maxRetryCount: number;
```

- *Type:* number

Maximum number of retries on endpoint exceptions.

---

### OpenSearchSettings <a name="OpenSearchSettings" id="cdk-dms-replication.OpenSearchSettings"></a>

Settings for Amazon OpenSearch Service target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.OpenSearchSettings.Initializer"></a>

```typescript
import { OpenSearchSettings } from 'cdk-dms-replication'

const openSearchSettings: OpenSearchSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.OpenSearchSettings.property.endpointUri">endpointUri</a></code> | <code>string</code> | Endpoint URL of the OpenSearch cluster (e.g. https://my-domain.us-east-1.es.amazonaws.com). |
| <code><a href="#cdk-dms-replication.OpenSearchSettings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides DMS access to OpenSearch. |
| <code><a href="#cdk-dms-replication.OpenSearchSettings.property.errorRetryDuration">errorRetryDuration</a></code> | <code>number</code> | Number of seconds to retry on errors before failing. |
| <code><a href="#cdk-dms-replication.OpenSearchSettings.property.fullLoadErrorPercentage">fullLoadErrorPercentage</a></code> | <code>number</code> | Maximum percentage of records that may fail before the task is stopped. |

---

##### `endpointUri`<sup>Required</sup> <a name="endpointUri" id="cdk-dms-replication.OpenSearchSettings.property.endpointUri"></a>

```typescript
public readonly endpointUri: string;
```

- *Type:* string

Endpoint URL of the OpenSearch cluster (e.g. https://my-domain.us-east-1.es.amazonaws.com).

---

##### `serviceAccessRoleArn`<sup>Required</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.OpenSearchSettings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides DMS access to OpenSearch.

---

##### `errorRetryDuration`<sup>Optional</sup> <a name="errorRetryDuration" id="cdk-dms-replication.OpenSearchSettings.property.errorRetryDuration"></a>

```typescript
public readonly errorRetryDuration: number;
```

- *Type:* number

Number of seconds to retry on errors before failing.

---

##### `fullLoadErrorPercentage`<sup>Optional</sup> <a name="fullLoadErrorPercentage" id="cdk-dms-replication.OpenSearchSettings.property.fullLoadErrorPercentage"></a>

```typescript
public readonly fullLoadErrorPercentage: number;
```

- *Type:* number

Maximum percentage of records that may fail before the task is stopped.

---

### OracleSettings <a name="OracleSettings" id="cdk-dms-replication.OracleSettings"></a>

Settings for Oracle endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.OracleSettings.Initializer"></a>

```typescript
import { OracleSettings } from 'cdk-dms-replication'

const oracleSettings: OracleSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.OracleSettings.property.accessAlternateDirectly">accessAlternateDirectly</a></code> | <code>boolean</code> | Set to true to access the supplemental log directly. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.additionalArchivedLogDestId">additionalArchivedLogDestId</a></code> | <code>number</code> | Additional archived redo log destination ID. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.addSupplementalLogging">addSupplementalLogging</a></code> | <code>boolean</code> | Whether DMS adds supplemental logging. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.allowSelectNestedTables">allowSelectNestedTables</a></code> | <code>boolean</code> | Allows DMS to access SELECT on nested tables. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.archivedLogDestId">archivedLogDestId</a></code> | <code>number</code> | Destination ID of the archived redo log. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.archivedLogsOnly">archivedLogsOnly</a></code> | <code>boolean</code> | Reads changes only from archived redo logs (no online redo). |
| <code><a href="#cdk-dms-replication.OracleSettings.property.asmPassword">asmPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | ASM password. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.asmServer">asmServer</a></code> | <code>string</code> | ASM server address. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.asmUser">asmUser</a></code> | <code>string</code> | ASM user name. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.charLengthSemantics">charLengthSemantics</a></code> | <code>string</code> | Semantics for char length: BYTE or CHAR. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.directPathNoLog">directPathNoLog</a></code> | <code>boolean</code> | Whether DMS uses direct path full load. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.directPathParallelLoad">directPathParallelLoad</a></code> | <code>boolean</code> | Whether to load in parallel using direct path. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.enableHomogenousTablespace">enableHomogenousTablespace</a></code> | <code>boolean</code> | Specifies whether Oracle homogeneous tablespace migration is enabled. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.extraArchivedLogDestIds">extraArchivedLogDestIds</a></code> | <code>number[]</code> | Extra archived log destination IDs (up to 10). |
| <code><a href="#cdk-dms-replication.OracleSettings.property.failTasksOnLobTruncation">failTasksOnLobTruncation</a></code> | <code>boolean</code> | Whether tasks fail if a LOB column is truncated. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.numberDatatypeScale">numberDatatypeScale</a></code> | <code>number</code> | Precision to use when converting Oracle NUMBER to Amazon Redshift NUMERIC. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.oraclePathPrefix">oraclePathPrefix</a></code> | <code>string</code> | Path prefix used for the location of the online redo log. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.parallelAsmReadThreads">parallelAsmReadThreads</a></code> | <code>number</code> | Number of threads for parallel ASM reading. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.readAheadBlocks">readAheadBlocks</a></code> | <code>number</code> | Number of read-ahead blocks. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.readTableSpaceName">readTableSpaceName</a></code> | <code>boolean</code> | Read the tablespace name from the online redo log. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.retryInterval">retryInterval</a></code> | <code>number</code> | Retry interval in seconds when no archivelog is found. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for accessing Secrets Manager (main secret). |
| <code><a href="#cdk-dms-replication.OracleSettings.property.secretsManagerOracleAsmAccessRoleArn">secretsManagerOracleAsmAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for accessing the ASM Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.secretsManagerOracleAsmSecretId">secretsManagerOracleAsmSecretId</a></code> | <code>string</code> | Full ARN of the ASM secret in Secrets Manager. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN of the main Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.securityDbEncryptionName">securityDbEncryptionName</a></code> | <code>string</code> | Name of the transparent data encryption (TDE) wallet. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.useAlternateFolderForOnline">useAlternateFolderForOnline</a></code> | <code>boolean</code> | Use an alternate folder for online redo logs. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.useBFile">useBFile</a></code> | <code>boolean</code> | Use B-file for large object replication. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.useDirectPathFullLoad">useDirectPathFullLoad</a></code> | <code>boolean</code> | Use direct path full load. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.useLogminerReader">useLogminerReader</a></code> | <code>boolean</code> | Use LogMiner for CDC. |
| <code><a href="#cdk-dms-replication.OracleSettings.property.usePathPrefix">usePathPrefix</a></code> | <code>string</code> | Use a path prefix for the location of the online redo log. |

---

##### `accessAlternateDirectly`<sup>Optional</sup> <a name="accessAlternateDirectly" id="cdk-dms-replication.OracleSettings.property.accessAlternateDirectly"></a>

```typescript
public readonly accessAlternateDirectly: boolean;
```

- *Type:* boolean

Set to true to access the supplemental log directly.

---

##### `additionalArchivedLogDestId`<sup>Optional</sup> <a name="additionalArchivedLogDestId" id="cdk-dms-replication.OracleSettings.property.additionalArchivedLogDestId"></a>

```typescript
public readonly additionalArchivedLogDestId: number;
```

- *Type:* number

Additional archived redo log destination ID.

---

##### `addSupplementalLogging`<sup>Optional</sup> <a name="addSupplementalLogging" id="cdk-dms-replication.OracleSettings.property.addSupplementalLogging"></a>

```typescript
public readonly addSupplementalLogging: boolean;
```

- *Type:* boolean

Whether DMS adds supplemental logging.

---

##### `allowSelectNestedTables`<sup>Optional</sup> <a name="allowSelectNestedTables" id="cdk-dms-replication.OracleSettings.property.allowSelectNestedTables"></a>

```typescript
public readonly allowSelectNestedTables: boolean;
```

- *Type:* boolean

Allows DMS to access SELECT on nested tables.

---

##### `archivedLogDestId`<sup>Optional</sup> <a name="archivedLogDestId" id="cdk-dms-replication.OracleSettings.property.archivedLogDestId"></a>

```typescript
public readonly archivedLogDestId: number;
```

- *Type:* number

Destination ID of the archived redo log.

---

##### `archivedLogsOnly`<sup>Optional</sup> <a name="archivedLogsOnly" id="cdk-dms-replication.OracleSettings.property.archivedLogsOnly"></a>

```typescript
public readonly archivedLogsOnly: boolean;
```

- *Type:* boolean

Reads changes only from archived redo logs (no online redo).

---

##### `asmPassword`<sup>Optional</sup> <a name="asmPassword" id="cdk-dms-replication.OracleSettings.property.asmPassword"></a>

```typescript
public readonly asmPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

ASM password.

---

##### `asmServer`<sup>Optional</sup> <a name="asmServer" id="cdk-dms-replication.OracleSettings.property.asmServer"></a>

```typescript
public readonly asmServer: string;
```

- *Type:* string

ASM server address.

---

##### `asmUser`<sup>Optional</sup> <a name="asmUser" id="cdk-dms-replication.OracleSettings.property.asmUser"></a>

```typescript
public readonly asmUser: string;
```

- *Type:* string

ASM user name.

---

##### `charLengthSemantics`<sup>Optional</sup> <a name="charLengthSemantics" id="cdk-dms-replication.OracleSettings.property.charLengthSemantics"></a>

```typescript
public readonly charLengthSemantics: string;
```

- *Type:* string

Semantics for char length: BYTE or CHAR.

---

##### `directPathNoLog`<sup>Optional</sup> <a name="directPathNoLog" id="cdk-dms-replication.OracleSettings.property.directPathNoLog"></a>

```typescript
public readonly directPathNoLog: boolean;
```

- *Type:* boolean

Whether DMS uses direct path full load.

---

##### `directPathParallelLoad`<sup>Optional</sup> <a name="directPathParallelLoad" id="cdk-dms-replication.OracleSettings.property.directPathParallelLoad"></a>

```typescript
public readonly directPathParallelLoad: boolean;
```

- *Type:* boolean

Whether to load in parallel using direct path.

---

##### `enableHomogenousTablespace`<sup>Optional</sup> <a name="enableHomogenousTablespace" id="cdk-dms-replication.OracleSettings.property.enableHomogenousTablespace"></a>

```typescript
public readonly enableHomogenousTablespace: boolean;
```

- *Type:* boolean

Specifies whether Oracle homogeneous tablespace migration is enabled.

---

##### `extraArchivedLogDestIds`<sup>Optional</sup> <a name="extraArchivedLogDestIds" id="cdk-dms-replication.OracleSettings.property.extraArchivedLogDestIds"></a>

```typescript
public readonly extraArchivedLogDestIds: number[];
```

- *Type:* number[]

Extra archived log destination IDs (up to 10).

---

##### `failTasksOnLobTruncation`<sup>Optional</sup> <a name="failTasksOnLobTruncation" id="cdk-dms-replication.OracleSettings.property.failTasksOnLobTruncation"></a>

```typescript
public readonly failTasksOnLobTruncation: boolean;
```

- *Type:* boolean

Whether tasks fail if a LOB column is truncated.

---

##### `numberDatatypeScale`<sup>Optional</sup> <a name="numberDatatypeScale" id="cdk-dms-replication.OracleSettings.property.numberDatatypeScale"></a>

```typescript
public readonly numberDatatypeScale: number;
```

- *Type:* number

Precision to use when converting Oracle NUMBER to Amazon Redshift NUMERIC.

---

##### `oraclePathPrefix`<sup>Optional</sup> <a name="oraclePathPrefix" id="cdk-dms-replication.OracleSettings.property.oraclePathPrefix"></a>

```typescript
public readonly oraclePathPrefix: string;
```

- *Type:* string

Path prefix used for the location of the online redo log.

---

##### `parallelAsmReadThreads`<sup>Optional</sup> <a name="parallelAsmReadThreads" id="cdk-dms-replication.OracleSettings.property.parallelAsmReadThreads"></a>

```typescript
public readonly parallelAsmReadThreads: number;
```

- *Type:* number

Number of threads for parallel ASM reading.

---

##### `readAheadBlocks`<sup>Optional</sup> <a name="readAheadBlocks" id="cdk-dms-replication.OracleSettings.property.readAheadBlocks"></a>

```typescript
public readonly readAheadBlocks: number;
```

- *Type:* number

Number of read-ahead blocks.

---

##### `readTableSpaceName`<sup>Optional</sup> <a name="readTableSpaceName" id="cdk-dms-replication.OracleSettings.property.readTableSpaceName"></a>

```typescript
public readonly readTableSpaceName: boolean;
```

- *Type:* boolean

Read the tablespace name from the online redo log.

---

##### `retryInterval`<sup>Optional</sup> <a name="retryInterval" id="cdk-dms-replication.OracleSettings.property.retryInterval"></a>

```typescript
public readonly retryInterval: number;
```

- *Type:* number

Retry interval in seconds when no archivelog is found.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.OracleSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for accessing Secrets Manager (main secret).

---

##### `secretsManagerOracleAsmAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerOracleAsmAccessRoleArn" id="cdk-dms-replication.OracleSettings.property.secretsManagerOracleAsmAccessRoleArn"></a>

```typescript
public readonly secretsManagerOracleAsmAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for accessing the ASM Secrets Manager secret.

---

##### `secretsManagerOracleAsmSecretId`<sup>Optional</sup> <a name="secretsManagerOracleAsmSecretId" id="cdk-dms-replication.OracleSettings.property.secretsManagerOracleAsmSecretId"></a>

```typescript
public readonly secretsManagerOracleAsmSecretId: string;
```

- *Type:* string

Full ARN of the ASM secret in Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.OracleSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN of the main Secrets Manager secret.

---

##### `securityDbEncryptionName`<sup>Optional</sup> <a name="securityDbEncryptionName" id="cdk-dms-replication.OracleSettings.property.securityDbEncryptionName"></a>

```typescript
public readonly securityDbEncryptionName: string;
```

- *Type:* string

Name of the transparent data encryption (TDE) wallet.

---

##### `useAlternateFolderForOnline`<sup>Optional</sup> <a name="useAlternateFolderForOnline" id="cdk-dms-replication.OracleSettings.property.useAlternateFolderForOnline"></a>

```typescript
public readonly useAlternateFolderForOnline: boolean;
```

- *Type:* boolean

Use an alternate folder for online redo logs.

---

##### `useBFile`<sup>Optional</sup> <a name="useBFile" id="cdk-dms-replication.OracleSettings.property.useBFile"></a>

```typescript
public readonly useBFile: boolean;
```

- *Type:* boolean

Use B-file for large object replication.

---

##### `useDirectPathFullLoad`<sup>Optional</sup> <a name="useDirectPathFullLoad" id="cdk-dms-replication.OracleSettings.property.useDirectPathFullLoad"></a>

```typescript
public readonly useDirectPathFullLoad: boolean;
```

- *Type:* boolean

Use direct path full load.

---

##### `useLogminerReader`<sup>Optional</sup> <a name="useLogminerReader" id="cdk-dms-replication.OracleSettings.property.useLogminerReader"></a>

```typescript
public readonly useLogminerReader: boolean;
```

- *Type:* boolean

Use LogMiner for CDC.

---

##### `usePathPrefix`<sup>Optional</sup> <a name="usePathPrefix" id="cdk-dms-replication.OracleSettings.property.usePathPrefix"></a>

```typescript
public readonly usePathPrefix: string;
```

- *Type:* string

Use a path prefix for the location of the online redo log.

---

### PostgreSqlSettings <a name="PostgreSqlSettings" id="cdk-dms-replication.PostgreSqlSettings"></a>

Settings for PostgreSQL and Aurora PostgreSQL endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.PostgreSqlSettings.Initializer"></a>

```typescript
import { PostgreSqlSettings } from 'cdk-dms-replication'

const postgreSqlSettings: PostgreSqlSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.afterConnectScript">afterConnectScript</a></code> | <code>string</code> | SQL to run after connecting. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.captureDdls">captureDdls</a></code> | <code>boolean</code> | Whether DMS captures DDL events and creates a replication slot. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.ddlArtifactsSchema">ddlArtifactsSchema</a></code> | <code>string</code> | Schema in which the operational DDL database artifacts are created. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.executeTimeout">executeTimeout</a></code> | <code>number</code> | Sets the client statement timeout for the PostgreSQL instance. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.failTasksOnLobTruncation">failTasksOnLobTruncation</a></code> | <code>boolean</code> | Whether DMS fails tasks that attempt to truncate a LOB. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.heartbeatEnable">heartbeatEnable</a></code> | <code>boolean</code> | Whether DMS enables heartbeat signals. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.heartbeatFrequency">heartbeatFrequency</a></code> | <code>number</code> | The number of seconds between heartbeat signal calls. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.heartbeatSchema">heartbeatSchema</a></code> | <code>string</code> | Schema to store the heartbeat table. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.mapBooleanAsBoolean">mapBooleanAsBoolean</a></code> | <code>boolean</code> | When true, maps boolean as boolean instead of varchar(5). |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.maxFileSize">maxFileSize</a></code> | <code>number</code> | Maximum file size (in KB) for CSV files created during full load. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.pluginName">pluginName</a></code> | <code><a href="#cdk-dms-replication.PostgresCdcPlugin">PostgresCdcPlugin</a></code> | CDC plugin to use. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides access to Secrets Manager. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.PostgreSqlSettings.property.slotName">slotName</a></code> | <code>string</code> | Name of the logical replication slot created for CDC. |

---

##### `afterConnectScript`<sup>Optional</sup> <a name="afterConnectScript" id="cdk-dms-replication.PostgreSqlSettings.property.afterConnectScript"></a>

```typescript
public readonly afterConnectScript: string;
```

- *Type:* string

SQL to run after connecting.

---

##### `captureDdls`<sup>Optional</sup> <a name="captureDdls" id="cdk-dms-replication.PostgreSqlSettings.property.captureDdls"></a>

```typescript
public readonly captureDdls: boolean;
```

- *Type:* boolean

Whether DMS captures DDL events and creates a replication slot.

---

##### `ddlArtifactsSchema`<sup>Optional</sup> <a name="ddlArtifactsSchema" id="cdk-dms-replication.PostgreSqlSettings.property.ddlArtifactsSchema"></a>

```typescript
public readonly ddlArtifactsSchema: string;
```

- *Type:* string

Schema in which the operational DDL database artifacts are created.

---

##### `executeTimeout`<sup>Optional</sup> <a name="executeTimeout" id="cdk-dms-replication.PostgreSqlSettings.property.executeTimeout"></a>

```typescript
public readonly executeTimeout: number;
```

- *Type:* number

Sets the client statement timeout for the PostgreSQL instance.

---

##### `failTasksOnLobTruncation`<sup>Optional</sup> <a name="failTasksOnLobTruncation" id="cdk-dms-replication.PostgreSqlSettings.property.failTasksOnLobTruncation"></a>

```typescript
public readonly failTasksOnLobTruncation: boolean;
```

- *Type:* boolean

Whether DMS fails tasks that attempt to truncate a LOB.

---

##### `heartbeatEnable`<sup>Optional</sup> <a name="heartbeatEnable" id="cdk-dms-replication.PostgreSqlSettings.property.heartbeatEnable"></a>

```typescript
public readonly heartbeatEnable: boolean;
```

- *Type:* boolean

Whether DMS enables heartbeat signals.

---

##### `heartbeatFrequency`<sup>Optional</sup> <a name="heartbeatFrequency" id="cdk-dms-replication.PostgreSqlSettings.property.heartbeatFrequency"></a>

```typescript
public readonly heartbeatFrequency: number;
```

- *Type:* number

The number of seconds between heartbeat signal calls.

---

##### `heartbeatSchema`<sup>Optional</sup> <a name="heartbeatSchema" id="cdk-dms-replication.PostgreSqlSettings.property.heartbeatSchema"></a>

```typescript
public readonly heartbeatSchema: string;
```

- *Type:* string

Schema to store the heartbeat table.

---

##### `mapBooleanAsBoolean`<sup>Optional</sup> <a name="mapBooleanAsBoolean" id="cdk-dms-replication.PostgreSqlSettings.property.mapBooleanAsBoolean"></a>

```typescript
public readonly mapBooleanAsBoolean: boolean;
```

- *Type:* boolean

When true, maps boolean as boolean instead of varchar(5).

---

##### `maxFileSize`<sup>Optional</sup> <a name="maxFileSize" id="cdk-dms-replication.PostgreSqlSettings.property.maxFileSize"></a>

```typescript
public readonly maxFileSize: number;
```

- *Type:* number

Maximum file size (in KB) for CSV files created during full load.

---

##### `pluginName`<sup>Optional</sup> <a name="pluginName" id="cdk-dms-replication.PostgreSqlSettings.property.pluginName"></a>

```typescript
public readonly pluginName: PostgresCdcPlugin;
```

- *Type:* <a href="#cdk-dms-replication.PostgresCdcPlugin">PostgresCdcPlugin</a>

CDC plugin to use.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.PostgreSqlSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides access to Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.PostgreSqlSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

##### `slotName`<sup>Optional</sup> <a name="slotName" id="cdk-dms-replication.PostgreSqlSettings.property.slotName"></a>

```typescript
public readonly slotName: string;
```

- *Type:* string

Name of the logical replication slot created for CDC.

---

### RedisSettings <a name="RedisSettings" id="cdk-dms-replication.RedisSettings"></a>

Settings for Amazon ElastiCache for Redis target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.RedisSettings.Initializer"></a>

```typescript
import { RedisSettings } from 'cdk-dms-replication'

const redisSettings: RedisSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.RedisSettings.property.serverName">serverName</a></code> | <code>string</code> | Redis server name or cluster endpoint. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.authPassword">authPassword</a></code> | <code>aws-cdk-lib.SecretValue</code> | Auth token for auth-token authentication. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.authType">authType</a></code> | <code>string</code> | Authentication type: none, auth-token, or auth-role. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.authUserName">authUserName</a></code> | <code>string</code> | IAM role ARN for auth-role authentication. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.port">port</a></code> | <code>number</code> | Redis port. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.sslCaCertificateArn">sslCaCertificateArn</a></code> | <code>string</code> | ARN of the SSL CA certificate stored in Secrets Manager. |
| <code><a href="#cdk-dms-replication.RedisSettings.property.sslSecurityProtocol">sslSecurityProtocol</a></code> | <code>string</code> | SSL security protocol. |

---

##### `serverName`<sup>Required</sup> <a name="serverName" id="cdk-dms-replication.RedisSettings.property.serverName"></a>

```typescript
public readonly serverName: string;
```

- *Type:* string

Redis server name or cluster endpoint.

---

##### `authPassword`<sup>Optional</sup> <a name="authPassword" id="cdk-dms-replication.RedisSettings.property.authPassword"></a>

```typescript
public readonly authPassword: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Auth token for auth-token authentication.

---

##### `authType`<sup>Optional</sup> <a name="authType" id="cdk-dms-replication.RedisSettings.property.authType"></a>

```typescript
public readonly authType: string;
```

- *Type:* string

Authentication type: none, auth-token, or auth-role.

---

##### `authUserName`<sup>Optional</sup> <a name="authUserName" id="cdk-dms-replication.RedisSettings.property.authUserName"></a>

```typescript
public readonly authUserName: string;
```

- *Type:* string

IAM role ARN for auth-role authentication.

---

##### `port`<sup>Optional</sup> <a name="port" id="cdk-dms-replication.RedisSettings.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

Redis port.

Default: 6379.

---

##### `sslCaCertificateArn`<sup>Optional</sup> <a name="sslCaCertificateArn" id="cdk-dms-replication.RedisSettings.property.sslCaCertificateArn"></a>

```typescript
public readonly sslCaCertificateArn: string;
```

- *Type:* string

ARN of the SSL CA certificate stored in Secrets Manager.

---

##### `sslSecurityProtocol`<sup>Optional</sup> <a name="sslSecurityProtocol" id="cdk-dms-replication.RedisSettings.property.sslSecurityProtocol"></a>

```typescript
public readonly sslSecurityProtocol: string;
```

- *Type:* string

SSL security protocol.

---

### RedshiftSettings <a name="RedshiftSettings" id="cdk-dms-replication.RedshiftSettings"></a>

Settings for Amazon Redshift target endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.RedshiftSettings.Initializer"></a>

```typescript
import { RedshiftSettings } from 'cdk-dms-replication'

const redshiftSettings: RedshiftSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.acceptAnyDate">acceptAnyDate</a></code> | <code>boolean</code> | Whether to accept dates in a specific format. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.afterConnectScript">afterConnectScript</a></code> | <code>string</code> | SQL to run after connecting. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.bucketFolder">bucketFolder</a></code> | <code>string</code> | S3 intermediate bucket folder path. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.bucketName">bucketName</a></code> | <code>string</code> | S3 bucket name used for the intermediate storage. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.caseSensitiveNames">caseSensitiveNames</a></code> | <code>boolean</code> | Whether to enable case-sensitive column names. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.compUpdate">compUpdate</a></code> | <code>boolean</code> | Whether to enable automatic compression. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.connectionTimeout">connectionTimeout</a></code> | <code>number</code> | Timeout in seconds for database connections. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.dateFormat">dateFormat</a></code> | <code>string</code> | Date format for the DATEFORMAT option. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.emptyAsNull">emptyAsNull</a></code> | <code>boolean</code> | Whether to load empty strings as NULL. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.encryptionMode">encryptionMode</a></code> | <code><a href="#cdk-dms-replication.EncryptionMode">EncryptionMode</a></code> | Encryption mode for data at rest. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.explicitIds">explicitIds</a></code> | <code>boolean</code> | Whether to allow explicit ID values in the COPY command. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.fileTransferUploadStreams">fileTransferUploadStreams</a></code> | <code>number</code> | Number of upload streams for parallel loading. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.loadTimeout">loadTimeout</a></code> | <code>number</code> | Timeout (in seconds) for loading data. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.maxFileSize">maxFileSize</a></code> | <code>number</code> | Maximum file size (in KB) for each intermediate file. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.removeQuotes">removeQuotes</a></code> | <code>boolean</code> | Whether to remove quoted data. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.replaceChars">replaceChars</a></code> | <code>string</code> | Character to replace a specific character with. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.replaceInvalidChars">replaceInvalidChars</a></code> | <code>string</code> | Character to use to replace invalid UTF-8 characters. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for accessing Secrets Manager. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.serverSideEncryptionKmsKeyId">serverSideEncryptionKmsKeyId</a></code> | <code>string</code> | KMS key ARN for SSE-KMS. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | ARN of the IAM role that provides DMS access to the S3 staging bucket. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.timeFormat">timeFormat</a></code> | <code>string</code> | Date format for the TIMEFORMAT option. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.trimBlanks">trimBlanks</a></code> | <code>boolean</code> | Whether to remove trailing blanks from VARCHAR columns. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.truncateColumns">truncateColumns</a></code> | <code>boolean</code> | Whether to truncate VARCHAR columns to the maximum length. |
| <code><a href="#cdk-dms-replication.RedshiftSettings.property.writeBufferSize">writeBufferSize</a></code> | <code>number</code> | Size of the write buffer (in KB). |

---

##### `acceptAnyDate`<sup>Optional</sup> <a name="acceptAnyDate" id="cdk-dms-replication.RedshiftSettings.property.acceptAnyDate"></a>

```typescript
public readonly acceptAnyDate: boolean;
```

- *Type:* boolean

Whether to accept dates in a specific format.

---

##### `afterConnectScript`<sup>Optional</sup> <a name="afterConnectScript" id="cdk-dms-replication.RedshiftSettings.property.afterConnectScript"></a>

```typescript
public readonly afterConnectScript: string;
```

- *Type:* string

SQL to run after connecting.

---

##### `bucketFolder`<sup>Optional</sup> <a name="bucketFolder" id="cdk-dms-replication.RedshiftSettings.property.bucketFolder"></a>

```typescript
public readonly bucketFolder: string;
```

- *Type:* string

S3 intermediate bucket folder path.

---

##### `bucketName`<sup>Optional</sup> <a name="bucketName" id="cdk-dms-replication.RedshiftSettings.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

S3 bucket name used for the intermediate storage.

---

##### `caseSensitiveNames`<sup>Optional</sup> <a name="caseSensitiveNames" id="cdk-dms-replication.RedshiftSettings.property.caseSensitiveNames"></a>

```typescript
public readonly caseSensitiveNames: boolean;
```

- *Type:* boolean

Whether to enable case-sensitive column names.

---

##### `compUpdate`<sup>Optional</sup> <a name="compUpdate" id="cdk-dms-replication.RedshiftSettings.property.compUpdate"></a>

```typescript
public readonly compUpdate: boolean;
```

- *Type:* boolean

Whether to enable automatic compression.

---

##### `connectionTimeout`<sup>Optional</sup> <a name="connectionTimeout" id="cdk-dms-replication.RedshiftSettings.property.connectionTimeout"></a>

```typescript
public readonly connectionTimeout: number;
```

- *Type:* number

Timeout in seconds for database connections.

---

##### `dateFormat`<sup>Optional</sup> <a name="dateFormat" id="cdk-dms-replication.RedshiftSettings.property.dateFormat"></a>

```typescript
public readonly dateFormat: string;
```

- *Type:* string

Date format for the DATEFORMAT option.

---

##### `emptyAsNull`<sup>Optional</sup> <a name="emptyAsNull" id="cdk-dms-replication.RedshiftSettings.property.emptyAsNull"></a>

```typescript
public readonly emptyAsNull: boolean;
```

- *Type:* boolean

Whether to load empty strings as NULL.

---

##### `encryptionMode`<sup>Optional</sup> <a name="encryptionMode" id="cdk-dms-replication.RedshiftSettings.property.encryptionMode"></a>

```typescript
public readonly encryptionMode: EncryptionMode;
```

- *Type:* <a href="#cdk-dms-replication.EncryptionMode">EncryptionMode</a>

Encryption mode for data at rest.

---

##### `explicitIds`<sup>Optional</sup> <a name="explicitIds" id="cdk-dms-replication.RedshiftSettings.property.explicitIds"></a>

```typescript
public readonly explicitIds: boolean;
```

- *Type:* boolean

Whether to allow explicit ID values in the COPY command.

---

##### `fileTransferUploadStreams`<sup>Optional</sup> <a name="fileTransferUploadStreams" id="cdk-dms-replication.RedshiftSettings.property.fileTransferUploadStreams"></a>

```typescript
public readonly fileTransferUploadStreams: number;
```

- *Type:* number

Number of upload streams for parallel loading.

---

##### `loadTimeout`<sup>Optional</sup> <a name="loadTimeout" id="cdk-dms-replication.RedshiftSettings.property.loadTimeout"></a>

```typescript
public readonly loadTimeout: number;
```

- *Type:* number

Timeout (in seconds) for loading data.

---

##### `maxFileSize`<sup>Optional</sup> <a name="maxFileSize" id="cdk-dms-replication.RedshiftSettings.property.maxFileSize"></a>

```typescript
public readonly maxFileSize: number;
```

- *Type:* number

Maximum file size (in KB) for each intermediate file.

---

##### `removeQuotes`<sup>Optional</sup> <a name="removeQuotes" id="cdk-dms-replication.RedshiftSettings.property.removeQuotes"></a>

```typescript
public readonly removeQuotes: boolean;
```

- *Type:* boolean

Whether to remove quoted data.

---

##### `replaceChars`<sup>Optional</sup> <a name="replaceChars" id="cdk-dms-replication.RedshiftSettings.property.replaceChars"></a>

```typescript
public readonly replaceChars: string;
```

- *Type:* string

Character to replace a specific character with.

---

##### `replaceInvalidChars`<sup>Optional</sup> <a name="replaceInvalidChars" id="cdk-dms-replication.RedshiftSettings.property.replaceInvalidChars"></a>

```typescript
public readonly replaceInvalidChars: string;
```

- *Type:* string

Character to use to replace invalid UTF-8 characters.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.RedshiftSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for accessing Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.RedshiftSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

##### `serverSideEncryptionKmsKeyId`<sup>Optional</sup> <a name="serverSideEncryptionKmsKeyId" id="cdk-dms-replication.RedshiftSettings.property.serverSideEncryptionKmsKeyId"></a>

```typescript
public readonly serverSideEncryptionKmsKeyId: string;
```

- *Type:* string

KMS key ARN for SSE-KMS.

---

##### `serviceAccessRoleArn`<sup>Optional</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.RedshiftSettings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

ARN of the IAM role that provides DMS access to the S3 staging bucket.

---

##### `timeFormat`<sup>Optional</sup> <a name="timeFormat" id="cdk-dms-replication.RedshiftSettings.property.timeFormat"></a>

```typescript
public readonly timeFormat: string;
```

- *Type:* string

Date format for the TIMEFORMAT option.

---

##### `trimBlanks`<sup>Optional</sup> <a name="trimBlanks" id="cdk-dms-replication.RedshiftSettings.property.trimBlanks"></a>

```typescript
public readonly trimBlanks: boolean;
```

- *Type:* boolean

Whether to remove trailing blanks from VARCHAR columns.

---

##### `truncateColumns`<sup>Optional</sup> <a name="truncateColumns" id="cdk-dms-replication.RedshiftSettings.property.truncateColumns"></a>

```typescript
public readonly truncateColumns: boolean;
```

- *Type:* boolean

Whether to truncate VARCHAR columns to the maximum length.

---

##### `writeBufferSize`<sup>Optional</sup> <a name="writeBufferSize" id="cdk-dms-replication.RedshiftSettings.property.writeBufferSize"></a>

```typescript
public readonly writeBufferSize: number;
```

- *Type:* number

Size of the write buffer (in KB).

---

### RuleObjectLocatorValue <a name="RuleObjectLocatorValue" id="cdk-dms-replication.RuleObjectLocatorValue"></a>

Object locator identifying the schema, table, and optional column a rule targets.

#### Initializer <a name="Initializer" id="cdk-dms-replication.RuleObjectLocatorValue.Initializer"></a>

```typescript
import { RuleObjectLocatorValue } from 'cdk-dms-replication'

const ruleObjectLocatorValue: RuleObjectLocatorValue = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.RuleObjectLocatorValue.property.schemaName">schemaName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocatorValue.property.columnName">columnName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocatorValue.property.tableName">tableName</a></code> | <code>string</code> | *No description.* |

---

##### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.RuleObjectLocatorValue.property.schemaName"></a>

```typescript
public readonly schemaName: string;
```

- *Type:* string

---

##### `columnName`<sup>Optional</sup> <a name="columnName" id="cdk-dms-replication.RuleObjectLocatorValue.property.columnName"></a>

```typescript
public readonly columnName: string;
```

- *Type:* string

---

##### `tableName`<sup>Optional</sup> <a name="tableName" id="cdk-dms-replication.RuleObjectLocatorValue.property.tableName"></a>

```typescript
public readonly tableName: string;
```

- *Type:* string

---

### S3Settings <a name="S3Settings" id="cdk-dms-replication.S3Settings"></a>

Settings for Amazon S3 endpoints (source or target).

#### Initializer <a name="Initializer" id="cdk-dms-replication.S3Settings.Initializer"></a>

```typescript
import { S3Settings } from 'cdk-dms-replication'

const s3Settings: S3Settings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.S3Settings.property.bucketName">bucketName</a></code> | <code>string</code> | S3 bucket name. |
| <code><a href="#cdk-dms-replication.S3Settings.property.serviceAccessRoleArn">serviceAccessRoleArn</a></code> | <code>string</code> | IAM role ARN that DMS uses to access the S3 bucket. |
| <code><a href="#cdk-dms-replication.S3Settings.property.addColumnName">addColumnName</a></code> | <code>boolean</code> | Whether DMS adds a column name field to CSV output. |
| <code><a href="#cdk-dms-replication.S3Settings.property.bucketFolder">bucketFolder</a></code> | <code>string</code> | Folder path prefix within the bucket. |
| <code><a href="#cdk-dms-replication.S3Settings.property.cdcInsertsAndUpdates">cdcInsertsAndUpdates</a></code> | <code>boolean</code> | Include CDC inserts and updates in the target. |
| <code><a href="#cdk-dms-replication.S3Settings.property.cdcInsertsOnly">cdcInsertsOnly</a></code> | <code>boolean</code> | Include only inserts (not updates or deletes) in the target. |
| <code><a href="#cdk-dms-replication.S3Settings.property.cdcMaxBatchInterval">cdcMaxBatchInterval</a></code> | <code>number</code> | Maximum interval in seconds between CDC mini-batches (1-360). |
| <code><a href="#cdk-dms-replication.S3Settings.property.cdcMinFileSize">cdcMinFileSize</a></code> | <code>number</code> | Minimum file size (in KB) to trigger a CDC file write. |
| <code><a href="#cdk-dms-replication.S3Settings.property.cdcPath">cdcPath</a></code> | <code>string</code> | CDC path in the source S3 bucket. |
| <code><a href="#cdk-dms-replication.S3Settings.property.csvDelimiter">csvDelimiter</a></code> | <code>string</code> | Column delimiter character for CSV output. |
| <code><a href="#cdk-dms-replication.S3Settings.property.csvNoSupValue">csvNoSupValue</a></code> | <code>string</code> | String used for null values when no-sup-value applies. |
| <code><a href="#cdk-dms-replication.S3Settings.property.csvNullValue">csvNullValue</a></code> | <code>string</code> | String used for null values in CSV output. |
| <code><a href="#cdk-dms-replication.S3Settings.property.csvRowDelimiter">csvRowDelimiter</a></code> | <code>string</code> | Row delimiter for CSV output. |
| <code><a href="#cdk-dms-replication.S3Settings.property.dataFormat">dataFormat</a></code> | <code><a href="#cdk-dms-replication.S3DataFormat">S3DataFormat</a></code> | Output data format: CSV or Parquet. |
| <code><a href="#cdk-dms-replication.S3Settings.property.datePartitionDelimiter">datePartitionDelimiter</a></code> | <code><a href="#cdk-dms-replication.DatePartitionDelimiter">DatePartitionDelimiter</a></code> | Date partition delimiter. |
| <code><a href="#cdk-dms-replication.S3Settings.property.datePartitionEnabled">datePartitionEnabled</a></code> | <code>boolean</code> | Whether to partition output files by date. |
| <code><a href="#cdk-dms-replication.S3Settings.property.datePartitionSequence">datePartitionSequence</a></code> | <code><a href="#cdk-dms-replication.DatePartitionSequence">DatePartitionSequence</a></code> | Date partition sequence. |
| <code><a href="#cdk-dms-replication.S3Settings.property.dictPageSizeLimit">dictPageSizeLimit</a></code> | <code>number</code> | Dictionary page size (in bytes) for Parquet. |
| <code><a href="#cdk-dms-replication.S3Settings.property.enableStatistics">enableStatistics</a></code> | <code>boolean</code> | Whether to enable statistics for Parquet row groups. |
| <code><a href="#cdk-dms-replication.S3Settings.property.encodingType">encodingType</a></code> | <code><a href="#cdk-dms-replication.EncodingType">EncodingType</a></code> | Encoding type for Parquet. |
| <code><a href="#cdk-dms-replication.S3Settings.property.encryptionMode">encryptionMode</a></code> | <code><a href="#cdk-dms-replication.EncryptionMode">EncryptionMode</a></code> | Encryption mode for data at rest in S3. |
| <code><a href="#cdk-dms-replication.S3Settings.property.externalTableDefinition">externalTableDefinition</a></code> | <code>string</code> | JSON structure defining external tables (for S3 source). |
| <code><a href="#cdk-dms-replication.S3Settings.property.ignoreHeaderRows">ignoreHeaderRows</a></code> | <code>number</code> | Number of header rows to ignore in the S3 source. |
| <code><a href="#cdk-dms-replication.S3Settings.property.includeOpForFullLoad">includeOpForFullLoad</a></code> | <code>boolean</code> | Whether to include the operation column for full-load rows. |
| <code><a href="#cdk-dms-replication.S3Settings.property.maxFileSize">maxFileSize</a></code> | <code>number</code> | Maximum file size (in KB) for data files. |
| <code><a href="#cdk-dms-replication.S3Settings.property.parquetTimestampInMillisecond">parquetTimestampInMillisecond</a></code> | <code>boolean</code> | Whether timestamps in Parquet use milliseconds instead of microseconds. |
| <code><a href="#cdk-dms-replication.S3Settings.property.parquetVersion">parquetVersion</a></code> | <code><a href="#cdk-dms-replication.ParquetVersion">ParquetVersion</a></code> | Parquet format version. |
| <code><a href="#cdk-dms-replication.S3Settings.property.preserveTransactions">preserveTransactions</a></code> | <code>boolean</code> | Whether DMS preserves transaction boundaries (for CDC). |
| <code><a href="#cdk-dms-replication.S3Settings.property.rfc4180">rfc4180</a></code> | <code>boolean</code> | Whether to use RFC 4180 compliant CSV format. |
| <code><a href="#cdk-dms-replication.S3Settings.property.rowGroupLength">rowGroupLength</a></code> | <code>number</code> | Number of rows per Parquet row group. |
| <code><a href="#cdk-dms-replication.S3Settings.property.serverSideEncryptionKmsKeyId">serverSideEncryptionKmsKeyId</a></code> | <code>string</code> | KMS key ARN for SSE-KMS encryption. |
| <code><a href="#cdk-dms-replication.S3Settings.property.timestampColumnName">timestampColumnName</a></code> | <code>string</code> | Column name for operation timestamps. |
| <code><a href="#cdk-dms-replication.S3Settings.property.useCsvNoSupValue">useCsvNoSupValue</a></code> | <code>boolean</code> | Whether to use CSV no-sup-value. |
| <code><a href="#cdk-dms-replication.S3Settings.property.useTaskStartTimeForFullLoadTimestamp">useTaskStartTimeForFullLoadTimestamp</a></code> | <code>boolean</code> | Whether to use the task start time instead of transaction start time for full load. |

---

##### `bucketName`<sup>Required</sup> <a name="bucketName" id="cdk-dms-replication.S3Settings.property.bucketName"></a>

```typescript
public readonly bucketName: string;
```

- *Type:* string

S3 bucket name.

---

##### `serviceAccessRoleArn`<sup>Required</sup> <a name="serviceAccessRoleArn" id="cdk-dms-replication.S3Settings.property.serviceAccessRoleArn"></a>

```typescript
public readonly serviceAccessRoleArn: string;
```

- *Type:* string

IAM role ARN that DMS uses to access the S3 bucket.

---

##### `addColumnName`<sup>Optional</sup> <a name="addColumnName" id="cdk-dms-replication.S3Settings.property.addColumnName"></a>

```typescript
public readonly addColumnName: boolean;
```

- *Type:* boolean

Whether DMS adds a column name field to CSV output.

---

##### `bucketFolder`<sup>Optional</sup> <a name="bucketFolder" id="cdk-dms-replication.S3Settings.property.bucketFolder"></a>

```typescript
public readonly bucketFolder: string;
```

- *Type:* string

Folder path prefix within the bucket.

---

##### `cdcInsertsAndUpdates`<sup>Optional</sup> <a name="cdcInsertsAndUpdates" id="cdk-dms-replication.S3Settings.property.cdcInsertsAndUpdates"></a>

```typescript
public readonly cdcInsertsAndUpdates: boolean;
```

- *Type:* boolean

Include CDC inserts and updates in the target.

---

##### `cdcInsertsOnly`<sup>Optional</sup> <a name="cdcInsertsOnly" id="cdk-dms-replication.S3Settings.property.cdcInsertsOnly"></a>

```typescript
public readonly cdcInsertsOnly: boolean;
```

- *Type:* boolean

Include only inserts (not updates or deletes) in the target.

---

##### `cdcMaxBatchInterval`<sup>Optional</sup> <a name="cdcMaxBatchInterval" id="cdk-dms-replication.S3Settings.property.cdcMaxBatchInterval"></a>

```typescript
public readonly cdcMaxBatchInterval: number;
```

- *Type:* number

Maximum interval in seconds between CDC mini-batches (1-360).

---

##### `cdcMinFileSize`<sup>Optional</sup> <a name="cdcMinFileSize" id="cdk-dms-replication.S3Settings.property.cdcMinFileSize"></a>

```typescript
public readonly cdcMinFileSize: number;
```

- *Type:* number

Minimum file size (in KB) to trigger a CDC file write.

---

##### `cdcPath`<sup>Optional</sup> <a name="cdcPath" id="cdk-dms-replication.S3Settings.property.cdcPath"></a>

```typescript
public readonly cdcPath: string;
```

- *Type:* string

CDC path in the source S3 bucket.

---

##### `csvDelimiter`<sup>Optional</sup> <a name="csvDelimiter" id="cdk-dms-replication.S3Settings.property.csvDelimiter"></a>

```typescript
public readonly csvDelimiter: string;
```

- *Type:* string

Column delimiter character for CSV output.

Default: comma.

---

##### `csvNoSupValue`<sup>Optional</sup> <a name="csvNoSupValue" id="cdk-dms-replication.S3Settings.property.csvNoSupValue"></a>

```typescript
public readonly csvNoSupValue: string;
```

- *Type:* string

String used for null values when no-sup-value applies.

---

##### `csvNullValue`<sup>Optional</sup> <a name="csvNullValue" id="cdk-dms-replication.S3Settings.property.csvNullValue"></a>

```typescript
public readonly csvNullValue: string;
```

- *Type:* string

String used for null values in CSV output.

---

##### `csvRowDelimiter`<sup>Optional</sup> <a name="csvRowDelimiter" id="cdk-dms-replication.S3Settings.property.csvRowDelimiter"></a>

```typescript
public readonly csvRowDelimiter: string;
```

- *Type:* string

Row delimiter for CSV output.

Default: newline.

---

##### `dataFormat`<sup>Optional</sup> <a name="dataFormat" id="cdk-dms-replication.S3Settings.property.dataFormat"></a>

```typescript
public readonly dataFormat: S3DataFormat;
```

- *Type:* <a href="#cdk-dms-replication.S3DataFormat">S3DataFormat</a>

Output data format: CSV or Parquet.

---

##### `datePartitionDelimiter`<sup>Optional</sup> <a name="datePartitionDelimiter" id="cdk-dms-replication.S3Settings.property.datePartitionDelimiter"></a>

```typescript
public readonly datePartitionDelimiter: DatePartitionDelimiter;
```

- *Type:* <a href="#cdk-dms-replication.DatePartitionDelimiter">DatePartitionDelimiter</a>

Date partition delimiter.

---

##### `datePartitionEnabled`<sup>Optional</sup> <a name="datePartitionEnabled" id="cdk-dms-replication.S3Settings.property.datePartitionEnabled"></a>

```typescript
public readonly datePartitionEnabled: boolean;
```

- *Type:* boolean

Whether to partition output files by date.

---

##### `datePartitionSequence`<sup>Optional</sup> <a name="datePartitionSequence" id="cdk-dms-replication.S3Settings.property.datePartitionSequence"></a>

```typescript
public readonly datePartitionSequence: DatePartitionSequence;
```

- *Type:* <a href="#cdk-dms-replication.DatePartitionSequence">DatePartitionSequence</a>

Date partition sequence.

---

##### `dictPageSizeLimit`<sup>Optional</sup> <a name="dictPageSizeLimit" id="cdk-dms-replication.S3Settings.property.dictPageSizeLimit"></a>

```typescript
public readonly dictPageSizeLimit: number;
```

- *Type:* number

Dictionary page size (in bytes) for Parquet.

---

##### `enableStatistics`<sup>Optional</sup> <a name="enableStatistics" id="cdk-dms-replication.S3Settings.property.enableStatistics"></a>

```typescript
public readonly enableStatistics: boolean;
```

- *Type:* boolean

Whether to enable statistics for Parquet row groups.

---

##### `encodingType`<sup>Optional</sup> <a name="encodingType" id="cdk-dms-replication.S3Settings.property.encodingType"></a>

```typescript
public readonly encodingType: EncodingType;
```

- *Type:* <a href="#cdk-dms-replication.EncodingType">EncodingType</a>

Encoding type for Parquet.

---

##### `encryptionMode`<sup>Optional</sup> <a name="encryptionMode" id="cdk-dms-replication.S3Settings.property.encryptionMode"></a>

```typescript
public readonly encryptionMode: EncryptionMode;
```

- *Type:* <a href="#cdk-dms-replication.EncryptionMode">EncryptionMode</a>

Encryption mode for data at rest in S3.

---

##### `externalTableDefinition`<sup>Optional</sup> <a name="externalTableDefinition" id="cdk-dms-replication.S3Settings.property.externalTableDefinition"></a>

```typescript
public readonly externalTableDefinition: string;
```

- *Type:* string

JSON structure defining external tables (for S3 source).

---

##### `ignoreHeaderRows`<sup>Optional</sup> <a name="ignoreHeaderRows" id="cdk-dms-replication.S3Settings.property.ignoreHeaderRows"></a>

```typescript
public readonly ignoreHeaderRows: number;
```

- *Type:* number

Number of header rows to ignore in the S3 source.

---

##### `includeOpForFullLoad`<sup>Optional</sup> <a name="includeOpForFullLoad" id="cdk-dms-replication.S3Settings.property.includeOpForFullLoad"></a>

```typescript
public readonly includeOpForFullLoad: boolean;
```

- *Type:* boolean

Whether to include the operation column for full-load rows.

---

##### `maxFileSize`<sup>Optional</sup> <a name="maxFileSize" id="cdk-dms-replication.S3Settings.property.maxFileSize"></a>

```typescript
public readonly maxFileSize: number;
```

- *Type:* number

Maximum file size (in KB) for data files.

---

##### `parquetTimestampInMillisecond`<sup>Optional</sup> <a name="parquetTimestampInMillisecond" id="cdk-dms-replication.S3Settings.property.parquetTimestampInMillisecond"></a>

```typescript
public readonly parquetTimestampInMillisecond: boolean;
```

- *Type:* boolean

Whether timestamps in Parquet use milliseconds instead of microseconds.

---

##### `parquetVersion`<sup>Optional</sup> <a name="parquetVersion" id="cdk-dms-replication.S3Settings.property.parquetVersion"></a>

```typescript
public readonly parquetVersion: ParquetVersion;
```

- *Type:* <a href="#cdk-dms-replication.ParquetVersion">ParquetVersion</a>

Parquet format version.

---

##### `preserveTransactions`<sup>Optional</sup> <a name="preserveTransactions" id="cdk-dms-replication.S3Settings.property.preserveTransactions"></a>

```typescript
public readonly preserveTransactions: boolean;
```

- *Type:* boolean

Whether DMS preserves transaction boundaries (for CDC).

---

##### `rfc4180`<sup>Optional</sup> <a name="rfc4180" id="cdk-dms-replication.S3Settings.property.rfc4180"></a>

```typescript
public readonly rfc4180: boolean;
```

- *Type:* boolean

Whether to use RFC 4180 compliant CSV format.

---

##### `rowGroupLength`<sup>Optional</sup> <a name="rowGroupLength" id="cdk-dms-replication.S3Settings.property.rowGroupLength"></a>

```typescript
public readonly rowGroupLength: number;
```

- *Type:* number

Number of rows per Parquet row group.

---

##### `serverSideEncryptionKmsKeyId`<sup>Optional</sup> <a name="serverSideEncryptionKmsKeyId" id="cdk-dms-replication.S3Settings.property.serverSideEncryptionKmsKeyId"></a>

```typescript
public readonly serverSideEncryptionKmsKeyId: string;
```

- *Type:* string

KMS key ARN for SSE-KMS encryption.

---

##### `timestampColumnName`<sup>Optional</sup> <a name="timestampColumnName" id="cdk-dms-replication.S3Settings.property.timestampColumnName"></a>

```typescript
public readonly timestampColumnName: string;
```

- *Type:* string

Column name for operation timestamps.

---

##### `useCsvNoSupValue`<sup>Optional</sup> <a name="useCsvNoSupValue" id="cdk-dms-replication.S3Settings.property.useCsvNoSupValue"></a>

```typescript
public readonly useCsvNoSupValue: boolean;
```

- *Type:* boolean

Whether to use CSV no-sup-value.

---

##### `useTaskStartTimeForFullLoadTimestamp`<sup>Optional</sup> <a name="useTaskStartTimeForFullLoadTimestamp" id="cdk-dms-replication.S3Settings.property.useTaskStartTimeForFullLoadTimestamp"></a>

```typescript
public readonly useTaskStartTimeForFullLoadTimestamp: boolean;
```

- *Type:* boolean

Whether to use the task start time instead of transaction start time for full load.

---

### SapAseSettings <a name="SapAseSettings" id="cdk-dms-replication.SapAseSettings"></a>

Settings for SAP Adaptive Server Enterprise (Sybase) endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.SapAseSettings.Initializer"></a>

```typescript
import { SapAseSettings } from 'cdk-dms-replication'

const sapAseSettings: SapAseSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.SapAseSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for Secrets Manager. |
| <code><a href="#cdk-dms-replication.SapAseSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.SapAseSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.SapAseSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

### SourceEndpointOptions <a name="SourceEndpointOptions" id="cdk-dms-replication.SourceEndpointOptions"></a>

Properties for the source endpoint of a {@link DmsMigrationPipeline}.

Extends {@link DmsEndpointProps} but omits `endpointType` (always SOURCE).

#### Initializer <a name="Initializer" id="cdk-dms-replication.SourceEndpointOptions.Initializer"></a>

```typescript
import { SourceEndpointOptions } from 'cdk-dms-replication'

const sourceEndpointOptions: SourceEndpointOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.engine">engine</a></code> | <code><a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.certificateArn">certificateArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.databaseName">databaseName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.db2Settings">db2Settings</a></code> | <code><a href="#cdk-dms-replication.Db2Settings">Db2Settings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.endpointIdentifier">endpointIdentifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.extraConnectionAttributes">extraConnectionAttributes</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.mongoDbSettings">mongoDbSettings</a></code> | <code><a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.mySqlSettings">mySqlSettings</a></code> | <code><a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.oracleSettings">oracleSettings</a></code> | <code><a href="#cdk-dms-replication.OracleSettings">OracleSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.password">password</a></code> | <code>aws-cdk-lib.SecretValue</code> | Database password. |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.port">port</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.postgreSqlSettings">postgreSqlSettings</a></code> | <code><a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.s3Settings">s3Settings</a></code> | <code><a href="#cdk-dms-replication.S3Settings">S3Settings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.sapAseSettings">sapAseSettings</a></code> | <code><a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.serverName">serverName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.sqlServerSettings">sqlServerSettings</a></code> | <code><a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.sslMode">sslMode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.SourceEndpointOptions.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `engine`<sup>Required</sup> <a name="engine" id="cdk-dms-replication.SourceEndpointOptions.property.engine"></a>

```typescript
public readonly engine: EndpointEngine;
```

- *Type:* <a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a>

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="cdk-dms-replication.SourceEndpointOptions.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

---

##### `databaseName`<sup>Optional</sup> <a name="databaseName" id="cdk-dms-replication.SourceEndpointOptions.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

---

##### `db2Settings`<sup>Optional</sup> <a name="db2Settings" id="cdk-dms-replication.SourceEndpointOptions.property.db2Settings"></a>

```typescript
public readonly db2Settings: Db2Settings;
```

- *Type:* <a href="#cdk-dms-replication.Db2Settings">Db2Settings</a>

---

##### `endpointIdentifier`<sup>Optional</sup> <a name="endpointIdentifier" id="cdk-dms-replication.SourceEndpointOptions.property.endpointIdentifier"></a>

```typescript
public readonly endpointIdentifier: string;
```

- *Type:* string

---

##### `extraConnectionAttributes`<sup>Optional</sup> <a name="extraConnectionAttributes" id="cdk-dms-replication.SourceEndpointOptions.property.extraConnectionAttributes"></a>

```typescript
public readonly extraConnectionAttributes: string;
```

- *Type:* string

---

##### `mongoDbSettings`<sup>Optional</sup> <a name="mongoDbSettings" id="cdk-dms-replication.SourceEndpointOptions.property.mongoDbSettings"></a>

```typescript
public readonly mongoDbSettings: MongoDbSettings;
```

- *Type:* <a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a>

---

##### `mySqlSettings`<sup>Optional</sup> <a name="mySqlSettings" id="cdk-dms-replication.SourceEndpointOptions.property.mySqlSettings"></a>

```typescript
public readonly mySqlSettings: MySqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a>

---

##### `oracleSettings`<sup>Optional</sup> <a name="oracleSettings" id="cdk-dms-replication.SourceEndpointOptions.property.oracleSettings"></a>

```typescript
public readonly oracleSettings: OracleSettings;
```

- *Type:* <a href="#cdk-dms-replication.OracleSettings">OracleSettings</a>

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk-dms-replication.SourceEndpointOptions.property.password"></a>

```typescript
public readonly password: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Database password.

The resolved value is stored as **plaintext** in the
CloudFormation template. Prefer `secretsManagerSecretId` in the
engine-specific settings for production workloads.

---

##### `port`<sup>Optional</sup> <a name="port" id="cdk-dms-replication.SourceEndpointOptions.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

---

##### `postgreSqlSettings`<sup>Optional</sup> <a name="postgreSqlSettings" id="cdk-dms-replication.SourceEndpointOptions.property.postgreSqlSettings"></a>

```typescript
public readonly postgreSqlSettings: PostgreSqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a>

---

##### `s3Settings`<sup>Optional</sup> <a name="s3Settings" id="cdk-dms-replication.SourceEndpointOptions.property.s3Settings"></a>

```typescript
public readonly s3Settings: S3Settings;
```

- *Type:* <a href="#cdk-dms-replication.S3Settings">S3Settings</a>

---

##### `sapAseSettings`<sup>Optional</sup> <a name="sapAseSettings" id="cdk-dms-replication.SourceEndpointOptions.property.sapAseSettings"></a>

```typescript
public readonly sapAseSettings: SapAseSettings;
```

- *Type:* <a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a>

---

##### `serverName`<sup>Optional</sup> <a name="serverName" id="cdk-dms-replication.SourceEndpointOptions.property.serverName"></a>

```typescript
public readonly serverName: string;
```

- *Type:* string

---

##### `sqlServerSettings`<sup>Optional</sup> <a name="sqlServerSettings" id="cdk-dms-replication.SourceEndpointOptions.property.sqlServerSettings"></a>

```typescript
public readonly sqlServerSettings: SqlServerSettings;
```

- *Type:* <a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a>

---

##### `sslMode`<sup>Optional</sup> <a name="sslMode" id="cdk-dms-replication.SourceEndpointOptions.property.sslMode"></a>

```typescript
public readonly sslMode: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk-dms-replication.SourceEndpointOptions.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

### SqlServerSettings <a name="SqlServerSettings" id="cdk-dms-replication.SqlServerSettings"></a>

Settings for Microsoft SQL Server endpoints.

#### Initializer <a name="Initializer" id="cdk-dms-replication.SqlServerSettings.Initializer"></a>

```typescript
import { SqlServerSettings } from 'cdk-dms-replication'

const sqlServerSettings: SqlServerSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.bcpPacketSize">bcpPacketSize</a></code> | <code>number</code> | Maximum number of bytes per BCP packet. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.controlTablesFileGroup">controlTablesFileGroup</a></code> | <code>string</code> | Filegroup in SQL Server for control tables. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.querySingleAlwaysOnNode">querySingleAlwaysOnNode</a></code> | <code>boolean</code> | Whether to query a single AlwaysOn node. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.readBackupOnly">readBackupOnly</a></code> | <code>boolean</code> | Whether to use backup files for CDC. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.safeguardPolicy">safeguardPolicy</a></code> | <code><a href="#cdk-dms-replication.SqlServerSafeguardPolicy">SqlServerSafeguardPolicy</a></code> | Safeguard policy for SQL Server CDC. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.secretsManagerAccessRoleArn">secretsManagerAccessRoleArn</a></code> | <code>string</code> | ARN of IAM role for Secrets Manager. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.secretsManagerSecretId">secretsManagerSecretId</a></code> | <code>string</code> | Full ARN or name of the Secrets Manager secret. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.tlogAccessMode">tlogAccessMode</a></code> | <code>string</code> | Controls how DMS accesses the SQL Server transaction log. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.trimSpaceInChar">trimSpaceInChar</a></code> | <code>boolean</code> | Trim spaces from CHAR/VARCHAR columns. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.useBcpFullLoad">useBcpFullLoad</a></code> | <code>boolean</code> | Use BCP full load. |
| <code><a href="#cdk-dms-replication.SqlServerSettings.property.useThirdPartyBackupDevice">useThirdPartyBackupDevice</a></code> | <code>boolean</code> | Use third-party backup device. |

---

##### `bcpPacketSize`<sup>Optional</sup> <a name="bcpPacketSize" id="cdk-dms-replication.SqlServerSettings.property.bcpPacketSize"></a>

```typescript
public readonly bcpPacketSize: number;
```

- *Type:* number

Maximum number of bytes per BCP packet.

---

##### `controlTablesFileGroup`<sup>Optional</sup> <a name="controlTablesFileGroup" id="cdk-dms-replication.SqlServerSettings.property.controlTablesFileGroup"></a>

```typescript
public readonly controlTablesFileGroup: string;
```

- *Type:* string

Filegroup in SQL Server for control tables.

---

##### `querySingleAlwaysOnNode`<sup>Optional</sup> <a name="querySingleAlwaysOnNode" id="cdk-dms-replication.SqlServerSettings.property.querySingleAlwaysOnNode"></a>

```typescript
public readonly querySingleAlwaysOnNode: boolean;
```

- *Type:* boolean

Whether to query a single AlwaysOn node.

---

##### `readBackupOnly`<sup>Optional</sup> <a name="readBackupOnly" id="cdk-dms-replication.SqlServerSettings.property.readBackupOnly"></a>

```typescript
public readonly readBackupOnly: boolean;
```

- *Type:* boolean

Whether to use backup files for CDC.

---

##### `safeguardPolicy`<sup>Optional</sup> <a name="safeguardPolicy" id="cdk-dms-replication.SqlServerSettings.property.safeguardPolicy"></a>

```typescript
public readonly safeguardPolicy: SqlServerSafeguardPolicy;
```

- *Type:* <a href="#cdk-dms-replication.SqlServerSafeguardPolicy">SqlServerSafeguardPolicy</a>

Safeguard policy for SQL Server CDC.

---

##### `secretsManagerAccessRoleArn`<sup>Optional</sup> <a name="secretsManagerAccessRoleArn" id="cdk-dms-replication.SqlServerSettings.property.secretsManagerAccessRoleArn"></a>

```typescript
public readonly secretsManagerAccessRoleArn: string;
```

- *Type:* string

ARN of IAM role for Secrets Manager.

---

##### `secretsManagerSecretId`<sup>Optional</sup> <a name="secretsManagerSecretId" id="cdk-dms-replication.SqlServerSettings.property.secretsManagerSecretId"></a>

```typescript
public readonly secretsManagerSecretId: string;
```

- *Type:* string

Full ARN or name of the Secrets Manager secret.

---

##### `tlogAccessMode`<sup>Optional</sup> <a name="tlogAccessMode" id="cdk-dms-replication.SqlServerSettings.property.tlogAccessMode"></a>

```typescript
public readonly tlogAccessMode: string;
```

- *Type:* string

Controls how DMS accesses the SQL Server transaction log.

---

##### `trimSpaceInChar`<sup>Optional</sup> <a name="trimSpaceInChar" id="cdk-dms-replication.SqlServerSettings.property.trimSpaceInChar"></a>

```typescript
public readonly trimSpaceInChar: boolean;
```

- *Type:* boolean

Trim spaces from CHAR/VARCHAR columns.

---

##### `useBcpFullLoad`<sup>Optional</sup> <a name="useBcpFullLoad" id="cdk-dms-replication.SqlServerSettings.property.useBcpFullLoad"></a>

```typescript
public readonly useBcpFullLoad: boolean;
```

- *Type:* boolean

Use BCP full load.

---

##### `useThirdPartyBackupDevice`<sup>Optional</sup> <a name="useThirdPartyBackupDevice" id="cdk-dms-replication.SqlServerSettings.property.useThirdPartyBackupDevice"></a>

```typescript
public readonly useThirdPartyBackupDevice: boolean;
```

- *Type:* boolean

Use third-party backup device.

---

### TableMappingRule <a name="TableMappingRule" id="cdk-dms-replication.TableMappingRule"></a>

Represents a single, fully built rule in the table-mappings JSON.

#### Initializer <a name="Initializer" id="cdk-dms-replication.TableMappingRule.Initializer"></a>

```typescript
import { TableMappingRule } from 'cdk-dms-replication'

const tableMappingRule: TableMappingRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.objectLocator">objectLocator</a></code> | <code><a href="#cdk-dms-replication.RuleObjectLocatorValue">RuleObjectLocatorValue</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.ruleAction">ruleAction</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.ruleId">ruleId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.ruleName">ruleName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.ruleType">ruleType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.oldValue">oldValue</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TableMappingRule.property.value">value</a></code> | <code>string</code> | *No description.* |

---

##### `objectLocator`<sup>Required</sup> <a name="objectLocator" id="cdk-dms-replication.TableMappingRule.property.objectLocator"></a>

```typescript
public readonly objectLocator: RuleObjectLocatorValue;
```

- *Type:* <a href="#cdk-dms-replication.RuleObjectLocatorValue">RuleObjectLocatorValue</a>

---

##### `ruleAction`<sup>Required</sup> <a name="ruleAction" id="cdk-dms-replication.TableMappingRule.property.ruleAction"></a>

```typescript
public readonly ruleAction: string;
```

- *Type:* string

---

##### `ruleId`<sup>Required</sup> <a name="ruleId" id="cdk-dms-replication.TableMappingRule.property.ruleId"></a>

```typescript
public readonly ruleId: string;
```

- *Type:* string

---

##### `ruleName`<sup>Required</sup> <a name="ruleName" id="cdk-dms-replication.TableMappingRule.property.ruleName"></a>

```typescript
public readonly ruleName: string;
```

- *Type:* string

---

##### `ruleType`<sup>Required</sup> <a name="ruleType" id="cdk-dms-replication.TableMappingRule.property.ruleType"></a>

```typescript
public readonly ruleType: string;
```

- *Type:* string

---

##### `oldValue`<sup>Optional</sup> <a name="oldValue" id="cdk-dms-replication.TableMappingRule.property.oldValue"></a>

```typescript
public readonly oldValue: string;
```

- *Type:* string

---

##### `value`<sup>Optional</sup> <a name="value" id="cdk-dms-replication.TableMappingRule.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

---

### TargetEndpointOptions <a name="TargetEndpointOptions" id="cdk-dms-replication.TargetEndpointOptions"></a>

Properties for the target endpoint of a {@link DmsMigrationPipeline}.

Extends {@link DmsEndpointProps} but omits `endpointType` (always TARGET).

#### Initializer <a name="Initializer" id="cdk-dms-replication.TargetEndpointOptions.Initializer"></a>

```typescript
import { TargetEndpointOptions } from 'cdk-dms-replication'

const targetEndpointOptions: TargetEndpointOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.engine">engine</a></code> | <code><a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.certificateArn">certificateArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.databaseName">databaseName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.db2Settings">db2Settings</a></code> | <code><a href="#cdk-dms-replication.Db2Settings">Db2Settings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.dynamoDbSettings">dynamoDbSettings</a></code> | <code><a href="#cdk-dms-replication.DynamoDbSettings">DynamoDbSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.endpointIdentifier">endpointIdentifier</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.extraConnectionAttributes">extraConnectionAttributes</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.kafkaSettings">kafkaSettings</a></code> | <code><a href="#cdk-dms-replication.KafkaSettings">KafkaSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.kinesisSettings">kinesisSettings</a></code> | <code><a href="#cdk-dms-replication.KinesisSettings">KinesisSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.mongoDbSettings">mongoDbSettings</a></code> | <code><a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.mySqlSettings">mySqlSettings</a></code> | <code><a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.neptuneSettings">neptuneSettings</a></code> | <code><a href="#cdk-dms-replication.NeptuneSettings">NeptuneSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.openSearchSettings">openSearchSettings</a></code> | <code><a href="#cdk-dms-replication.OpenSearchSettings">OpenSearchSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.oracleSettings">oracleSettings</a></code> | <code><a href="#cdk-dms-replication.OracleSettings">OracleSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.password">password</a></code> | <code>aws-cdk-lib.SecretValue</code> | Database password. |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.port">port</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.postgreSqlSettings">postgreSqlSettings</a></code> | <code><a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.redisSettings">redisSettings</a></code> | <code><a href="#cdk-dms-replication.RedisSettings">RedisSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.redshiftSettings">redshiftSettings</a></code> | <code><a href="#cdk-dms-replication.RedshiftSettings">RedshiftSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.s3Settings">s3Settings</a></code> | <code><a href="#cdk-dms-replication.S3Settings">S3Settings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.sapAseSettings">sapAseSettings</a></code> | <code><a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.serverName">serverName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.sqlServerSettings">sqlServerSettings</a></code> | <code><a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.sslMode">sslMode</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-dms-replication.TargetEndpointOptions.property.username">username</a></code> | <code>string</code> | *No description.* |

---

##### `engine`<sup>Required</sup> <a name="engine" id="cdk-dms-replication.TargetEndpointOptions.property.engine"></a>

```typescript
public readonly engine: EndpointEngine;
```

- *Type:* <a href="#cdk-dms-replication.EndpointEngine">EndpointEngine</a>

---

##### `certificateArn`<sup>Optional</sup> <a name="certificateArn" id="cdk-dms-replication.TargetEndpointOptions.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

---

##### `databaseName`<sup>Optional</sup> <a name="databaseName" id="cdk-dms-replication.TargetEndpointOptions.property.databaseName"></a>

```typescript
public readonly databaseName: string;
```

- *Type:* string

---

##### `db2Settings`<sup>Optional</sup> <a name="db2Settings" id="cdk-dms-replication.TargetEndpointOptions.property.db2Settings"></a>

```typescript
public readonly db2Settings: Db2Settings;
```

- *Type:* <a href="#cdk-dms-replication.Db2Settings">Db2Settings</a>

---

##### `dynamoDbSettings`<sup>Optional</sup> <a name="dynamoDbSettings" id="cdk-dms-replication.TargetEndpointOptions.property.dynamoDbSettings"></a>

```typescript
public readonly dynamoDbSettings: DynamoDbSettings;
```

- *Type:* <a href="#cdk-dms-replication.DynamoDbSettings">DynamoDbSettings</a>

---

##### `endpointIdentifier`<sup>Optional</sup> <a name="endpointIdentifier" id="cdk-dms-replication.TargetEndpointOptions.property.endpointIdentifier"></a>

```typescript
public readonly endpointIdentifier: string;
```

- *Type:* string

---

##### `extraConnectionAttributes`<sup>Optional</sup> <a name="extraConnectionAttributes" id="cdk-dms-replication.TargetEndpointOptions.property.extraConnectionAttributes"></a>

```typescript
public readonly extraConnectionAttributes: string;
```

- *Type:* string

---

##### `kafkaSettings`<sup>Optional</sup> <a name="kafkaSettings" id="cdk-dms-replication.TargetEndpointOptions.property.kafkaSettings"></a>

```typescript
public readonly kafkaSettings: KafkaSettings;
```

- *Type:* <a href="#cdk-dms-replication.KafkaSettings">KafkaSettings</a>

---

##### `kinesisSettings`<sup>Optional</sup> <a name="kinesisSettings" id="cdk-dms-replication.TargetEndpointOptions.property.kinesisSettings"></a>

```typescript
public readonly kinesisSettings: KinesisSettings;
```

- *Type:* <a href="#cdk-dms-replication.KinesisSettings">KinesisSettings</a>

---

##### `mongoDbSettings`<sup>Optional</sup> <a name="mongoDbSettings" id="cdk-dms-replication.TargetEndpointOptions.property.mongoDbSettings"></a>

```typescript
public readonly mongoDbSettings: MongoDbSettings;
```

- *Type:* <a href="#cdk-dms-replication.MongoDbSettings">MongoDbSettings</a>

---

##### `mySqlSettings`<sup>Optional</sup> <a name="mySqlSettings" id="cdk-dms-replication.TargetEndpointOptions.property.mySqlSettings"></a>

```typescript
public readonly mySqlSettings: MySqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.MySqlSettings">MySqlSettings</a>

---

##### `neptuneSettings`<sup>Optional</sup> <a name="neptuneSettings" id="cdk-dms-replication.TargetEndpointOptions.property.neptuneSettings"></a>

```typescript
public readonly neptuneSettings: NeptuneSettings;
```

- *Type:* <a href="#cdk-dms-replication.NeptuneSettings">NeptuneSettings</a>

---

##### `openSearchSettings`<sup>Optional</sup> <a name="openSearchSettings" id="cdk-dms-replication.TargetEndpointOptions.property.openSearchSettings"></a>

```typescript
public readonly openSearchSettings: OpenSearchSettings;
```

- *Type:* <a href="#cdk-dms-replication.OpenSearchSettings">OpenSearchSettings</a>

---

##### `oracleSettings`<sup>Optional</sup> <a name="oracleSettings" id="cdk-dms-replication.TargetEndpointOptions.property.oracleSettings"></a>

```typescript
public readonly oracleSettings: OracleSettings;
```

- *Type:* <a href="#cdk-dms-replication.OracleSettings">OracleSettings</a>

---

##### `password`<sup>Optional</sup> <a name="password" id="cdk-dms-replication.TargetEndpointOptions.property.password"></a>

```typescript
public readonly password: SecretValue;
```

- *Type:* aws-cdk-lib.SecretValue

Database password.

The resolved value is stored as **plaintext** in the
CloudFormation template. Prefer `secretsManagerSecretId` in the
engine-specific settings for production workloads.

---

##### `port`<sup>Optional</sup> <a name="port" id="cdk-dms-replication.TargetEndpointOptions.property.port"></a>

```typescript
public readonly port: number;
```

- *Type:* number

---

##### `postgreSqlSettings`<sup>Optional</sup> <a name="postgreSqlSettings" id="cdk-dms-replication.TargetEndpointOptions.property.postgreSqlSettings"></a>

```typescript
public readonly postgreSqlSettings: PostgreSqlSettings;
```

- *Type:* <a href="#cdk-dms-replication.PostgreSqlSettings">PostgreSqlSettings</a>

---

##### `redisSettings`<sup>Optional</sup> <a name="redisSettings" id="cdk-dms-replication.TargetEndpointOptions.property.redisSettings"></a>

```typescript
public readonly redisSettings: RedisSettings;
```

- *Type:* <a href="#cdk-dms-replication.RedisSettings">RedisSettings</a>

---

##### `redshiftSettings`<sup>Optional</sup> <a name="redshiftSettings" id="cdk-dms-replication.TargetEndpointOptions.property.redshiftSettings"></a>

```typescript
public readonly redshiftSettings: RedshiftSettings;
```

- *Type:* <a href="#cdk-dms-replication.RedshiftSettings">RedshiftSettings</a>

---

##### `s3Settings`<sup>Optional</sup> <a name="s3Settings" id="cdk-dms-replication.TargetEndpointOptions.property.s3Settings"></a>

```typescript
public readonly s3Settings: S3Settings;
```

- *Type:* <a href="#cdk-dms-replication.S3Settings">S3Settings</a>

---

##### `sapAseSettings`<sup>Optional</sup> <a name="sapAseSettings" id="cdk-dms-replication.TargetEndpointOptions.property.sapAseSettings"></a>

```typescript
public readonly sapAseSettings: SapAseSettings;
```

- *Type:* <a href="#cdk-dms-replication.SapAseSettings">SapAseSettings</a>

---

##### `serverName`<sup>Optional</sup> <a name="serverName" id="cdk-dms-replication.TargetEndpointOptions.property.serverName"></a>

```typescript
public readonly serverName: string;
```

- *Type:* string

---

##### `sqlServerSettings`<sup>Optional</sup> <a name="sqlServerSettings" id="cdk-dms-replication.TargetEndpointOptions.property.sqlServerSettings"></a>

```typescript
public readonly sqlServerSettings: SqlServerSettings;
```

- *Type:* <a href="#cdk-dms-replication.SqlServerSettings">SqlServerSettings</a>

---

##### `sslMode`<sup>Optional</sup> <a name="sslMode" id="cdk-dms-replication.TargetEndpointOptions.property.sslMode"></a>

```typescript
public readonly sslMode: string;
```

- *Type:* string

---

##### `username`<sup>Optional</sup> <a name="username" id="cdk-dms-replication.TargetEndpointOptions.property.username"></a>

```typescript
public readonly username: string;
```

- *Type:* string

---

## Classes <a name="Classes" id="Classes"></a>

### TableMappings <a name="TableMappings" id="cdk-dms-replication.TableMappings"></a>

Fluent builder for DMS table mappings.

*Example*

```typescript
const mappings = new TableMappings()
  .includeSchema('public')
  .includeTable('public', 'orders')
  .excludeTable('public', 'audit_log')
  .renameSchema('public', 'prod')
  .toLowerCaseTable('public', '%')
  .toJson();
```


#### Initializers <a name="Initializers" id="cdk-dms-replication.TableMappings.Initializer"></a>

```typescript
import { TableMappings } from 'cdk-dms-replication'

new TableMappings()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.TableMappings.addColumn">addColumn</a></code> | Add a new column to a table. |
| <code><a href="#cdk-dms-replication.TableMappings.addPrefixToSchema">addPrefixToSchema</a></code> | Add a prefix to schema names. |
| <code><a href="#cdk-dms-replication.TableMappings.addPrefixToTable">addPrefixToTable</a></code> | Add a prefix to table names. |
| <code><a href="#cdk-dms-replication.TableMappings.addSuffixToSchema">addSuffixToSchema</a></code> | Add a suffix to schema names. |
| <code><a href="#cdk-dms-replication.TableMappings.addSuffixToTable">addSuffixToTable</a></code> | Add a suffix to table names. |
| <code><a href="#cdk-dms-replication.TableMappings.excludeSchema">excludeSchema</a></code> | Exclude all tables in a schema. |
| <code><a href="#cdk-dms-replication.TableMappings.excludeTable">excludeTable</a></code> | Exclude a specific table (or wildcard) within a schema. |
| <code><a href="#cdk-dms-replication.TableMappings.explicitTable">explicitTable</a></code> | Explicitly include a single table. |
| <code><a href="#cdk-dms-replication.TableMappings.includeSchema">includeSchema</a></code> | Include all tables in a schema. |
| <code><a href="#cdk-dms-replication.TableMappings.includeTable">includeTable</a></code> | Include a specific table (or a wildcard pattern) within a schema. |
| <code><a href="#cdk-dms-replication.TableMappings.removeColumn">removeColumn</a></code> | Remove a column from a table. |
| <code><a href="#cdk-dms-replication.TableMappings.renameColumn">renameColumn</a></code> | Rename a column in a table. |
| <code><a href="#cdk-dms-replication.TableMappings.renameSchema">renameSchema</a></code> | Rename a schema. |
| <code><a href="#cdk-dms-replication.TableMappings.renameTable">renameTable</a></code> | Rename a table. |
| <code><a href="#cdk-dms-replication.TableMappings.toJson">toJson</a></code> | Serialise the accumulated rules to the JSON string expected by DMS. |
| <code><a href="#cdk-dms-replication.TableMappings.toLowerCaseColumn">toLowerCaseColumn</a></code> | Convert matching column names to lowercase. |
| <code><a href="#cdk-dms-replication.TableMappings.toLowerCaseSchema">toLowerCaseSchema</a></code> | Convert all schema names to lowercase. |
| <code><a href="#cdk-dms-replication.TableMappings.toLowerCaseTable">toLowerCaseTable</a></code> | Convert matching table names to lowercase. |
| <code><a href="#cdk-dms-replication.TableMappings.toUpperCaseColumn">toUpperCaseColumn</a></code> | Convert matching column names to uppercase. |
| <code><a href="#cdk-dms-replication.TableMappings.toUpperCaseSchema">toUpperCaseSchema</a></code> | Convert all schema names to uppercase. |
| <code><a href="#cdk-dms-replication.TableMappings.toUpperCaseTable">toUpperCaseTable</a></code> | Convert matching table names to uppercase. |

---

##### `addColumn` <a name="addColumn" id="cdk-dms-replication.TableMappings.addColumn"></a>

```typescript
public addColumn(schemaName: string, tableName: string, column: AddColumnDefinition): TableMappings
```

Add a new column to a table.

*Example*

```typescript
mappings.addColumn('public', 'orders', {
  columnName: 'migration_ts',
  columnType: ColumnDataType.DATETIME,
  expression: '$timestamp',
});
```


###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.addColumn.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.addColumn.parameter.tableName"></a>

- *Type:* string

---

###### `column`<sup>Required</sup> <a name="column" id="cdk-dms-replication.TableMappings.addColumn.parameter.column"></a>

- *Type:* <a href="#cdk-dms-replication.AddColumnDefinition">AddColumnDefinition</a>

---

##### `addPrefixToSchema` <a name="addPrefixToSchema" id="cdk-dms-replication.TableMappings.addPrefixToSchema"></a>

```typescript
public addPrefixToSchema(schemaName: string, prefix: string): TableMappings
```

Add a prefix to schema names.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.addPrefixToSchema.parameter.schemaName"></a>

- *Type:* string

---

###### `prefix`<sup>Required</sup> <a name="prefix" id="cdk-dms-replication.TableMappings.addPrefixToSchema.parameter.prefix"></a>

- *Type:* string

---

##### `addPrefixToTable` <a name="addPrefixToTable" id="cdk-dms-replication.TableMappings.addPrefixToTable"></a>

```typescript
public addPrefixToTable(schemaName: string, tableName: string, prefix: string): TableMappings
```

Add a prefix to table names.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.addPrefixToTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.addPrefixToTable.parameter.tableName"></a>

- *Type:* string

---

###### `prefix`<sup>Required</sup> <a name="prefix" id="cdk-dms-replication.TableMappings.addPrefixToTable.parameter.prefix"></a>

- *Type:* string

---

##### `addSuffixToSchema` <a name="addSuffixToSchema" id="cdk-dms-replication.TableMappings.addSuffixToSchema"></a>

```typescript
public addSuffixToSchema(schemaName: string, suffix: string): TableMappings
```

Add a suffix to schema names.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.addSuffixToSchema.parameter.schemaName"></a>

- *Type:* string

---

###### `suffix`<sup>Required</sup> <a name="suffix" id="cdk-dms-replication.TableMappings.addSuffixToSchema.parameter.suffix"></a>

- *Type:* string

---

##### `addSuffixToTable` <a name="addSuffixToTable" id="cdk-dms-replication.TableMappings.addSuffixToTable"></a>

```typescript
public addSuffixToTable(schemaName: string, tableName: string, suffix: string): TableMappings
```

Add a suffix to table names.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.addSuffixToTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.addSuffixToTable.parameter.tableName"></a>

- *Type:* string

---

###### `suffix`<sup>Required</sup> <a name="suffix" id="cdk-dms-replication.TableMappings.addSuffixToTable.parameter.suffix"></a>

- *Type:* string

---

##### `excludeSchema` <a name="excludeSchema" id="cdk-dms-replication.TableMappings.excludeSchema"></a>

```typescript
public excludeSchema(schemaName: string): TableMappings
```

Exclude all tables in a schema.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.excludeSchema.parameter.schemaName"></a>

- *Type:* string

---

##### `excludeTable` <a name="excludeTable" id="cdk-dms-replication.TableMappings.excludeTable"></a>

```typescript
public excludeTable(schemaName: string, tableName: string): TableMappings
```

Exclude a specific table (or wildcard) within a schema.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.excludeTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.excludeTable.parameter.tableName"></a>

- *Type:* string

---

##### `explicitTable` <a name="explicitTable" id="cdk-dms-replication.TableMappings.explicitTable"></a>

```typescript
public explicitTable(schemaName: string, tableName: string): TableMappings
```

Explicitly include a single table.

Unlike `include`, `explicit` means DMS
only migrates this one table regardless of other `include` rules.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.explicitTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.explicitTable.parameter.tableName"></a>

- *Type:* string

---

##### `includeSchema` <a name="includeSchema" id="cdk-dms-replication.TableMappings.includeSchema"></a>

```typescript
public includeSchema(schemaName: string): TableMappings
```

Include all tables in a schema.

Use `%` as a wildcard for `schemaName` to include all schemas.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.includeSchema.parameter.schemaName"></a>

- *Type:* string

---

##### `includeTable` <a name="includeTable" id="cdk-dms-replication.TableMappings.includeTable"></a>

```typescript
public includeTable(schemaName: string, tableName: string): TableMappings
```

Include a specific table (or a wildcard pattern) within a schema.

Use `%` for `tableName` to match all tables in the schema.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.includeTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.includeTable.parameter.tableName"></a>

- *Type:* string

---

##### `removeColumn` <a name="removeColumn" id="cdk-dms-replication.TableMappings.removeColumn"></a>

```typescript
public removeColumn(schemaName: string, tableName: string, columnName: string): TableMappings
```

Remove a column from a table.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.removeColumn.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.removeColumn.parameter.tableName"></a>

- *Type:* string

---

###### `columnName`<sup>Required</sup> <a name="columnName" id="cdk-dms-replication.TableMappings.removeColumn.parameter.columnName"></a>

- *Type:* string

---

##### `renameColumn` <a name="renameColumn" id="cdk-dms-replication.TableMappings.renameColumn"></a>

```typescript
public renameColumn(schemaName: string, tableName: string, columnName: string, newName: string): TableMappings
```

Rename a column in a table.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.renameColumn.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.renameColumn.parameter.tableName"></a>

- *Type:* string

---

###### `columnName`<sup>Required</sup> <a name="columnName" id="cdk-dms-replication.TableMappings.renameColumn.parameter.columnName"></a>

- *Type:* string

---

###### `newName`<sup>Required</sup> <a name="newName" id="cdk-dms-replication.TableMappings.renameColumn.parameter.newName"></a>

- *Type:* string

---

##### `renameSchema` <a name="renameSchema" id="cdk-dms-replication.TableMappings.renameSchema"></a>

```typescript
public renameSchema(schemaName: string, newName: string): TableMappings
```

Rename a schema.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.renameSchema.parameter.schemaName"></a>

- *Type:* string

---

###### `newName`<sup>Required</sup> <a name="newName" id="cdk-dms-replication.TableMappings.renameSchema.parameter.newName"></a>

- *Type:* string

---

##### `renameTable` <a name="renameTable" id="cdk-dms-replication.TableMappings.renameTable"></a>

```typescript
public renameTable(schemaName: string, tableName: string, newName: string): TableMappings
```

Rename a table.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.renameTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.renameTable.parameter.tableName"></a>

- *Type:* string

---

###### `newName`<sup>Required</sup> <a name="newName" id="cdk-dms-replication.TableMappings.renameTable.parameter.newName"></a>

- *Type:* string

---

##### `toJson` <a name="toJson" id="cdk-dms-replication.TableMappings.toJson"></a>

```typescript
public toJson(): string
```

Serialise the accumulated rules to the JSON string expected by DMS.

Passes the result directly to `replicationTaskSettings` or
`DmsReplicationTask.tableMappings`.

##### `toLowerCaseColumn` <a name="toLowerCaseColumn" id="cdk-dms-replication.TableMappings.toLowerCaseColumn"></a>

```typescript
public toLowerCaseColumn(schemaName: string, tableName: string, columnName: string): TableMappings
```

Convert matching column names to lowercase.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toLowerCaseColumn.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.toLowerCaseColumn.parameter.tableName"></a>

- *Type:* string

---

###### `columnName`<sup>Required</sup> <a name="columnName" id="cdk-dms-replication.TableMappings.toLowerCaseColumn.parameter.columnName"></a>

- *Type:* string

---

##### `toLowerCaseSchema` <a name="toLowerCaseSchema" id="cdk-dms-replication.TableMappings.toLowerCaseSchema"></a>

```typescript
public toLowerCaseSchema(schemaName: string): TableMappings
```

Convert all schema names to lowercase.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toLowerCaseSchema.parameter.schemaName"></a>

- *Type:* string

---

##### `toLowerCaseTable` <a name="toLowerCaseTable" id="cdk-dms-replication.TableMappings.toLowerCaseTable"></a>

```typescript
public toLowerCaseTable(schemaName: string, tableName: string): TableMappings
```

Convert matching table names to lowercase.

Use `%` to match all tables.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toLowerCaseTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.toLowerCaseTable.parameter.tableName"></a>

- *Type:* string

---

##### `toUpperCaseColumn` <a name="toUpperCaseColumn" id="cdk-dms-replication.TableMappings.toUpperCaseColumn"></a>

```typescript
public toUpperCaseColumn(schemaName: string, tableName: string, columnName: string): TableMappings
```

Convert matching column names to uppercase.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toUpperCaseColumn.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.toUpperCaseColumn.parameter.tableName"></a>

- *Type:* string

---

###### `columnName`<sup>Required</sup> <a name="columnName" id="cdk-dms-replication.TableMappings.toUpperCaseColumn.parameter.columnName"></a>

- *Type:* string

---

##### `toUpperCaseSchema` <a name="toUpperCaseSchema" id="cdk-dms-replication.TableMappings.toUpperCaseSchema"></a>

```typescript
public toUpperCaseSchema(schemaName: string): TableMappings
```

Convert all schema names to uppercase.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toUpperCaseSchema.parameter.schemaName"></a>

- *Type:* string

---

##### `toUpperCaseTable` <a name="toUpperCaseTable" id="cdk-dms-replication.TableMappings.toUpperCaseTable"></a>

```typescript
public toUpperCaseTable(schemaName: string, tableName: string): TableMappings
```

Convert matching table names to uppercase.

###### `schemaName`<sup>Required</sup> <a name="schemaName" id="cdk-dms-replication.TableMappings.toUpperCaseTable.parameter.schemaName"></a>

- *Type:* string

---

###### `tableName`<sup>Required</sup> <a name="tableName" id="cdk-dms-replication.TableMappings.toUpperCaseTable.parameter.tableName"></a>

- *Type:* string

---




### TaskSettings <a name="TaskSettings" id="cdk-dms-replication.TaskSettings"></a>

Fluent builder for DMS task settings.

*Example*

```typescript
const settings = new TaskSettings()
  .withLobMode(LobMode.LIMITED_LOB, 32)
  .withFullLoadSubTasks(16)
  .withBatchApply(true, 5, 60)
  .withDataErrorPolicy(ErrorAction.IGNORE_RECORD, 100)
  .withLogging('SOURCE_UNLOAD', LoggingLevel.LOGGER_SEVERITY_DEFAULT)
  .toJson();
```


#### Initializers <a name="Initializers" id="cdk-dms-replication.TaskSettings.Initializer"></a>

```typescript
import { TaskSettings } from 'cdk-dms-replication'

new TaskSettings()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.TaskSettings.toJson">toJson</a></code> | Produce the JSON string that DMS expects for `replicationTaskSettings`. |
| <code><a href="#cdk-dms-replication.TaskSettings.withBatchApply">withBatchApply</a></code> | Enable or disable CDC batch apply mode and configure its timeouts. |
| <code><a href="#cdk-dms-replication.TaskSettings.withCommitRate">withCommitRate</a></code> | Set the commit rate (number of rows per commit) during full load. |
| <code><a href="#cdk-dms-replication.TaskSettings.withDataErrorPolicy">withDataErrorPolicy</a></code> | Configure the action taken on data errors. |
| <code><a href="#cdk-dms-replication.TaskSettings.withFullLoadSubTasks">withFullLoadSubTasks</a></code> | Set the maximum number of tables loaded in parallel. |
| <code><a href="#cdk-dms-replication.TaskSettings.withLobMode">withLobMode</a></code> | Configure LOB handling. |
| <code><a href="#cdk-dms-replication.TaskSettings.withLogging">withLogging</a></code> | Set the logging level for a named DMS log component. |
| <code><a href="#cdk-dms-replication.TaskSettings.withLoggingEnabled">withLoggingEnabled</a></code> | Enable or disable CloudWatch logging for the task. |
| <code><a href="#cdk-dms-replication.TaskSettings.withRecovery">withRecovery</a></code> | Configure recovery from transient errors. |
| <code><a href="#cdk-dms-replication.TaskSettings.withTargetTablePrepMode">withTargetTablePrepMode</a></code> | Set the full-load target table prepare mode. |

---

##### `toJson` <a name="toJson" id="cdk-dms-replication.TaskSettings.toJson"></a>

```typescript
public toJson(): string
```

Produce the JSON string that DMS expects for `replicationTaskSettings`.

##### `withBatchApply` <a name="withBatchApply" id="cdk-dms-replication.TaskSettings.withBatchApply"></a>

```typescript
public withBatchApply(enabled: boolean, minSeconds?: number, maxSeconds?: number): TaskSettings
```

Enable or disable CDC batch apply mode and configure its timeouts.

###### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-dms-replication.TaskSettings.withBatchApply.parameter.enabled"></a>

- *Type:* boolean

Whether batch apply is on.

---

###### `minSeconds`<sup>Optional</sup> <a name="minSeconds" id="cdk-dms-replication.TaskSettings.withBatchApply.parameter.minSeconds"></a>

- *Type:* number

Minimum seconds before applying a batch (default 1).

---

###### `maxSeconds`<sup>Optional</sup> <a name="maxSeconds" id="cdk-dms-replication.TaskSettings.withBatchApply.parameter.maxSeconds"></a>

- *Type:* number

Maximum seconds before applying a batch (default 30).

---

##### `withCommitRate` <a name="withCommitRate" id="cdk-dms-replication.TaskSettings.withCommitRate"></a>

```typescript
public withCommitRate(rows: number): TaskSettings
```

Set the commit rate (number of rows per commit) during full load.

###### `rows`<sup>Required</sup> <a name="rows" id="cdk-dms-replication.TaskSettings.withCommitRate.parameter.rows"></a>

- *Type:* number

---

##### `withDataErrorPolicy` <a name="withDataErrorPolicy" id="cdk-dms-replication.TaskSettings.withDataErrorPolicy"></a>

```typescript
public withDataErrorPolicy(policy: ErrorAction, escalationCount?: number, escalationPolicy?: ErrorAction): TaskSettings
```

Configure the action taken on data errors.

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-dms-replication.TaskSettings.withDataErrorPolicy.parameter.policy"></a>

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>

Action when a data error is encountered.

---

###### `escalationCount`<sup>Optional</sup> <a name="escalationCount" id="cdk-dms-replication.TaskSettings.withDataErrorPolicy.parameter.escalationCount"></a>

- *Type:* number

After this many errors, apply the escalation policy (0 = immediate).

---

###### `escalationPolicy`<sup>Optional</sup> <a name="escalationPolicy" id="cdk-dms-replication.TaskSettings.withDataErrorPolicy.parameter.escalationPolicy"></a>

- *Type:* <a href="#cdk-dms-replication.ErrorAction">ErrorAction</a>

Action after `escalationCount` errors.

---

##### `withFullLoadSubTasks` <a name="withFullLoadSubTasks" id="cdk-dms-replication.TaskSettings.withFullLoadSubTasks"></a>

```typescript
public withFullLoadSubTasks(count: number): TaskSettings
```

Set the maximum number of tables loaded in parallel.

###### `count`<sup>Required</sup> <a name="count" id="cdk-dms-replication.TaskSettings.withFullLoadSubTasks.parameter.count"></a>

- *Type:* number

Default 8.

---

##### `withLobMode` <a name="withLobMode" id="cdk-dms-replication.TaskSettings.withLobMode"></a>

```typescript
public withLobMode(mode: LobMode, maxSizeKb?: number): TaskSettings
```

Configure LOB handling.

###### `mode`<sup>Required</sup> <a name="mode" id="cdk-dms-replication.TaskSettings.withLobMode.parameter.mode"></a>

- *Type:* <a href="#cdk-dms-replication.LobMode">LobMode</a>

How LOBs are handled.

---

###### `maxSizeKb`<sup>Optional</sup> <a name="maxSizeKb" id="cdk-dms-replication.TaskSettings.withLobMode.parameter.maxSizeKb"></a>

- *Type:* number

Maximum LOB size in KB when mode is LIMITED_LOB.

Ignored otherwise.

---

##### `withLogging` <a name="withLogging" id="cdk-dms-replication.TaskSettings.withLogging"></a>

```typescript
public withLogging(component: string, level: LoggingLevel): TaskSettings
```

Set the logging level for a named DMS log component.

Common component names: SOURCE_UNLOAD, TARGET_LOAD, TASK_MANAGER,
SOURCE_CAPTURE, TARGET_APPLY, REST_SERVER, TRANSFORMATION.

###### `component`<sup>Required</sup> <a name="component" id="cdk-dms-replication.TaskSettings.withLogging.parameter.component"></a>

- *Type:* string

---

###### `level`<sup>Required</sup> <a name="level" id="cdk-dms-replication.TaskSettings.withLogging.parameter.level"></a>

- *Type:* <a href="#cdk-dms-replication.LoggingLevel">LoggingLevel</a>

---

##### `withLoggingEnabled` <a name="withLoggingEnabled" id="cdk-dms-replication.TaskSettings.withLoggingEnabled"></a>

```typescript
public withLoggingEnabled(enabled: boolean): TaskSettings
```

Enable or disable CloudWatch logging for the task.

###### `enabled`<sup>Required</sup> <a name="enabled" id="cdk-dms-replication.TaskSettings.withLoggingEnabled.parameter.enabled"></a>

- *Type:* boolean

---

##### `withRecovery` <a name="withRecovery" id="cdk-dms-replication.TaskSettings.withRecovery"></a>

```typescript
public withRecovery(count: number, interval?: number): TaskSettings
```

Configure recovery from transient errors.

###### `count`<sup>Required</sup> <a name="count" id="cdk-dms-replication.TaskSettings.withRecovery.parameter.count"></a>

- *Type:* number

Maximum recovery attempts (-1 = unlimited).

---

###### `interval`<sup>Optional</sup> <a name="interval" id="cdk-dms-replication.TaskSettings.withRecovery.parameter.interval"></a>

- *Type:* number

Seconds between attempts.

---

##### `withTargetTablePrepMode` <a name="withTargetTablePrepMode" id="cdk-dms-replication.TaskSettings.withTargetTablePrepMode"></a>

```typescript
public withTargetTablePrepMode(mode: string): TaskSettings
```

Set the full-load target table prepare mode.

Common values: "DROP_AND_CREATE", "TRUNCATE_BEFORE_LOAD", "DO_NOTHING".

###### `mode`<sup>Required</sup> <a name="mode" id="cdk-dms-replication.TaskSettings.withTargetTablePrepMode.parameter.mode"></a>

- *Type:* string

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IDmsEndpoint <a name="IDmsEndpoint" id="cdk-dms-replication.IDmsEndpoint"></a>

- *Implemented By:* <a href="#cdk-dms-replication.DmsEndpoint">DmsEndpoint</a>, <a href="#cdk-dms-replication.IDmsEndpoint">IDmsEndpoint</a>

Minimal contract for a DMS endpoint that can be used as a source or target in a {@link DmsReplicationTask } or {@link DmsMigrationPipeline }.

Use this interface when referencing an endpoint created outside of this
construct (e.g. by ARN). For endpoints created by this library, use the
concrete {@link DmsEndpoint} class directly — it exposes `cfnEndpoint`
for L1 escape-hatch access.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-dms-replication.IDmsEndpoint.property.endpointArn">endpointArn</a></code> | <code>string</code> | ARN of the DMS endpoint. |

---

##### `endpointArn`<sup>Required</sup> <a name="endpointArn" id="cdk-dms-replication.IDmsEndpoint.property.endpointArn"></a>

```typescript
public readonly endpointArn: string;
```

- *Type:* string

ARN of the DMS endpoint.

---

## Enums <a name="Enums" id="Enums"></a>

### ColumnDataType <a name="ColumnDataType" id="cdk-dms-replication.ColumnDataType"></a>

Data type for added columns.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.ColumnDataType.STRING">STRING</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.INT4">INT4</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.INT8">INT8</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.FLOAT4">FLOAT4</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.FLOAT8">FLOAT8</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.NUMERIC">NUMERIC</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.DATETIME">DATETIME</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.BYTES">BYTES</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ColumnDataType.BLOB">BLOB</a></code> | *No description.* |

---

##### `STRING` <a name="STRING" id="cdk-dms-replication.ColumnDataType.STRING"></a>

---


##### `INT4` <a name="INT4" id="cdk-dms-replication.ColumnDataType.INT4"></a>

---


##### `INT8` <a name="INT8" id="cdk-dms-replication.ColumnDataType.INT8"></a>

---


##### `FLOAT4` <a name="FLOAT4" id="cdk-dms-replication.ColumnDataType.FLOAT4"></a>

---


##### `FLOAT8` <a name="FLOAT8" id="cdk-dms-replication.ColumnDataType.FLOAT8"></a>

---


##### `NUMERIC` <a name="NUMERIC" id="cdk-dms-replication.ColumnDataType.NUMERIC"></a>

---


##### `DATETIME` <a name="DATETIME" id="cdk-dms-replication.ColumnDataType.DATETIME"></a>

---


##### `BYTES` <a name="BYTES" id="cdk-dms-replication.ColumnDataType.BYTES"></a>

---


##### `BLOB` <a name="BLOB" id="cdk-dms-replication.ColumnDataType.BLOB"></a>

---


### DatePartitionDelimiter <a name="DatePartitionDelimiter" id="cdk-dms-replication.DatePartitionDelimiter"></a>

Date partition delimiter for S3 date-partitioned output.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DatePartitionDelimiter.SLASH">SLASH</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionDelimiter.UNDERSCORE">UNDERSCORE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionDelimiter.DASH">DASH</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionDelimiter.NONE">NONE</a></code> | *No description.* |

---

##### `SLASH` <a name="SLASH" id="cdk-dms-replication.DatePartitionDelimiter.SLASH"></a>

---


##### `UNDERSCORE` <a name="UNDERSCORE" id="cdk-dms-replication.DatePartitionDelimiter.UNDERSCORE"></a>

---


##### `DASH` <a name="DASH" id="cdk-dms-replication.DatePartitionDelimiter.DASH"></a>

---


##### `NONE` <a name="NONE" id="cdk-dms-replication.DatePartitionDelimiter.NONE"></a>

---


### DatePartitionSequence <a name="DatePartitionSequence" id="cdk-dms-replication.DatePartitionSequence"></a>

Date partition sequence for S3 date-partitioned output.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.DatePartitionSequence.YYYYMMDD">YYYYMMDD</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionSequence.YYYYMMDDHH">YYYYMMDDHH</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionSequence.YYYYMM">YYYYMM</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionSequence.MMYYYYDD">MMYYYYDD</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.DatePartitionSequence.DDMMYYYY">DDMMYYYY</a></code> | *No description.* |

---

##### `YYYYMMDD` <a name="YYYYMMDD" id="cdk-dms-replication.DatePartitionSequence.YYYYMMDD"></a>

---


##### `YYYYMMDDHH` <a name="YYYYMMDDHH" id="cdk-dms-replication.DatePartitionSequence.YYYYMMDDHH"></a>

---


##### `YYYYMM` <a name="YYYYMM" id="cdk-dms-replication.DatePartitionSequence.YYYYMM"></a>

---


##### `MMYYYYDD` <a name="MMYYYYDD" id="cdk-dms-replication.DatePartitionSequence.MMYYYYDD"></a>

---


##### `DDMMYYYY` <a name="DDMMYYYY" id="cdk-dms-replication.DatePartitionSequence.DDMMYYYY"></a>

---


### EncodingType <a name="EncodingType" id="cdk-dms-replication.EncodingType"></a>

Encoding type for S3 parquet output.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.EncodingType.PLAIN">PLAIN</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EncodingType.PLAIN_DICTIONARY">PLAIN_DICTIONARY</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EncodingType.RLE_DICTIONARY">RLE_DICTIONARY</a></code> | *No description.* |

---

##### `PLAIN` <a name="PLAIN" id="cdk-dms-replication.EncodingType.PLAIN"></a>

---


##### `PLAIN_DICTIONARY` <a name="PLAIN_DICTIONARY" id="cdk-dms-replication.EncodingType.PLAIN_DICTIONARY"></a>

---


##### `RLE_DICTIONARY` <a name="RLE_DICTIONARY" id="cdk-dms-replication.EncodingType.RLE_DICTIONARY"></a>

---


### EncryptionMode <a name="EncryptionMode" id="cdk-dms-replication.EncryptionMode"></a>

Encryption mode used when writing data to an S3 bucket or Redshift cluster.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.EncryptionMode.SSE_S3">SSE_S3</a></code> | Server-side encryption using S3-managed keys (SSE-S3). |
| <code><a href="#cdk-dms-replication.EncryptionMode.SSE_KMS">SSE_KMS</a></code> | Server-side encryption using AWS KMS-managed keys (SSE-KMS). |

---

##### `SSE_S3` <a name="SSE_S3" id="cdk-dms-replication.EncryptionMode.SSE_S3"></a>

Server-side encryption using S3-managed keys (SSE-S3).

---


##### `SSE_KMS` <a name="SSE_KMS" id="cdk-dms-replication.EncryptionMode.SSE_KMS"></a>

Server-side encryption using AWS KMS-managed keys (SSE-KMS).

---


### EndpointEngine <a name="EndpointEngine" id="cdk-dms-replication.EndpointEngine"></a>

Database engine for a DMS endpoint.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.EndpointEngine.MYSQL">MYSQL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.AURORA_MYSQL">AURORA_MYSQL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.POSTGRES">POSTGRES</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.AURORA_POSTGRESQL">AURORA_POSTGRESQL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.ORACLE">ORACLE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.SQLSERVER">SQLSERVER</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.MARIADB">MARIADB</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.SAP_ASE">SAP_ASE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.IBM_DB2">IBM_DB2</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.IBM_DB2_ZOS">IBM_DB2_ZOS</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.MONGODB">MONGODB</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.DOCDB">DOCDB</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.S3">S3</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.DYNAMODB">DYNAMODB</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.REDSHIFT">REDSHIFT</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.KINESIS">KINESIS</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.KAFKA">KAFKA</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.OPENSEARCH">OPENSEARCH</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.NEPTUNE">NEPTUNE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointEngine.REDIS">REDIS</a></code> | *No description.* |

---

##### `MYSQL` <a name="MYSQL" id="cdk-dms-replication.EndpointEngine.MYSQL"></a>

---


##### `AURORA_MYSQL` <a name="AURORA_MYSQL" id="cdk-dms-replication.EndpointEngine.AURORA_MYSQL"></a>

---


##### `POSTGRES` <a name="POSTGRES" id="cdk-dms-replication.EndpointEngine.POSTGRES"></a>

---


##### `AURORA_POSTGRESQL` <a name="AURORA_POSTGRESQL" id="cdk-dms-replication.EndpointEngine.AURORA_POSTGRESQL"></a>

---


##### `ORACLE` <a name="ORACLE" id="cdk-dms-replication.EndpointEngine.ORACLE"></a>

---


##### `SQLSERVER` <a name="SQLSERVER" id="cdk-dms-replication.EndpointEngine.SQLSERVER"></a>

---


##### `MARIADB` <a name="MARIADB" id="cdk-dms-replication.EndpointEngine.MARIADB"></a>

---


##### `SAP_ASE` <a name="SAP_ASE" id="cdk-dms-replication.EndpointEngine.SAP_ASE"></a>

---


##### `IBM_DB2` <a name="IBM_DB2" id="cdk-dms-replication.EndpointEngine.IBM_DB2"></a>

---


##### `IBM_DB2_ZOS` <a name="IBM_DB2_ZOS" id="cdk-dms-replication.EndpointEngine.IBM_DB2_ZOS"></a>

---


##### `MONGODB` <a name="MONGODB" id="cdk-dms-replication.EndpointEngine.MONGODB"></a>

---


##### `DOCDB` <a name="DOCDB" id="cdk-dms-replication.EndpointEngine.DOCDB"></a>

---


##### `S3` <a name="S3" id="cdk-dms-replication.EndpointEngine.S3"></a>

---


##### `DYNAMODB` <a name="DYNAMODB" id="cdk-dms-replication.EndpointEngine.DYNAMODB"></a>

---


##### `REDSHIFT` <a name="REDSHIFT" id="cdk-dms-replication.EndpointEngine.REDSHIFT"></a>

---


##### `KINESIS` <a name="KINESIS" id="cdk-dms-replication.EndpointEngine.KINESIS"></a>

---


##### `KAFKA` <a name="KAFKA" id="cdk-dms-replication.EndpointEngine.KAFKA"></a>

---


##### `OPENSEARCH` <a name="OPENSEARCH" id="cdk-dms-replication.EndpointEngine.OPENSEARCH"></a>

---


##### `NEPTUNE` <a name="NEPTUNE" id="cdk-dms-replication.EndpointEngine.NEPTUNE"></a>

---


##### `REDIS` <a name="REDIS" id="cdk-dms-replication.EndpointEngine.REDIS"></a>

---


### EndpointType <a name="EndpointType" id="cdk-dms-replication.EndpointType"></a>

Whether an endpoint is a migration source or target.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.EndpointType.SOURCE">SOURCE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.EndpointType.TARGET">TARGET</a></code> | *No description.* |

---

##### `SOURCE` <a name="SOURCE" id="cdk-dms-replication.EndpointType.SOURCE"></a>

---


##### `TARGET` <a name="TARGET" id="cdk-dms-replication.EndpointType.TARGET"></a>

---


### ErrorAction <a name="ErrorAction" id="cdk-dms-replication.ErrorAction"></a>

Action to take on a recoverable error.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.ErrorAction.IGNORE">IGNORE</a></code> | Ignore the error and continue. |
| <code><a href="#cdk-dms-replication.ErrorAction.IGNORE_RECORD">IGNORE_RECORD</a></code> | Ignore the row, continue with the next. |
| <code><a href="#cdk-dms-replication.ErrorAction.STOP_TASK">STOP_TASK</a></code> | Stop the task. |

---

##### `IGNORE` <a name="IGNORE" id="cdk-dms-replication.ErrorAction.IGNORE"></a>

Ignore the error and continue.

---


##### `IGNORE_RECORD` <a name="IGNORE_RECORD" id="cdk-dms-replication.ErrorAction.IGNORE_RECORD"></a>

Ignore the row, continue with the next.

---


##### `STOP_TASK` <a name="STOP_TASK" id="cdk-dms-replication.ErrorAction.STOP_TASK"></a>

Stop the task.

---


### KafkaSecurityProtocol <a name="KafkaSecurityProtocol" id="cdk-dms-replication.KafkaSecurityProtocol"></a>

Security protocol for Kafka endpoints.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.KafkaSecurityProtocol.PLAINTEXT">PLAINTEXT</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.KafkaSecurityProtocol.SSL">SSL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.KafkaSecurityProtocol.SASL_SSL">SASL_SSL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.KafkaSecurityProtocol.SSL_AUTHENTICATION">SSL_AUTHENTICATION</a></code> | *No description.* |

---

##### `PLAINTEXT` <a name="PLAINTEXT" id="cdk-dms-replication.KafkaSecurityProtocol.PLAINTEXT"></a>

---


##### `SSL` <a name="SSL" id="cdk-dms-replication.KafkaSecurityProtocol.SSL"></a>

---


##### `SASL_SSL` <a name="SASL_SSL" id="cdk-dms-replication.KafkaSecurityProtocol.SASL_SSL"></a>

---


##### `SSL_AUTHENTICATION` <a name="SSL_AUTHENTICATION" id="cdk-dms-replication.KafkaSecurityProtocol.SSL_AUTHENTICATION"></a>

---


### LobMode <a name="LobMode" id="cdk-dms-replication.LobMode"></a>

LOB (Large Object) handling mode.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.LobMode.NONE">NONE</a></code> | No LOB support. |
| <code><a href="#cdk-dms-replication.LobMode.FULL_LOB">FULL_LOB</a></code> | All LOBs are migrated as inline data (full LOB mode). |
| <code><a href="#cdk-dms-replication.LobMode.LIMITED_LOB">LIMITED_LOB</a></code> | LOBs are truncated at a configurable size. |

---

##### `NONE` <a name="NONE" id="cdk-dms-replication.LobMode.NONE"></a>

No LOB support.

---


##### `FULL_LOB` <a name="FULL_LOB" id="cdk-dms-replication.LobMode.FULL_LOB"></a>

All LOBs are migrated as inline data (full LOB mode).

---


##### `LIMITED_LOB` <a name="LIMITED_LOB" id="cdk-dms-replication.LobMode.LIMITED_LOB"></a>

LOBs are truncated at a configurable size.

---


### LoggingLevel <a name="LoggingLevel" id="cdk-dms-replication.LoggingLevel"></a>

Logging verbosity for DMS task log components.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DEFAULT">LOGGER_SEVERITY_DEFAULT</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DEBUG">LOGGER_SEVERITY_DEBUG</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DETAILED_DEBUG">LOGGER_SEVERITY_DETAILED_DEBUG</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_ERROR">LOGGER_SEVERITY_ERROR</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_WARNING">LOGGER_SEVERITY_WARNING</a></code> | *No description.* |

---

##### `LOGGER_SEVERITY_DEFAULT` <a name="LOGGER_SEVERITY_DEFAULT" id="cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DEFAULT"></a>

---


##### `LOGGER_SEVERITY_DEBUG` <a name="LOGGER_SEVERITY_DEBUG" id="cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DEBUG"></a>

---


##### `LOGGER_SEVERITY_DETAILED_DEBUG` <a name="LOGGER_SEVERITY_DETAILED_DEBUG" id="cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_DETAILED_DEBUG"></a>

---


##### `LOGGER_SEVERITY_ERROR` <a name="LOGGER_SEVERITY_ERROR" id="cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_ERROR"></a>

---


##### `LOGGER_SEVERITY_WARNING` <a name="LOGGER_SEVERITY_WARNING" id="cdk-dms-replication.LoggingLevel.LOGGER_SEVERITY_WARNING"></a>

---


### MessageFormat <a name="MessageFormat" id="cdk-dms-replication.MessageFormat"></a>

Message format emitted to Kinesis or Kafka.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MessageFormat.JSON">JSON</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MessageFormat.JSON_UNFORMATTED">JSON_UNFORMATTED</a></code> | *No description.* |

---

##### `JSON` <a name="JSON" id="cdk-dms-replication.MessageFormat.JSON"></a>

---


##### `JSON_UNFORMATTED` <a name="JSON_UNFORMATTED" id="cdk-dms-replication.MessageFormat.JSON_UNFORMATTED"></a>

---


### MigrationType <a name="MigrationType" id="cdk-dms-replication.MigrationType"></a>

The type of database migration to perform.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MigrationType.FULL_LOAD">FULL_LOAD</a></code> | Migrate all existing data from source to target (one-time). |
| <code><a href="#cdk-dms-replication.MigrationType.CDC">CDC</a></code> | Replicate ongoing changes from source to target using CDC. |
| <code><a href="#cdk-dms-replication.MigrationType.FULL_LOAD_AND_CDC">FULL_LOAD_AND_CDC</a></code> | Perform a full load first, then replicate ongoing changes. |

---

##### `FULL_LOAD` <a name="FULL_LOAD" id="cdk-dms-replication.MigrationType.FULL_LOAD"></a>

Migrate all existing data from source to target (one-time).

---


##### `CDC` <a name="CDC" id="cdk-dms-replication.MigrationType.CDC"></a>

Replicate ongoing changes from source to target using CDC.

---


##### `FULL_LOAD_AND_CDC` <a name="FULL_LOAD_AND_CDC" id="cdk-dms-replication.MigrationType.FULL_LOAD_AND_CDC"></a>

Perform a full load first, then replicate ongoing changes.

---


### MongoAuthMechanism <a name="MongoAuthMechanism" id="cdk-dms-replication.MongoAuthMechanism"></a>

MongoDB authentication mechanism.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MongoAuthMechanism.DEFAULT">DEFAULT</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MongoAuthMechanism.MONGODB_CR">MONGODB_CR</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MongoAuthMechanism.SCRAM_SHA_1">SCRAM_SHA_1</a></code> | *No description.* |

---

##### `DEFAULT` <a name="DEFAULT" id="cdk-dms-replication.MongoAuthMechanism.DEFAULT"></a>

---


##### `MONGODB_CR` <a name="MONGODB_CR" id="cdk-dms-replication.MongoAuthMechanism.MONGODB_CR"></a>

---


##### `SCRAM_SHA_1` <a name="SCRAM_SHA_1" id="cdk-dms-replication.MongoAuthMechanism.SCRAM_SHA_1"></a>

---


### MongoAuthType <a name="MongoAuthType" id="cdk-dms-replication.MongoAuthType"></a>

MongoDB authentication type.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MongoAuthType.NO">NO</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MongoAuthType.PASSWORD">PASSWORD</a></code> | *No description.* |

---

##### `NO` <a name="NO" id="cdk-dms-replication.MongoAuthType.NO"></a>

---


##### `PASSWORD` <a name="PASSWORD" id="cdk-dms-replication.MongoAuthType.PASSWORD"></a>

---


### MongoNestingLevel <a name="MongoNestingLevel" id="cdk-dms-replication.MongoNestingLevel"></a>

MongoDB document nesting level.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MongoNestingLevel.NONE">NONE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MongoNestingLevel.ONE">ONE</a></code> | *No description.* |

---

##### `NONE` <a name="NONE" id="cdk-dms-replication.MongoNestingLevel.NONE"></a>

---


##### `ONE` <a name="ONE" id="cdk-dms-replication.MongoNestingLevel.ONE"></a>

---


### MySqlTargetDbType <a name="MySqlTargetDbType" id="cdk-dms-replication.MySqlTargetDbType"></a>

Target DB type for MySQL target endpoints.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.MySqlTargetDbType.SPECIFIC_DATABASE">SPECIFIC_DATABASE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.MySqlTargetDbType.MULTIPLE_DATABASES">MULTIPLE_DATABASES</a></code> | *No description.* |

---

##### `SPECIFIC_DATABASE` <a name="SPECIFIC_DATABASE" id="cdk-dms-replication.MySqlTargetDbType.SPECIFIC_DATABASE"></a>

---


##### `MULTIPLE_DATABASES` <a name="MULTIPLE_DATABASES" id="cdk-dms-replication.MySqlTargetDbType.MULTIPLE_DATABASES"></a>

---


### OracleCdcPlugin <a name="OracleCdcPlugin" id="cdk-dms-replication.OracleCdcPlugin"></a>

Oracle LogMiner CDC plugin.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.OracleCdcPlugin.LOGMINER">LOGMINER</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.OracleCdcPlugin.BINARY_READER">BINARY_READER</a></code> | *No description.* |

---

##### `LOGMINER` <a name="LOGMINER" id="cdk-dms-replication.OracleCdcPlugin.LOGMINER"></a>

---


##### `BINARY_READER` <a name="BINARY_READER" id="cdk-dms-replication.OracleCdcPlugin.BINARY_READER"></a>

---


### OracleNumberDatatypeScale <a name="OracleNumberDatatypeScale" id="cdk-dms-replication.OracleNumberDatatypeScale"></a>

Oracle number datatype scale option.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.OracleNumberDatatypeScale.FLOAT">FLOAT</a></code> | Use -1 to preserve the original Oracle precision. |
| <code><a href="#cdk-dms-replication.OracleNumberDatatypeScale.DOUBLE">DOUBLE</a></code> | Use -2 to map NUMBER to DOUBLE. |

---

##### `FLOAT` <a name="FLOAT" id="cdk-dms-replication.OracleNumberDatatypeScale.FLOAT"></a>

Use -1 to preserve the original Oracle precision.

---


##### `DOUBLE` <a name="DOUBLE" id="cdk-dms-replication.OracleNumberDatatypeScale.DOUBLE"></a>

Use -2 to map NUMBER to DOUBLE.

---


### ParquetVersion <a name="ParquetVersion" id="cdk-dms-replication.ParquetVersion"></a>

Parquet version for S3 endpoint output.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.ParquetVersion.PARQUET_1_0">PARQUET_1_0</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ParquetVersion.PARQUET_2_0">PARQUET_2_0</a></code> | *No description.* |

---

##### `PARQUET_1_0` <a name="PARQUET_1_0" id="cdk-dms-replication.ParquetVersion.PARQUET_1_0"></a>

---


##### `PARQUET_2_0` <a name="PARQUET_2_0" id="cdk-dms-replication.ParquetVersion.PARQUET_2_0"></a>

---


### PostgresCdcPlugin <a name="PostgresCdcPlugin" id="cdk-dms-replication.PostgresCdcPlugin"></a>

PostgreSQL CDC plugin.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.PostgresCdcPlugin.PG_LOGICAL">PG_LOGICAL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.PostgresCdcPlugin.TEST_DECODING">TEST_DECODING</a></code> | *No description.* |

---

##### `PG_LOGICAL` <a name="PG_LOGICAL" id="cdk-dms-replication.PostgresCdcPlugin.PG_LOGICAL"></a>

---


##### `TEST_DECODING` <a name="TEST_DECODING" id="cdk-dms-replication.PostgresCdcPlugin.TEST_DECODING"></a>

---


### ReplicationInstanceClass <a name="ReplicationInstanceClass" id="cdk-dms-replication.ReplicationInstanceClass"></a>

DMS replication instance class.

> [https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.Types.html](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_ReplicationInstance.Types.html)

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.T3_SMALL">T3_SMALL</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.T3_MEDIUM">T3_MEDIUM</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.T3_LARGE">T3_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_LARGE">C5_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_XLARGE">C5_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_2XLARGE">C5_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_4XLARGE">C5_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_9XLARGE">C5_9XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_12XLARGE">C5_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_18XLARGE">C5_18XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C5_24XLARGE">C5_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_LARGE">C6I_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_XLARGE">C6I_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_2XLARGE">C6I_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_4XLARGE">C6I_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_8XLARGE">C6I_8XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_12XLARGE">C6I_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_16XLARGE">C6I_16XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_24XLARGE">C6I_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C6I_32XLARGE">C6I_32XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_LARGE">C7I_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_XLARGE">C7I_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_2XLARGE">C7I_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_4XLARGE">C7I_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_8XLARGE">C7I_8XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_12XLARGE">C7I_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_16XLARGE">C7I_16XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_24XLARGE">C7I_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.C7I_48XLARGE">C7I_48XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_LARGE">R5_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_XLARGE">R5_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_2XLARGE">R5_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_4XLARGE">R5_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_8XLARGE">R5_8XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_12XLARGE">R5_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_16XLARGE">R5_16XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R5_24XLARGE">R5_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_LARGE">R6I_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_XLARGE">R6I_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_2XLARGE">R6I_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_4XLARGE">R6I_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_8XLARGE">R6I_8XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_12XLARGE">R6I_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_16XLARGE">R6I_16XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_24XLARGE">R6I_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R6I_32XLARGE">R6I_32XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_LARGE">R7I_LARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_XLARGE">R7I_XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_2XLARGE">R7I_2XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_4XLARGE">R7I_4XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_8XLARGE">R7I_8XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_12XLARGE">R7I_12XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_16XLARGE">R7I_16XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_24XLARGE">R7I_24XLARGE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.ReplicationInstanceClass.R7I_48XLARGE">R7I_48XLARGE</a></code> | *No description.* |

---

##### `T3_SMALL` <a name="T3_SMALL" id="cdk-dms-replication.ReplicationInstanceClass.T3_SMALL"></a>

---


##### `T3_MEDIUM` <a name="T3_MEDIUM" id="cdk-dms-replication.ReplicationInstanceClass.T3_MEDIUM"></a>

---


##### `T3_LARGE` <a name="T3_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.T3_LARGE"></a>

---


##### `C5_LARGE` <a name="C5_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_LARGE"></a>

---


##### `C5_XLARGE` <a name="C5_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_XLARGE"></a>

---


##### `C5_2XLARGE` <a name="C5_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_2XLARGE"></a>

---


##### `C5_4XLARGE` <a name="C5_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_4XLARGE"></a>

---


##### `C5_9XLARGE` <a name="C5_9XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_9XLARGE"></a>

---


##### `C5_12XLARGE` <a name="C5_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_12XLARGE"></a>

---


##### `C5_18XLARGE` <a name="C5_18XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_18XLARGE"></a>

---


##### `C5_24XLARGE` <a name="C5_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C5_24XLARGE"></a>

---


##### `C6I_LARGE` <a name="C6I_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_LARGE"></a>

---


##### `C6I_XLARGE` <a name="C6I_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_XLARGE"></a>

---


##### `C6I_2XLARGE` <a name="C6I_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_2XLARGE"></a>

---


##### `C6I_4XLARGE` <a name="C6I_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_4XLARGE"></a>

---


##### `C6I_8XLARGE` <a name="C6I_8XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_8XLARGE"></a>

---


##### `C6I_12XLARGE` <a name="C6I_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_12XLARGE"></a>

---


##### `C6I_16XLARGE` <a name="C6I_16XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_16XLARGE"></a>

---


##### `C6I_24XLARGE` <a name="C6I_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_24XLARGE"></a>

---


##### `C6I_32XLARGE` <a name="C6I_32XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C6I_32XLARGE"></a>

---


##### `C7I_LARGE` <a name="C7I_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_LARGE"></a>

---


##### `C7I_XLARGE` <a name="C7I_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_XLARGE"></a>

---


##### `C7I_2XLARGE` <a name="C7I_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_2XLARGE"></a>

---


##### `C7I_4XLARGE` <a name="C7I_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_4XLARGE"></a>

---


##### `C7I_8XLARGE` <a name="C7I_8XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_8XLARGE"></a>

---


##### `C7I_12XLARGE` <a name="C7I_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_12XLARGE"></a>

---


##### `C7I_16XLARGE` <a name="C7I_16XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_16XLARGE"></a>

---


##### `C7I_24XLARGE` <a name="C7I_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_24XLARGE"></a>

---


##### `C7I_48XLARGE` <a name="C7I_48XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.C7I_48XLARGE"></a>

---


##### `R5_LARGE` <a name="R5_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_LARGE"></a>

---


##### `R5_XLARGE` <a name="R5_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_XLARGE"></a>

---


##### `R5_2XLARGE` <a name="R5_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_2XLARGE"></a>

---


##### `R5_4XLARGE` <a name="R5_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_4XLARGE"></a>

---


##### `R5_8XLARGE` <a name="R5_8XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_8XLARGE"></a>

---


##### `R5_12XLARGE` <a name="R5_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_12XLARGE"></a>

---


##### `R5_16XLARGE` <a name="R5_16XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_16XLARGE"></a>

---


##### `R5_24XLARGE` <a name="R5_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R5_24XLARGE"></a>

---


##### `R6I_LARGE` <a name="R6I_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_LARGE"></a>

---


##### `R6I_XLARGE` <a name="R6I_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_XLARGE"></a>

---


##### `R6I_2XLARGE` <a name="R6I_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_2XLARGE"></a>

---


##### `R6I_4XLARGE` <a name="R6I_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_4XLARGE"></a>

---


##### `R6I_8XLARGE` <a name="R6I_8XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_8XLARGE"></a>

---


##### `R6I_12XLARGE` <a name="R6I_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_12XLARGE"></a>

---


##### `R6I_16XLARGE` <a name="R6I_16XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_16XLARGE"></a>

---


##### `R6I_24XLARGE` <a name="R6I_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_24XLARGE"></a>

---


##### `R6I_32XLARGE` <a name="R6I_32XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R6I_32XLARGE"></a>

---


##### `R7I_LARGE` <a name="R7I_LARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_LARGE"></a>

---


##### `R7I_XLARGE` <a name="R7I_XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_XLARGE"></a>

---


##### `R7I_2XLARGE` <a name="R7I_2XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_2XLARGE"></a>

---


##### `R7I_4XLARGE` <a name="R7I_4XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_4XLARGE"></a>

---


##### `R7I_8XLARGE` <a name="R7I_8XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_8XLARGE"></a>

---


##### `R7I_12XLARGE` <a name="R7I_12XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_12XLARGE"></a>

---


##### `R7I_16XLARGE` <a name="R7I_16XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_16XLARGE"></a>

---


##### `R7I_24XLARGE` <a name="R7I_24XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_24XLARGE"></a>

---


##### `R7I_48XLARGE` <a name="R7I_48XLARGE" id="cdk-dms-replication.ReplicationInstanceClass.R7I_48XLARGE"></a>

---


### RuleObjectLocator <a name="RuleObjectLocator" id="cdk-dms-replication.RuleObjectLocator"></a>

The object type a rule targets.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.RuleObjectLocator.SCHEMA">SCHEMA</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocator.TABLE">TABLE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocator.COLUMN">COLUMN</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocator.TABLE_TABLESPACE">TABLE_TABLESPACE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.RuleObjectLocator.INDEX_TABLESPACE">INDEX_TABLESPACE</a></code> | *No description.* |

---

##### `SCHEMA` <a name="SCHEMA" id="cdk-dms-replication.RuleObjectLocator.SCHEMA"></a>

---


##### `TABLE` <a name="TABLE" id="cdk-dms-replication.RuleObjectLocator.TABLE"></a>

---


##### `COLUMN` <a name="COLUMN" id="cdk-dms-replication.RuleObjectLocator.COLUMN"></a>

---


##### `TABLE_TABLESPACE` <a name="TABLE_TABLESPACE" id="cdk-dms-replication.RuleObjectLocator.TABLE_TABLESPACE"></a>

---


##### `INDEX_TABLESPACE` <a name="INDEX_TABLESPACE" id="cdk-dms-replication.RuleObjectLocator.INDEX_TABLESPACE"></a>

---


### S3DataFormat <a name="S3DataFormat" id="cdk-dms-replication.S3DataFormat"></a>

Data format for S3 endpoint output.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.S3DataFormat.CSV">CSV</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.S3DataFormat.PARQUET">PARQUET</a></code> | *No description.* |

---

##### `CSV` <a name="CSV" id="cdk-dms-replication.S3DataFormat.CSV"></a>

---


##### `PARQUET` <a name="PARQUET" id="cdk-dms-replication.S3DataFormat.PARQUET"></a>

---


### SelectionAction <a name="SelectionAction" id="cdk-dms-replication.SelectionAction"></a>

Whether the rule selects or excludes objects.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.SelectionAction.INCLUDE">INCLUDE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SelectionAction.EXCLUDE">EXCLUDE</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SelectionAction.EXPLICIT">EXPLICIT</a></code> | *No description.* |

---

##### `INCLUDE` <a name="INCLUDE" id="cdk-dms-replication.SelectionAction.INCLUDE"></a>

---


##### `EXCLUDE` <a name="EXCLUDE" id="cdk-dms-replication.SelectionAction.EXCLUDE"></a>

---


##### `EXPLICIT` <a name="EXPLICIT" id="cdk-dms-replication.SelectionAction.EXPLICIT"></a>

---


### SqlServerSafeguardPolicy <a name="SqlServerSafeguardPolicy" id="cdk-dms-replication.SqlServerSafeguardPolicy"></a>

Redshift safeguard policy for SQL Server CDC.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.SqlServerSafeguardPolicy.RELY_ON_SQL_SERVER_REPLICATION_AGENT">RELY_ON_SQL_SERVER_REPLICATION_AGENT</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SqlServerSafeguardPolicy.EXCLUSIVE_AUTOMATIC_TRUNCATION">EXCLUSIVE_AUTOMATIC_TRUNCATION</a></code> | *No description.* |
| <code><a href="#cdk-dms-replication.SqlServerSafeguardPolicy.SHARED_AUTOMATIC_TRUNCATION">SHARED_AUTOMATIC_TRUNCATION</a></code> | *No description.* |

---

##### `RELY_ON_SQL_SERVER_REPLICATION_AGENT` <a name="RELY_ON_SQL_SERVER_REPLICATION_AGENT" id="cdk-dms-replication.SqlServerSafeguardPolicy.RELY_ON_SQL_SERVER_REPLICATION_AGENT"></a>

---


##### `EXCLUSIVE_AUTOMATIC_TRUNCATION` <a name="EXCLUSIVE_AUTOMATIC_TRUNCATION" id="cdk-dms-replication.SqlServerSafeguardPolicy.EXCLUSIVE_AUTOMATIC_TRUNCATION"></a>

---


##### `SHARED_AUTOMATIC_TRUNCATION` <a name="SHARED_AUTOMATIC_TRUNCATION" id="cdk-dms-replication.SqlServerSafeguardPolicy.SHARED_AUTOMATIC_TRUNCATION"></a>

---


### TransformationAction <a name="TransformationAction" id="cdk-dms-replication.TransformationAction"></a>

Table-level transformation actions.

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-dms-replication.TransformationAction.CONVERT_LOWERCASE">CONVERT_LOWERCASE</a></code> | Convert the name to lowercase. |
| <code><a href="#cdk-dms-replication.TransformationAction.CONVERT_UPPERCASE">CONVERT_UPPERCASE</a></code> | Convert the name to uppercase. |
| <code><a href="#cdk-dms-replication.TransformationAction.ADD_PREFIX">ADD_PREFIX</a></code> | Add a prefix to the name. |
| <code><a href="#cdk-dms-replication.TransformationAction.REMOVE_PREFIX">REMOVE_PREFIX</a></code> | Remove a prefix from the name. |
| <code><a href="#cdk-dms-replication.TransformationAction.ADD_SUFFIX">ADD_SUFFIX</a></code> | Add a suffix to the name. |
| <code><a href="#cdk-dms-replication.TransformationAction.REMOVE_SUFFIX">REMOVE_SUFFIX</a></code> | Remove a suffix from the name. |
| <code><a href="#cdk-dms-replication.TransformationAction.RENAME">RENAME</a></code> | Rename the object. |
| <code><a href="#cdk-dms-replication.TransformationAction.REMOVE_COLUMN">REMOVE_COLUMN</a></code> | Remove the column. |
| <code><a href="#cdk-dms-replication.TransformationAction.ADD_COLUMN">ADD_COLUMN</a></code> | Add a column. |
| <code><a href="#cdk-dms-replication.TransformationAction.INCLUDE_COLUMN">INCLUDE_COLUMN</a></code> | Include the column. |

---

##### `CONVERT_LOWERCASE` <a name="CONVERT_LOWERCASE" id="cdk-dms-replication.TransformationAction.CONVERT_LOWERCASE"></a>

Convert the name to lowercase.

---


##### `CONVERT_UPPERCASE` <a name="CONVERT_UPPERCASE" id="cdk-dms-replication.TransformationAction.CONVERT_UPPERCASE"></a>

Convert the name to uppercase.

---


##### `ADD_PREFIX` <a name="ADD_PREFIX" id="cdk-dms-replication.TransformationAction.ADD_PREFIX"></a>

Add a prefix to the name.

---


##### `REMOVE_PREFIX` <a name="REMOVE_PREFIX" id="cdk-dms-replication.TransformationAction.REMOVE_PREFIX"></a>

Remove a prefix from the name.

---


##### `ADD_SUFFIX` <a name="ADD_SUFFIX" id="cdk-dms-replication.TransformationAction.ADD_SUFFIX"></a>

Add a suffix to the name.

---


##### `REMOVE_SUFFIX` <a name="REMOVE_SUFFIX" id="cdk-dms-replication.TransformationAction.REMOVE_SUFFIX"></a>

Remove a suffix from the name.

---


##### `RENAME` <a name="RENAME" id="cdk-dms-replication.TransformationAction.RENAME"></a>

Rename the object.

---


##### `REMOVE_COLUMN` <a name="REMOVE_COLUMN" id="cdk-dms-replication.TransformationAction.REMOVE_COLUMN"></a>

Remove the column.

---


##### `ADD_COLUMN` <a name="ADD_COLUMN" id="cdk-dms-replication.TransformationAction.ADD_COLUMN"></a>

Add a column.

---


##### `INCLUDE_COLUMN` <a name="INCLUDE_COLUMN" id="cdk-dms-replication.TransformationAction.INCLUDE_COLUMN"></a>

Include the column.

---


import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {
  DmsMigrationPipeline,
  DmsServerlessPipeline,
  EndpointEngine,
  MigrationType,
} from '../src';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeStack() {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack', {
    env: { account: '123456789012', region: 'us-east-1' },
  });
  const vpc = new ec2.Vpc(stack, 'Vpc', { maxAzs: 2 });
  return { app, stack, vpc };
}

const minProps = (vpc: ec2.IVpc) => ({
  vpc,
  maxCapacityUnits: 8,
  migrationType: MigrationType.FULL_LOAD,
  sourceEndpoint: {
    engine: EndpointEngine.MYSQL,
    serverName: 'mysql.example.com',
    port: 3306,
    username: 'user',
    databaseName: 'db',
  },
  targetEndpoint: {
    engine: EndpointEngine.AURORA_POSTGRESQL,
    serverName: 'aurora.example.com',
    port: 5432,
    username: 'user',
    databaseName: 'db',
  },
});

// ---------------------------------------------------------------------------
// DmsServerlessPipeline — defaults
// ---------------------------------------------------------------------------

describe('DmsServerlessPipeline', () => {
  test('creates a CfnReplicationConfig with correct defaults', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::DMS::ReplicationConfig', {
      ReplicationType: 'full-load',
      ComputeConfig: {
        MaxCapacityUnits: 8,
        MultiAZ: false,
      },
    });
  });

  test('creates a subnet group', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    Template.fromStack(stack).resourceCountIs('AWS::DMS::ReplicationSubnetGroup', 1);
  });

  test('creates a KMS key', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    Template.fromStack(stack).resourceCountIs('AWS::KMS::Key', 1);
  });

  test('creates a CloudWatch log group by default', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Logs::LogGroup', {
      LogGroupName: '/aws/dms/serverless/SL',
    });
  });

  test('creates two source and target endpoints', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    Template.fromStack(stack).resourceCountIs('AWS::DMS::Endpoint', 2);
  });

  test('creates dms-vpc-role and dms-cloudwatch-logs-role by default', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    const template = Template.fromStack(stack);

    template.resourceCountIs('Custom::DmsVpcRole', 1);
    template.resourceCountIs('Custom::DmsCloudWatchLogsRole', 1);
  });

  test('skips IAM role creation when createDmsServiceRoles is false', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', {
      ...minProps(vpc),
      createDmsServiceRoles: false,
    });
    const template = Template.fromStack(stack);
    template.resourceCountIs('Custom::DmsVpcRole', 0);
    template.resourceCountIs('Custom::DmsCloudWatchLogsRole', 0);
  });

  test('omits log group when enableCloudWatchLogs is false', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', {
      ...minProps(vpc),
      enableCloudWatchLogs: false,
    });
    Template.fromStack(stack).resourceCountIs('AWS::Logs::LogGroup', 0);
  });

  test('respects minCapacityUnits', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', {
      ...minProps(vpc),
      minCapacityUnits: 2,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationConfig', {
      ComputeConfig: {
        MinCapacityUnits: 2,
        MaxCapacityUnits: 8,
      },
    });
  });

  test('respects multiAz', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', {
      ...minProps(vpc),
      multiAz: true,
    });
    Template.fromStack(stack).hasResourceProperties('AWS::DMS::ReplicationConfig', {
      ComputeConfig: { MultiAZ: true },
    });
  });

  test('uses existing source endpoint', () => {
    const { stack, vpc } = makeStack();
    const existingSource = {
      endpointArn: 'arn:aws:dms:us-east-1:123456789012:endpoint:SOURCE',
      cfnEndpoint: undefined,
    };
    new DmsServerlessPipeline(stack, 'SL', {
      vpc,
      maxCapacityUnits: 8,
      migrationType: MigrationType.FULL_LOAD,
      existingSourceEndpoint: existingSource,
      targetEndpoint: minProps(vpc).targetEndpoint,
    });
    Template.fromStack(stack).resourceCountIs('AWS::DMS::Endpoint', 1);
  });

  test('uses existing target endpoint', () => {
    const { stack, vpc } = makeStack();
    const existingTarget = {
      endpointArn: 'arn:aws:dms:us-east-1:123456789012:endpoint:TARGET',
      cfnEndpoint: undefined,
    };
    new DmsServerlessPipeline(stack, 'SL', {
      vpc,
      maxCapacityUnits: 8,
      migrationType: MigrationType.FULL_LOAD,
      sourceEndpoint: minProps(vpc).sourceEndpoint,
      existingTargetEndpoint: existingTarget,
    });
    Template.fromStack(stack).resourceCountIs('AWS::DMS::Endpoint', 1);
  });

  // -------------------------------------------------------------------------
  // IAM role sharing with DmsMigrationPipeline
  // -------------------------------------------------------------------------

  test('shares dms-vpc-role with DmsMigrationPipeline in the same stack', () => {
    const { stack, vpc } = makeStack();
    new DmsMigrationPipeline(stack, 'Classic', {
      ...minProps(vpc),
      migrationType: MigrationType.FULL_LOAD,
    });
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));

    Template.fromStack(stack).resourceCountIs('Custom::DmsVpcRole', 1);
  });

  test('two stacks with createDmsServiceRoles:true synthesize without conflict', () => {
    const app = new cdk.App();
    const stack1 = new cdk.Stack(app, 'Stack1', { env: { account: '123456789012', region: 'us-east-1' } });
    const vpc1 = new ec2.Vpc(stack1, 'Vpc', { maxAzs: 2 });
    const stack2 = new cdk.Stack(app, 'Stack2', { env: { account: '123456789012', region: 'us-east-1' } });
    const vpc2 = new ec2.Vpc(stack2, 'Vpc', { maxAzs: 2 });

    new DmsServerlessPipeline(stack1, 'SL', minProps(vpc1));
    new DmsServerlessPipeline(stack2, 'SL', minProps(vpc2));

    Template.fromStack(stack1).resourceCountIs('Custom::DmsVpcRole', 1);
    Template.fromStack(stack2).resourceCountIs('Custom::DmsVpcRole', 1);
  });

  test('dms-vpc-role create call ignores EntityAlreadyExists', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    Template.fromStack(stack).hasResourceProperties('Custom::DmsVpcRole', {
      Create: Match.stringLikeRegexp('EntityAlreadyExists'),
    });
  });

  test('dms-vpc-role is retained when the stack is destroyed', () => {
    const { stack, vpc } = makeStack();
    new DmsServerlessPipeline(stack, 'SL', minProps(vpc));
    Template.fromStack(stack).hasResource('Custom::DmsVpcRole', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain',
    });
  });

  // -------------------------------------------------------------------------
  // Validation
  // -------------------------------------------------------------------------

  test('throws on invalid maxCapacityUnits', () => {
    const { stack, vpc } = makeStack();
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        ...minProps(vpc),
        maxCapacityUnits: 7,
      });
    }).toThrow(/maxCapacityUnits must be one of/);
  });

  test('throws on invalid minCapacityUnits', () => {
    const { stack, vpc } = makeStack();
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        ...minProps(vpc),
        minCapacityUnits: 3,
      });
    }).toThrow(/minCapacityUnits must be one of/);
  });

  test('throws when minCapacityUnits exceeds maxCapacityUnits', () => {
    const { stack, vpc } = makeStack();
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        ...minProps(vpc),
        minCapacityUnits: 16,
        maxCapacityUnits: 8,
      });
    }).toThrow(/minCapacityUnits.*must be.*<=.*maxCapacityUnits/);
  });

  test('throws when both sourceEndpoint and existingSourceEndpoint are provided', () => {
    const { stack, vpc } = makeStack();
    const existingSource = {
      endpointArn: 'arn:aws:dms:us-east-1:123456789012:endpoint:SOURCE',
      cfnEndpoint: undefined,
    };
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        ...minProps(vpc),
        existingSourceEndpoint: existingSource,
      });
    }).toThrow(/sourceEndpoint.*existingSourceEndpoint/);
  });

  test('throws when neither source endpoint is provided', () => {
    const { stack, vpc } = makeStack();
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        vpc,
        maxCapacityUnits: 8,
        migrationType: MigrationType.FULL_LOAD,
        targetEndpoint: minProps(vpc).targetEndpoint,
      });
    }).toThrow(/sourceEndpoint.*existingSourceEndpoint.*required/);
  });

  test('throws when both targetEndpoint and existingTargetEndpoint are provided', () => {
    const { stack, vpc } = makeStack();
    const existingTarget = {
      endpointArn: 'arn:aws:dms:us-east-1:123456789012:endpoint:TARGET',
    };
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        ...minProps(vpc),
        existingTargetEndpoint: existingTarget,
      });
    }).toThrow(/targetEndpoint.*existingTargetEndpoint/);
  });

  test('throws when neither target endpoint is provided', () => {
    const { stack, vpc } = makeStack();
    expect(() => {
      new DmsServerlessPipeline(stack, 'SL', {
        vpc,
        maxCapacityUnits: 8,
        migrationType: MigrationType.FULL_LOAD,
        sourceEndpoint: minProps(vpc).sourceEndpoint,
      });
    }).toThrow(/targetEndpoint.*existingTargetEndpoint.*required/);
  });
});

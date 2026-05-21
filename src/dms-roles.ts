import * as cdk from 'aws-cdk-lib';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * Creates an account-level DMS IAM role idempotently using a custom resource.
 * If the role already exists in the account (e.g. created by another stack),
 * the EntityAlreadyExists error is silently ignored. The role is retained on
 * stack deletion because it is an account-level prerequisite, not stack-owned.
 */
function ensureDmsRole(
  stack: cdk.Stack,
  constructId: string,
  roleName: string,
  policyArn: string,
  description: string,
  resourceType: string,
): Construct {
  const existing = stack.node.tryFindChild(constructId);
  if (existing) return existing as Construct;

  const scope = new Construct(stack, constructId);
  const roleArn = `arn:aws:iam::${stack.account}:role/${roleName}`;

  const trustPolicyDocument = JSON.stringify({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { Service: 'dms.amazonaws.com' },
        Action: 'sts:AssumeRole',
      },
    ],
  });

  const roleCreation = new cr.AwsCustomResource(scope, 'Create', {
    resourceType,
    onCreate: {
      service: 'IAM',
      action: 'createRole',
      parameters: {
        RoleName: roleName,
        AssumeRolePolicyDocument: trustPolicyDocument,
        Description: description,
      },
      ignoreErrorCodesMatching: 'EntityAlreadyExists',
      physicalResourceId: cr.PhysicalResourceId.of(roleName),
    },
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [roleArn] }),
  });

  // Always set the trust policy after create — if EntityAlreadyExists was returned
  // above (role pre-existed with wrong trust policy), this corrects it unconditionally.
  const trustPolicyUpdate = new cr.AwsCustomResource(scope, 'SetTrustPolicy', {
    onCreate: {
      service: 'IAM',
      action: 'updateAssumeRolePolicy',
      parameters: {
        RoleName: roleName,
        PolicyDocument: trustPolicyDocument,
      },
      physicalResourceId: cr.PhysicalResourceId.of(`${roleName}-trust`),
    },
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [roleArn] }),
  });
  trustPolicyUpdate.node.addDependency(roleCreation);

  // AttachRolePolicy is idempotent — re-attaching an already-attached policy
  // succeeds without error, so no ignoreErrorCodesMatching is needed here.
  const policyAttachment = new cr.AwsCustomResource(scope, 'AttachPolicy', {
    onCreate: {
      service: 'IAM',
      action: 'attachRolePolicy',
      parameters: {
        RoleName: roleName,
        PolicyArn: policyArn,
      },
      physicalResourceId: cr.PhysicalResourceId.of(`${roleName}-policy`),
    },
    removalPolicy: cdk.RemovalPolicy.RETAIN,
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: [roleArn] }),
  });
  policyAttachment.node.addDependency(trustPolicyUpdate);

  return scope;
}

/**
 * Returns the account-level `dms-vpc-role` IAM role construct, creating it
 * once per stack. DMS requires this exact role name before it can place
 * replication instances or serverless configs inside a VPC.
 *
 * Safe to call from multiple stacks in the same account — if the role already
 * exists, the underlying SDK call succeeds silently.
 */
export function ensureDmsVpcRole(stack: cdk.Stack): Construct {
  return ensureDmsRole(
    stack,
    'DmsVpcRole',
    'dms-vpc-role',
    'arn:aws:iam::aws:policy/service-role/AmazonDMSVPCManagementRole',
    'Allows DMS to manage VPC resources for replication instances',
    'Custom::DmsVpcRole',
  );
}

/**
 * Returns the account-level `dms-cloudwatch-logs-role` IAM role construct,
 * creating it once per stack. DMS requires this exact role name to publish
 * task logs to CloudWatch Logs.
 *
 * Safe to call from multiple stacks in the same account — if the role already
 * exists, the underlying SDK call succeeds silently.
 */
export function ensureDmsCloudWatchRole(stack: cdk.Stack): Construct {
  return ensureDmsRole(
    stack,
    'DmsCloudWatchLogsRole',
    'dms-cloudwatch-logs-role',
    'arn:aws:iam::aws:policy/service-role/AmazonDMSCloudWatchLogsRole',
    'Allows DMS to publish task logs to CloudWatch Logs',
    'Custom::DmsCloudWatchLogsRole',
  );
}

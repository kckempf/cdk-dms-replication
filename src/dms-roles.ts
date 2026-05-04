import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

/**
 * Returns the account-level `dms-vpc-role` IAM role, creating it once per stack.
 * DMS requires this exact role name before it can place replication instances or
 * serverless configs inside a VPC.
 */
export function ensureDmsVpcRole(stack: cdk.Stack): iam.Role {
  const existing = stack.node.tryFindChild('DmsVpcRole');
  if (existing) return existing as iam.Role;
  return new iam.Role(stack, 'DmsVpcRole', {
    roleName: 'dms-vpc-role',
    assumedBy: new iam.ServicePrincipal('dms.amazonaws.com'),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDMSVPCManagementRole'),
    ],
    description: 'Allows DMS to manage VPC resources for replication instances',
  });
}

/**
 * Returns the account-level `dms-cloudwatch-logs-role` IAM role, creating it
 * once per stack. DMS requires this exact role name to publish task logs to
 * CloudWatch Logs.
 */
export function ensureDmsCloudWatchRole(stack: cdk.Stack): iam.Role {
  const existing = stack.node.tryFindChild('DmsCloudWatchLogsRole');
  if (existing) return existing as iam.Role;
  return new iam.Role(stack, 'DmsCloudWatchLogsRole', {
    roleName: 'dms-cloudwatch-logs-role',
    assumedBy: new iam.ServicePrincipal('dms.amazonaws.com'),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonDMSCloudWatchLogsRole'),
    ],
    description: 'Allows DMS to publish task logs to CloudWatch Logs',
  });
}

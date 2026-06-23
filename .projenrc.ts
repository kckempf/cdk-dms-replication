import { awscdk, javascript } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Kevin Kempf',
  authorAddress: 'kckempf@gmail.com',
  cdkVersion: '2.100.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.9.0',
  name: 'cdk-dms-replication',
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/kckempf/cdk-dms-replication.git',
  homepage: 'https://github.com/kckempf/cdk-dms-replication#readme',
  description:
    'L3 CDK Constructs for Amazon Database Migration Service (DMS) — pattern construct bundling replication instance, endpoints, and tasks with secure defaults.',
  keywords: [
    'cdk',
    'awscdk',
    'aws',
    'dms',
    'database',
    'migration',
    'constructs',
    'replication',
    'cdc',
    'aws-dms',
  ],

  publishToPypi: {
    distName: 'cdk-dms-replication',
    module: 'cdk_dms_replication',
  },

  publishToMaven: {
    mavenGroupId: 'io.github.kckempf',
    javaPackage: 'io.github.kckempf.cdkdmsreplication',
    mavenArtifactId: 'cdk-dms-replication',
  },

  publishToNuget: {
    dotNetNamespace: 'KcKempf.CdkDmsReplication',
    packageId: 'KcKempf.CdkDmsReplication',
  },

  publishToGo: {
    moduleName: 'github.com/kckempf/cdk-dms-replication-go',
    gitUserName: 'kckempf',
    gitUserEmail: 'kckempf@gmail.com',
  },
});

project.gitignore.addPatterns('integ/cdk.out', '.claude', '.DS_Store');

project.addTask('integ', {
  description: 'Synthesize integration sample app and lint the CloudFormation templates',
  steps: [
    {
      exec: 'npx cdk synth --app "npx ts-node --project tsconfig.json integ/sample-app.ts" --output integ/cdk.out --quiet',
    },
    {
      exec: 'cfn-lint integ/cdk.out/*.template.json',
    },
  ],
});

project.synth();

import * as cdk from 'aws-cdk-lib';

export function createTestStack(): cdk.Stack {
  const app = new cdk.App();

  return new cdk.Stack(
    app,
    'TestStack'
  );
}
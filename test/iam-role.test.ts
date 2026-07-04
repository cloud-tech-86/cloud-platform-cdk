import * as cdk from 'aws-cdk-lib';

import { Template } from 'aws-cdk-lib/assertions';

import { IamRoleConstruct } from '../src';

test('IAM Role Created', () => {

  const app = new cdk.App();

  const stack = new cdk.Stack(app);

  new IamRoleConstruct(
    stack,
    'Role',
    {
      roleName: 'aws-varnika-dev-role-001',

      servicePrincipal: 'ec2.amazonaws.com',

      managedPolicies: [
        'AmazonSSMManagedInstanceCore'
      ]
    }
  );

  const template =
    Template.fromStack(stack);

  template.resourceCountIs(
    'AWS::IAM::Role',
    1
  );

});
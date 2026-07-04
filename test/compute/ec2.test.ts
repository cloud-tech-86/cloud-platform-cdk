import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';

import { testConfig } from '../helpers/test-config';

import { VpcConstruct } from '../../src/networking/vpc-construct';
import { SecurityGroupConstruct } from '../../src/networking/security-group-construct';
import { Ec2Construct } from '../../src/compute/ec2-construct';

describe('EC2 Construct', () => {

  const app = new cdk.App();

  const stack =
    new cdk.Stack(
      app,
      'TestStack'
    );

  const vpc =
    new VpcConstruct(
      stack,
      'Vpc',
      {
        vpcName:
          'aws-varnika-dev-vpc',

        cidr:
          testConfig.vpcCidr,

        maxAzs: 2
      }
    );

  const sg =
    new SecurityGroupConstruct(
      stack,
      'SG',
      {
        vpc: vpc.vpc,
        securityGroupName:
          'aws-varnika-dev-sg-app'
      }
    );

  const role =
    new iam.Role(
      stack,
      'Role',
      {
        assumedBy:
          new iam.ServicePrincipal(
            'ec2.amazonaws.com'
          )
      }
    );

  new Ec2Construct(
    stack,
    'EC2',
    {
      config:
        testConfig,

      vpc:
        vpc.vpc,

      securityGroup:
        sg.securityGroup,

      role
    }
  );

  const template =
    Template.fromStack(
      stack
    );

  test('Creates EC2', () => {

    template.resourceCountIs(
      'AWS::EC2::Instance',
      1
    );

  });

});
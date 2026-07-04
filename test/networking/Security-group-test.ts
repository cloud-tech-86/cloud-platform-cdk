import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import {
  VpcConstruct
} from '../../src/networking/vpc-construct';

import {
  SecurityGroupConstruct
} from '../../src/networking/security-group-construct';

test(
  'Create Security Group',
  () => {

    const app = new cdk.App();

    const stack = new cdk.Stack(app);

    const vpc =
      new VpcConstruct(
        stack,
        'Vpc',
        {
          vpcName:
            'aws-varnika-dev-vpc',

          cidr:
            '10.10.0.0/16',

          maxAzs: 2
        }
      );

    new SecurityGroupConstruct(
      stack,
      'SecurityGroup',
      {
        vpc: vpc.vpc,

        securityGroupName:
          'aws-varnika-dev-sg-app'
      }
    );

    const template =
      Template.fromStack(stack);

    template.resourceCountIs(
      'AWS::EC2::SecurityGroup',
      1
    );
  }
);
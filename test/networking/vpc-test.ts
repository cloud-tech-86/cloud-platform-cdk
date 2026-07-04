import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { VpcConstruct } from '../../src/networking/vpc-construct';

describe('VpcConstruct', () => {

  test('Creates VPC', () => {

    const app = new cdk.App();

    const stack = new cdk.Stack(
      app,
      'TestStack'
    );

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

    const template =
      Template.fromStack(stack);

    template.resourceCountIs(
      'AWS::EC2::VPC',
      1
    );

  });

});
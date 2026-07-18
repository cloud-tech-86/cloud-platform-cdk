import { Template } from 'aws-cdk-lib/assertions';

import { TestStack } from '../helpers/test-stack';

import { mockPlatformConfig } from '../helpers/mock-platform-config';

import { mockVpcConfig } from '../helpers/mock-vpc-config';

import { VpcConstruct } from '../../src/networking/vpc-construct';

describe('VpcConstruct', () => {

  test('should create a VPC', () => {

    const stack = new TestStack();

    new VpcConstruct(
      stack,
      'Vpc',
      {
        config: mockPlatformConfig,
        vpc: mockVpcConfig
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
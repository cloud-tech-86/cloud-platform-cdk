import * as cdk from 'aws-cdk-lib';

import { Template }
from 'aws-cdk-lib/assertions';

import {
  VpcConstruct
}
from '../../src/networking/vpc-construct';

import {
  EndpointConstruct
}
from '../../src/networking/endpoint-construct';

test(
  'Create SSM Endpoints',
  () => {

    const app =
      new cdk.App();

    const stack =
      new cdk.Stack(app);

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

    new EndpointConstruct(
      stack,
      'Endpoints',
      {
        vpc: vpc.vpc
      }
    );

    const template =
      Template.fromStack(
        stack
      );

    template.resourceCountIs(
      'AWS::EC2::VPCEndpoint',
      3
    );
  }
);
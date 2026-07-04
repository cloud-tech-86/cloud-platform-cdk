import * as cdk
from 'aws-cdk-lib';

import {
Template
}
from 'aws-cdk-lib/assertions';

import {
KmsConstruct
}
from '../src';

test(
'KMS Created',
() => {

const app =
new cdk.App();

const stack =
new cdk.Stack(app);

new KmsConstruct(
stack,
'KMS',
{
aliasName:
'alias/aws-varnika-dev-kms-001'
}
);

const template =
Template.fromStack(stack);

template.resourceCountIs(
'AWS::KMS::Key',
1
);
}
);

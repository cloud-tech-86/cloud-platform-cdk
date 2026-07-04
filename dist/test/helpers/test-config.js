"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConfig = void 0;
exports.testConfig = {
    vendor: 'aws',
    application: 'varnika',
    environment: 'dev',
    accountId: '111111111111',
    region: 'ap-south-1',
    owner: 'platform-team',
    costCenter: 'IT',
    businessUnit: 'Engineering',
    roleArn: 'arn:aws:iam::123456789012:role/PowerUserRole',
    vpcCidr: '10.0.0.0/16',
    instanceType: 't3.micro',
    mandatoryTags: {}
};

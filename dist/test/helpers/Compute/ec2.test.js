"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const assertions_1 = require("aws-cdk-lib/assertions");
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const test_config_1 = require("../helpers/test-config");
const vpc_construct_1 = require("../../src/networking/vpc-construct");
const security_group_construct_1 = require("../../src/networking/security-group-construct");
const ec2_construct_1 = require("../../src/compute/ec2-construct");
describe('EC2 Construct', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const vpc = new vpc_construct_1.VpcConstruct(stack, 'Vpc', {
        vpcName: 'aws-varnika-dev-vpc',
        cidr: test_config_1.testConfig.vpcCidr,
        maxAzs: 2
    });
    const sg = new security_group_construct_1.SecurityGroupConstruct(stack, 'SG', {
        vpc: vpc.vpc,
        securityGroupName: 'aws-varnika-dev-sg-app'
    });
    const role = new iam.Role(stack, 'Role', {
        assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com')
    });
    new ec2_construct_1.Ec2Construct(stack, 'EC2', {
        config: test_config_1.testConfig,
        vpc: vpc.vpc,
        securityGroup: sg.securityGroup,
        role
    });
    const template = assertions_1.Template.fromStack(stack);
    test('Creates EC2', () => {
        template.resourceCountIs('AWS::EC2::Instance', 1);
    });
});

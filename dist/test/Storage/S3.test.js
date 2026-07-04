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
const s3_construct_1 = require("../../src/storage/s3-construct");
describe('S3 Construct', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'TestStack');
    const config = {
        vendor: 'aws',
        application: 'varnika',
        environment: 'dev',
        accountId: '123456789012',
        region: 'ap-south-1',
        owner: 'CloudTeam',
        costCenter: 'CC1001',
        businessUnit: 'IT',
        vpcCidr: '10.10.0.0/16',
        instanceType: 't3.medium',
        mandatoryTags: {}
    };
    new s3_construct_1.S3Construct(stack, 'DataBucket', {
        config
    });
    const template = assertions_1.Template.fromStack(stack);
    test('Creates S3 Bucket', () => {
        template.resourceCountIs('AWS::S3::Bucket', 1);
    });
    test('Versioning Enabled', () => {
        template.hasResourceProperties('AWS::S3::Bucket', {
            VersioningConfiguration: {
                Status: 'Enabled'
            }
        });
    });
    test('Encryption Enabled', () => {
        template.hasResourceProperties('AWS::S3::Bucket', {
            BucketEncryption: {
                ServerSideEncryptionConfiguration: expect.any(Array)
            }
        });
    });
    test('Public Access Blocked', () => {
        template.resourceCountIs('AWS::S3::BucketPublicAccessBlock', 1);
    });
    test('SSL Enforcement Enabled', () => {
        template.resourceCountIs('AWS::S3::BucketPolicy', 1);
    });
    test('Lifecycle Policy Exists', () => {
        template.hasResourceProperties('AWS::S3::Bucket', {
            LifecycleConfiguration: {
                Rules: expect.any(Array)
            }
        });
    });
    test('Cost Optimization Lifecycle Exists', () => {
        template.hasResourceProperties('AWS::S3::Bucket', {
            LifecycleConfiguration: {
                Rules: expect.arrayContaining([
                    expect.objectContaining({
                        Status: 'Enabled'
                    })
                ])
            }
        });
    });
});

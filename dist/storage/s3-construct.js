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
exports.S3Construct = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = __importStar(require("aws-cdk-lib/aws-s3"));
const constructs_1 = require("constructs");
const naming_construct_1 = require("../foundation/naming-construct");
const resource_types_1 = require("../constants/resource-types");
class S3Construct extends constructs_1.Construct {
    bucket;
    constructor(scope, id, props) {
        super(scope, id);
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const bucketName = naming.generate(resource_types_1.ResourceType.S3, { suffix: props.bucketSuffix ?? 'data' });
        this.bucket = new s3.Bucket(this, 'Bucket', {
            bucketName,
            versioned: true,
            encryption: props.kmsKey
                ? s3.BucketEncryption.KMS
                : s3.BucketEncryption.S3_MANAGED,
            encryptionKey: props.kmsKey,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            removalPolicy: props.config.environment === 'prod'
                ? aws_cdk_lib_1.RemovalPolicy.RETAIN
                : aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: props.config.environment !== 'prod',
            lifecycleRules: [
                {
                    id: 'CostOptimization',
                    enabled: true,
                    transitions: [
                        {
                            storageClass: s3.StorageClass.INFREQUENT_ACCESS,
                            transitionAfter: aws_cdk_lib_1.Duration.days(30)
                        },
                        {
                            storageClass: s3.StorageClass.GLACIER,
                            transitionAfter: aws_cdk_lib_1.Duration.days(90)
                        }
                    ],
                    expiration: aws_cdk_lib_1.Duration.days(365)
                }
            ]
        });
        // Standard Tags
        aws_cdk_lib_1.Tags.of(this.bucket).add('Application', props.config.application);
        aws_cdk_lib_1.Tags.of(this.bucket).add('Environment', props.config.environment);
        aws_cdk_lib_1.Tags.of(this.bucket).add('Owner', props.config.owner);
        aws_cdk_lib_1.Tags.of(this.bucket).add('CostCenter', props.config.costCenter);
        aws_cdk_lib_1.Tags.of(this.bucket).add('AutoCleanup', props.config.environment === 'prod'
            ? 'False'
            : 'True');
        aws_cdk_lib_1.Tags.of(this.bucket).add('CleanupAfterDays', '365');
    }
}
exports.S3Construct = S3Construct;

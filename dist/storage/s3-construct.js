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
const __1 = require("..");
class S3Construct extends constructs_1.Construct {
    bucket;
    constructor(scope, id, props) {
        super(scope, id);
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const bucketName = naming.generate(resource_types_1.ResourceType.S3, { suffix: props.s3.bucketSuffix ?? 'data' });
        this.bucket = new s3.Bucket(this, 'Bucket', {
            bucketName,
            versioned: props.s3.versioned,
            encryption: props.s3.encryptionEnabled
                ? (props.kmsKey
                    ? s3.BucketEncryption.KMS
                    : s3.BucketEncryption.S3_MANAGED)
                : s3.BucketEncryption.UNENCRYPTED,
            blockPublicAccess: props.s3.blockPublicAccess
                ? s3.BlockPublicAccess.BLOCK_ALL
                : undefined,
            enforceSSL: props.s3.enforceSSL,
            removalPolicy: props.config.environment === 'prod'
                ? aws_cdk_lib_1.RemovalPolicy.RETAIN
                : aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: props.config.environment !== 'prod',
            lifecycleRules: this.buildLifecycleRules(props.s3.lifecycleRules),
        });
        // Standard Tags
        __1.TaggingConstruct.applyTags(this.bucket, props.config, props.s3.tags);
    }
    /**
   * Build S3 lifecycle rules from configuration.
   */
    buildLifecycleRules(rules) {
        if (!rules || rules.length === 0) {
            return undefined;
        }
        return rules.map(rule => ({
            id: rule.id,
            enabled: rule.enabled ?? true,
            expiration: rule.expirationDays
                ? aws_cdk_lib_1.Duration.days(rule.expirationDays)
                : undefined,
            transitions: [
                ...(rule.transitionToIaDays
                    ? [{
                            storageClass: s3.StorageClass.INFREQUENT_ACCESS,
                            transitionAfter: aws_cdk_lib_1.Duration.days(rule.transitionToIaDays)
                        }]
                    : []),
                ...(rule.transitionToGlacierDays
                    ? [{
                            storageClass: s3.StorageClass.GLACIER,
                            transitionAfter: aws_cdk_lib_1.Duration.days(rule.transitionToGlacierDays)
                        }]
                    : [])
            ],
            abortIncompleteMultipartUploadAfter: rule.abortIncompleteMultipartUploadAfterDays
                ? aws_cdk_lib_1.Duration.days(rule.abortIncompleteMultipartUploadAfterDays)
                : undefined
        }));
    }
}
exports.S3Construct = S3Construct;

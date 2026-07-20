import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { S3Config } from '../interfaces/s3-config';
import { PlatformConfig } from '../interfaces/platform-config';
export interface S3ConstructProps {
    readonly config: PlatformConfig;
    readonly s3: S3Config;
    readonly kmsKey?: kms.IKey;
}
export declare class S3Construct extends Construct {
    readonly bucket: s3.Bucket;
    constructor(scope: Construct, id: string, props: S3ConstructProps);
    /**
   * Build S3 lifecycle rules from configuration.
   */
    private buildLifecycleRules;
}

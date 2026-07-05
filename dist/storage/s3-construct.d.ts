import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { PlatformConfig } from '../interfaces/platform-config';
export interface S3ConstructProps {
    config: PlatformConfig;
    kmsKey?: kms.IKey;
    bucketSuffix?: string;
}
export declare class S3Construct extends Construct {
    readonly bucket: s3.Bucket;
    constructor(scope: Construct, id: string, props: S3ConstructProps);
}

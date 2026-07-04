import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
export interface S3ReadOnlyPolicyConstructProps {
    role: iam.IRole;
    bucket: s3.IBucket;
}
export declare class S3ReadOnlyPolicyConstruct extends Construct {
    constructor(scope: Construct, id: string, props: S3ReadOnlyPolicyConstructProps);
}

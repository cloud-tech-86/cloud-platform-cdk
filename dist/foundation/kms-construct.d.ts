import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
export interface KmsConstructProps {
    aliasName: string;
}
export declare class KmsConstruct extends Construct {
    readonly key: kms.Key;
    constructor(: any, : any, : any);
}

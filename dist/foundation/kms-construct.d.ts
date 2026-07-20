import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';
import { PlatformConfig } from '../interfaces/platform-config';
import { KmsConfig } from '../interfaces/kms-config';
export interface KmsConstructProps {
    readonly config: PlatformConfig;
    readonly kms: KmsConfig;
}
export declare class KmsConstruct extends Construct {
    readonly key?: kms.IKey;
    constructor(scope: Construct, id: string, props: KmsConstructProps);
}

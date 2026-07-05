import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
export interface SsmConstructProps {
    role: iam.IRole;
}
export declare class SsmConstruct extends Construct {
    constructor(scope: Construct, id: string, props: SsmConstructProps);
}

import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PlatformConfig } from '../interfaces/platform-config';
export interface Ec2ConstructProps {
    config: PlatformConfig;
    vpc: ec2.IVpc;
    securityGroup: ec2.ISecurityGroup;
    role: iam.IRole;
}
export declare class Ec2Construct extends Construct {
    readonly instance: ec2.Instance;
    constructor(scope: Construct, id: string, props: Ec2ConstructProps);
}

import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PlatformConfig } from '../interfaces/platform-config';
import { Ec2Configuration } from '../interfaces/ec2-config';
export interface Ec2ConstructProps {
    readonly config: PlatformConfig;
    readonly ec2: Ec2Configuration;
    readonly vpc: ec2.IVpc;
    readonly securityGroup: ec2.ISecurityGroup;
    readonly role: iam.IRole;
}
export declare class Ec2Construct extends Construct {
    readonly instance: ec2.Instance;
    constructor(scope: Construct, id: string, props: Ec2ConstructProps);
}

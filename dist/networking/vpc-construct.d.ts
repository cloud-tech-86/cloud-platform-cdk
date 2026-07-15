import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PlatformConfig } from '../interfaces/platform-config';
import { VpcConfig } from '../interfaces/vpc-config';
export interface VpcConstructProps {
    readonly config: PlatformConfig;
    readonly vpc: VpcConfig;
}
export declare class VpcConstruct extends Construct {
    readonly vpc: ec2.IVpc;
    constructor(scope: Construct, id: string, props: VpcConstructProps);
    private getSubnetType;
}

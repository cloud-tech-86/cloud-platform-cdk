import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export interface VpcConstructProps {
    vpcName: string;
    cidr: string;
    maxAzs: number;
    natGateways?: number;
}
export declare class VpcConstruct extends Construct {
    readonly vpc: ec2.Vpc;
    constructor(scope: Construct, id: string, props: VpcConstructProps);
}

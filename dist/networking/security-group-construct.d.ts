import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PlatformConfig } from '../interfaces/platform-config';
import { SecurityGroupConfig } from '../interfaces/security-group-config';
export interface SecurityGroupConstructProps {
    readonly config: PlatformConfig;
    readonly securityGroup: SecurityGroupConfig;
    readonly vpc: ec2.IVpc;
}
export declare class SecurityGroupConstruct extends Construct {
    readonly securityGroup: ec2.ISecurityGroup;
    constructor(scope: Construct, id: string, props: SecurityGroupConstructProps);
    private addIngressRule;
    private addEgressRule;
    private createPeer;
    private createPort;
}

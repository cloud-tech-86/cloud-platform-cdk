import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export interface SecurityGroupConstructProps {
    vpc: ec2.IVpc;
    securityGroupName: string;
}
export declare class SecurityGroupConstruct extends Construct {
    readonly securityGroup: ec2.SecurityGroup;
    constructor(scope: Construct, id: string, props: SecurityGroupConstructProps);
}

import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PlatformConfig } from '../interfaces/platform-config';
import { SecurityGroupConfig } from '../interfaces/security-group-config';
export interface SecurityGroupConstructProps {
    readonly config: PlatformConfig;
    readonly securityGroup: SecurityGroupConfig;
    readonly vpc: ec2.IVpc;
}

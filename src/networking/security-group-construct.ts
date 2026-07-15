import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { PlatformConfig } from '../interfaces/platform-config';
import { SecurityGroupConfig } from '../interfaces/security-group-config';

import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';

import { ResourceType } from '../constants/resource-types';

export interface SecurityGroupConstructProps {

  readonly config: PlatformConfig;

  readonly securityGroup: SecurityGroupConfig;

  readonly vpc: ec2.IVpc;

}
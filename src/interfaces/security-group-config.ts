import { ResourceMode } from './common';

export type SecurityGroupProtocol =
  | 'tcp'
  | 'udp'
  | 'icmp'
  | 'all';

export interface SecurityGroupRule {

  readonly description?: string;

  readonly protocol: SecurityGroupProtocol;

  readonly fromPort?: number;

  readonly toPort?: number;

  readonly cidr?: string;

  readonly ipv6Cidr?: string;

  readonly sourceSecurityGroupId?: string;

  readonly prefixListId?: string;

  readonly selfReference?: boolean;

}

export interface SecurityGroupConfig {

  readonly mode: ResourceMode;

  readonly securityGroupId?: string;

  readonly nameSuffix?: string;

  readonly description?: string;

  readonly allowAllOutbound?: boolean;

  readonly disableInlineRules?: boolean;

  readonly manageRules?: boolean;

  readonly ingressRules?: SecurityGroupRule[];

  readonly egressRules?: SecurityGroupRule[];

  readonly tags?: Record<string, string>;

}
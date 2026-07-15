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
  /**
   * Create a new security group or use an existing one.
   */
  readonly create: boolean;

  /**
   * Required when create is false.
   */
  readonly securityGroupId?: string;

  /**
   * Used only when creating a new security group.
   */
    readonly name?: string;
    readonly nameSuffix?: string;
    readonly description?: string;
    readonly allowAllOutbound?: boolean;
    readonly disableInlineRules?: boolean;
    

  /**
   * If false, imported security group will not be modified.
   */
  readonly manageRules?: boolean;
  readonly ingressRules?: SecurityGroupRule[];
  readonly egressRules?: SecurityGroupRule[];
  readonly tags?: Record<string, string>;
}

import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { PlatformConfig } from '../interfaces/platform-config';
import {
  SecurityGroupConfig,
  SecurityGroupRule
} from '../interfaces/security-group-config';

import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';

import { DEFAULT_SECURITY_GROUP } from '../foundation/defaults';

import { ResourceType } from '../constants/resource-types';

export interface SecurityGroupConstructProps {

  readonly config: PlatformConfig;

  readonly securityGroup: SecurityGroupConfig;

  readonly vpc: ec2.IVpc;

}

export class SecurityGroupConstruct extends Construct {

  public readonly securityGroup: ec2.ISecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    props: SecurityGroupConstructProps
  ) {

    super(scope, id);

    //
    // Validate configuration
    //
    ConfigValidator.validatePlatformConfig(
      props.config
    );

    ConfigValidator.validateSecurityGroupConfig(
      props.securityGroup
    );

    //
    // Import Existing Security Group
    //
    if (props.securityGroup.mode === 'IMPORT') {

      this.securityGroup =
        ec2.SecurityGroup.fromSecurityGroupId(
          this,
          'ImportedSecurityGroup',
          props.securityGroup.securityGroupId!,
          {
            mutable:
              props.securityGroup.manageRules ?? false
          }
        );

      return;

    }

    //
    // Naming
    //
    const naming = new NamingConstruct(
      props.config
    );

    const securityGroupName =
      naming.generate(
        ResourceType.SECURITY_GROUP,
        {
          suffix:
            props.securityGroup.nameSuffix
        }
      );

    //
    // Create Security Group
    //
    const securityGroup =
      new ec2.SecurityGroup(
        this,
        'SecurityGroup',
        {

          securityGroupName,

          description:
            props.securityGroup.description ??
            DEFAULT_SECURITY_GROUP.DESCRIPTION,

          allowAllOutbound:
            props.securityGroup.allowAllOutbound ??
            DEFAULT_SECURITY_GROUP.ALLOW_ALL_OUTBOUND,

          disableInlineRules:
            props.securityGroup.disableInlineRules ??
            DEFAULT_SECURITY_GROUP.DISABLE_INLINE_RULES,

          vpc:
            props.vpc

        }
      );

    //
    // Apply Tags
    //
    TaggingConstruct.applyTags(

      securityGroup,

      props.config,

      {

        Name:
          securityGroupName,

        ...props.securityGroup.tags

      }

    );

    //
    // Ingress Rules
    //
    props.securityGroup.ingressRules?.forEach(
      rule => this.addIngressRule(
        securityGroup,
        rule
      )
    );

    //
    // Egress Rules
    //
    props.securityGroup.egressRules?.forEach(
      rule => this.addEgressRule(
        securityGroup,
        rule
      )
    );

    this.securityGroup =
      securityGroup;

  }

  private addIngressRule(
    securityGroup: ec2.SecurityGroup,
    rule: SecurityGroupRule
  ): void {

    securityGroup.addIngressRule(
      this.createPeer(rule),
      this.createPort(rule),
      rule.description
    );

  }

  private addEgressRule(
    securityGroup: ec2.SecurityGroup,
    rule: SecurityGroupRule
  ): void {

    securityGroup.addEgressRule(
      this.createPeer(rule),
      this.createPort(rule),
      rule.description
    );

  }

  private createPeer(
    rule: SecurityGroupRule
  ): ec2.IPeer {

    if (rule.selfReference) {

      return ec2.Peer.securityGroupId(
        this.securityGroup.securityGroupId
      );

    }

    if (rule.cidr) {

      return ec2.Peer.ipv4(
        rule.cidr
      );

    }

    if (rule.ipv6Cidr) {

      return ec2.Peer.ipv6(
        rule.ipv6Cidr
      );

    }

    if (rule.sourceSecurityGroupId) {

      return ec2.Peer.securityGroupId(
        rule.sourceSecurityGroupId
      );

    }

    if (rule.prefixListId) {

      return ec2.Peer.prefixList(
        rule.prefixListId
      );

    }

    throw new Error(
      'Invalid Security Group rule.'
    );

  }

  private createPort(
    rule: SecurityGroupRule
  ): ec2.Port {

    switch (rule.protocol) {

      case 'tcp':

        return ec2.Port.tcpRange(
          rule.fromPort!,
          rule.toPort!
        );

      case 'udp':

        return ec2.Port.udpRange(
          rule.fromPort!,
          rule.toPort!
        );

      case 'icmp':

        return ec2.Port.allIcmp();

      case 'all':

        return ec2.Port.allTraffic();

      default:

        throw new Error(
          `Unsupported protocol: ${rule.protocol}`
        );

    }

  }

}
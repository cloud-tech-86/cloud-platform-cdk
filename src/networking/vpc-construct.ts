import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { PlatformConfig } from '../interfaces/platform-config';
import { VpcConfig } from '../interfaces/vpc-config';

import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';

import { DEFAULT_VPC } from '../foundation/defaults';

import { ResourceType } from '../constants/resource-types';

export interface VpcConstructProps {

  readonly config: PlatformConfig;

  readonly vpc: VpcConfig;

}

export class VpcConstruct extends Construct {

  public readonly vpc: ec2.IVpc;

  constructor(
    scope: Construct,
    id: string,
    props: VpcConstructProps
  ) {

    super(scope, id);

    ConfigValidator.validatePlatformConfig(
      props.config
    );

    ConfigValidator.validateVpcConfig(
      props.vpc
    );

    //
    // IMPORT EXISTING VPC
    //
    if (props.vpc.mode === 'IMPORT') {

      this.vpc = ec2.Vpc.fromLookup(
        this,
        'ImportedVpc',
        {
          vpcId: props.vpc.vpcId
        }
      );

      return;

    }

    //
    // CREATE NEW VPC
    //
    const naming = new NamingConstruct(
      props.config
    );

    const vpcName = naming.generate(
      ResourceType.VPC
    );

    const subnetConfiguration =
      props.vpc.subnetConfiguration!.map(subnet => ({

        name: subnet.name,

        subnetType:
          this.getSubnetType(
            subnet.subnetType
          ),

        cidrMask:
          subnet.cidrMask,

        reserved:
          subnet.reserved ?? false

      }));

    this.vpc = new ec2.Vpc(

      this,

      'Vpc',

      {

        vpcName,

        ipAddresses:
          ec2.IpAddresses.cidr(
            props.vpc.cidr!
          ),

        maxAzs:
          props.vpc.maxAzs!,

        natGateways:
          props.vpc.natGateways ??
          DEFAULT_VPC.NAT_GATEWAYS,

        subnetConfiguration,

        enableDnsHostnames:
          props.vpc.enableDnsHostnames ??
          DEFAULT_VPC.ENABLE_DNS_HOSTNAMES,

        enableDnsSupport:
          props.vpc.enableDnsSupport ??
          DEFAULT_VPC.ENABLE_DNS_SUPPORT

      }

    );

    TaggingConstruct.applyTags(

      this.vpc,

      props.config,

      {

        Name: vpcName,

        ...props.vpc.tags

      }

    );

  }

  private getSubnetType(
    subnetType: string
  ): ec2.SubnetType {

    switch (subnetType) {

      case 'Public':
        return ec2.SubnetType.PUBLIC;

      case 'Private':
        return ec2.SubnetType.PRIVATE_WITH_EGRESS;

      case 'Isolated':
        return ec2.SubnetType.PRIVATE_ISOLATED;

      default:
        throw new Error(
          `Unsupported subnet type: ${subnetType}`
        );

    }

  }

}
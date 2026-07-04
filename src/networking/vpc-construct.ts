import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface VpcConstructProps {

  vpcName: string;

  cidr: string;

  maxAzs: number;

  natGateways?: number;
}

export class VpcConstruct extends Construct {

  public readonly vpc: ec2.Vpc;

  constructor(
    scope: Construct,
    id: string,
    props: VpcConstructProps
  ) {

    super(scope, id);

    this.vpc = new ec2.Vpc(
      this,
      'Vpc',
      {
        vpcName: props.vpcName,

        ipAddresses:
          ec2.IpAddresses.cidr(
            props.cidr
          ),

        maxAzs:
          props.maxAzs,

        natGateways:
          props.natGateways ?? 1,

        subnetConfiguration: [
          {
            name: 'public',
            subnetType:
              ec2.SubnetType.PUBLIC,
            cidrMask: 24
          },
          {
            name: 'private',
            subnetType:
              ec2.SubnetType.PRIVATE_WITH_EGRESS,
            cidrMask: 24
          }
        ]
      }
    );
  }
}
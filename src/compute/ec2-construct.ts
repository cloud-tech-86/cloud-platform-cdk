import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Tags } from 'aws-cdk-lib';

import { PlatformConfig } from '../interfaces/platform-config';
import { NamingConstruct } from '../foundation/naming-construct';
import { ResourceType } from '../constants/resource-types';

export interface Ec2ConstructProps {

  config: PlatformConfig;

  vpc: ec2.IVpc;

  securityGroup: ec2.ISecurityGroup;

  role: iam.IRole;
}

export class Ec2Construct extends Construct {

  public readonly instance: ec2.Instance;

  constructor(
    scope: Construct,
    id: string,
    props: Ec2ConstructProps
  ) {

    super(scope, id);

    const naming =
      new NamingConstruct(
        props.config
      );

    const instanceName =
      naming.generate(
        ResourceType.EC2,
        'app'
      );

    this.instance =
      new ec2.Instance(
        this,
        'Instance',
        {

          instanceName,

          vpc:
            props.vpc,

          role:
            props.role,

          securityGroup:
            props.securityGroup,

          instanceType:
            new ec2.InstanceType(
              props.config.instanceType
            ),

          machineImage:
            ec2.MachineImage.latestAmazonLinux2023(),

          vpcSubnets: {
            subnetType:
              ec2.SubnetType.PRIVATE_WITH_EGRESS
          },

          detailedMonitoring:
            true,

          requireImdsv2:
            true,

          blockDevices: [
            {
              deviceName: '/dev/xvda',

              volume:
                ec2.BlockDeviceVolume.ebs(
                  30,
                  {
                    encrypted: true,
                    volumeType:
                      ec2.EbsDeviceVolumeType.GP3
                  }
                )
            }
          ]
        }
      );

    Tags.of(this.instance).add(
      'Application',
      props.config.application
    );

    Tags.of(this.instance).add(
      'Environment',
      props.config.environment
    );

    Tags.of(this.instance).add(
      'Owner',
      props.config.owner
    );

    Tags.of(this.instance).add(
      'CostCenter',
      props.config.costCenter
    );
  }
}
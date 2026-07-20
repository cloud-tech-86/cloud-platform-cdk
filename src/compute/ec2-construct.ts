import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

import { PlatformConfig } from '../interfaces/platform-config';
import { Ec2Configuration } from '../interfaces/ec2-config';
import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';
import { DEFAULT_EC2 } from '../foundation/defaults';
import { ResourceType } from '../constants/resource-types';

export interface Ec2ConstructProps {

  readonly config: PlatformConfig;

  readonly ec2: Ec2Configuration;

  readonly vpc: ec2.IVpc;

  readonly securityGroup: ec2.ISecurityGroup;

  readonly role: iam.IRole;

}

export class Ec2Construct extends Construct {

  public readonly instance: ec2.Instance;

  constructor(
    scope: Construct,
    id: string,
    props: Ec2ConstructProps
  ) {

    super(scope, id);

    //
    // Validate configuration
    //
    ConfigValidator.validatePlatformConfig(
      props.config
    );

    ConfigValidator.validateEc2Config(
      props.ec2
    );

    //
    // Resource Naming
    //
    const naming = new NamingConstruct(
      props.config
    );

    const instanceName = naming.generate(
      ResourceType.EC2,
      {
        // Ec2Configuration does not have `nameSuffix`; fall back to default

        suffix: props.ec2.nameSuffix ?? 'app'
        
      }
    );

    //
    // Root Volume
    //
    const blockDevices: ec2.BlockDevice[] = [

      {

        deviceName: '/dev/xvda',

        volume: ec2.BlockDeviceVolume.ebs(

          props.ec2.rootVolume.size ??
            DEFAULT_EC2.ROOT_VOLUME_SIZE,

          {

            volumeType:
              props.ec2.rootVolume.volumeType ??
              DEFAULT_EC2.ROOT_VOLUME_TYPE,

            encrypted:
              props.ec2.rootVolume.encrypted ??
              DEFAULT_EC2.ENCRYPTED,

            deleteOnTermination:
              props.ec2.rootVolume.deleteOnTermination ?? true

          }

        )

      }

    ];

    //
    // Additional EBS Volumes
    //
    props.ec2.dataVolumes?.forEach(volume => {

      blockDevices.push({

        deviceName: volume.deviceName,

        volume: ec2.BlockDeviceVolume.ebs(

          volume.size,

          {

            volumeType: volume.volumeType,

            encrypted: volume.encrypted,

            deleteOnTermination:
              (volume as any).deleteOnTermination ?? true

          }

        )

      });

    });

    //
    // Create EC2 Instance
    //
    this.instance = new ec2.Instance(

      this,      'Instance',

      {

        instanceName,

        vpc: props.vpc,

        role: props.role,

        securityGroup: props.securityGroup,

        instanceType:
          new ec2.InstanceType(
            props.ec2.instanceType
          ),

        //
        // Version 2:
        // Replace with AmiResolver.resolve(props.ec2)
        //
        machineImage: this.resolveMachineImage(
          props.ec2,
           props.config.region
),

        vpcSubnets: {

          subnetType:
            ec2.SubnetType.PRIVATE_WITH_EGRESS

        },

        detailedMonitoring:
          DEFAULT_EC2.DETAILED_MONITORING,

        requireImdsv2:
          DEFAULT_EC2.REQUIRE_IMDSV2,

        blockDevices

      }

    );

    //
    // Apply Platform Tags
    //
    TaggingConstruct.applyTags(

      this.instance,

      props.config,

      {

        Name: instanceName,

        ResourceType: 'EC2'

      }

    );

  }

  /**
 * Resolve machine image from configuration.
 */
private resolveMachineImage(
  config: Ec2Configuration,
  region: string
): ec2.IMachineImage {

  //
  // Specific AMI
  //
  if (config.ami?.amiId) {

    return ec2.MachineImage.genericLinux({
      [region]: config.ami.amiId
    });

  }

  //
  // AMI from SSM Parameter
  //
  if (config.ami?.ssmParameterName) {

    return ec2.MachineImage.fromSsmParameter(
      config.ami.ssmParameterName
    );

  }

  //
  // Operating System
  //
  switch (config.ami?.operatingSystem) {

    case 'amazon-linux-2':
      return ec2.MachineImage.latestAmazonLinux2();

    case 'amazon-linux-2023':
    default:
      return ec2.MachineImage.latestAmazonLinux2023();

  }
}
}

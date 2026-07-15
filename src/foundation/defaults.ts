import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as s3 from 'aws-cdk-lib/aws-s3';

export const DEFAULT_EC2 = {
  ROOT_VOLUME_SIZE: 30,
  ROOT_VOLUME_TYPE: ec2.EbsDeviceVolumeType.GP3,
  ENCRYPTED: true,
  DETAILED_MONITORING: true,
  REQUIRE_IMDSV2: true
};

export const DEFAULT_S3 = {
  VERSIONED: true,
  BLOCK_PUBLIC_ACCESS: true,
  ENCRYPTION: s3.BucketEncryption.S3_MANAGED,
  ENFORCE_SSL: true
};

export const DEFAULT_VPC = {
  ENABLE_DNS_HOSTNAMES: true,
  ENABLE_DNS_SUPPORT: true,
  NAT_GATEWAYS: 1
};
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


export const DEFAULT_SECURITY_GROUP = {

  DESCRIPTION: 'Managed by Cloud Platform CDK',

  ALLOW_ALL_OUTBOUND: true,

  DISABLE_INLINE_RULES: false

};

export const DEFAULT_IAM_ROLE = {

  DESCRIPTION: 'Managed by Cloud Platform CDK',

  PATH: '/',

  MAX_SESSION_DURATION_HOURS: 1

};

export const DEFAULT_KMS = {

  ENABLE_KEY_ROTATION: true,

  PENDING_WINDOW_DAYS: 30,

  DESCRIPTION: 'Managed by Cloud Platform CDK'

};

export const DEFAULT_ENDPOINT = {

  PRIVATE_DNS_ENABLED: true

};

import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

import { PlatformConfig } from '../interfaces/platform-config';
import { NamingConstruct } from '../foundation/naming-construct';
import { ResourceType } from '../constants/resource-types';

export interface S3ConstructProps {
  config: PlatformConfig;
  kmsKey?: kms.IKey;
  bucketSuffix?: string;
}

export class S3Construct extends Construct {

  public readonly bucket: s3.Bucket;

  constructor(
    scope: Construct,
    id: string,
    props: S3ConstructProps
  ) {
    super(scope, id);

    const naming = new NamingConstruct(
      props.config
    );

    const bucketName = naming.generate(
      ResourceType.S3,
      props.bucketSuffix ?? 'data'
    );

    this.bucket = new s3.Bucket(
      this,
      'Bucket',
      {
        bucketName,

        versioned: true,

        encryption:
          props.kmsKey
            ? s3.BucketEncryption.KMS
            : s3.BucketEncryption.S3_MANAGED,

        encryptionKey:
          props.kmsKey,

        blockPublicAccess:
          s3.BlockPublicAccess.BLOCK_ALL,

        enforceSSL: true,

        removalPolicy:
          props.config.environment === 'prod'
            ? RemovalPolicy.RETAIN
            : RemovalPolicy.DESTROY,

        autoDeleteObjects:
          props.config.environment !== 'prod',

        lifecycleRules: [
          {
            id: 'CostOptimization',

            enabled: true,

            transitions: [
              {
                storageClass:
                  s3.StorageClass.INFREQUENT_ACCESS,

                transitionAfter:
                  Duration.days(30)
              },
              {
                storageClass:
                  s3.StorageClass.GLACIER,

                transitionAfter:
                  Duration.days(90)
              }
            ],

            expiration:
              Duration.days(365)
          }
        ]
      }
    );

    // Standard Tags

    Tags.of(this.bucket).add(
      'Application',
      props.config.application
    );

    Tags.of(this.bucket).add(
      'Environment',
      props.config.environment
    );

    Tags.of(this.bucket).add(
      'Owner',
      props.config.owner
    );

    Tags.of(this.bucket).add(
      'CostCenter',
      props.config.costCenter
    );

    Tags.of(this.bucket).add(
      'AutoCleanup',
      props.config.environment === 'prod'
        ? 'False'
        : 'True'
    );

    Tags.of(this.bucket).add(
      'CleanupAfterDays',
      '365'
    );
  }
}
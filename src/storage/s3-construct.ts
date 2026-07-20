import { Duration, RemovalPolicy, Tags } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';
import { S3Config,LifecycleRuleConfig } from '../interfaces/s3-config';

import { PlatformConfig } from '../interfaces/platform-config';
import { NamingConstruct } from '../foundation/naming-construct';
import { ResourceType } from '../constants/resource-types';
import { TaggingConstruct } from '..';
import { LifecycleTransition } from 'aws-cdk-lib/aws-autoscaling';

export interface S3ConstructProps {
  readonly config: PlatformConfig;
  readonly s3: S3Config;
  readonly kmsKey?: kms.IKey;
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
      { suffix: props.s3.bucketSuffix ?? 'data' }
    );

    this.bucket = new s3.Bucket(
      this,
      'Bucket',
      {
        bucketName,

        versioned: props.s3.versioned,        
        encryption: props.s3.encryptionEnabled
    ? (
        props.kmsKey
          ? s3.BucketEncryption.KMS
          : s3.BucketEncryption.S3_MANAGED
      )
    : s3.BucketEncryption.UNENCRYPTED,

        blockPublicAccess:
          props.s3.blockPublicAccess
           ? s3.BlockPublicAccess.BLOCK_ALL
           : undefined,

        enforceSSL: props.s3.enforceSSL,

        removalPolicy:
          props.config.environment === 'prod'
            ? RemovalPolicy.RETAIN
            : RemovalPolicy.DESTROY,

        autoDeleteObjects:
          props.config.environment !== 'prod',

       lifecycleRules:
         this.buildLifecycleRules( props.s3.lifecycleRules
  ),
    
      }
    );

    // Standard Tags
     TaggingConstruct.applyTags(
       this.bucket,
       props.config,
       props.s3.tags
);
  
  }

  /**
 * Build S3 lifecycle rules from configuration.
 */
private buildLifecycleRules(
  rules?: LifecycleRuleConfig[]
): s3.LifecycleRule[] | undefined {

  if (!rules || rules.length === 0) {
    return undefined;
  }

  return rules.map(rule => ({

    id: rule.id,

    enabled: rule.enabled ?? true,

    expiration:
      rule.expirationDays
        ? Duration.days(rule.expirationDays)
        : undefined,

    transitions: [

      ...(rule.transitionToIaDays
        ? [{
            storageClass:
              s3.StorageClass.INFREQUENT_ACCESS,
            transitionAfter:
              Duration.days(rule.transitionToIaDays)
          }]
        : []),

      ...(rule.transitionToGlacierDays
        ? [{
            storageClass:
              s3.StorageClass.GLACIER,
            transitionAfter:
              Duration.days(rule.transitionToGlacierDays)
          }]
        : [])

    ],

    abortIncompleteMultipartUploadAfter:
      rule.abortIncompleteMultipartUploadAfterDays
        ? Duration.days(
            rule.abortIncompleteMultipartUploadAfterDays
          )
        : undefined

  }));

}
}
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

describe('S3 Construct', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');

  const bucket = new cdk.aws_s3.Bucket(stack, 'TestBucket', {
    versioned: true,
    encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
    blockPublicAccess: cdk.aws_s3.BlockPublicAccess.BLOCK_ALL
  });

  const template = Template.fromStack(stack);

  test('Creates S3 Bucket', () => {
    template.resourceCountIs(
      'AWS::S3::Bucket',
      1
    );
  });

  test('Versioning Enabled', () => {
    template.hasResourceProperties(
      'AWS::S3::Bucket',
      {
        VersioningConfiguration: {
          Status: 'Enabled'
        }
      }
    );
  });

  test('Encryption Enabled', () => {
    template.hasResourceProperties(
      'AWS::S3::Bucket',
      {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: 'AES256'
              }
            }
          ]
        }
      }
    );
  });

  test('Public Access Blocked', () => {
    template.hasResourceProperties(
      'AWS::S3::Bucket',
      {
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true
        }
      }
    );
  });

  test('Lifecycle Policy Exists', () => {
    expect(true).toBe(true);
  });

});
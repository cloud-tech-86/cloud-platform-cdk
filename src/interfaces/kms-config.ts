import * as kms from 'aws-cdk-lib/aws-kms';
import { ResourceMode } from './common';

export interface KmsConfig {

  readonly mode: ResourceMode;

  //
  // IMPORT
  //
  readonly keyArn?: string;

  readonly aliasName?: string;

  //
  // CREATE
  //
  readonly nameSuffix?: string;

  readonly description?: string;

  readonly enableKeyRotation?: boolean;

  readonly pendingWindowDays?: number;

  readonly removalPolicy?: 'DESTROY' | 'RETAIN';

  readonly keySpec?: kms.KeySpec;

  readonly keyUsage?: kms.KeyUsage;

  readonly tags?: Record<string, string>;

}
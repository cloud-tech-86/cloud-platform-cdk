import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';

import { PlatformConfig } from '../interfaces/platform-config';
import { KmsConfig } from '../interfaces/kms-config';

import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';

import { ResourceType } from '../constants/resource-types';

export interface KmsConstructProps {

  readonly config: PlatformConfig;

  readonly kms: KmsConfig;

}

export class KmsConstruct extends Construct {

  public readonly key?: kms.IKey;

  constructor(
    scope: Construct,
    id: string,
    props: KmsConstructProps
  ) {

    super(scope, id);

    //
    // Validate Configuration
    //
    ConfigValidator.validatePlatformConfig(
      props.config
    );

    ConfigValidator.validateKmsConfig(
      props.kms
    );

    //
    // Currently only CREATE mode is supported.
    // IMPORT, AWS_MANAGED and NONE
    // will be added in the next phase.
    //
    const naming = new NamingConstruct(
      props.config
    );

    const aliasName =
      props.kms.alias ??
      naming.generate(
        ResourceType.KMS,
        {
          suffix: 'key'
        }
      );

    const key = new kms.Key(
      this,
      'Key',
      {

        description:
          props.kms.description,

        enableKeyRotation:
          props.kms.enableKeyRotation ?? true,

      }
    );

    new kms.Alias(
      this,
      'Alias',
      {

        aliasName,

        targetKey: key

      }
    );

    TaggingConstruct.applyTags(
      key,
      props.config,
      props.kms.tags
    );

    this.key = key;

  }

}
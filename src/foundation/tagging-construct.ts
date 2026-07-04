import { Tags } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

import { PlatformConfig } from '../interfaces/platform-config';

export class TaggingConstruct {

  public static applyTags(
    resource: IConstruct,
    config: PlatformConfig
  ): void {

    Object.entries(config.mandatoryTags).forEach(
      ([key, value]) => {

        Tags.of(resource).add(
          key,
          value
        );

      }
    );
  }
}
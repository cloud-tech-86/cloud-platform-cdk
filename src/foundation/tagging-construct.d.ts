import { IConstruct } from 'constructs';
import { Tags } from 'aws-cdk-lib';

import { PlatformConfig } from '../interfaces/platform-config';

export class TaggingConstruct {

  /**
   * Apply standard platform tags and optional resource tags.
   *
   * Resource specific tags override platform tags if the same key exists.
   */
  public static applyTags(
    resource: IConstruct,
    config: PlatformConfig,
    additionalTags?: Record<string, string>
  ): void {

    const tags: Record<string, string> = {

      Vendor: config.vendor,

      Application: config.application,

      Environment: config.environment,

      Owner: config.owner,

      CostCenter: config.costCenter,

      BusinessUnit: config.businessUnit,

      ManagedBy: 'AWS-CDK',

      ...config.mandatoryTags,

      ...additionalTags

    };

    for (const [key, value] of Object.entries(tags)) {

      if (
        value !== undefined &&
        value !== null &&
        value.toString().trim().length > 0
      ) {

        Tags.of(resource).add(
          key,
          value.toString()
        );

      }

    }

  }

}
import { PlatformConfig } from '../interfaces/platform-config';
import { ResourceType } from '../constants/resource-types';

export interface NamingOptions {
  /**
   * Optional resource suffix.
   * Example:
   * app, db, logs
   */
  readonly suffix?: string;

  /**
   * Include AWS Account ID.
   * Recommended for globally unique resources like S3.
   */
  readonly includeAccountId?: boolean;

  /**
   * Include AWS Region.
   * Useful for multi-region deployments.
   */
  readonly includeRegion?: boolean;

  /**
   * Maximum allowed length.
   * Example:
   * S3 = 63
   * IAM Role = 64
   */
  readonly maxLength?: number;

  /**
   * Separator between name components.
   * Default: "-"
   */
  readonly separator?: '-' | '_';
}

export class NamingConstruct {

  constructor(
    private readonly config: PlatformConfig
  ) {
    this.validateConfig();
  }

  /**
   * Generate a standard resource name.
   */
  public generate(
    resourceType: ResourceType,
    options?: NamingOptions
  ): string {

    const separator = options?.separator ?? '-';

    const parts: string[] = [
      this.config.vendor,
      this.config.application,
      this.config.environment,
      resourceType
    ];

    if (options?.suffix) {
      parts.push(options.suffix);
    }

    if (options?.includeRegion) {
      parts.push(this.config.region);
    }

    if (options?.includeAccountId) {
      parts.push(this.config.accountId);
    }

    let resourceName = parts
      .filter(Boolean)
      .join(separator)
      .toLowerCase();

    if (
      options?.maxLength &&
      resourceName.length > options.maxLength
    ) {
      resourceName = resourceName.substring(
        0,
        options.maxLength
      );
    }

    return resourceName;
  }

  /**
   * Generate SSM Parameter path.
   *
   * Example:
   * /inventory/dev/database/password
   */
  public generateParameterName(
    parameterName: string
  ): string {

    return [
      '',
      this.config.application,
      this.config.environment,
      parameterName
    ].join('/');
  }

  /**
   * Generate globally unique S3 bucket name.
   */
  public generateBucketName(
    suffix?: string
  ): string {

    return this.generate(
      ResourceType.S3,
      {
        suffix,
        includeAccountId: true,
        maxLength: 63
      }
    );
  }

  /**
   * Validate required platform configuration.
   */
  private validateConfig(): void {

    const requiredFields = [
      {
        key: 'vendor',
        value: this.config.vendor
      },
      {
        key: 'application',
        value: this.config.application
      },
      {
        key: 'environment',
        value: this.config.environment
      },
      {
        key: 'accountId',
        value: this.config.accountId
      },
      {
        key: 'region',
        value: this.config.region
      }
    ];

    for (const field of requiredFields) {

      if (!field.value || field.value.trim().length === 0) {

        throw new Error(
          `PlatformConfig.${field.key} is required.`
        );

      }

    }

  }

}

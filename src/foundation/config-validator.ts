import { PlatformConfig } from '../interfaces/platform-config';
import { Ec2Configuration } from '../interfaces/ec2-config';
import { VpcConfig } from '../interfaces/vpc-config';

export class ConfigValidator {

  /**
   * Validate Platform configuration.
   */
  public static validatePlatformConfig(
    config: PlatformConfig
  ): void {

    this.validateRequired(config.vendor, 'vendor');
    this.validateRequired(config.application, 'application');
    this.validateRequired(config.environment, 'environment');
    this.validateRequired(config.accountId, 'accountId');
    this.validateRequired(config.region, 'region');
    this.validateRequired(config.owner, 'owner');
    this.validateRequired(config.costCenter, 'costCenter');
    this.validateRequired(config.businessUnit, 'businessUnit');

  }

  /**
   * Validate EC2 configuration.
   */
  public static validateEc2Config(
    config: Ec2Configuration
  ): void {

    this.validateRequired(
      config.instanceType,
      'instanceType'
    );

    if (config.rootVolume.size <= 0) {

      throw new Error(
        'Root volume size must be greater than zero.'
      );

    }

    if (
      config.ami?.amiId &&
      config.ami?.ssmParameterName
    ) {

      throw new Error(
        'Specify either amiId or ssmParameterName, not both.'
      );

    }

  }

  /**
   * Validate VPC configuration.
   */
  public static validateVpcConfig(
    config: VpcConfig
  ): void {

    if (config.mode === 'CREATE') {

      if (!config.cidr) {

        throw new Error(
          'VpcConfig.cidr is required when mode is CREATE.'
        );

      }

      if (!this.isValidCidr(config.cidr)) {

        throw new Error(
          `Invalid CIDR block: ${config.cidr}`
        );

      }

      if (!config.maxAzs || config.maxAzs <= 0) {

        throw new Error(
          'VpcConfig.maxAzs must be greater than zero.'
        );

      }

      if (
        !config.subnetConfiguration ||
        config.subnetConfiguration.length === 0
      ) {

        throw new Error(
          'At least one subnet configuration is required.'
        );

      }

    }

    if (config.mode === 'IMPORT') {

      if (!config.vpcId && !config.vpcName) {

        throw new Error(
          'VpcConfig.vpcId or vpcName is required when mode is IMPORT.'
        );

      }

    }

  }

  /**
   * Validate required fields.
   */
  private static validateRequired(
    value: string,
    field: string
  ): void {

    if (!value || value.trim().length === 0) {

      throw new Error(
        `${field} is required.`
      );

    }

  }

  /**
   * Basic CIDR validation.
   */
  private static isValidCidr(
    cidr: string
  ): boolean {

    const cidrRegex =
      /^(\d{1,3}\.){3}\d{1,3}\/([0-9]|[12][0-9]|3[0-2])$/;

    return cidrRegex.test(cidr);

  }

}
import { PlatformConfig } from '../interfaces/platform-config';
import { Ec2Configuration } from '../interfaces/ec2-config';
import { VpcConfig } from '../interfaces/vpc-config';
import { SecurityGroupConfig } from '../interfaces/security-group-config';
import { IamRoleConfig } from '../interfaces/iam-role-config';
import { EndpointConfig } from '../interfaces/endpoint-config';
import { KmsConfig } from '../interfaces/kms-config';

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
   * Validate Security Group configuration.
   */
  public static validateSecurityGroupConfig(
    config: SecurityGroupConfig
  ): void {

    if (config.mode === 'IMPORT') {

      if (!config.securityGroupId) {

        throw new Error(
          'securityGroupId is required when mode is IMPORT.'
        );

      }

    }

  }

  /**
   * Validate IAM Role configuration.
   */
  public static validateIamRoleConfig(
    config: IamRoleConfig
  ): void {

    if (config.mode === 'IMPORT') {

      if (!config.roleArn && !config.roleName) {

        throw new Error(
          'Either roleArn or roleName must be specified when mode is IMPORT.'
        );

      }

      return;

    }

    if (!config.assumedBy) {

      throw new Error(
        'assumedBy is required when mode is CREATE.'
      );

    }

    if (
      config.maxSessionDurationHours &&
      (
        config.maxSessionDurationHours < 1 ||
        config.maxSessionDurationHours > 12
      )
    ) {

      throw new Error(
        'maxSessionDurationHours must be between 1 and 12.'
      );

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

    /**
   * Validate Endpoint configuration.
   */
  public static validateEndpointConfig(
    config: EndpointConfig
  ): void {

    const hasEndpoint =
      config.s3 ||
      config.dynamodb ||
      config.ssm ||
      config.ec2messages ||
      config.ssmmessages ||
      config.kms ||
      config.logs ||
      config.monitoring ||
      config.ecrApi ||
      config.ecrDocker ||
      config.secretsManager ||
      config.sts;

    if (!hasEndpoint) {

      throw new Error(
        'At least one endpoint must be enabled.'
      );

    }

  }

  /**
 * Validate KMS configuration.
 */
public static validateKmsConfig(
  config: KmsConfig
): void {

  //
  // CREATE mode
  //
  if (config.mode === 'CREATE') {

    if (!config.alias) {

      throw new Error(
        'alias is required when mode is CREATE.'
      );

    }

  }

  //
  // IMPORT mode
  //
  if (config.mode === 'IMPORT') {

    if (!config.keyArn && !config.alias) {

      throw new Error(
        'Either keyArn or alias is required when mode is IMPORT.'
      );

    }

  }

}

}
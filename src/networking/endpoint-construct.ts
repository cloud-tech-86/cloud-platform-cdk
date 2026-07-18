import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

import { PlatformConfig } from '../interfaces/platform-config';
import { EndpointConfig } from '../interfaces/endpoint-config';

import { NamingConstruct } from '../foundation/naming-construct';
import { TaggingConstruct } from '../foundation/tagging-construct';
import { ConfigValidator } from '../foundation/config-validator';

import { ResourceType } from '../constants/resource-types';

export interface EndpointConstructProps {

  readonly config: PlatformConfig;

  readonly endpoint: EndpointConfig;

  readonly vpc: ec2.IVpc;

  readonly securityGroup: ec2.ISecurityGroup;

}

export class EndpointConstruct extends Construct {

  public readonly gatewayEndpoints: ec2.GatewayVpcEndpoint[] = [];

  public readonly interfaceEndpoints: ec2.InterfaceVpcEndpoint[] = [];

  constructor(
    scope: Construct,
    id: string,
    props: EndpointConstructProps
  ) {

    super(scope, id);

    //
    // Validate Configuration
    //
    ConfigValidator.validatePlatformConfig(
      props.config
    );

    ConfigValidator.validateEndpointConfig(
      props.endpoint
    );

    //
    // Naming
    //
    const naming = new NamingConstruct(
      props.config
    );

    naming.generate(
      ResourceType.ENDPOINT
    );

    //
    // Gateway Endpoints
    //

    if (props.endpoint.s3) {

      const s3Endpoint =
        props.vpc.addGatewayEndpoint(
          'S3GatewayEndpoint',
          {
            service:
              ec2.GatewayVpcEndpointAwsService.S3
          }
        );

      TaggingConstruct.applyTags(
        s3Endpoint,
        props.config
      );

      this.gatewayEndpoints.push(
        s3Endpoint
      );

    }

    if (props.endpoint.dynamodb) {

      const dynamodbEndpoint =
        props.vpc.addGatewayEndpoint(
          'DynamoDbGatewayEndpoint',
          {
            service:
              ec2.GatewayVpcEndpointAwsService.DYNAMODB
          }
        );

      TaggingConstruct.applyTags(
        dynamodbEndpoint,
        props.config
      );

      this.gatewayEndpoints.push(
        dynamodbEndpoint
      );

    }

    //
    // Interface Endpoints
    //

    if (props.endpoint.ssm) {

      this.addInterfaceEndpoint(
        'SsmEndpoint',
        ec2.InterfaceVpcEndpointAwsService.SSM,
        props
      );

    }
 

    //
    // Ec2 Messages
    //

if (props.endpoint.ec2messages) {

  this.addInterfaceEndpoint(
    'Ec2MessagesEndpoint',
    ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES,
    props
  );

}

//
// SSM Messages
//
if (props.endpoint.ssmmessages) {

  this.addInterfaceEndpoint(
    'SsmMessagesEndpoint',
    ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES,
    props
  );

}

//
// KMS
//
if (props.endpoint.kms) {

  this.addInterfaceEndpoint(
    'KmsEndpoint',
    ec2.InterfaceVpcEndpointAwsService.KMS,
    props
  );

}

//
// CloudWatch Logs
//
if (props.endpoint.logs) {

  this.addInterfaceEndpoint(
    'CloudWatchLogsEndpoint',
    ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
    props
  );

}

//
// CloudWatch Monitoring
//
if (props.endpoint.monitoring) {

  this.addInterfaceEndpoint(
    'CloudWatchMonitoringEndpoint',
    ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_MONITORING,
    props
  );

}

//
// ECR API
//
if (props.endpoint.ecrApi) {

  this.addInterfaceEndpoint(
    'EcrApiEndpoint',
    ec2.InterfaceVpcEndpointAwsService.ECR,
    props
  );

}

//
// ECR Docker
//
if (props.endpoint.ecrDocker) {

  this.addInterfaceEndpoint(
    'EcrDockerEndpoint',
    ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
    props
  );

}

//
// Secrets Manager
//
if (props.endpoint.secretsManager) {

  this.addInterfaceEndpoint(
    'SecretsManagerEndpoint',
    ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
    props
  );

}

//
// STS
//
if (props.endpoint.sts) {

  this.addInterfaceEndpoint(
    'StsEndpoint',
    ec2.InterfaceVpcEndpointAwsService.STS,
    props
  );

}

  }
  
  /**
   * Create Interface Endpoint
   */
  private addInterfaceEndpoint(
    id: string,
    service: ec2.InterfaceVpcEndpointAwsService,
    props: EndpointConstructProps
  ): void {

    const endpoint =
      props.vpc.addInterfaceEndpoint(
        id,
        {
          service,

          securityGroups: [
            props.securityGroup
          ],

          privateDnsEnabled: true
        }
      );

    TaggingConstruct.applyTags(
      endpoint,
      props.config
    );

    this.interfaceEndpoints.push(
      endpoint
    );

  }

}
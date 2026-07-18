export interface EndpointConfig {

  readonly s3?: boolean;

  readonly dynamodb?: boolean;

  readonly ssm?: boolean;

  readonly ec2messages?: boolean;

  readonly ssmmessages?: boolean;

  readonly kms?: boolean;

  readonly logs?: boolean;

  readonly monitoring?: boolean;

  readonly ecrApi?: boolean;

  readonly ecrDocker?: boolean;

  readonly secretsManager?: boolean;

  readonly sts?: boolean;

}
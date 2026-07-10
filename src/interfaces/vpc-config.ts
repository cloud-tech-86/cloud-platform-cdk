export type VpcSubnetType =
  | 'Public'
  | 'Private'
  | 'Isolated';

export interface VpcSubnetConfig {
  readonly name: string;
  readonly cidrMask: number;
  readonly subnetType: VpcSubnetType;
  readonly routeTableName?: string;
  readonly reserved?: boolean;
}

export interface VpcFlowLogsConfig {
  readonly enabled: boolean;
  readonly retentionInDays?: number;
  readonly destination:
    | 'S3'
    | 'CloudWatchLogs'
    | 'Kinesis';

  readonly bucketName?: string;
  readonly logGroupName?: string;
  readonly iamRoleArn?: string;
}

export interface VpcEndpointConfig {
  readonly s3?: boolean;
  readonly dynamodb?: boolean;
  readonly ssm?: boolean;
  readonly ec2messages?: boolean;
  readonly ssmmessages?: boolean;
  readonly kms?: boolean;
  readonly cloudwatch?: boolean;
}

export interface VpcConfig {
  readonly cidr: string;
  readonly maxAzs: number;
  readonly natGateways: number;

  readonly subnetConfiguration: VpcSubnetConfig[];

  readonly enableDnsHostnames?: boolean;
  readonly enableDnsSupport?: boolean;

  readonly flowLogs?: VpcFlowLogsConfig;

  readonly endpoints?: VpcEndpointConfig;

  readonly additionalCidrBlocks?: string[];

  readonly enableVpnGateway?: boolean;

  readonly tags?: Record<string, string>;
}
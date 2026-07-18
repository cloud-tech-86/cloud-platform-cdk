import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PlatformConfig } from '../interfaces/platform-config';
import { EndpointConfig } from '../interfaces/endpoint-config';
export interface EndpointConstructProps {
    readonly config: PlatformConfig;
    readonly endpoint: EndpointConfig;
    readonly vpc: ec2.IVpc;
    readonly securityGroup: ec2.ISecurityGroup;
}
export declare class EndpointConstruct extends Construct {
    readonly gatewayEndpoints: ec2.GatewayVpcEndpoint[];
    readonly interfaceEndpoints: ec2.InterfaceVpcEndpoint[];
    constructor(scope: Construct, id: string, props: EndpointConstructProps);
    /**
     * Create Interface Endpoint
     */
    private addInterfaceEndpoint;
}

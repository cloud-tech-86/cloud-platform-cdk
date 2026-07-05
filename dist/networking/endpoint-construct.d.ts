import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
export interface EndpointConstructProps {
    vpc: ec2.IVpc;
}
export declare class EndpointConstruct extends Construct {
    constructor(scope: Construct, id: string, props: EndpointConstructProps);
}

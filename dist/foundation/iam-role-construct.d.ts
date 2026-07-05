import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
export interface IamRoleConstructProps {
    roleName: string;
    servicePrincipal: string;
    managedPolicies?: string[];
}
export declare class IamRoleConstruct extends Construct {
    readonly role: iam.Role;
    constructor(scope: Construct, id: string, props: IamRoleConstructProps);
}

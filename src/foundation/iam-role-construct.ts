import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface IamRoleConstructProps {
  roleName: string;
  servicePrincipal: string;
  managedPolicies?: string[];
}

export class IamRoleConstruct extends Construct {
  public readonly role: iam.Role;

  constructor(scope: Construct, id: string, props: IamRoleConstructProps) {
    super(scope, id);

    this.role = new iam.Role(this, 'Role', {
      roleName: props.roleName,
      assumedBy: new iam.ServicePrincipal(props.servicePrincipal),
    });

    props.managedPolicies?.forEach((policy) => {
      this.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policy));
    });
  }
}

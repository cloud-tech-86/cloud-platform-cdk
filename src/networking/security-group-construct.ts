import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface SecurityGroupConstructProps {
  vpc: ec2.IVpc;
  securityGroupName: string;
}

export class SecurityGroupConstruct extends Construct {

  public readonly securityGroup: ec2.SecurityGroup;

  constructor(
    scope: Construct,
    id: string,
    props: SecurityGroupConstructProps
  ) {

    super(scope, id);

    this.securityGroup = new ec2.SecurityGroup(
      this,
      'SecurityGroup',
      {
        vpc: props.vpc,
        securityGroupName: props.securityGroupName,
        allowAllOutbound: true
      }
    );
  }
}
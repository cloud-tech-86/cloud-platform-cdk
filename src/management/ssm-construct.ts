import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface SsmConstructProps {
  role: iam.IRole;
}

export class SsmConstruct extends Construct {

  constructor(
    scope: Construct,
    id: string,
    props: SsmConstructProps
  ) {
    super(scope, id);

    props.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'AmazonSSMManagedInstanceCore'
      )
    );
  }
}
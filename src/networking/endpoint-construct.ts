import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface EndpointConstructProps {
  vpc: ec2.IVpc;
}

export class EndpointConstruct extends Construct {

  constructor(
    scope: Construct,
    id: string,
    props: EndpointConstructProps
  ) {

    super(scope, id);

    props.vpc.addInterfaceEndpoint(
      'SsmEndpoint',
      {
        service:
          ec2.InterfaceVpcEndpointAwsService.SSM
      }
    );

    props.vpc.addInterfaceEndpoint(
      'SsmMessagesEndpoint',
      {
        service:
          ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES
      }
    );

    props.vpc.addInterfaceEndpoint(
      'Ec2MessagesEndpoint',
      {
        service:
          ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES
      }
    );
  }
}
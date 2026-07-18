import * as cdk from 'aws-cdk-lib';

export class TestStack extends cdk.Stack {

  constructor() {

    const app = new cdk.App();

    super(
      app,
      'TestStack',
      {
        env: {
          account: '111111111111',
          region: 'ap-south-1'
        }
      }
    );

  }

}
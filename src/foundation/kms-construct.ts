import { Construct } from 'constructs';
import * as kms from 'aws-cdk-lib/aws-kms';

export interface KmsConstructProps {
  aliasName: string;
}

export class KmsConstruct extends Construct {

  public readonly key: kms.Key;

  constructor(
    scope: Construct,
    id: string,
    props: KmsConstructProps
  ) {

    super(scope, id);

    this.key = new kms.Key(
      this,
      'Key',
      {
        enableKeyRotation: true
      }
    );

    new kms.Alias(
      this,
      'Alias',
      {
        aliasName: props.aliasName,
        targetKey: this.key
      }
    );
  }
}
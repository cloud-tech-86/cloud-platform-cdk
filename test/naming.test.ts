import { NamingConstruct } from '../src';

describe('Naming Construct', () => {

  test('Generate Resource Name', () => {

    const naming = new NamingConstruct({
      vendor: 'aws',
      application: 'varnika',
      environment: 'dev',

      roleArn: 'arn:aws:iam::123456789012:role/PowerUserRole',

      accountId: '111111111111',
      region: 'ap-south-1',

      owner: 'platform-team',
      costCenter: 'IT',
      businessUnit: 'Engineering',

      vpcCidr: '10.0.0.0/16',
      instanceType: 't3.micro',

      mandatoryTags: {}
    });

    expect(
      naming.generate('s3')
    ).toBe(
      'aws-varnika-dev-s3'
    );

  });

});
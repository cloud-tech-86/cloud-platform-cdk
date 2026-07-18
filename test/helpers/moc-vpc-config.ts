import { VpcConfig } from '../../src/interfaces/vpc-config';

export const mockVpcConfig: VpcConfig = {

  mode: 'CREATE',

  cidr: '10.0.0.0/16',

  maxAzs: 2,

  natGateways: 1,

  subnetConfiguration: [

    {
      name: 'Public',

      subnetType: 'Public',

      cidrMask: 24

    },

    {
      name: 'Private',

      subnetType: 'Private',

      cidrMask: 24

    }

  ]

};
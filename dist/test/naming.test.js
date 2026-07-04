"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('NamingConstruct', () => {
    test('generate resource name', () => {
        const naming = new src_1.NamingConstruct({
            vendor: 'aws',
            application: 'varnika',
            environment: 'dev',
            accountId: '123456789012',
            region: 'ap-south-1',
            owner: 'CloudTeam',
            costCenter: 'CC1001',
            businessUnit: 'IT',
            vpcCidr: '10.10.0.0/16',
            instanceType: 't3.medium',
            mandatoryTags: {}
        });
        expect(naming.generate('vpc')).toBe('aws-varnika-dev-vpc');
    });
});

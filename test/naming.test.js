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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtaW5nLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuYW1pbmcudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdDQUF5QztBQUV6QyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBRS9CLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLEVBQUU7UUFFbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBZSxDQUFDO1lBRWpDLE1BQU0sRUFBRSxLQUFLO1lBQ2IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsV0FBVyxFQUFFLEtBQUs7WUFFbEIsU0FBUyxFQUFFLGNBQWM7WUFDekIsTUFBTSxFQUFFLFlBQVk7WUFFcEIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsWUFBWSxFQUFFLElBQUk7WUFFbEIsT0FBTyxFQUFFLGNBQWM7WUFDdkIsWUFBWSxFQUFFLFdBQVc7WUFFekIsYUFBYSxFQUFFLEVBQUU7U0FFbEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUNKLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ3ZCLENBQUMsSUFBSSxDQUNKLHFCQUFxQixDQUN0QixDQUFDO0lBRUosQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hbWluZ0NvbnN0cnVjdCB9IGZyb20gJy4uL3NyYyc7XHJcblxyXG5kZXNjcmliZSgnTmFtaW5nQ29uc3RydWN0JywgKCkgPT4ge1xyXG5cclxuICB0ZXN0KCdnZW5lcmF0ZSByZXNvdXJjZSBuYW1lJywgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IG5hbWluZyA9IG5ldyBOYW1pbmdDb25zdHJ1Y3Qoe1xyXG5cclxuICAgICAgdmVuZG9yOiAnYXdzJyxcclxuICAgICAgYXBwbGljYXRpb246ICd2YXJuaWthJyxcclxuICAgICAgZW52aXJvbm1lbnQ6ICdkZXYnLFxyXG5cclxuICAgICAgYWNjb3VudElkOiAnMTIzNDU2Nzg5MDEyJyxcclxuICAgICAgcmVnaW9uOiAnYXAtc291dGgtMScsXHJcblxyXG4gICAgICBvd25lcjogJ0Nsb3VkVGVhbScsXHJcbiAgICAgIGNvc3RDZW50ZXI6ICdDQzEwMDEnLFxyXG4gICAgICBidXNpbmVzc1VuaXQ6ICdJVCcsXHJcblxyXG4gICAgICB2cGNDaWRyOiAnMTAuMTAuMC4wLzE2JyxcclxuICAgICAgaW5zdGFuY2VUeXBlOiAndDMubWVkaXVtJyxcclxuXHJcbiAgICAgIG1hbmRhdG9yeVRhZ3M6IHt9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgZXhwZWN0KFxyXG4gICAgICBuYW1pbmcuZ2VuZXJhdGUoJ3ZwYycpXHJcbiAgICApLnRvQmUoXHJcbiAgICAgICdhd3MtdmFybmlrYS1kZXYtdnBjJ1xyXG4gICAgKTtcclxuXHJcbiAgfSk7XHJcblxyXG59KTsiXX0=
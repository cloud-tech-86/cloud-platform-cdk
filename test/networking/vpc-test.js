"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const assertions_1 = require("aws-cdk-lib/assertions");
const vpc_construct_1 = require("../../src/networking/vpc-construct");
describe('VpcConstruct', () => {
    test('Creates VPC', () => {
        const app = new cdk.App();
        const stack = new cdk.Stack(app, 'TestStack');
        new vpc_construct_1.VpcConstruct(stack, 'Vpc', {
            vpcName: 'aws-varnika-dev-vpc',
            cidr: '10.10.0.0/16',
            maxAzs: 2
        });
        const template = assertions_1.Template.fromStack(stack);
        template.resourceCountIs('AWS::EC2::VPC', 1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2cGMtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUNuQyx1REFBa0Q7QUFFbEQsc0VBQWtFO0FBRWxFLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO0lBRTVCLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBRXZCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FDekIsR0FBRyxFQUNILFdBQVcsQ0FDWixDQUFDO1FBRUYsSUFBSSw0QkFBWSxDQUNkLEtBQUssRUFDTCxLQUFLLEVBQ0w7WUFDRSxPQUFPLEVBQ0wscUJBQXFCO1lBRXZCLElBQUksRUFDRixjQUFjO1lBRWhCLE1BQU0sRUFBRSxDQUFDO1NBQ1YsQ0FDRixDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQ1oscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUIsUUFBUSxDQUFDLGVBQWUsQ0FDdEIsZUFBZSxFQUNmLENBQUMsQ0FDRixDQUFDO0lBRUosQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XHJcblxyXG5pbXBvcnQgeyBWcGNDb25zdHJ1Y3QgfSBmcm9tICcuLi8uLi9zcmMvbmV0d29ya2luZy92cGMtY29uc3RydWN0JztcclxuXHJcbmRlc2NyaWJlKCdWcGNDb25zdHJ1Y3QnLCAoKSA9PiB7XHJcblxyXG4gIHRlc3QoJ0NyZWF0ZXMgVlBDJywgKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XHJcblxyXG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKFxyXG4gICAgICBhcHAsXHJcbiAgICAgICdUZXN0U3RhY2snXHJcbiAgICApO1xyXG5cclxuICAgIG5ldyBWcGNDb25zdHJ1Y3QoXHJcbiAgICAgIHN0YWNrLFxyXG4gICAgICAnVnBjJyxcclxuICAgICAge1xyXG4gICAgICAgIHZwY05hbWU6XHJcbiAgICAgICAgICAnYXdzLXZhcm5pa2EtZGV2LXZwYycsXHJcblxyXG4gICAgICAgIGNpZHI6XHJcbiAgICAgICAgICAnMTAuMTAuMC4wLzE2JyxcclxuXHJcbiAgICAgICAgbWF4QXpzOiAyXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgdGVtcGxhdGUgPVxyXG4gICAgICBUZW1wbGF0ZS5mcm9tU3RhY2soc3RhY2spO1xyXG5cclxuICAgIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcyhcclxuICAgICAgJ0FXUzo6RUMyOjpWUEMnLFxyXG4gICAgICAxXHJcbiAgICApO1xyXG5cclxuICB9KTtcclxuXHJcbn0pOyJdfQ==
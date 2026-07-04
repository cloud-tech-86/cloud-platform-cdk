"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const assertions_1 = require("aws-cdk-lib/assertions");
const src_1 = require("../src");
test('IAM Role Created', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app);
    new src_1.IamRoleConstruct(stack, 'Role', {
        roleName: 'aws-varnika-dev-role-001',
        servicePrincipal: 'ec2.amazonaws.com',
        managedPolicies: [
            'AmazonSSMManagedInstanceCore'
        ]
    });
    const template = assertions_1.Template.fromStack(stack);
    template.resourceCountIs('AWS::IAM::Role', 1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWFtLXJvbGUudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlhbS1yb2xlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFFbkMsdURBQWtEO0FBRWxELGdDQUEwQztBQUUxQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQyxJQUFJLHNCQUFnQixDQUNsQixLQUFLLEVBQ0wsTUFBTSxFQUNOO1FBQ0UsUUFBUSxFQUFFLDBCQUEwQjtRQUVwQyxnQkFBZ0IsRUFBRSxtQkFBbUI7UUFFckMsZUFBZSxFQUFFO1lBQ2YsOEJBQThCO1NBQy9CO0tBQ0YsQ0FDRixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQ1oscUJBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUIsUUFBUSxDQUFDLGVBQWUsQ0FDdEIsZ0JBQWdCLEVBQ2hCLENBQUMsQ0FDRixDQUFDO0FBRUosQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5cclxuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdhd3MtY2RrLWxpYi9hc3NlcnRpb25zJztcclxuXHJcbmltcG9ydCB7IElhbVJvbGVDb25zdHJ1Y3QgfSBmcm9tICcuLi9zcmMnO1xyXG5cclxudGVzdCgnSUFNIFJvbGUgQ3JlYXRlZCcsICgpID0+IHtcclxuXHJcbiAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuXHJcbiAgY29uc3Qgc3RhY2sgPSBuZXcgY2RrLlN0YWNrKGFwcCk7XHJcblxyXG4gIG5ldyBJYW1Sb2xlQ29uc3RydWN0KFxyXG4gICAgc3RhY2ssXHJcbiAgICAnUm9sZScsXHJcbiAgICB7XHJcbiAgICAgIHJvbGVOYW1lOiAnYXdzLXZhcm5pa2EtZGV2LXJvbGUtMDAxJyxcclxuXHJcbiAgICAgIHNlcnZpY2VQcmluY2lwYWw6ICdlYzIuYW1hem9uYXdzLmNvbScsXHJcblxyXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcclxuICAgICAgICAnQW1hem9uU1NNTWFuYWdlZEluc3RhbmNlQ29yZSdcclxuICAgICAgXVxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRlbXBsYXRlID1cclxuICAgIFRlbXBsYXRlLmZyb21TdGFjayhzdGFjayk7XHJcblxyXG4gIHRlbXBsYXRlLnJlc291cmNlQ291bnRJcyhcclxuICAgICdBV1M6OklBTTo6Um9sZScsXHJcbiAgICAxXHJcbiAgKTtcclxuXHJcbn0pOyJdfQ==
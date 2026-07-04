"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VpcConstruct = void 0;
const constructs_1 = require("constructs");
const ec2 = require("aws-cdk-lib/aws-ec2");
class VpcConstruct extends constructs_1.Construct {
    vpc;
    constructor(scope, id, props) {
        super(scope, id);
        this.vpc = new ec2.Vpc(this, 'Vpc', {
            vpcName: props.vpcName,
            ipAddresses: ec2.IpAddresses.cidr(props.cidr),
            maxAzs: props.maxAzs,
            natGateways: props.natGateways ?? 1,
            subnetConfiguration: [
                {
                    name: 'public',
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 24
                },
                {
                    name: 'private',
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24
                }
            ]
        });
    }
}
exports.VpcConstruct = VpcConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZwYy1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLDJDQUEyQztBQWEzQyxNQUFhLFlBQWEsU0FBUSxzQkFBUztJQUV6QixHQUFHLENBQVU7SUFFN0IsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsS0FBd0I7UUFHeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxFQUNKLEtBQUssRUFDTDtZQUNFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUV0QixXQUFXLEVBQ1QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQ1g7WUFFSCxNQUFNLEVBQ0osS0FBSyxDQUFDLE1BQU07WUFFZCxXQUFXLEVBQ1QsS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDO1lBRXhCLG1CQUFtQixFQUFFO2dCQUNuQjtvQkFDRSxJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQ1IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNO29CQUN2QixRQUFRLEVBQUUsRUFBRTtpQkFDYjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsU0FBUztvQkFDZixVQUFVLEVBQ1IsR0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUI7b0JBQ3BDLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2FBQ0Y7U0FDRixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5Q0Qsb0NBOENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVnBjQ29uc3RydWN0UHJvcHMge1xyXG5cclxuICB2cGNOYW1lOiBzdHJpbmc7XHJcblxyXG4gIGNpZHI6IHN0cmluZztcclxuXHJcbiAgbWF4QXpzOiBudW1iZXI7XHJcblxyXG4gIG5hdEdhdGV3YXlzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVnBjQ29uc3RydWN0IGV4dGVuZHMgQ29uc3RydWN0IHtcclxuXHJcbiAgcHVibGljIHJlYWRvbmx5IHZwYzogZWMyLlZwYztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBzY29wZTogQ29uc3RydWN0LFxyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHByb3BzOiBWcGNDb25zdHJ1Y3RQcm9wc1xyXG4gICkge1xyXG5cclxuICAgIHN1cGVyKHNjb3BlLCBpZCk7XHJcblxyXG4gICAgdGhpcy52cGMgPSBuZXcgZWMyLlZwYyhcclxuICAgICAgdGhpcyxcclxuICAgICAgJ1ZwYycsXHJcbiAgICAgIHtcclxuICAgICAgICB2cGNOYW1lOiBwcm9wcy52cGNOYW1lLFxyXG5cclxuICAgICAgICBpcEFkZHJlc3NlczpcclxuICAgICAgICAgIGVjMi5JcEFkZHJlc3Nlcy5jaWRyKFxyXG4gICAgICAgICAgICBwcm9wcy5jaWRyXHJcbiAgICAgICAgICApLFxyXG5cclxuICAgICAgICBtYXhBenM6XHJcbiAgICAgICAgICBwcm9wcy5tYXhBenMsXHJcblxyXG4gICAgICAgIG5hdEdhdGV3YXlzOlxyXG4gICAgICAgICAgcHJvcHMubmF0R2F0ZXdheXMgPz8gMSxcclxuXHJcbiAgICAgICAgc3VibmV0Q29uZmlndXJhdGlvbjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncHVibGljJyxcclxuICAgICAgICAgICAgc3VibmV0VHlwZTpcclxuICAgICAgICAgICAgICBlYzIuU3VibmV0VHlwZS5QVUJMSUMsXHJcbiAgICAgICAgICAgIGNpZHJNYXNrOiAyNFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3ByaXZhdGUnLFxyXG4gICAgICAgICAgICBzdWJuZXRUeXBlOlxyXG4gICAgICAgICAgICAgIGVjMi5TdWJuZXRUeXBlLlBSSVZBVEVfV0lUSF9FR1JFU1MsXHJcbiAgICAgICAgICAgIGNpZHJNYXNrOiAyNFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXX0=
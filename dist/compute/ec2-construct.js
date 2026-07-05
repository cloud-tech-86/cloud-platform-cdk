"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2Construct = void 0;
const constructs_1 = require("constructs");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
const naming_construct_1 = require("../foundation/naming-construct");
const resource_types_1 = require("../constants/resource-types");
class Ec2Construct extends constructs_1.Construct {
    instance;
    constructor(scope, id, props) {
        super(scope, id);
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const instanceName = naming.generate(resource_types_1.ResourceType.EC2, 'app');
        this.instance =
            new ec2.Instance(this, 'Instance', {
                instanceName,
                vpc: props.vpc,
                role: props.role,
                securityGroup: props.securityGroup,
                instanceType: new ec2.InstanceType(props.config.instanceType),
                machineImage: ec2.MachineImage.latestAmazonLinux2023(),
                vpcSubnets: {
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
                },
                detailedMonitoring: true,
                requireImdsv2: true,
                blockDevices: [
                    {
                        deviceName: '/dev/xvda',
                        volume: ec2.BlockDeviceVolume.ebs(30, {
                            encrypted: true,
                            volumeType: ec2.EbsDeviceVolumeType.GP3
                        })
                    }
                ]
            });
        aws_cdk_lib_1.Tags.of(this.instance).add('Application', props.config.application);
        aws_cdk_lib_1.Tags.of(this.instance).add('Environment', props.config.environment);
        aws_cdk_lib_1.Tags.of(this.instance).add('Owner', props.config.owner);
        aws_cdk_lib_1.Tags.of(this.instance).add('CostCenter', props.config.costCenter);
    }
}
exports.Ec2Construct = Ec2Construct;

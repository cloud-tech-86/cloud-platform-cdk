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
const naming_construct_1 = require("../foundation/naming-construct");
const tagging_construct_1 = require("../foundation/tagging-construct");
const config_validator_1 = require("../foundation/config-validator");
const defaults_1 = require("../foundation/defaults");
const resource_types_1 = require("../constants/resource-types");
class Ec2Construct extends constructs_1.Construct {
    instance;
    constructor(scope, id, props) {
        super(scope, id);
        //
        // Validate configuration
        //
        config_validator_1.ConfigValidator.validatePlatformConfig(props.config);
        config_validator_1.ConfigValidator.validateEc2Config(props.ec2);
        //
        // Resource Naming
        //
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const instanceName = naming.generate(resource_types_1.ResourceType.EC2, {
            // Ec2Configuration does not have `nameSuffix`; fall back to default
            suffix: props.ec2.nameSuffix ?? 'app'
        });
        //
        // Root Volume
        //
        const blockDevices = [
            {
                deviceName: '/dev/xvda',
                volume: ec2.BlockDeviceVolume.ebs(props.ec2.rootVolume.size ??
                    defaults_1.DEFAULT_EC2.ROOT_VOLUME_SIZE, {
                    volumeType: props.ec2.rootVolume.volumeType ??
                        defaults_1.DEFAULT_EC2.ROOT_VOLUME_TYPE,
                    encrypted: props.ec2.rootVolume.encrypted ??
                        defaults_1.DEFAULT_EC2.ENCRYPTED,
                    deleteOnTermination: props.ec2.rootVolume.deleteOnTermination ?? true
                })
            }
        ];
        //
        // Additional EBS Volumes
        //
        props.ec2.dataVolumes?.forEach(volume => {
            blockDevices.push({
                deviceName: volume.deviceName,
                volume: ec2.BlockDeviceVolume.ebs(volume.size, {
                    volumeType: volume.volumeType,
                    encrypted: volume.encrypted,
                    deleteOnTermination: volume.deleteOnTermination ?? true
                })
            });
        });
        //
        // Create EC2 Instance
        //
        this.instance = new ec2.Instance(this, 'Instance', {
            instanceName,
            vpc: props.vpc,
            role: props.role,
            securityGroup: props.securityGroup,
            instanceType: new ec2.InstanceType(props.ec2.instanceType),
            //
            // Version 2:
            // Replace with AmiResolver.resolve(props.ec2)
            //
            machineImage: this.resolveMachineImage(props.ec2, props.config.region),
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
            },
            detailedMonitoring: defaults_1.DEFAULT_EC2.DETAILED_MONITORING,
            requireImdsv2: defaults_1.DEFAULT_EC2.REQUIRE_IMDSV2,
            blockDevices
        });
        //
        // Apply Platform Tags
        //
        tagging_construct_1.TaggingConstruct.applyTags(this.instance, props.config, {
            Name: instanceName,
            ResourceType: 'EC2'
        });
    }
    /**
   * Resolve machine image from configuration.
   */
    resolveMachineImage(config, region) {
        //
        // Specific AMI
        //
        if (config.ami?.amiId) {
            return ec2.MachineImage.genericLinux({
                [region]: config.ami.amiId
            });
        }
        //
        // AMI from SSM Parameter
        //
        if (config.ami?.ssmParameterName) {
            return ec2.MachineImage.fromSsmParameter(config.ami.ssmParameterName);
        }
        //
        // Operating System
        //
        switch (config.ami?.operatingSystem) {
            case 'amazon-linux-2':
                return ec2.MachineImage.latestAmazonLinux2();
            case 'amazon-linux-2023':
            default:
                return ec2.MachineImage.latestAmazonLinux2023();
        }
    }
}
exports.Ec2Construct = Ec2Construct;

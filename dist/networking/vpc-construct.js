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
exports.VpcConstruct = void 0;
const constructs_1 = require("constructs");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const naming_construct_1 = require("../foundation/naming-construct");
const tagging_construct_1 = require("../foundation/tagging-construct");
const config_validator_1 = require("../foundation/config-validator");
const defaults_1 = require("../foundation/defaults");
const resource_types_1 = require("../constants/resource-types");
class VpcConstruct extends constructs_1.Construct {
    vpc;
    constructor(scope, id, props) {
        super(scope, id);
        config_validator_1.ConfigValidator.validatePlatformConfig(props.config);
        config_validator_1.ConfigValidator.validateVpcConfig(props.vpc);
        //
        // IMPORT EXISTING VPC
        //
        if (props.vpc.mode === 'IMPORT') {
            this.vpc = ec2.Vpc.fromLookup(this, 'ImportedVpc', {
                vpcId: props.vpc.vpcId
            });
            return;
        }
        //
        // CREATE NEW VPC
        //
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const vpcName = naming.generate(resource_types_1.ResourceType.VPC);
        const subnetConfiguration = props.vpc.subnetConfiguration.map(subnet => ({
            name: subnet.name,
            subnetType: this.getSubnetType(subnet.subnetType),
            cidrMask: subnet.cidrMask,
            reserved: subnet.reserved ?? false
        }));
        this.vpc = new ec2.Vpc(this, 'Vpc', {
            vpcName,
            ipAddresses: ec2.IpAddresses.cidr(props.vpc.cidr),
            maxAzs: props.vpc.maxAzs,
            natGateways: props.vpc.natGateways ??
                defaults_1.DEFAULT_VPC.NAT_GATEWAYS,
            subnetConfiguration,
            enableDnsHostnames: props.vpc.enableDnsHostnames ??
                defaults_1.DEFAULT_VPC.ENABLE_DNS_HOSTNAMES,
            enableDnsSupport: props.vpc.enableDnsSupport ??
                defaults_1.DEFAULT_VPC.ENABLE_DNS_SUPPORT
        });
        tagging_construct_1.TaggingConstruct.applyTags(this.vpc, props.config, {
            Name: vpcName,
            ...props.vpc.tags
        });
    }
    getSubnetType(subnetType) {
        switch (subnetType) {
            case 'Public':
                return ec2.SubnetType.PUBLIC;
            case 'Private':
                return ec2.SubnetType.PRIVATE_WITH_EGRESS;
            case 'Isolated':
                return ec2.SubnetType.PRIVATE_ISOLATED;
            default:
                throw new Error(`Unsupported subnet type: ${subnetType}`);
        }
    }
}
exports.VpcConstruct = VpcConstruct;

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
exports.SecurityGroupConstruct = void 0;
const constructs_1 = require("constructs");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const naming_construct_1 = require("../foundation/naming-construct");
const tagging_construct_1 = require("../foundation/tagging-construct");
const config_validator_1 = require("../foundation/config-validator");
const defaults_1 = require("../foundation/defaults");
const resource_types_1 = require("../constants/resource-types");
class SecurityGroupConstruct extends constructs_1.Construct {
    securityGroup;
    constructor(scope, id, props) {
        super(scope, id);
        //
        // Validate configuration
        //
        config_validator_1.ConfigValidator.validatePlatformConfig(props.config);
        config_validator_1.ConfigValidator.validateSecurityGroupConfig(props.securityGroup);
        //
        // Import Existing Security Group
        //
        if (props.securityGroup.mode === 'IMPORT') {
            this.securityGroup =
                ec2.SecurityGroup.fromSecurityGroupId(this, 'ImportedSecurityGroup', props.securityGroup.securityGroupId, {
                    mutable: props.securityGroup.manageRules ?? false
                });
            return;
        }
        //
        // Naming
        //
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const securityGroupName = naming.generate(resource_types_1.ResourceType.SECURITY_GROUP, {
            suffix: props.securityGroup.nameSuffix
        });
        //
        // Create Security Group
        //
        const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
            securityGroupName,
            description: props.securityGroup.description ??
                defaults_1.DEFAULT_SECURITY_GROUP.DESCRIPTION,
            allowAllOutbound: props.securityGroup.allowAllOutbound ??
                defaults_1.DEFAULT_SECURITY_GROUP.ALLOW_ALL_OUTBOUND,
            disableInlineRules: props.securityGroup.disableInlineRules ??
                defaults_1.DEFAULT_SECURITY_GROUP.DISABLE_INLINE_RULES,
            vpc: props.vpc
        });
        //
        // Apply Tags
        //
        tagging_construct_1.TaggingConstruct.applyTags(securityGroup, props.config, {
            Name: securityGroupName,
            ...props.securityGroup.tags
        });
        //
        // Ingress Rules
        //
        props.securityGroup.ingressRules?.forEach(rule => this.addIngressRule(securityGroup, rule));
        //
        // Egress Rules
        //
        props.securityGroup.egressRules?.forEach(rule => this.addEgressRule(securityGroup, rule));
        this.securityGroup =
            securityGroup;
    }
    addIngressRule(securityGroup, rule) {
        securityGroup.addIngressRule(this.createPeer(rule), this.createPort(rule), rule.description);
    }
    addEgressRule(securityGroup, rule) {
        securityGroup.addEgressRule(this.createPeer(rule), this.createPort(rule), rule.description);
    }
    createPeer(rule) {
        if (rule.selfReference) {
            return ec2.Peer.securityGroupId(this.securityGroup.securityGroupId);
        }
        if (rule.cidr) {
            return ec2.Peer.ipv4(rule.cidr);
        }
        if (rule.ipv6Cidr) {
            return ec2.Peer.ipv6(rule.ipv6Cidr);
        }
        if (rule.sourceSecurityGroupId) {
            return ec2.Peer.securityGroupId(rule.sourceSecurityGroupId);
        }
        if (rule.prefixListId) {
            return ec2.Peer.prefixList(rule.prefixListId);
        }
        throw new Error('Invalid Security Group rule.');
    }
    createPort(rule) {
        switch (rule.protocol) {
            case 'tcp':
                return ec2.Port.tcpRange(rule.fromPort, rule.toPort);
            case 'udp':
                return ec2.Port.udpRange(rule.fromPort, rule.toPort);
            case 'icmp':
                return ec2.Port.allIcmp();
            case 'all':
                return ec2.Port.allTraffic();
            default:
                throw new Error(`Unsupported protocol: ${rule.protocol}`);
        }
    }
}
exports.SecurityGroupConstruct = SecurityGroupConstruct;

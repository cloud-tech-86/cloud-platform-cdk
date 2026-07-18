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
exports.EndpointConstruct = void 0;
const constructs_1 = require("constructs");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const naming_construct_1 = require("../foundation/naming-construct");
const tagging_construct_1 = require("../foundation/tagging-construct");
const config_validator_1 = require("../foundation/config-validator");
const resource_types_1 = require("../constants/resource-types");
class EndpointConstruct extends constructs_1.Construct {
    gatewayEndpoints = [];
    interfaceEndpoints = [];
    constructor(scope, id, props) {
        super(scope, id);
        //
        // Validate Configuration
        //
        config_validator_1.ConfigValidator.validatePlatformConfig(props.config);
        config_validator_1.ConfigValidator.validateEndpointConfig(props.endpoint);
        //
        // Naming
        //
        const naming = new naming_construct_1.NamingConstruct(props.config);
        naming.generate(resource_types_1.ResourceType.ENDPOINT);
        //
        // Gateway Endpoints
        //
        if (props.endpoint.s3) {
            const s3Endpoint = props.vpc.addGatewayEndpoint('S3GatewayEndpoint', {
                service: ec2.GatewayVpcEndpointAwsService.S3
            });
            tagging_construct_1.TaggingConstruct.applyTags(s3Endpoint, props.config);
            this.gatewayEndpoints.push(s3Endpoint);
        }
        if (props.endpoint.dynamodb) {
            const dynamodbEndpoint = props.vpc.addGatewayEndpoint('DynamoDbGatewayEndpoint', {
                service: ec2.GatewayVpcEndpointAwsService.DYNAMODB
            });
            tagging_construct_1.TaggingConstruct.applyTags(dynamodbEndpoint, props.config);
            this.gatewayEndpoints.push(dynamodbEndpoint);
        }
        //
        // Interface Endpoints
        //
        if (props.endpoint.ssm) {
            this.addInterfaceEndpoint('SsmEndpoint', ec2.InterfaceVpcEndpointAwsService.SSM, props);
        }
        //
        // Ec2 Messages
        //
        if (props.endpoint.ec2messages) {
            this.addInterfaceEndpoint('Ec2MessagesEndpoint', ec2.InterfaceVpcEndpointAwsService.EC2_MESSAGES, props);
        }
        //
        // SSM Messages
        //
        if (props.endpoint.ssmmessages) {
            this.addInterfaceEndpoint('SsmMessagesEndpoint', ec2.InterfaceVpcEndpointAwsService.SSM_MESSAGES, props);
        }
        //
        // KMS
        //
        if (props.endpoint.kms) {
            this.addInterfaceEndpoint('KmsEndpoint', ec2.InterfaceVpcEndpointAwsService.KMS, props);
        }
        //
        // CloudWatch Logs
        //
        if (props.endpoint.logs) {
            this.addInterfaceEndpoint('CloudWatchLogsEndpoint', ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS, props);
        }
        //
        // CloudWatch Monitoring
        //
        if (props.endpoint.monitoring) {
            this.addInterfaceEndpoint('CloudWatchMonitoringEndpoint', ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_MONITORING, props);
        }
        //
        // ECR API
        //
        if (props.endpoint.ecrApi) {
            this.addInterfaceEndpoint('EcrApiEndpoint', ec2.InterfaceVpcEndpointAwsService.ECR, props);
        }
        //
        // ECR Docker
        //
        if (props.endpoint.ecrDocker) {
            this.addInterfaceEndpoint('EcrDockerEndpoint', ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER, props);
        }
        //
        // Secrets Manager
        //
        if (props.endpoint.secretsManager) {
            this.addInterfaceEndpoint('SecretsManagerEndpoint', ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER, props);
        }
        //
        // STS
        //
        if (props.endpoint.sts) {
            this.addInterfaceEndpoint('StsEndpoint', ec2.InterfaceVpcEndpointAwsService.STS, props);
        }
    }
    /**
     * Create Interface Endpoint
     */
    addInterfaceEndpoint(id, service, props) {
        const endpoint = props.vpc.addInterfaceEndpoint(id, {
            service,
            securityGroups: [
                props.securityGroup
            ],
            privateDnsEnabled: true
        });
        tagging_construct_1.TaggingConstruct.applyTags(endpoint, props.config);
        this.interfaceEndpoints.push(endpoint);
    }
}
exports.EndpointConstruct = EndpointConstruct;

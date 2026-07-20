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
exports.KmsConstruct = void 0;
const constructs_1 = require("constructs");
const kms = __importStar(require("aws-cdk-lib/aws-kms"));
const naming_construct_1 = require("../foundation/naming-construct");
const tagging_construct_1 = require("../foundation/tagging-construct");
const config_validator_1 = require("../foundation/config-validator");
const resource_types_1 = require("../constants/resource-types");
class KmsConstruct extends constructs_1.Construct {
    key;
    constructor(scope, id, props) {
        super(scope, id);
        //
        // Validate Configuration
        //
        config_validator_1.ConfigValidator.validatePlatformConfig(props.config);
        config_validator_1.ConfigValidator.validateKmsConfig(props.kms);
        //
        // Currently only CREATE mode is supported.
        // IMPORT, AWS_MANAGED and NONE
        // will be added in the next phase.
        //
        const naming = new naming_construct_1.NamingConstruct(props.config);
        const aliasName = props.kms.alias ??
            naming.generate(resource_types_1.ResourceType.KMS, {
                suffix: 'key'
            });
        const key = new kms.Key(this, 'Key', {
            description: props.kms.description,
            enableKeyRotation: props.kms.enableKeyRotation ?? true,
        });
        new kms.Alias(this, 'Alias', {
            aliasName,
            targetKey: key
        });
        tagging_construct_1.TaggingConstruct.applyTags(key, props.config, props.kms.tags);
        this.key = key;
    }
}
exports.KmsConstruct = KmsConstruct;

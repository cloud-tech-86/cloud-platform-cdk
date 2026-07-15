"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingConstruct = void 0;
const resource_types_1 = require("../constants/resource-types");
class NamingConstruct {
    config;
    constructor(config) {
        this.config = config;
        this.validateConfig();
    }
    /**
     * Generate a standard resource name.
     */
    generate(resourceType, options) {
        const separator = options?.separator ?? '-';
        const parts = [
            this.config.vendor,
            this.config.application,
            this.config.environment,
            resourceType
        ];
        if (options?.suffix) {
            parts.push(options.suffix);
        }
        if (options?.includeRegion) {
            parts.push(this.config.region);
        }
        if (options?.includeAccountId) {
            parts.push(this.config.accountId);
        }
        let resourceName = parts
            .filter(Boolean)
            .join(separator)
            .toLowerCase();
        if (options?.maxLength &&
            resourceName.length > options.maxLength) {
            resourceName = resourceName.substring(0, options.maxLength);
        }
        return resourceName;
    }
    /**
     * Generate SSM Parameter path.
     *
     * Example:
     * /inventory/dev/database/password
     */
    generateParameterName(parameterName) {
        return [
            '',
            this.config.application,
            this.config.environment,
            parameterName
        ].join('/');
    }
    /**
     * Generate globally unique S3 bucket name.
     */
    generateBucketName(suffix) {
        return this.generate(resource_types_1.ResourceType.S3, {
            suffix,
            includeAccountId: true,
            maxLength: 63
        });
    }
    /**
     * Validate required platform configuration.
     */
    validateConfig() {
        const requiredFields = [
            {
                key: 'vendor',
                value: this.config.vendor
            },
            {
                key: 'application',
                value: this.config.application
            },
            {
                key: 'environment',
                value: this.config.environment
            },
            {
                key: 'accountId',
                value: this.config.accountId
            },
            {
                key: 'region',
                value: this.config.region
            }
        ];
        for (const field of requiredFields) {
            if (!field.value || field.value.trim().length === 0) {
                throw new Error(`PlatformConfig.${field.key} is required.`);
            }
        }
    }
}
exports.NamingConstruct = NamingConstruct;

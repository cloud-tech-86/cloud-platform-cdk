import { PlatformConfig } from '../interfaces/platform-config';
import { ResourceType } from '../constants/resource-types';
export interface NamingOptions {
    /**
     * Optional resource suffix.
     * Example:
     * app, db, logs
     */
    readonly suffix?: string;
    /**
     * Include AWS Account ID.
     * Recommended for globally unique resources like S3.
     */
    readonly includeAccountId?: boolean;
    /**
     * Include AWS Region.
     * Useful for multi-region deployments.
     */
    readonly includeRegion?: boolean;
    /**
     * Maximum allowed length.
     * Example:
     * S3 = 63
     * IAM Role = 64
     */
    readonly maxLength?: number;
    /**
     * Separator between name components.
     * Default: "-"
     */
    readonly separator?: '-' | '_';
}
export declare class NamingConstruct {
    private readonly config;
    constructor(config: PlatformConfig);
    /**
     * Generate a standard resource name.
     */
    generate(resourceType: ResourceType, options?: NamingOptions): string;
    /**
     * Generate SSM Parameter path.
     *
     * Example:
     * /inventory/dev/database/password
     */
    generateParameterName(parameterName: string): string;
    /**
     * Generate globally unique S3 bucket name.
     */
    generateBucketName(suffix?: string): string;
    /**
     * Validate required platform configuration.
     */
    private validateConfig;
}

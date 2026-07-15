export interface PlatformConfig {
    vendor: string;
    application: string;
    environment: string;
    accountId: string;
    region: string;
    owner: string;
    costCenter: string;
    businessUnit: string;
    mandatoryTags: Record<string, string>;
}

export interface RdsConfiguration {
    engine: string;
    engineVersion: string;
    instanceType: string;
    allocatedStorage: number;
    multiAz?: boolean;
    storageEncrypted?: boolean;
    backupRetentionDays?: number;
    deletionProtection?: boolean;
    publiclyAccessible?: boolean;
}
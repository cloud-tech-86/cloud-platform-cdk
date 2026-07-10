export interface AlbConfiguration {
    internetFacing?: boolean;
    idleTimeout?: number;
    enableDeletionProtection?: boolean;
    enableAccessLogs?: boolean;
    accessLogsBucket?: string;
}

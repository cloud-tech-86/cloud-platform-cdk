export interface LambdaConfiguration {
    runtime: string;
    memorySize: number;
    timeout: number;
    architecture?: 'x86_64' | 'arm64';
    environment?: Record<string, string>;
    reservedConcurrency?: number;
}

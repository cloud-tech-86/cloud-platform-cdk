import { PlatformConfig } from '../interfaces/platform-config';
export declare class NamingConstruct {
    private readonly config;
    constructor(config: PlatformConfig);
    generate(resourceType: string, sequence?: string): string;
}

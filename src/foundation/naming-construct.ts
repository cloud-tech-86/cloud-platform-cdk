import { PlatformConfig } from '../interfaces/platform-config';

export class NamingConstruct {

  constructor(
    private readonly config: PlatformConfig
  ) {}

  public generate(
    resourceType: string,
    suffix?: string
  ): string {

    const parts = [
      this.config.vendor,
      this.config.application,
      this.config.environment,
      resourceType
    ];

    if (suffix) {
      parts.push(suffix);
    }

    return parts.join('-').toLowerCase();
  }
}
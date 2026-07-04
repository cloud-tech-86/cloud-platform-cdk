import { PlatformConfig } from '../interfaces/platform-config';

export class NamingConstruct {

  constructor(
    private readonly config: PlatformConfig
  ) {}

  public generate(
    resourceType: string,
    sequence: string = '001'
  ): string {

    return [
      this.config.vendor,
      this.config.application,
      this.config.environment,
      resourceType,
      sequence
    ].join('-').toLowerCase();

  }
}
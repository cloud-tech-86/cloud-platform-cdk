export interface LifecycleRuleConfig {
  readonly id?: string;
  readonly enabled?: boolean;
  readonly expirationDays?: number;
  readonly transitionToIaDays?: number;
  readonly transitionToGlacierDays?: number;
  readonly abortIncompleteMultipartUploadAfterDays?: number;
}

export interface S3Config {
  readonly bucketName?: string;
  readonly versioned?: boolean;
  readonly encryptionEnabled?: boolean;
  readonly blockPublicAccess?: boolean;
  readonly enforceSSL?: boolean;
  readonly lifecycleRules?: LifecycleRuleConfig[];
  readonly tags?: Record<string, string>;
}

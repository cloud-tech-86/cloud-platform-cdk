export interface LifecycleRuleConfig {
   readonly id?: string; // Lifecycle rule name
  readonly enabled?: boolean; // Enable or disable rule
  readonly expirationDays?: number; // Delete objects after N days
  readonly transitionToIaDays?: number; // Move to Standard-IA
  readonly transitionToGlacierDays?: number; // Move to Glacier
  readonly abortIncompleteMultipartUploadAfterDays?: number; // Cleanup multipart uploads
}

 export interface S3Config {

  readonly bucketName?: string; // Existing or custom bucket name
  readonly bucketSuffix?: string; // Used by NamingConstruct
  readonly versioned?: boolean; // Enable bucket versioning
  readonly encryptionEnabled?: boolean; // Enable S3-managed encryption
  readonly blockPublicAccess?: boolean; // Block all public access
  readonly enforceSSL?: boolean; // Allow HTTPS requests only
  readonly lifecycleRules?: LifecycleRuleConfig[]; // Optional lifecycle rules
  readonly tags?: Record<string, string>; // Additional resource tags
}

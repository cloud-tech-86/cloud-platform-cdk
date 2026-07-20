export type KmsMode =
  | 'AWS_MANAGED'
  | 'IMPORT'
  | 'CREATE'
  | 'NONE';

export interface KmsConfig {

  readonly mode: KmsMode; // KMS mode

  readonly keyArn?: string; // Existing CMK ARN

  readonly alias?: string; // Existing or new alias

  readonly description?: string; // Key description

  readonly enableKeyRotation?: boolean; // Enable rotation

  readonly deletionWindowInDays?: number; // 7-30 days

  readonly tags?: Record<string, string>; // Additional tags

}
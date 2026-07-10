export interface SsmParameterConfiguration {
  parameterName: string;
  value: string;
  description?: string;
  tier?: 'Standard' | 'Advanced';
  type?: 'String' | 'SecureString';
}

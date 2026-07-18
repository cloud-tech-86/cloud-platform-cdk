import * as iam from 'aws-cdk-lib/aws-iam';
import { ResourceMode } from './common';

export interface IamRoleConfig {
  readonly mode: ResourceMode;

  //
  // Required for IMPORT
  //
  readonly roleArn?: string;

  readonly roleName?: string;

  //
  // Used for CREATE
  //
  readonly nameSuffix?: string;

  readonly description?: string;

  readonly assumedBy?: iam.IPrincipal;

  readonly managedPolicies?: string[];

  readonly inlinePolicies?: iam.PolicyStatement[];

  readonly maxSessionDurationHours?: number;

  readonly path?: string;

  readonly permissionsBoundaryArn?: string;

  readonly tags?: Record<string, string>;
}

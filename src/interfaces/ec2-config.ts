import * as ec2 from 'aws-cdk-lib/aws-ec2';

export type OperatingSystem =
  | 'amazon-linux-2023'
  | 'amazon-linux-2'
  | 'ubuntu-22.04'
  | 'rhel-9'
  | 'suse-15'
  | 'windows-2022';

export interface AmiConfiguration {
  /**
   * Operating system to use when AMI ID is not supplied.
   */
  operatingSystem?: OperatingSystem;

  /**
   * Specific AMI ID.
   * Example: ami-0ab123456789abcdef
   */
  amiId?: string;

  /**
   * Optional SSM Parameter containing the AMI ID.
   * Example: /golden-images/linux/latest
   */
  ssmParameterName?: string;
}

export interface RootVolumeConfiguration {
  size: number;
  volumeType: ec2.EbsDeviceVolumeType;
  encrypted?: boolean;
  deleteOnTermination?: boolean;
  iops?: number;
  throughput?: number;
}

export interface DataVolumeConfiguration {
  deviceName: string;
  size: number;
  volumeType: ec2.EbsDeviceVolumeType;
  encrypted?: boolean;
  deleteOnTermination?: boolean;
  iops?: number;
  throughput?: number;
}

export interface Ec2Configuration {
  instanceType: string;
  ami?: AmiConfiguration;
  rootVolume: RootVolumeConfiguration;
  dataVolumes?: DataVolumeConfiguration[];
  enableDetailedMonitoring?: boolean;
  
    /**
   * Optional subnet type.
   */
  subnetType?:
    | 'PUBLIC'
    | 'PRIVATE_WITH_EGRESS'
    | 'PRIVATE_ISOLATED';

  /**
   * Optional suffix for resource naming.
   */
  nameSuffix?: string;

  tags?: Record<string, string>;
}


const MIN_ROOT_VOLUME_SIZE_GB = 8;
const MIN_DATA_VOLUME_SIZE_GB = 8;
const DEFAULT_GP3_IOPS = 3000;
const DEFAULT_GP3_THROUGHPUT = 125;

export function normalizeEc2Configuration(config: Partial<Ec2Configuration>): Ec2Configuration {
  if (!config.instanceType) {
    throw new Error('instanceType is required for EC2 configuration');
  }

  if (!config.ami) {
    throw new Error('AMI configuration is required for EC2 configuration');
  }

  if (!config.ami.amiId && !config.ami.ssmParameterName && !config.ami.operatingSystem) {
    throw new Error('AMI configuration must provide amiId, ssmParameterName, or operatingSystem');
  }

  const rootVolume: RootVolumeConfiguration = {
    size: config.rootVolume?.size ?? MIN_ROOT_VOLUME_SIZE_GB,
    volumeType: config.rootVolume?.volumeType ?? ec2.EbsDeviceVolumeType.GP3,
    encrypted: config.rootVolume?.encrypted ?? true,
    deleteOnTermination: config.rootVolume?.deleteOnTermination ?? true,
    iops: config.rootVolume?.iops,
    throughput: config.rootVolume?.throughput,
  };

  if (rootVolume.size < MIN_ROOT_VOLUME_SIZE_GB) {
    throw new Error(`rootVolume.size must be at least ${MIN_ROOT_VOLUME_SIZE_GB} GiB`);
  }

  if (rootVolume.volumeType === ec2.EbsDeviceVolumeType.GP3) {
    rootVolume.iops = rootVolume.iops ?? DEFAULT_GP3_IOPS;
    rootVolume.throughput = rootVolume.throughput ?? DEFAULT_GP3_THROUGHPUT;
  }

  if (
    rootVolume.volumeType === ec2.EbsDeviceVolumeType.IO1 ||
    rootVolume.volumeType === ec2.EbsDeviceVolumeType.IO2
  ) {
    if (!rootVolume.iops || rootVolume.iops < 100) {
      throw new Error('IO1/IO2 root volumes must supply iops and must be at least 100');
    }
  }

  const dataVolumes = config.dataVolumes?.map((dataVolume) => {
    if (dataVolume.size < MIN_DATA_VOLUME_SIZE_GB) {
      throw new Error(`data volume ${dataVolume.deviceName} must be at least ${MIN_DATA_VOLUME_SIZE_GB} GiB`);
    }

    const normalizedDataVolume: DataVolumeConfiguration = {
      deviceName: dataVolume.deviceName,
      size: dataVolume.size,
      volumeType: dataVolume.volumeType,
      encrypted: dataVolume.encrypted ?? true,    
      deleteOnTermination: dataVolume.deleteOnTermination ?? true,  
      iops: dataVolume.iops,
      throughput: dataVolume.throughput,
    };

    if (normalizedDataVolume.volumeType === ec2.EbsDeviceVolumeType.GP3) {
      normalizedDataVolume.iops = normalizedDataVolume.iops ?? DEFAULT_GP3_IOPS;
      normalizedDataVolume.throughput = normalizedDataVolume.throughput ?? DEFAULT_GP3_THROUGHPUT;
    }

    if (
      (normalizedDataVolume.volumeType === ec2.EbsDeviceVolumeType.IO1 ||
        normalizedDataVolume.volumeType === ec2.EbsDeviceVolumeType.IO2) &&
      (!normalizedDataVolume.iops || normalizedDataVolume.iops < 100)
    ) {
      throw new Error(`Data volume ${dataVolume.deviceName} requires iops of at least 100 for IO1/IO2 volumes`);
    }

    return normalizedDataVolume;
  });

  return {
  instanceType: config.instanceType,
  ami: config.ami,
  rootVolume,
  dataVolumes,
  enableDetailedMonitoring:
    config.enableDetailedMonitoring ?? false,
  subnetType:
    config.subnetType ?? 'PRIVATE_WITH_EGRESS',
  nameSuffix:
    config.nameSuffix,
  tags:
    config.tags ?? {}
   };
}

export function isEc2ConfigurationReusable(
  existing: Ec2Configuration,
  candidate: Ec2Configuration,
): boolean {
  if (existing.instanceType !== candidate.instanceType) {
    return false;
  }

  if (!areAmiConfigsEqual(existing.ami, candidate.ami)) {
    return false;
  }

  if (!areVolumesEqual(existing.rootVolume, candidate.rootVolume)) {
    return false;
  }

  const existingDataVolumes = existing.dataVolumes ?? [];
  const candidateDataVolumes = candidate.dataVolumes ?? [];

  if (existingDataVolumes.length !== candidateDataVolumes.length) {
    return false;
  }

  for (let index = 0; index < existingDataVolumes.length; index += 1) {
    if (!areVolumesEqual(existingDataVolumes[index], candidateDataVolumes[index])) {
      return false;
    }
  }

  return true;
}

function areAmiConfigsEqual(
  left?: AmiConfiguration,
  right?: AmiConfiguration,
): boolean {
  if (left === right) {
    return true;
  }

  if (!left || !right) {
    return false;
  }

  return (
    left.amiId === right.amiId &&
    left.ssmParameterName === right.ssmParameterName &&
    left.operatingSystem === right.operatingSystem
  );
}

function areVolumesEqual(
  left: RootVolumeConfiguration | DataVolumeConfiguration,
  right: RootVolumeConfiguration | DataVolumeConfiguration,
): boolean {
  return (
    left.size === right.size &&
    left.volumeType === right.volumeType &&
    (left.encrypted ?? true) === (right.encrypted ?? true) &&
    left.iops === right.iops &&
    left.throughput === right.throughput &&
    ((left as DataVolumeConfiguration).deviceName ?? '') === ((right as DataVolumeConfiguration).deviceName ?? '')
  );
}

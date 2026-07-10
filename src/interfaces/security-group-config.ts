export interface SecurityRule {

    protocol: string;

    fromPort: number;

    toPort: number;

    cidr: string;

    description?: string;
}

export interface SecurityGroupConfiguration {

    groupName?: string;

    description: string;

    ingress?: SecurityRule[];

    egress?: SecurityRule[];

    allowAllOutbound?: boolean;
}
export interface EndpointConfiguration {
    enableS3?: boolean;
    enableDynamoDb?: boolean;
    enableSsm?: boolean;
    enableEc2Messages?: boolean;
    enableSsmMessages?: boolean;
    enableKms?: boolean;
    enableLogs?: boolean;
}

export const defaultEndpointConfiguration: EndpointConfiguration = {
    enableS3: false,
    enableDynamoDb: false,
    enableSsm: false,
    enableEc2Messages: false,
    enableSsmMessages: false,
    enableKms: false,
    enableLogs: false,
};

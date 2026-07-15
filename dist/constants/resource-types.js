"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceType = void 0;
var ResourceType;
(function (ResourceType) {
    ResourceType["VPC"] = "vpc";
    ResourceType["SECURITY_GROUP"] = "sg";
    ResourceType["EC2"] = "ec2";
    ResourceType["S3"] = "s3";
    ResourceType["KMS"] = "kms";
    ResourceType["IAM_ROLE"] = "role";
    ResourceType["ENDPOINT"] = "endpoint";
    ResourceType["SSM"] = "ssm";
})(ResourceType || (exports.ResourceType = ResourceType = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceType = void 0;
var ResourceType;
(function (ResourceType) {
    ResourceType["VPC"] = "vpc";
    ResourceType["SG"] = "sg";
    ResourceType["EC2"] = "ec2";
    ResourceType["S3"] = "s3";
    ResourceType["KMS"] = "kms";
    ResourceType["ROLE"] = "role";
    ResourceType["GLUE"] = "glue";
    ResourceType["BUCKET"] = "bucket";
    ResourceType["ENDPOINT"] = "endpoint";
})(ResourceType || (exports.ResourceType = ResourceType = {}));

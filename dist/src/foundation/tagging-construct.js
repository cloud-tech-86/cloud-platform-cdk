"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaggingConstruct = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class TaggingConstruct {
    static applyTags(resource, config) {
        Object.entries(config.mandatoryTags).forEach(([key, value]) => {
            aws_cdk_lib_1.Tags.of(resource).add(key, value);
        });
    }
}
exports.TaggingConstruct = TaggingConstruct;

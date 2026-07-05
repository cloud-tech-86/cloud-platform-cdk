"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ReadOnlyPolicyConstruct = void 0;
const constructs_1 = require("constructs");
class S3ReadOnlyPolicyConstruct extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        props.bucket.grantRead(props.role);
    }
}
exports.S3ReadOnlyPolicyConstruct = S3ReadOnlyPolicyConstruct;

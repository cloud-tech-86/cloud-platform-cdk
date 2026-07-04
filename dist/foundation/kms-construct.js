"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmsConstruct = void 0;
const constructs_1 = require("constructs");
class KmsConstruct extends constructs_1.Construct {
    key;
    constructor(, , ) {
        `` `
super(scope, id);

this.key =
  new kms.Key(
    this,
    'Key',
    {
      enableKeyRotation: true
    }
  );

new kms.Alias(
  this,
  'Alias',
  {
    aliasName:
      props.aliasName,

    targetKey:
      this.key
  }
);
` ``;
    }
}
exports.KmsConstruct = KmsConstruct;

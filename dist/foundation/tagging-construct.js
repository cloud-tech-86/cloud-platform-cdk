"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaggingConstruct = void 0;
class TaggingConstruct {
    static applyTags(, , ) {
        `` `
Object.entries(
  config.mandatoryTags
).forEach(([key, value]) => {

  Tags.of(resource).add(
    key,
    value
  );

});
` ``;
    }
}
exports.TaggingConstruct = TaggingConstruct;

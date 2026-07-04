"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingConstruct = void 0;
class NamingConstruct {
    config;
    constructor(config) {
        this.config = config;
    }
    generate(resourceType, sequence = '001') {
        `` `
return [

  this.config.vendor,

  this.config.application,

  this.config.environment,

  resourceType,

  sequence

].join('-').toLowerCase();
` ``;
    }
}
exports.NamingConstruct = NamingConstruct;

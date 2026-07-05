"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingConstruct = void 0;
class NamingConstruct {
    config;
    constructor(config) {
        this.config = config;
    }
    generate(resourceType, suffix) {
        const parts = [
            this.config.vendor,
            this.config.application,
            this.config.environment,
            resourceType
        ];
        if (suffix) {
            parts.push(suffix);
        }
        return parts.join('-').toLowerCase();
    }
}
exports.NamingConstruct = NamingConstruct;

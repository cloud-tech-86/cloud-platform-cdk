"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KmsConstruct = void 0;
const constructs_1 = require("constructs");
const kms = require("aws-cdk-lib/aws-kms");
class KmsConstruct extends constructs_1.Construct {
    key;
    constructor(scope, id, props) {
        super(scope, id);
        this.key = new kms.Key(this, 'Key', {
            enableKeyRotation: true
        });
        new kms.Alias(this, 'Alias', {
            aliasName: props.aliasName,
            targetKey: this.key
        });
    }
}
exports.KmsConstruct = KmsConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zLWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImttcy1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLDJDQUEyQztBQU0zQyxNQUFhLFlBQWEsU0FBUSxzQkFBUztJQUV6QixHQUFHLENBQVU7SUFFN0IsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsS0FBd0I7UUFHeEIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxFQUNKLEtBQUssRUFDTDtZQUNFLGlCQUFpQixFQUFFLElBQUk7U0FDeEIsQ0FDRixDQUFDO1FBRUYsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUNYLElBQUksRUFDSixPQUFPLEVBQ1A7WUFDRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ3BCLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdCRCxvQ0E2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuaW1wb3J0ICogYXMga21zIGZyb20gJ2F3cy1jZGstbGliL2F3cy1rbXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBLbXNDb25zdHJ1Y3RQcm9wcyB7XHJcbiAgYWxpYXNOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBLbXNDb25zdHJ1Y3QgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkga2V5OiBrbXMuS2V5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHNjb3BlOiBDb25zdHJ1Y3QsXHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgcHJvcHM6IEttc0NvbnN0cnVjdFByb3BzXHJcbiAgKSB7XHJcblxyXG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcclxuXHJcbiAgICB0aGlzLmtleSA9IG5ldyBrbXMuS2V5KFxyXG4gICAgICB0aGlzLFxyXG4gICAgICAnS2V5JyxcclxuICAgICAge1xyXG4gICAgICAgIGVuYWJsZUtleVJvdGF0aW9uOiB0cnVlXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbmV3IGttcy5BbGlhcyhcclxuICAgICAgdGhpcyxcclxuICAgICAgJ0FsaWFzJyxcclxuICAgICAge1xyXG4gICAgICAgIGFsaWFzTmFtZTogcHJvcHMuYWxpYXNOYW1lLFxyXG4gICAgICAgIHRhcmdldEtleTogdGhpcy5rZXlcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0iXX0=
define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, tslib_1, decorators_1, Accessor_1) {
    "use strict";
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    var ConfigurationSettings = /** @class */ (function (_super) {
        tslib_1.__extends(ConfigurationSettings, _super);
        function ConfigurationSettings(params) {
            var _this = _super.call(this, params) || this;
            _this.withinConfigurationExperience = window.location !== window.parent.location;
            _this._storageKey = "config-values";
            _this._draft = null;
            _this._draftMode = false;
            _this._draft = params === null || params === void 0 ? void 0 : params.draft;
            _this._draftMode = (params === null || params === void 0 ? void 0 : params.mode) === "draft";
            return _this;
        }
        ConfigurationSettings.prototype.initialize = function () {
            if (this.withinConfigurationExperience || this._draftMode) {
                // Apply any draft properties
                if (this._draft) {
                    Object.assign(this, this._draft);
                }
                window.addEventListener("message", function (e) {
                    this._handleConfigurationUpdates(e);
                }.bind(this), false);
            }
        };
        ConfigurationSettings.prototype._handleConfigurationUpdates = function (e) {
            var _a;
            if (((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type) === "cats-app") {
                Object.assign(this, e.data);
            }
        };
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "webmap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "basemap", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "theme", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "title", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], ConfigurationSettings.prototype, "withinConfigurationExperience", void 0);
        ConfigurationSettings = tslib_1.__decorate([
            decorators_1.subclass("app.ConfigurationSettings")
        ], ConfigurationSettings);
        return ConfigurationSettings;
    }((Accessor_1.default)));
    return ConfigurationSettings;
});
//# sourceMappingURL=ConfigurationSettings.js.map
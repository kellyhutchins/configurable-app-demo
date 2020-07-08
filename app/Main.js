define(["require", "exports", "tslib", "ApplicationBase/support/itemUtils", "ApplicationBase/support/domHelper", "esri/core/Handles", "./ConfigurationSettings", "esri/core/watchUtils"], function (require, exports, tslib_1, itemUtils_1, domHelper_1, Handles_1, ConfigurationSettings_1, watchUtils_1) {
    "use strict";
    Handles_1 = tslib_1.__importDefault(Handles_1);
    ConfigurationSettings_1 = tslib_1.__importDefault(ConfigurationSettings_1);
    var CSS = {
        loading: "configurable-application--loading"
    };
    var MapExample = /** @class */ (function () {
        function MapExample() {
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  ApplicationBase
            //----------------------------------
            this.base = null;
            this._appConfig = null;
            this._handles = null;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        MapExample.prototype.init = function (base) {
            if (!base) {
                console.error("ApplicationBase is not defined");
                return;
            }
            this._handles = new Handles_1.default();
            domHelper_1.setPageLocale(base.locale);
            domHelper_1.setPageDirection(base.direction);
            this.base = base;
            this.createApp();
            document.body.classList.remove(CSS.loading);
        };
        MapExample.prototype.createApp = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _a, config, results, webMapItems, validWebMapItems, item, portalItem, appProxies, viewContainerNode, defaultViewProperties, viewNode, container, viewProperties, map, view, button;
                var _this = this;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.base, config = _a.config, results = _a.results;
                            this._appConfig = new ConfigurationSettings_1.default(config);
                            webMapItems = results.webMapItems;
                            validWebMapItems = webMapItems.map(function (response) {
                                return response.value;
                            });
                            item = validWebMapItems[0];
                            if (!item) {
                                console.error("Could not load an item to display");
                                return [2 /*return*/];
                            }
                            config.title = !config.title ? itemUtils_1.getItemTitle(item) : "";
                            domHelper_1.setPageTitle(config.title);
                            this._handles.add(watchUtils_1.init(this._appConfig, "theme", function () {
                                var theme = _this._appConfig.theme;
                                var style = document.getElementById("esri-stylesheet");
                                style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);
                            }), "configuration");
                            portalItem = this.base.results.applicationItem
                                .value;
                            appProxies = portalItem && portalItem.applicationProxies
                                ? portalItem.applicationProxies
                                : null;
                            viewContainerNode = document.getElementById("viewContainer");
                            defaultViewProperties = itemUtils_1.getConfigViewProperties(config);
                            viewNode = document.createElement("div");
                            viewContainerNode.appendChild(viewNode);
                            container = {
                                container: viewNode
                            };
                            viewProperties = tslib_1.__assign(tslib_1.__assign({}, defaultViewProperties), container);
                            return [4 /*yield*/, itemUtils_1.createMapFromItem({ item: item, appProxies: appProxies })];
                        case 1:
                            map = _b.sent();
                            return [4 /*yield*/, itemUtils_1.createView(tslib_1.__assign(tslib_1.__assign({}, viewProperties), { map: map }))];
                        case 2:
                            view = _b.sent();
                            this._setupUrlParams(view);
                            return [4 /*yield*/, view.when()];
                        case 3:
                            _b.sent();
                            // Add widgets 
                            watchUtils_1.init(this._appConfig, "basemap", function () {
                                _this._addBasemap(_this._appConfig.basemap, view);
                            });
                            button = document.createElement("button");
                            button.innerHTML = "Configuration Test";
                            button.addEventListener("click", function () {
                                _this._appConfig.basemap = !_this._appConfig.basemap;
                                _this._appConfig.theme = _this._appConfig.theme === "dark" ? "light" : "dark";
                            });
                            view.ui.add(button, "top-right");
                            return [2 /*return*/];
                    }
                });
            });
        };
        MapExample.prototype._addBasemap = function (enable, view) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var BasemapToggle, node, bmToggle;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/BasemapToggle"], resolve_1, reject_1); }).then(tslib_1.__importStar)];
                        case 1:
                            BasemapToggle = _a.sent();
                            node = view.ui.find("basemapToggle");
                            // remove node if present and not enabled. 
                            if (!enable)
                                if (node)
                                    view.ui.remove(node);
                            if (enable) {
                                bmToggle = new BasemapToggle.default({
                                    id: "basemapToggle",
                                    view: view,
                                    nextBasemap: "streets-night-vector"
                                });
                                view.ui.add(bmToggle, "top-right");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MapExample.prototype._setupUrlParams = function (view) {
            var _a = this.base.config, find = _a.find, marker = _a.marker;
            itemUtils_1.findQuery(find, view);
            itemUtils_1.goToMarker(marker, view);
        };
        MapExample.prototype._cleanUpHandles = function () {
            // if we aren't in the config experience remove all handlers after load
            if (!this._appConfig.withinConfigurationExperience) {
                this._handles.remove("configuration");
            }
        };
        return MapExample;
    }());
    return MapExample;
});
//# sourceMappingURL=Main.js.map
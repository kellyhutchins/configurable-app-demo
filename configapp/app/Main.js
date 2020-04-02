/*
  Copyright 2017 Esri

  Licensed under the Apache License, Version 2.0 (the "License");

  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software

  distributed under the License is distributed on an "AS IS" BASIS,

  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

  See the License for the specific language governing permissions and

  limitations under the License.​
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "./application-base-js/support/itemUtils", "./application-base-js/support/domHelper", "esri/core/Handles", "./ConfigurationSettings", "esri/core/watchUtils"], function (require, exports, itemUtils_1, domHelper_1, Handles_1, ConfigurationSettings_1, watchUtils_1) {
    "use strict";
    Handles_1 = __importDefault(Handles_1);
    ConfigurationSettings_1 = __importDefault(ConfigurationSettings_1);
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
            return __awaiter(this, void 0, void 0, function () {
                var _a, config, results, webMapItems, validWebMapItems, item, portalItem, appProxies, viewContainerNode, defaultViewProperties, viewNode, container, viewProperties, map, view, button;
                var _this = this;
                return __generator(this, function (_b) {
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
                            viewProperties = __assign(__assign({}, defaultViewProperties), container);
                            return [4 /*yield*/, itemUtils_1.createMapFromItem({ item: item, appProxies: appProxies })];
                        case 1:
                            map = _b.sent();
                            return [4 /*yield*/, itemUtils_1.createView(__assign(__assign({}, viewProperties), { map: map }))];
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
            return __awaiter(this, void 0, void 0, function () {
                var BasemapToggle, node, bmToggle;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve_1, reject_1) { require(["esri/widgets/BasemapToggle"], resolve_1, reject_1); }).then(__importStar)];
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
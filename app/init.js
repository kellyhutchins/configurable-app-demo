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
define(["require", "exports", "tslib", "dojo/text!config/applicationBase.json", "dojo/text!config/application.json", "ApplicationBase/ApplicationBase", "dojo/i18n!./nls/resources", "./Main"], function (require, exports, tslib_1, applicationBase_json_1, application_json_1, ApplicationBase_1, resources_1, Main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    applicationBase_json_1 = tslib_1.__importDefault(applicationBase_json_1);
    application_json_1 = tslib_1.__importDefault(application_json_1);
    ApplicationBase_1 = tslib_1.__importDefault(ApplicationBase_1);
    resources_1 = tslib_1.__importDefault(resources_1);
    Main_1 = tslib_1.__importDefault(Main_1);
    var Main = new Main_1.default();
    new ApplicationBase_1.default({
        config: application_json_1.default,
        settings: applicationBase_json_1.default
    })
        .load()
        .then(function (base) { return Main.init(base); }, function (message) {
        if (message === "identity-manager:not-authorized") {
            document.body.classList.remove("configurable-application--loading");
            document.body.classList.add("app-error");
            document.getElementById("viewContainer").innerHTML = "<h1>" + resources_1.default.licenseError.title + "</h1><p>" + resources_1.default.licenseError.message + "</p>";
        }
    });
});
//# sourceMappingURL=init.js.map
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
import ApplicationBase from 'ApplicationBase/ApplicationBase';
import i18n = require('dojo/i18n!./nls/resources');

const CSS = {
  loading: "configurable-application--loading"
};

import {
  createMapFromItem,
  createView,
  getConfigViewProperties,
  getItemTitle,
  findQuery,
  goToMarker
} from "ApplicationBase/support/itemUtils";

import {
  setPageLocale,
  setPageDirection,
  setPageTitle
} from "ApplicationBase/support/domHelper";
import Handles from "esri/core/Handles";

import ConfigurationSettings from "./ConfigurationSettings";
import { init } from "esri/core/watchUtils";

class MapExample {
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  ApplicationBase
  //----------------------------------
  base: ApplicationBase = null;

  _appConfig: ConfigurationSettings = null;
  _handles: Handles = null;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  public init(base: ApplicationBase): void {
    if (!base) {
      console.error("ApplicationBase is not defined");
      return;
    }
    this._handles = new Handles();
    setPageLocale(base.locale);
    setPageDirection(base.direction);

    this.base = base;
    this.createApp();
    document.body.classList.remove(CSS.loading);

  }
  async createApp() {
    const { config, results } = this.base;
    this._appConfig = new ConfigurationSettings(config);
    const { webMapItems } = results;

    const validWebMapItems = webMapItems.map(response => {
      return response.value;
    });

    const item = validWebMapItems[0];

    if (!item) {
      console.error("Could not load an item to display");
      return;
    }

    config.title = !config.title ? getItemTitle(item) : "";
    setPageTitle(config.title);

    this._handles.add(init(this._appConfig, "theme", () => {
      const theme = this._appConfig.theme;
      const style = document.getElementById("esri-stylesheet") as any;
      style.href = style.href.indexOf("light") !== -1 ? style.href.replace(/light/g, theme) : style.href.replace(/dark/g, theme);

    }), "configuration")
    const portalItem: __esri.PortalItem = this.base.results.applicationItem
      .value;
    const appProxies =
      portalItem && portalItem.applicationProxies
        ? portalItem.applicationProxies
        : null;

    const viewContainerNode = document.getElementById("viewContainer");
    const defaultViewProperties = getConfigViewProperties(config);


    const viewNode = document.createElement("div");
    viewContainerNode.appendChild(viewNode);

    const container = {
      container: viewNode
    };

    const viewProperties = {
      ...defaultViewProperties,
      ...container
    };
    const map = await createMapFromItem({ item, appProxies });

    const view = await createView({ ...viewProperties, map }) as __esri.MapView;
    this._setupUrlParams(view);

    await view.when();

    // Add widgets 
    init(this._appConfig, "basemap", () => {
      this._addBasemap(this._appConfig.basemap, view);
    });


    const button = document.createElement("button");
    button.innerHTML = "Configuration Test";
    button.addEventListener("click", () => {
      this._appConfig.basemap = !this._appConfig.basemap;
      this._appConfig.theme = this._appConfig.theme === "dark" ? "light" : "dark";


    });
    view.ui.add(button, "top-right");
    // Clean up configuration handles if we aren't configuring
    //this._cleanUpHandles();

  }
  async _addBasemap(enable: boolean, view: __esri.MapView) {
    const BasemapToggle = await import("esri/widgets/BasemapToggle");
    const node = view.ui.find("basemapToggle") as __esri.BasemapToggle;
    // remove node if present and not enabled. 
    if (!enable) if (node) view.ui.remove(node);
    if (enable) {
      // add it 
      const bmToggle = new BasemapToggle.default({
        id: "basemapToggle",
        view,
        nextBasemap: "streets-night-vector"
      });
      view.ui.add(bmToggle, "top-right");
    }
  }
  _setupUrlParams(view: __esri.MapView) {
    const { find, marker } = this.base.config;
    findQuery(find, view);
    goToMarker(marker, view);
  }
  _cleanUpHandles() {
    // if we aren't in the config experience remove all handlers after load
    if (!this._appConfig.withinConfigurationExperience) {
      this._handles.remove("configuration");
    }
  }
}

export = MapExample;

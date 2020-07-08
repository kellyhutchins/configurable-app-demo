import {
    declared,
    property,
    subclass
} from "esri/core/accessorSupport/decorators";

import Accessor from "esri/core/Accessor";
import { ApplicationConfig } from "ApplicationBase/interfaces";

@subclass("app.ConfigurationSettings")
class ConfigurationSettings extends (Accessor) {
    @property()
    webmap: string;


    @property()
    basemap: boolean;


    @property()
    theme: string;

    @property()
    title: string;


    @property()
    withinConfigurationExperience: boolean =
        window.location !== window.parent.location;

    _storageKey = "config-values";
    _draft: ApplicationConfig = null;
    _draftMode: boolean = false;
    constructor(params?: ApplicationConfig) {

        super(params);
        this._draft = params?.draft;
        this._draftMode = params?.mode === "draft";
    }
    initialize() {
        if (this.withinConfigurationExperience || this._draftMode) {
            // Apply any draft properties
            if (this._draft) {
                Object.assign(this, this._draft);
            }

            window.addEventListener(
                "message",
                function (e) {
                    this._handleConfigurationUpdates(e);
                }.bind(this),
                false
            );
        }
    }

    _handleConfigurationUpdates(e) {
        if (e?.data?.type === "cats-app") {
            Object.assign(this, e.data);
        }
    }
}
export = ConfigurationSettings;

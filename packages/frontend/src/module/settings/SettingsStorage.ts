import { BaseStorageService } from "module/common/service/BaseStorageService";
import { Settings } from "module/settings/SettingsState";

export const SettingsStorage = new (class extends BaseStorageService<Settings> {
    constructor() {
        super("settings");
    }
})();

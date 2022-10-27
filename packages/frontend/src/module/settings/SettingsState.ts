import { atom } from "recoil";
import { FiatCurrencyType } from "module/wallet/types";
import { SettingsStorage } from "module/settings/SettingsStorage";

export interface Settings {
    currency: FiatCurrencyType;
}

export const initialSettingsState: Settings = SettingsStorage.get() ?? {
    currency: "usd",
};

export const settingsState = atom<Settings>({
    key: "settings",
    default: initialSettingsState,
});

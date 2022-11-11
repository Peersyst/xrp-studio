import { atom } from "recoil";
import { FiatCurrencyType } from "module/wallet/types";
import { SettingsStorage } from "module/settings/SettingsStorage";

export interface Settings {
    fiat: FiatCurrencyType;
}

export const initialSettingsState: Settings = SettingsStorage.get() ?? {
    fiat: "usd",
};

export const settingsState = atom<Settings>({
    key: "settings",
    default: initialSettingsState,
});

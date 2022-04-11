import i18n from "i18n-js";
import en from "./en.json";

export const loadLocalization = (): void => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en,
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = "en";
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
};

export const translate = (key: keyof typeof en, params: Record<string, string> = {}): string => {
    let translation = i18n.t(key);
    for (const param in params) {
        translation = translation.replace(`%${param}%`, params[param]);
    }
    return translation;
};

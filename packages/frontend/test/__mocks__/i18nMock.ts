import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en/en";
import { es } from "./locales/es/es";

export const defaultNS = "translation";
export const resources = {
    en,
    es,
} as const;

i18n.use(initReactI18next).init({
    fallbackLng: "en",
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});

export default i18n;

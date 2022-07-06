import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales/en/en";
import { es } from "./locales/es/es";
import { config } from "config";

export const defaultNS = "translation";

export const resources = {
    en,
    es,
} as const;

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources,
        detection: {
            lookupLocalStorage: config.projectName + "-locale",
        },
    });

export default i18next;

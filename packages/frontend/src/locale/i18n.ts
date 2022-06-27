import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import es from "./locales/es.json";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: true,
        resources: {
            en: {
                translation: en,
            },
            es: {
                translation: es,
            },
        },
        detection: {
            lookupLocalStorage: process.env.REACT_APP_NAME + "-peersyst-locale",
        },
    });

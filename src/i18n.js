import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import translationEN from "../public/locales/eng/translation.json";
import translationKH from "../public/locales/khm/translation.json";

const resources = {
    ENG: {
      translation: translationEN
    },
    KHM: {
      translation: translationKH
    }
  };

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
	debug: false,
	fallbackLng: "ENG",
});

i18n.changeLanguage("ENG");

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJson from "./locales/en.json";
import ptJson from "./locales/pt.json";
import esJson from "./locales/es.json";

export const languagesSupport = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Português - BR",
    value: "pt",
  },
  {
    label: "Español",
    value: "es",
  },
];

export const languageResources = {
  pt: ptJson,
  en: enJson,
  es: esJson,
};

const findLanguageByBrowser = () => {
  const storageLanguage = localStorage.getItem("language");
  if (storageLanguage) {
    return storageLanguage;
  }
  switch (navigator.language) {
    case "pt-BR":
      return "pt";
    case "en-US":
      return "en";
    case "es-ES":
      return "es";
    default:
      return "en";
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: findLanguageByBrowser(),
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  resources: languageResources,
});

export default i18n;

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
    label: "português",
    value: "pt",
  },
  {
    label: "Español",
    value: "es",
  },
];

const resources = {
  en: enJson,
  pt: ptJson,
  es: esJson,
};

const findLanguageByBrowser = () => {
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
  resources,
});

export default i18n;

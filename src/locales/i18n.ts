import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { getLocalStorageItem } from "helpers/storage";
import commonEn from "./en/common.json";
import commonVi from "./vi/common.json";
import authEn from "./en/auth.json";
import authVi from "./vi/auth.json";
import laptopEn from "./en/laptop.json";
import laptopVi from "./vi/laptop.json";

const currentLanguage = getLocalStorageItem("i18nextLng") || "vi";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { common: commonEn, auth: authEn, laptop: laptopEn },
      vi: { common: commonVi, auth: authVi, laptop: laptopVi }
    },
    lng: currentLanguage,
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

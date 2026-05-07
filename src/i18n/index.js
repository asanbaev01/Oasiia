import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ky from "./ky.js";
import ru from "./ru.js";
import en from "./en.js";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ky: { translation: ky },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: localStorage.getItem("oasia-lang") || "ru",      
    fallbackLng: "ru",                                    
    interpolation: { escapeValue: false },
  });

export default i18n;





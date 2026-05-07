import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(() => {
    return localStorage.getItem("oasia-lang") || "ru";  
  });

  const changeLang = (newLang) => {
    localStorage.setItem("oasia-lang", newLang);
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("oasia-lang");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
      setLang(savedLang);
    }
  }, [i18n]);

  return { lang, changeLang };
};
import { useState, useEffect } from 'react';
import i18n from 'i18next';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const languages = [
    { code: 'en', name: 'english' },
    { code: 'hi', name: 'hindi' },
    { code: 'fr', name: 'french' },
    { code: 'es', name: 'spanish' },
    { code: 'ar', name: 'arabic' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem('userLanguage', lng);
  };

  useEffect(() => {
    if (currentLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLanguage]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      if (languages.some(lang => lang.code === browserLanguage)) {
        changeLanguage(browserLanguage);
      }
    }
  }, []);

  return {
    currentLanguage,
    setLanguage: changeLanguage,
    languages,
  };
};
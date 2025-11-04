import { useState, useEffect } from 'react';
import i18n from '../i18n';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const languages = [
    { code: 'en', name: 'english' },
    { code: 'hi', name: 'hindi' },
    { code: 'fr', name: 'french' },
    { code: 'es', name: 'spanish' },
    { code: 'ar', name: 'arabic' },
  ];

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
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
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.split('-')[0];
      if (languages.some(lang => lang.code === browserLanguage)) {
        changeLanguage(browserLanguage);
      }
    }

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return {
    currentLanguage,
    setLanguage: changeLanguage,
    languages,
  };
};
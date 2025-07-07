import React from 'react';

interface LanguageModalProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}

const localeNames = {
  en: 'English',
  fr: 'Français'
} as const;

const LanguageModal: React.FC<LanguageModalProps> = ({ currentLocale, onLanguageChange }) => {
  const oppositeLocale = currentLocale === 'en' ? 'fr' : 'en';
  
  const handleLanguageSwitch = () => {
    onLanguageChange(oppositeLocale);
  };

  const getFlagSrc = (locale: string) => `/img/icons/langs/flag-${locale}.webp`;

  return (
    <section className="absolute bottom-10 right-5 md:right-12 w-21 rounded-t-md overflow-hidden bg-window-blue-deactivated p-0.5">
      <div className="absolute top-0 left-0 h-7 w-full z-10 flex items-center px-1.5 bg-header-window-active">
        <img 
          src={getFlagSrc(currentLocale)} 
          alt="Language flag" 
          className="w-4 h-3 mr-1" 
        />
        <h4 className="text-header-window text-header-shadow truncate">
          {currentLocale === 'en' ? 'Language' : 'Langue'}
        </h4>
      </div>
      <div className="bg-light-yellow h-12 mt-3 pr-1">
        <div className="h-full w-full flex items-center px-2 pt-3">
          <div 
            onClick={handleLanguageSwitch} 
            className="flex items-center cursor-pointer"
          >
            <img 
              src={getFlagSrc(oppositeLocale)} 
              alt={oppositeLocale} 
              className="w-5 h-4 mr-1 cursor-pointer"
            />
            <span className="text-black text-xs font-trebuchet-pixel pr-4 cursor-pointer">
              {localeNames[oppositeLocale as keyof typeof localeNames]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguageModal;

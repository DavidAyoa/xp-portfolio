import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { currentLanguage, setLanguage, languages } = useLanguage();

  return (
    <div className="relative group">
      <button 
        className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="text-sm">{t('language')}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm ${
              currentLanguage === lang.code 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {t(lang.name)}
            {currentLanguage === lang.code && (
              <span className="ml-2">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

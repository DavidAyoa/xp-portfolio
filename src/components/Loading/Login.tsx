import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import ContentCenter from '../../layouts/ContentCenter';
import { useLanguage } from '../../hooks/useLanguage';

interface LocaleNames {
  [key: string]: string;
}

const localeNames: LocaleNames = {
  en: 'English',
  fr: 'Français',
  hi: 'हिंदी',
  es: 'Español',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語'
};

const Login = () => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentLanguage, setLanguage, languages } = useLanguage();

  const flagSrc = `/img/icons/langs/flag-${currentLanguage}.webp`;
  const availableLocales = languages.map(lang => lang.code);
  const filteredLocales = availableLocales.filter(l => l !== currentLanguage);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLocaleChange = (newLocale: string) => {
    setLanguage(newLocale);
    setDropdownOpen(false);
  };

  return (
    <ContentCenter className="bg-color-load-blue radial-gradient-loading">
      <div slot="top" className="absolute bg-color-load-header-blue w-full md:h-32 h-1/6 top-0 down-stroke-white-2" />

      <div slot="center" className="w-full">
        <div className="flex w-full">
          <div className="md:flex hidden justify-end items-center w-1/2">
            <div>
              <div className="flex justify-end w-full">
                <div className="w-2/3">
                  <img src="/img/logo-portfolio-white.png" alt="Logo" className="mb-3" />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="w-10/12 mr-12">
                  <h2 className="text-white text-lg text-right font-franklin-gothic">
                    To begin, please log in
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="w-px h-96 line-loading-gradient mx-3 md:flex hidden"></div>
          <LoginForm />
        </div>
      </div>


      <div slot="bottom" className="absolute bg-color-load-header-blue w-full md:h-48 h-1/5 bottom-0 up-stroke-green-2">
        <div className="flex justify-center items-center h-full">
          <div className="app-container">
            <div className="flex justify-between items-center md:gap-8 gap-8">
              <div className="relative inline-block text-left text-white md:text-xl text-sm">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleDropdown}
                  onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
                  className="flex items-center md:gap-3 gap-2 cursor-pointer focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  aria-label={t('selectLanguage')}
                >
                  <img
                    src={flagSrc}
                    alt={t('currentLanguage', { language: localeNames[currentLanguage] })}
                    className="md:w-12 w-9"
                  />
                  <span className="inline-flex items-center font-franklin">
                    {localeNames[currentLanguage]}
                    <svg className="mr-1 md:ml-2 md:h-5 md:w-5 h-3 w-3 ml-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="origin-bottom-right absolute md:-right-14 -right-9 w-full top-[-220px] overflow-hidden">
                    <div 
                      role="menu" 
                      aria-orientation="vertical" 
                      aria-labelledby="language-menu-button"
                      className="bg-white shadow-lg rounded-md overflow-hidden"
                      id="language-menu"
                    >
                      {filteredLocales.map((locale) => (
                        <button
                          key={locale}
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => handleLocaleChange(locale)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleLocaleChange(locale);
                            }
                          }}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                        >
                          {localeNames[locale]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex text-white md:text-sm text-xs font-bold md:mr-10 md:w-2/6">
                <h4>Explainer text goes here</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentCenter>
  );
};

export default Login;

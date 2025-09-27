import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import ContentCenter from '../layouts/ContentCenter';
import { useLanguage } from '../hooks/useLanguage';

interface LocaleNames {
  [key: string]: string;
}

const localeNames: LocaleNames = {
  en: 'English',
  hi: 'हिंदी',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية'
};

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentLanguage, setLanguage, languages } = useLanguage();

  const getFlagSrc = (lang: string) => {
    return `/img/icons/langs/flag-${lang}.ico`;
  };

  const flagSrc = getFlagSrc(currentLanguage);
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
                  <img src="/img/codepoets-xp-logo-white-text.svg" alt="Logo" className="mb-3" />
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="w-10/12 mr-12">
                  <h2 className="text-white text-lg text-right font-franklin-gothic">
                    {t('loginInstructions')}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="w-px h-96 line-loading-gradient mx-3 md:flex hidden"></div>
          <LoginForm onLogin={onLogin} />
        </div>
      </div>


      <div slot="bottom" className="absolute bg-color-load-header-blue w-full md:h-48 h-1/5 bottom-0 up-stroke-green-2">
        <div className="flex justify-center items-center h-full">
          <div className="app-container">
            <div className="flex justify-between items-center md:gap-8 gap-8">
              <div className="relative inline-block text-left text-white text-sm md:text-base">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleDropdown}
                  onKeyDown={(e) => e.key === 'Enter' && toggleDropdown()}
                  className="flex items-center gap-2 md:gap-3 cursor-pointer focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen ? 'true' : 'false'}
                  aria-label={t('selectLanguage')}
                >
                  <img
                    src={flagSrc}
                    alt={t('currentLanguage', { language: localeNames[currentLanguage] })}
                    className="w-6 h-5 md:w-8 md:h-6"
                  />
                  <span className="inline-flex items-center font-franklin text-sm md:text-base">
                    {localeNames[currentLanguage]}
                    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-auto min-w-36">
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="language-menu-button"
                      className="bg-black bg-opacity-80 rounded-md overflow-hidden shadow-lg"
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
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-blue-600 hover:bg-opacity-80 focus:outline-none focus:bg-blue-600 focus:bg-opacity-80 transition-colors"
                        >
                          <img
                            src={getFlagSrc(locale)}
                            alt={`${localeNames[locale]} flag`}
                            className="w-5 h-4"
                          />
                          <span className="text-sm">{localeNames[locale]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex text-white md:text-sm text-xs font-bold md:mr-10 md:w-2/6">
                <h4 className="font-trebuchet">{t('codepoetsDescription')}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentCenter>
  );
};

export default Login;
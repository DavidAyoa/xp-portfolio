import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { logger } from '../utils/logger';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

interface User {
  name: string;
  displayName: string;
  avatar?: string;
  isAdmin?: boolean;
}

const users: User[] = [
  {
    name: 'codepoets',
    displayName: 'CodePoets',
    avatar: '/img/codepoets-logo-light.png',
    isAdmin: true
  },
  {
    name: 'guest',
    displayName: 'Guest',
    isAdmin: false
  }
];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { t, i18n } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  React.useEffect(() => {
    const img = new Image();
    img.src = '/img/codepoets-logo-light.png';
    img.onload = () => setImagesLoaded(true);
  }, []);

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
    
    setTimeout(() => onLogin(username), 500);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#245fdc] via-[#1e5a96] to-[#0f4c85] flex flex-col">

      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex gap-2">
        {[
          { code: 'en', flag: 'flag-en.ico' },
          { code: 'hi', flag: 'flag-hi.ico' },
          { code: 'fr', flag: 'flag-fr.ico' },
          { code: 'es', flag: 'flag-es.ico' },
          { code: 'ar', flag: 'flag-ar.ico' }
        ].map(({ code, flag }) => (
          <button
            key={code}
            onClick={() => changeLanguage(code)}
            className={`w-8 h-6 rounded-sm border-2 transition-all duration-200 hover:scale-110 ${
              i18n.language === code
                ? 'border-white shadow-lg'
                : 'border-gray-400 hover:border-white'
            }`}
          >
            <img
              src={`/img/icons/langs/${flag}`}
              alt={code}
              className="w-full h-full object-cover rounded-xs"
            />
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="text-center pt-16 pb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          {t('login.title')}
        </h1>
        <p className="text-lg text-gray-200">
          {t('login.subtitle')}
        </p>
      </div>

      {/* User Selection */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex gap-8">
          {users.filter(user => user.name !== 'guest').map((user) => (
            <div
              key={user.name}
              onClick={() => handleUserSelect(user.name)}
              className={clsx(
                'relative bg-white/10 backdrop-blur-sm rounded-lg p-6 cursor-pointer transition-all duration-300',
                'hover:scale-105 hover:bg-white/20 border-2 flex flex-col',
                selectedUser === user.name
                  ? 'border-white shadow-2xl bg-white/25'
                  : 'border-transparent hover:border-white/50'
              )}
            >
              {/* User Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                {user.avatar ? (
                  <div className="w-16 h-16">
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className={clsx(
                        'w-full h-full object-contain transition-opacity duration-100',
                        imagesLoaded ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.displayName[0]}
                  </div>
                )}
              </div>

              {/* User Name */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg mb-1 tracking-normal">
                  {user.displayName}
                </h3>
                {user.isAdmin && (
                  <p className="text-gray-300 text-sm">
                    {t('login.admin')}
                  </p>
                )}
              </div>

              {/* Selection Indicator */}
              {selectedUser === user.name && (
                <div className="absolute inset-0 border-2 border-white rounded-lg animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pb-8 flex justify-between items-center px-8">
        <button
          onClick={() => logger.log('Turn off computer')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded border border-red-500 transition-colors duration-200 flex items-center gap-2"
        >
          <span className="text-sm">🔌</span>
          {t('login.turn_off')}
        </button>

        <div className="text-center text-gray-300 text-sm">
          <p>© CodePoets • Powered by Windows XP</p>
        </div>
      </div>
    </div>
  );
}
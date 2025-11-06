import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logger } from '../utils/logger';

interface LoginFormProps {
  onLogin: (profileType: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useTranslation();

  const handleLogin = () => {
    // Play Windows XP login sound
    const audio = new Audio('/sounds/start-windows.mp3');
    audio.play().catch(logger.error);

    onLogin('guest');
  };

  return (
    <div className="flex items-center">
      <div className="absolute md:w-7/12 w-screen flex flex-col gap-3">
        {/* Mobile version */}
        <div
          onClick={handleLogin}
          className="md:hidden h-24 w-full rounded-xl flex items-center py-3 px-6 cursor-pointer bg-color-login-blue"
        >
          <div className="w-full flex items-center text-white gap-3 relative outline-none">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/img/guest.JPG" alt="Guest" className="w-16 h-16 object-cover rounded-md border-2 border-yellow-400 shadow-[0_0_0_1px_black]" />
            </div>
            <div>
              <h2 className="font-orbitron font-semibold text-lg">{t('guest')}</h2>
              <p className="text-xs opacity-75 mt-0.5">{t('visitorAccess')}</p>
            </div>
          </div>
        </div>

        {/* Desktop version */}
        <div
          onClick={handleLogin}
          className="hidden md:flex h-24 w-full rounded-xl items-center py-3 px-6 cursor-pointer transition-all duration-200 hover:bg-color-login-blue hover:stroke-white-1"
        >
          <div className="w-full flex items-center text-white gap-4 relative outline-none">
            <div className="w-16 h-16 flex-shrink-0">
              <img src="/img/guest.JPG" alt="Guest" className="w-16 h-16 object-cover rounded-md border-2 border-yellow-400 shadow-[0_0_0_1px_black]" />
            </div>
            <div>
              <h2 className="font-orbitron font-semibold text-2xl">{t('guest')}</h2>
              <p className="text-sm opacity-75 mt-1">{t('visitorAccess')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
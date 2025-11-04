import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onLogin: (profileType: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useTranslation();

  const handleLogin = () => {
    // Play Windows XP login sound
    const audio = new Audio('/audio/windows-login.wav');
    audio.play().catch(console.error);

    onLogin('guest');
  };

  return (
    <div className="flex items-center">
      <div className="absolute md:w-7/12 w-screen flex flex-col gap-3">
        <div
          onClick={handleLogin}
          className="h-24 w-full rounded-xl flex items-center py-3 px-6 cursor-pointer transition-all duration-200 bg-color-login-blue stroke-white-1 md:!bg-transparent md:!stroke-0 hover:bg-color-login-blue hover:stroke-white-1"
        >
          <div className="w-full flex items-center text-white gap-4 relative outline-none">
            <div className="w-16 h-16 hidden md:block">
              <img src="/img/guest.JPG" alt="Guest" className="w-full h-full object-cover rounded-md border-2 border-yellow-400 shadow-[0_0_0_1px_black]" />
            </div>
            <div>
              <h2 className="font-orbitron font-semibold text-xl md:text-2xl">{t('guest')}</h2>
              <p className="text-sm opacity-75 mt-1">{t('visitorAccess')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
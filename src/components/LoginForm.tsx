import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onLogin: (profileType: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleLogin = () => {
    // Play Windows XP login sound
    const audio = new Audio('/audio/windows-login.wav');
    audio.play().catch(console.error);

    onLogin(selectedProfile || 'team');
  };

  const handleProfileClick = (profileType: string) => {
    setSelectedProfile(profileType);
  };

  return (
    <div className="flex items-center">
      <div className="absolute md:w-7/12 w-screen flex flex-col gap-3">
        <div
          onClick={() => handleProfileClick('team')}
          onDoubleClick={handleLogin}
          onMouseEnter={() => setHoveredProfile('team')}
          onMouseLeave={() => setHoveredProfile(null)}
          className={`h-32 w-full rounded-xl flex items-center py-6 px-6 cursor-pointer transition-all duration-200 ${
            hoveredProfile === 'team' || selectedProfile === 'team' ? 'bg-color-login-blue stroke-white-1' : ''
          }`}
        >
          <div className="w-full flex items-center text-white gap-4 relative outline-none">
            <div>
              <img src="/img/codepoets-logo-light.png" alt="Team" className="w-16 h-16 rounded-md border-2 border-yellow-400 shadow-[0_0_0_1px_black]" />
            </div>
            <div>
              <h2 className="font-orbitron font-semibold tracking-wider text-xl md:text-2xl">{t('team')}</h2>
              <p className="text-sm opacity-75 mt-1">{t('internalAccess')}</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => handleProfileClick('guest')}
          onDoubleClick={handleLogin}
          onMouseEnter={() => setHoveredProfile('guest')}
          onMouseLeave={() => setHoveredProfile(null)}
          className={`h-32 w-full rounded-xl flex items-center py-6 px-6 cursor-pointer transition-all duration-200 ${
            hoveredProfile === 'guest' || selectedProfile === 'guest' ? 'bg-color-login-blue stroke-white-1' : ''
          }`}
        >
          <div className="w-full flex items-center text-white gap-4 relative outline-none">
            <div>
              <img src="/img/guest.JPG" alt="Guest" className="w-16 h-16 rounded-md border-2 border-yellow-400 shadow-[0_0_0_1px_black]" />
            </div>
            <div>
              <h2 className="font-orbitron font-semibold tracking-wider text-xl md:text-2xl">{t('guest')}</h2>
              <p className="text-sm opacity-75 mt-1">{t('visitorAccess')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
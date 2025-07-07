import React from 'react';
import { useNavigate } from 'react-router';
import useConnection from '../../hooks/useConnection';
import type { ButtonProps } from './types';

export const HeaderDisconnect: React.FC<ButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { disconnect } = useConnection();

  const handleDisconnect = (e: React.MouseEvent) => {
    e.preventDefault();
    disconnect();
    navigate('/');
  };

  return (
    <button 
      onClick={handleDisconnect}
      className={`flex text-white text-xs h-full items-center buttons-header-bottom px-1 full-screen ${className}`}
    >
      <img 
        src="/img/icons/key-log-icon.webp" 
        alt="Disconnect" 
        className="w-6 h-6 sm:w-7 sm:h-7 mr-0.5 sm:mr-1" 
      />
      <p className="small-p">Log Off</p>
    </button>
  );
};

export default HeaderDisconnect;

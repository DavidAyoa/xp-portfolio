import React from 'react';
import { useNavigate } from 'react-router';
import useConnection from '../../hooks/useConnection';
import type { ButtonProps } from './types';

export const HeaderShutdown: React.FC<ButtonProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { restart } = useConnection();

  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    restart();
    navigate('/');
  };

  return (
    <button 
      onClick={handleRestart}
      className={`flex text-white text-xs h-full items-center buttons-header-bottom px-1 full-screen ${className}`}
    >
      <img 
        src="/img/icons/shutdown-icon.webp" 
        alt="Shutdown" 
        className="w-6 h-6 sm:w-7 sm:h-7 mr-0.5 sm:mr-1" 
      />
      <p className="small-p">Turn Off Computer</p>
    </button>
  );
};

export default HeaderShutdown;

import React from 'react';
import { type ButtonProps } from './types';
import WindowsIcon from '../Icons/WindowsIcon';

export const StartButton: React.FC<ButtonProps> = ({ 
  onClick, 
  className = '',
  children = 'start'
}) => {
  return (
    <button 
      onClick={onClick}
      className={`text-white font-franklin italic text-lg h-8 select-none cursor-pointer start-button ${className}`}
    >
      <div className="flex items-center gap-px pr-5 pl-2 h-8 text-lg font-bold">
        <WindowsIcon />
        <span style={{ verticalAlign: 'inherit' }}>{children}</span>
      </div>
    </button>
  );
};

export default StartButton;

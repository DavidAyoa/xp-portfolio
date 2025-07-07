import React, { type ReactNode } from 'react';
import { type ButtonProps } from './types';

interface WindowDropdownProps extends ButtonProps {
  children: ReactNode;
}

const WindowDropdown: React.FC<WindowDropdownProps> = ({ 
  children, 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`h-full small-p hover:bg-dropdown hover:text-white px-1.5 flex items-center cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default WindowDropdown;

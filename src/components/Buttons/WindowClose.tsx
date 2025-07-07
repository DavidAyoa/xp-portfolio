import React from 'react';
import type { ButtonProps } from './types';

const WindowClose: React.FC<ButtonProps> = ({ 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        close-button 
        flex
        justify-center
        items-center
        relative 
        button-window-global-layout 
        border border-white 
        h-full 
        ${className}
      `}
      {...props}
    />
  );
};

export default WindowClose;

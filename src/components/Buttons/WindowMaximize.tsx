import React, { useState } from 'react';
import type { ButtonProps } from './types';

const WindowMaximize: React.FC<ButtonProps> = ({ 
  onClick,
  className = '',
  ...props 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(!isClicked);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        maximize-button
        relative 
        button-window-global-layout 
        border border-white 
        h-full 
        hover:brightness-125 
        active:brightness-90 
        before:absolute 
        before:block 
        before:left-1 
        before:top-1 
        cursor-pointer
        [boxShadow:rgb(70,70,255)_0px_-1px_2px_1px_inset]
        [backgroundImage:radial-gradient(circle_at_90%_90%,_rgb(0,84,233)_0%,_rgb(34,99,213)_55%,_rgb(68,121,228)_70%,_rgb(163,187,236)_90%,_white_100%)]
        ${className}
      `}
      {...props}
    >
    </button>
  );
};

export default WindowMaximize;

import React from 'react';
import type { ButtonProps } from './types';

const WindowMinimize: React.FC<ButtonProps> = ({ 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <button
      onClick={onClick}
      className='minimize-button relative button-window-global-layout border border-white h-full w-6 before:bottom-1 before:left-1 before:absolute active:brightness-90 before:bg-white before:w-2 hover:brightness-125 cursor-pointer'
      onMouseDown={(e) => {
        e.stopPropagation();
        e.currentTarget.style.border = '1px solid #85898d';
        e.currentTarget.style.borderRightColor = '#fff';
        e.currentTarget.style.borderBottomColor = '#fff';
        e.currentTarget.style.boxShadow = 'inset 1px 1px 0 0 #c2c6ca';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.border = '1px solid #fff';
        e.currentTarget.style.borderRightColor = '#85898d';
        e.currentTarget.style.borderBottomColor = '#85898d';
        e.currentTarget.style.boxShadow = 'inset -1px -1px 0 0 #c2c6ca';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid #fff';
        e.currentTarget.style.borderRightColor = '#85898d';
        e.currentTarget.style.borderBottomColor = '#85898d';
        e.currentTarget.style.boxShadow = 'inset -1px -1px 0 0 #c2c6ca';
      }}
      {...props}
    />
  );
};

export default WindowMinimize;

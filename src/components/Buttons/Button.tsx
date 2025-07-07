import React from 'react';
import type { ReactNode } from 'react';

interface ButtonProps {
  message?: string;
  isLoading?: boolean;
  href?: string;
  blank?: boolean;
  layout?: 'small' | 'default';
  children?: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  message,
  isLoading = false,
  href,
  blank = false,
  layout = 'default',
  children,
  onClick,
  className = ''
}) => {
  const handleClick = (event: React.MouseEvent) => {
    if (!href && onClick) {
      event.preventDefault();
      onClick(event);
    }
  };

  const baseClasses = 'inline-flex items-center text-xs border border-twilight-blue bg-button-submit rounded-sm leading-none font-trebuchet-pixel text-black';
  
  const sizeClasses = layout === 'small' 
    ? 'px-1.5 py-0.5 min-h-6 text-xxs' 
    : 'px-5 py-0.5 min-h-6';
    
  const hoverClasses = 'hover:shadow-button-submit-hover';
  const activeClasses = 'active:bg-button-clicked';
  const cursorClasses = isLoading ? 'cursor-wait' : 'cursor-default';
  
  const buttonClasses = `${baseClasses} ${sizeClasses} ${hoverClasses} ${activeClasses} ${cursorClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={blank ? '_blank' : undefined}
        rel={blank ? 'noopener noreferrer' : undefined}
        className={buttonClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={buttonClasses}
    >
      {isLoading ? (message || 'Loading...') : children}
    </button>
  );
};

export default Button;
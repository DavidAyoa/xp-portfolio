import React, { type ReactNode } from 'react';

interface HeaderLeftButtonProps {
  buttonName: string;
  onToggleButton?: (name: string) => void;
  children: {
    img: ReactNode;
    title: ReactNode;
    subtitle: ReactNode;
  };
  className?: string;
}

export const HeaderLeftButton: React.FC<HeaderLeftButtonProps> = ({
  buttonName,
  onToggleButton,
  children,
  className = ''
}) => {
  const handleClick = () => {
    if (onToggleButton) {
      onToggleButton(buttonName);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`flex w-full h-10 items-center gap-1.5 px-0.5 component-style hover:text-white cursor-pointer ${className}`}
    >
      <div className="w-7 h-7 md:w-9 md:h-9">
        {children.img}
      </div>
      <div className="text-left">
        <h3 className="font-verdana font-semibold text-xs">
          {children.title}
        </h3>
        <p className="small-p text-gray-400 group-hover:text-white">
          {children.subtitle}
        </p>
      </div>
    </button>
  );
};

export default HeaderLeftButton;

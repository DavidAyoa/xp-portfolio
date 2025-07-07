import React from 'react';
import WindowDropdown from '../Buttons/WindowDropdown';

interface WindowHeaderDropdownProps {
  dropdownItems: string[];
  windowsHeaderLogo?: boolean;
}

const WindowHeaderDropdown: React.FC<WindowHeaderDropdownProps> = ({
  dropdownItems = [],
  windowsHeaderLogo = true
}) => {
  if (dropdownItems.length === 0) {
    return null;
  }

  return (
    <div className="relative top-0 w-full h-6 mt-6 bg-window-white flex justify-between">
      <div className="w-full h-full px-0.5 pt-0.5 pb-px flex items-center border-window-header-right border-window-header-bot">
        {dropdownItems.map((item, index) => (
          <WindowDropdown key={index}>
            {item}
          </WindowDropdown>
        ))}
      </div>
      {windowsHeaderLogo && (
        <div className="flex items-center h-6 w-10">
          <img 
            src="/img/icons/windows-header-window-icon.webp" 
            alt="Windows icon" 
            className="h-full pt-0.5 border-window-header-bot" 
          />
        </div>
      )}
    </div>
  );
};

export default WindowHeaderDropdown;

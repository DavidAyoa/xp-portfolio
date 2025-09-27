import React, { useState, useEffect } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  type?: 'desktop' | 'icon';
  iconId?: string;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onRefresh, type = 'desktop', iconId }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.context-menu')) {
        onClose();
      }
    };

    // Use mousedown for immediate response
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleRefresh = () => {
    onRefresh();
    onClose();
  };

  const desktopMenuItems = [
    { label: 'Arrange Icons by', hasSubmenu: true, submenu: ['Name', 'Size', 'Type', 'Modified'] },
    { label: 'Refresh', action: handleRefresh },
    { label: 'separator' },
    { label: 'Paste', disabled: true },
    { label: 'Paste Shortcut', disabled: true },
    { label: 'separator' },
    { label: 'New', hasSubmenu: true, submenu: ['Folder', 'Shortcut', 'Microsoft Word Document', 'Text Document'] },
    { label: 'separator' },
    { label: 'Properties', action: onClose }
  ];

  const iconMenuItems = [
    { label: 'Open', action: onClose },
    { label: 'separator' },
    { label: 'Cut', disabled: true },
    { label: 'Copy', disabled: true },
    { label: 'separator' },
    { label: 'Create Shortcut', action: onClose },
    { label: 'Delete', action: onClose },
    { label: 'Rename', action: onClose },
    { label: 'separator' },
    { label: 'Properties', action: onClose }
  ];

  const menuItems = type === 'icon' ? iconMenuItems : desktopMenuItems;

  return (
    <div
      className="absolute bg-white font-tahoma z-50 border border-gray-400"
      style={{
        left: x,
        top: y,
        minWidth: '160px',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {menuItems.map((item, index) => {
        if (item.label === 'separator') {
          return (
            <div
              key={index}
              style={{
                height: '1px',
                backgroundColor: '#C0C0C0',
                margin: '2px 4px'
              }}
            />
          );
        }

        return (
          <div key={index} className="relative">
            <div
              className={`px-4 py-1 cursor-pointer text-xs flex items-center justify-between ${
                item.disabled ? 'text-gray-400' : 'text-black'
              }`}
              style={{
                fontSize: '11px',
                backgroundColor: hoveredItem === item.label ? '#316AC5' : 'transparent',
                color: hoveredItem === item.label ? 'white' : (item.disabled ? '#808080' : 'black')
              }}
              onClick={item.disabled ? undefined : item.action}
              onMouseEnter={() => !item.disabled && setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span>{item.label}</span>
              {item.hasSubmenu && (
                <span style={{ fontSize: '8px' }}>▶</span>
              )}
            </div>

            {/* Submenu */}
            {item.hasSubmenu && hoveredItem === item.label && (
              <div
                className="absolute bg-white border border-gray-400 font-tahoma z-50"
                style={{
                  left: '100%',
                  top: '0',
                  minWidth: '140px',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
                }}
              >
                {item.submenu?.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="px-4 py-1 cursor-pointer text-black text-xs hover:bg-blue-600 hover:text-white"
                    style={{ fontSize: '11px' }}
                    onClick={onClose}
                  >
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
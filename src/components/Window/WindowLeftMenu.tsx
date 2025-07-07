import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import leftMenuData from '../../data/left-menu-data.json';

interface SubTask {
  id: number;
  subtitle: {
    [key: string]: string;
  };
  iconUrl: string;
}

interface MenuItem {
  id: number;
  title: {
    [key: string]: string;
  };
  bgColor: string;
  iconHeader?: string;
  bgImage?: string;
  headerActive?: boolean;
  subtasks?: SubTask[];
  iconSrc?: string;
}

interface LeftMenuData {
  leftMenuItems: {
    [key: string]: MenuItem[];
  };
}

interface WindowLeftMenuProps {
  leftMenuType: string;
}

const WindowLeftMenu: React.FC<WindowLeftMenuProps> = ({ leftMenuType }) => {
  const { i18n } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [activeSubtask, setActiveSubtask] = useState<number | null>(null);

  const currentLocale = i18n.language;
  const menuItems = (leftMenuData as LeftMenuData).leftMenuItems[leftMenuType] || [];

  const getLocalizedTitle = (item: MenuItem): string => {
    return item.title[currentLocale] || item.title['fr'] || '';
  };

  const getLocalizedSubtitle = (subtask: SubTask): string => {
    return subtask.subtitle[currentLocale] || subtask.subtitle['fr'] || '';
  };

  const toggleItem = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubtaskClick = (id: number) => {
    setActiveSubtask(id === activeSubtask ? null : id);
  };

  return (
    <div className="flex flex-col flex-shrink-0 gap-3 bg-window-side-menu w-32 md:w-12.125 h-full p-2.5 overflow-hidden z-20">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`text-twilight-blue rounded-t-sm ${
            item.iconHeader ? 'mt-1 md:mt-2' : ''
          } ${item.bgColor} ${
            item.bgImage ? 'bg-no-repeat bg-16 bg-bottom-right-picture-menu' : ''
          }`}
          style={item.bgImage ? { backgroundImage: `url(${item.bgImage})` } : {}}
        >
          {item.iconHeader && (
            <>
              <img 
                src={item.iconHeader} 
                alt={getLocalizedTitle(item)} 
                className="absolute w-5 h-5 md:w-7 md:h-7 top-3 md:top-2.5" 
              />
              <div 
                className={`flex flex-row justify-between items-center bg-window-menu-card-header rounded-t-sm px-1 py-px sm:px-2 sm:py-0.5 text-xs-mobile md:text-xs font-bold cursor-pointer hover:text-heroic-blue ${
                  item.headerActive ? 'bg-window-menu-card-header-active text-white hover:text-white' : ''
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <span className="truncate">{getLocalizedTitle(item)}</span>
                <span className="ml-2">{expandedItems[item.id] ? '−' : '+'}</span>
              </div>
            </>
          )}

          {item.subtasks && expandedItems[item.id] && (
            <div className="bg-window-menu-card-body rounded-b-sm p-1.5">
              {item.subtasks.map((subtask) => (
                <div 
                  key={subtask.id}
                  className={`flex items-center p-1 mb-1 rounded-sm cursor-pointer ${
                    activeSubtask === subtask.id ? 'bg-window-menu-subtask-active' : 'hover:bg-window-menu-subtask-hover'
                  }`}
                  onClick={() => handleSubtaskClick(subtask.id)}
                >
                  <img 
                    src={subtask.iconUrl} 
                    alt={getLocalizedSubtitle(subtask)} 
                    className="w-5 h-5 mr-2" 
                  />
                  <span className="text-xs truncate">
                    {getLocalizedSubtitle(subtask)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WindowLeftMenu;

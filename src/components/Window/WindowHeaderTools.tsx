import React from 'react';
import { useTranslation } from 'react-i18next';
import useGoBack from '../../hooks/useGoBack';
import headerToolsData from '../../data/header-tools-data.json';

interface HeaderToolItem {
  type: string;
  hasBackAndForward?: boolean;
  items?: Array<{
    icon: string;
    alt: string;
    text?: string;
    hasArrow?: boolean;
    iconClass?: string;
    class?: string;
  }>;
  class?: string;
}

interface WindowHeaderToolsProps {
  id: string;
  headerToolsId: string;
}

const WindowHeaderTools: React.FC<WindowHeaderToolsProps> = ({ id, headerToolsId }) => {
  const { t } = useTranslation();
  const { 
    currentActiveProject, 
    currentActiveDocument, 
    // setActiveProject, 
    // setActiveDocument, 
    clearActiveProject, 
    clearActiveDocument 
  } = useGoBack();

  const goBack = () => {
    if (id === 'myProjects') {
      clearActiveProject();
    } else if (id === 'documents') {
      clearActiveDocument();
    }
  };

  const isGoBackAvailable = () => {
    if (id === 'myProjects') {
      return !!currentActiveProject;
    } else if (id === 'documents') {
      return !!currentActiveDocument;
    }
    return false;
  };

  const headerTools = React.useMemo(() => {
    return headerToolsData.headerToolsItems[headerToolsId as keyof typeof headerToolsData.headerToolsItems];
  }, [headerToolsId]);

  const renderToolItem = (tool: HeaderToolItem, index: number) => {
    if (tool.type === 'group') {
      return (
        <div key={index} className="flex items-center">
          {tool.hasBackAndForward && (
            <div className="flex items-center pl-1">
              <div
                onClick={isGoBackAvailable() ? goBack : undefined}
                className={`flex items-center border rounded-sm pr-1.5 h-8 ${
                  isGoBackAvailable()
                    ? 'bg-transparent cursor-pointer hover:border-gray-300 hover:shadow-header-tools'
                    : 'filter grayscale'
                }`}
              >
                <img 
                  src="/img/icons/windows-header-tools/right-arrow-green-icon.webp" 
                  alt={`${t('common.icon')} ${t('common.back')}`} 
                  className="w-7 h-7 shrink-0" 
                />
                <p className="small-p mr-2">{t('common.back')}</p>
                <div className="block border-solid down-arrow"></div>
              </div>
              <div className="flex items-center mr-1 filter grayscale">
                <img 
                  src="/img/icons/windows-header-tools/left-arrow-green-icon.webp" 
                  alt={`${t('common.icon')} ${t('common.next')}`} 
                  className="w-7 h-7 shrink-0" 
                />
                <div className="block border-solid down-arrow ml-px"></div>
              </div>
            </div>
          )}
          {tool.items?.map((item, itemIndex) => (
            <div key={itemIndex} className={item.class}>
              <img 
                src={item.icon} 
                alt={`${t('common.icon')} ${t(item.alt)}`} 
                className={item.iconClass || 'w-6 h-6 shrink-0'} 
              />
              {item.text && (
                <p className="hidden md:block small-p ml-1 mr-0.5">
                  {t(item.text)}
                </p>
              )}
              {item.hasArrow && <div className="block border-solid down-arrow ml-1"></div>}
            </div>
          ))}
        </div>
      );
    } else if (tool.type === 'separator') {
      return <div key={index} className={tool.class}></div>;
    }
    return null;
  };

  return (
    <div className="flex relative top-0 w-full h-9 bg-window-white border-top-grey overflow-hidden">
      {Array.isArray(headerTools) && headerTools.map((tool: HeaderToolItem, index: number) => (
        <div key={index} className="flex items-center h-full min-w-max">
          {renderToolItem(tool, index)}
        </div>
      ))}
    </div>
  );
};

export default WindowHeaderTools;

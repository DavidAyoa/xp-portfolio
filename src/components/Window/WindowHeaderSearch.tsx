import React from 'react';
import { useTranslation } from 'react-i18next';
import useGoBack from '../../hooks/useGoBack';

interface WindowHeaderSearchProps {
  id: string;
  title: string;
  iconSrc: string;
  isSearchVisible: boolean;
}

const WindowHeaderSearch: React.FC<WindowHeaderSearchProps> = ({
  id,
  title: propTitle,
  iconSrc,
  isSearchVisible
}) => {
  const { t } = useTranslation();
  const { currentActiveProject, currentActiveDocument } = useGoBack();

  const formatName = (nameKey: string | undefined): string => {
    if (!nameKey) return '';
    
    // Check if the translation exists
    try {
      const translatedName = t(nameKey);
      if (translatedName !== nameKey) { // Translation found
        return translatedName.toLowerCase().replace(/[()]/g, '').replace(/ /g, '-');
      }
    } catch (e) {
      // Translation not found, continue with the original key
    }
    
    // If no translation is found or an error occurred, return the original nameKey
    return nameKey.toLowerCase().replace(/[()]/g, '').replace(/ /g, '-');
  };

  const getFormattedTitle = (): string => {
    let formattedName = '';
    if (id === 'myProjects' && currentActiveProject?.name) {
      formattedName = formatName(currentActiveProject.name);
    } else if (id === 'documents' && currentActiveDocument?.name) {
      formattedName = formatName(currentActiveDocument.name);
    }
    return formattedName ? `${propTitle}/${formattedName}` : propTitle;
  };

  const title = getFormattedTitle();

  if (!isSearchVisible) return null;

  return (
    <div className="flex items-center top-0 w-full h-5 px-0.5 bg-window-white border-top-grey shadow-header-window">
      <div>
        <p className="small-p text-gray-500 px-1.5 cursor-default">
          {t('common.address')}
        </p>
      </div>
      <div className="w-full h-full bg-white border border-blue-400 pl-1 flex items-center justify-between">
        <div className="flex items-center overflow-hidden">
          <img 
            src={iconSrc} 
            alt="projects-icon" 
            className="w-3.5 h-3.5" 
          />
          <p className="px-1 small-p cursor-default truncate mt-px">
            {title}
          </p>
        </div>
        <div className="mr-0.5 hover:brightness-110">
          <img 
            src="/img/icons/windows-header-tools/down-icon.webp" 
            alt="view" 
            className="w-3.5 h-3.5" 
          />
        </div>
      </div>
      <div className="flex items-center px-2 gap-1 w-20">
        <img 
          src="/img/icons/windows-header-tools/right-green-arrow-icon.webp" 
          alt={`${t('common.icon')} ${t('common.go')}`} 
          className="w-3.5 h-3.5" 
        />
        <p className="small-p cursor-default">
          {t('common.go')}
        </p>
      </div>
    </div>
  );
};

export default WindowHeaderSearch;

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Entity } from '../types';

interface LocalEntity extends Omit<Entity, 'title'> {
  title: Record<string, string>;
  isActive?: boolean;
}

interface DesktopAppsLayoutProps {
  entities: Entity[];
  onToggle: (entityId: string) => void;
  children?: React.ReactNode;
}

const DesktopAppsLayout: React.FC<DesktopAppsLayoutProps> = ({ entities, onToggle }) => {
  const [localEntities, setLocalEntities] = useState<LocalEntity[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();

  // Initialize and update local entities when entities or language changes
  useEffect(() => {
    setLocalEntities(
      entities.map((entity) => {
        // Ensure title is always a Record<string, string>
        const title = typeof entity.title === 'string' 
          ? { en: entity.title } 
          : entity.title;
        
        return {
          ...entity,
          title,
          isActive: false,
        };
      })
    );
  }, [entities]);

  // Check if mobile
  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.grid')) {
        setLocalEntities(prev => 
          prev.map(entity => ({
            ...entity,
            isActive: false
          }))
        );
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleEffect = useCallback((selectedEntity: Entity) => {
    setLocalEntities(prev => 
      prev.map(entity => ({
        ...entity,
        isActive: entity.id === selectedEntity.id ? !entity.isActive : false
      }))
    );
  }, []);

  const handleEntityClick = useCallback((entity: Entity, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      removeFilterAndToggle(entity);
    } else {
      toggleEffect(entity);
    }
  }, [isMobile, toggleEffect]);

  const handleEntityDoubleClick = useCallback((entity: Entity, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMobile) {
      removeFilterAndToggle(entity);
    }
  }, [isMobile]);

  const removeFilterAndToggle = (entity: Entity) => {
    setLocalEntities(prev => 
      prev.map(e => ({
        ...e,
        isActive: false
      }))
    );
    onToggle(entity.id);
  };

  const getLocalizedTitle = (entity: { title: string | Record<string, string> }) => {
    // If title is a string, return it directly
    if (typeof entity.title === 'string') {
      return entity.title;
    }
    // If title is a record, use the current language, fallback to English if not available
    const currentLang = i18n.language.split('-')[0]; // Get base language code (e.g., 'en' from 'en-US')
    return entity.title[currentLang] || entity.title.en || entity.title['fr'] || '';
  };

  const desktopEntities = localEntities.filter((entity) => entity.onDesktop);

  return (
    <section className="absolute top-0 left-0">
      <div className="grid grid-cols-2 gap-5 pt-6 pl-6">
        {desktopEntities.map((entity) => (
          <button
            key={entity.id}
            className={`flex flex-col gap-2 items-center w-full cursor-pointer ${entity.isActive ? 'active' : ''}`}
            onClick={(e) => handleEntityClick(entity, e)}
            onDoubleClick={(e) => handleEntityDoubleClick(entity, e)}
          >
            <img
              className="w-11 h-11"
              style={{
                ...entity.imageStyle,
                filter: entity.isActive ? 'opacity(0.5)' : 'opacity(1)'
              }}
              src={entity.imgSrc}
              alt={getLocalizedTitle(entity)}
            />
            <p
              className="text-white text-xs font-normal py-px px-1"
              style={{
                ...entity.textStyle,
                backgroundColor: entity.isActive ? '#0B61FF' : 'transparent',
                textShadow: entity.isActive ? 'none' : '0px 1px 1px rgba(1, 1, 1, 1), 0px 0px 4px #000'
              }}
            >
              {getLocalizedTitle(entity)}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DesktopAppsLayout;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import clsx from 'clsx';
import type { Entity } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface LocalEntity extends Omit<Entity, 'title'> {
  title: Record<string, string>;
  isActive?: boolean;
  isFocus?: boolean;
  position?: { x: number; y: number; w: number; h: number };
}

interface DesktopAppsLayoutProps {
  entities: Entity[];
  onToggle: (entityId: string) => void;
  children?: React.ReactNode;
}

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isSelecting: boolean;
}

const DesktopAppsLayout: React.FC<DesktopAppsLayoutProps> = ({ entities, onToggle }) => {
  const [localEntities, setLocalEntities] = useState<LocalEntity[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();

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
          isFocus: false,
        };
      })
    );
  }, [entities, currentLanguage]);

  // Check if mobile
  useEffect(() => {
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, []);

  // Handle click outside and selection box
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOnIcon = target.closest('button[data-icon]');
      const isOnGrid = target.closest('.grid');

      if (!isOnIcon && isOnGrid && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSelectionBox({
          startX: e.clientX - rect.left,
          startY: e.clientY - rect.top,
          currentX: e.clientX - rect.left,
          currentY: e.clientY - rect.top,
          isSelecting: true
        });

        // Clear all focus states when starting selection
        setLocalEntities(prev =>
          prev.map(entity => ({
            ...entity,
            isActive: false,
            isFocus: false
          }))
        );
      } else if (!isOnIcon && !isOnGrid) {
        // Clicked outside desktop area
        setLocalEntities(prev =>
          prev.map(entity => ({
            ...entity,
            isActive: false,
            isFocus: false
          }))
        );
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (selectionBox?.isSelecting && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setSelectionBox(prev => prev ? {
          ...prev,
          currentX: e.clientX - rect.left,
          currentY: e.clientY - rect.top
        } : null);
      }
    };

    const handleMouseUp = () => {
      if (selectionBox?.isSelecting) {
        setSelectionBox(null);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [selectionBox?.isSelecting]);

  // Helper functions
  const removeFilterAndToggle = useCallback((entity: Entity) => {
    setLocalEntities(prev =>
      prev.map(e => ({
        ...e,
        isActive: false,
        isFocus: false
      }))
    );
    onToggle(entity.id);
  }, [onToggle]);

  const getSelectionBoxDimensions = () => {
    if (!selectionBox) return null;

    const left = Math.min(selectionBox.startX, selectionBox.currentX);
    const top = Math.min(selectionBox.startY, selectionBox.currentY);
    const width = Math.abs(selectionBox.currentX - selectionBox.startX);
    const height = Math.abs(selectionBox.currentY - selectionBox.startY);

    return { left, top, width, height };
  };

  const handleEntityClick = useCallback((entity: Entity, e: React.MouseEvent) => {
    e.stopPropagation();

    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;

    if (isMobile) {
      removeFilterAndToggle(entity);
      return;
    }

    // Single click - focus the icon
    setLocalEntities(prev =>
      prev.map(e => ({
        ...e,
        isFocus: e.id === entity.id,
        isActive: false
      }))
    );

    setLastClickTime(currentTime);
  }, [isMobile, lastClickTime]);

  const handleEntityDoubleClick = useCallback((entity: Entity, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMobile) {
      removeFilterAndToggle(entity);
    }
  }, [isMobile, removeFilterAndToggle]);

  const getLocalizedTitle = (entity: { title: string | Record<string, string> }) => {
    if (typeof entity.title === 'string') {
      return entity.title;
    }
    return entity.title[currentLanguage] || entity.title.en || Object.values(entity.title)[0] || '';
  };

  const desktopEntities = localEntities.filter((entity) => entity.onDesktop);

  return (
    <section className="absolute top-0 left-0" ref={containerRef}>
      <div className="grid grid-cols-2 gap-5 pt-6 pl-6">
        {desktopEntities.map((entity) => (
          <button
            key={entity.id}
            data-icon={entity.id}
            className={clsx(
              "flex flex-col gap-2 items-center w-full cursor-pointer",
              (entity.isActive || entity.isFocus) && "active"
            )}
            onClick={(e) => handleEntityClick(entity, e)}
            onDoubleClick={(e) => handleEntityDoubleClick(entity, e)}
          >
            <img
              className="w-8 h-8"
              style={{
                ...entity.imageStyle,
                filter: entity.isFocus ? 'drop-shadow(0 0 2px blue)' : 'none',
                opacity: entity.isFocus ? 0.7 : 1
              }}
              src={entity.imgSrc}
              alt={getLocalizedTitle(entity)}
            />
            <p
              className={clsx(
                "text-white font-normal py-px px-1",
                entity.isFocus ? "bg-blue-600" : "bg-transparent"
              )}
              style={{
                fontSize: '10px',
                ...entity.textStyle,
                textShadow: entity.isFocus ? 'none' : '0px 1px 1px rgba(1, 1, 1, 1), 0px 0px 4px #000'
              }}
            >
              {getLocalizedTitle(entity).split('\n').map((line, index, array) => (
                <React.Fragment key={index}>
                  {line}
                  {index < array.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </button>
        ))}

        {selectionBox?.isSelecting && getSelectionBoxDimensions() && (
          <div
            className="absolute border border-dashed border-gray-500 bg-blue-500/10 pointer-events-none z-[1000]"
            style={{
              left: `${getSelectionBoxDimensions()!.left}px`,
              top: `${getSelectionBoxDimensions()!.top}px`,
              width: `${getSelectionBoxDimensions()!.width}px`,
              height: `${getSelectionBoxDimensions()!.height}px`,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default DesktopAppsLayout;
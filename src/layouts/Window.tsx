import React, { memo, useCallback, useMemo } from 'react';
// import { Rnd } from 'react-rnd';
// import { useLanguage } from '../hooks/useLanguage';
// import WindowMinimize from '../components/Buttons/WindowMinimize';
// import WindowMaximize from '../components/Buttons/WindowMaximize';
// import WindowClose from '../components/Buttons/WindowClose';
// import WindowHeaderTools from '../components/Window/WindowHeaderTools';
// import WindowHeaderSearch from '../components/Window/WindowHeaderSearch';
// import WindowHeaderDropdown from '../components/Window/WindowHeaderDropdown';
// import menuHeaderData from '../data/header-menu-data.json';
import cn from 'clsx';

interface WindowProps {
  id: string;
  title: Record<string, string>;
  iconSrc: string;
  initPositionX: number;
  initPositionY: number;
  initWidth: number;
  initHeight: number;
  minWidth?: number;
  minHeight?: number;
  headerToolsId?: string;
  menuHeaderItemsId: string;
  resizable?: boolean;
  windowsHeaderLogo?: boolean;
  isSearchVisible?: boolean;
  onClose: () => void;
  onToggleMinimize: () => void;
  activeWindow: string | null;
  setActiveWindow: (id: string) => void;
  highestZIndex: number;
  setHighestZIndex: (value: number) => void;
  maximized?: boolean;
  onMaximize?: () => void;
  children?: React.ReactNode;
}

const Window: React.FC<WindowProps> = memo(({
  id,
  title,
  iconSrc,
  initPositionX,
  initPositionY,
  initWidth,
  initHeight,
  minWidth = 300,
  minHeight = 200,
  headerToolsId,
  menuHeaderItemsId,
  resizable = true,
  windowsHeaderLogo = false,
  isSearchVisible = false,
  onClose,
  onToggleMinimize,
  activeWindow,
  setActiveWindow,
  highestZIndex,
  setHighestZIndex,
  maximized = false,
  onMaximize,
  children
}) => {
  // const { currentLanguage } = useLanguage();

  const isActive = activeWindow === id;
  const appHeight = window.innerHeight - 32;
  const appWidth = window.innerWidth;

  // Handle window activation and z-index update
  const handleWindowActivation = useCallback(() => {
    // Always bring window to front when clicked, even if already active
    const newZIndex = highestZIndex + 1;
    setActiveWindow(id);
    setHighestZIndex(newZIndex);
  }, [id, setActiveWindow, highestZIndex, setHighestZIndex]);

  // Calculate responsive defaults
  const defaultWidth = Math.min(Math.max(initWidth, 300), appWidth * 0.9);
  const defaultHeight = Math.min(Math.max(initHeight, 200), appHeight * 0.85);

  // Window size and position
  const windowSize = maximized
    ? { width: appWidth, height: appHeight }
    : id === 'minesweeper'
    ? { width: 'auto', height: 'auto' }
    : { width: defaultWidth, height: defaultHeight };

  const windowPosition = maximized
    ? { x: 0, y: 0 }
    : { x: initPositionX, y: initPositionY };

  // Translated title
  const translatedTitle = useMemo(() => {
    const currentLanguage = 'en'; // Since we don't have i18n, default to English
    return title[currentLanguage] || title['fr'] || Object.values(title)[0];
  }, [title]);

  // Window control functions
  const toggleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onMaximize?.();
  }, [onMaximize]);

  const closeWindow = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMinimize();
  }, [onToggleMinimize]);

  const handleDoubleClickHeader = useCallback((e: React.MouseEvent) => {
    if (resizable) {
      toggleMaximize(e);
    }
  }, [toggleMaximize, resizable]);

  // Use a higher z-index for active windows, ensure non-active windows stay below
  const currentZIndex = isActive ? highestZIndex + 10 : Math.max(1, highestZIndex - 10);

  return (
    <div
      style={{
        position: 'absolute',
        left: windowPosition.x,
        top: windowPosition.y,
        width: windowSize.width,
        height: windowSize.height,
        minWidth: minWidth,
        minHeight: minHeight,
        zIndex: currentZIndex,
        display: 'block',
        visibility: 'visible'
      }}
      onMouseDown={handleWindowActivation}
    >
      <div
        className={cn(
          'w-full h-full overflow-hidden select-none flex flex-col',
          id === 'music' ? 'bg-transparent' : 'rounded-t-lg',
          id !== 'music' && (isActive ? 'bg-window-blue-active' : 'bg-window-blue-deactivated')
        )}
        style={{
          boxShadow: id === 'music' ? 'none' : isActive
            ? 'inset 1px 1px 0 rgba(255,255,255,0.3), inset -1px -1px 0 rgba(0,0,0,0.2), 0 0 0 1px #316ac5, 0 0 0 2px #1c4ba0'
            : 'inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.1), 0 0 0 1px #316ac5, 0 0 0 2px #1c4ba0',
          outline: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          opacity: id === 'music' ? 0 : 1,
          backgroundColor: '#f0f0f0'
        }}
        onDragStart={(e) => e.preventDefault()}
        onSelectStart={(e) => e.preventDefault()}
      >
        {/* Window header */}
        <div
          className={cn(
            'absolute top-0 left-0 h-7 w-full z-40 flex justify-between items-center px-1',
            'bg-gradient-to-r from-blue-600 to-blue-400',
            isActive ? 'from-blue-600 to-blue-400' : 'from-gray-500 to-gray-400'
          )}
          onDoubleClick={handleDoubleClickHeader}
          style={{ cursor: 'move' }}
        >
          <div className="h-5/6 text-white font-semibold flex items-center gap-1 select-none flex-1 overflow-hidden pr-1">
            <img
              src={iconSrc}
              alt={`${translatedTitle} icon`}
              className="w-4 h-4"
              draggable={false}
              onDoubleClick={closeWindow}
            />
            <div className="flex items-center overflow-hidden">
              <h4 className="text-white text-sm font-semibold truncate" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
                {translatedTitle}
              </h4>
            </div>
          </div>

          <div className={cn(
            'h-5/6 mt-px flex items-center gap-px',
            isActive ? 'opacity-100' : 'opacity-60'
          )}>
            {/* Window Control Buttons - Simplified */}
            <button
              onClick={handleMinimize}
              className="w-5 h-4 bg-gray-200 border border-gray-400 text-xs flex items-center justify-center hover:bg-gray-300"
              style={{ fontSize: '10px', lineHeight: '1' }}
            >
              _
            </button>
            <button
              onClick={toggleMaximize}
              disabled={!resizable}
              className={cn(
                'w-5 h-4 bg-gray-200 border border-gray-400 text-xs flex items-center justify-center',
                !resizable ? 'opacity-60 cursor-default' : 'cursor-pointer hover:bg-gray-300'
              )}
              style={{ fontSize: '10px', lineHeight: '1' }}
            >
              □
            </button>
            <button
              onClick={closeWindow}
              className="w-5 h-4 bg-gray-200 border border-gray-400 text-xs flex items-center justify-center hover:bg-red-300"
              style={{ fontSize: '10px', lineHeight: '1' }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content Area - Remaining space after header */}
        <div className={cn(
          "flex-1 w-full overflow-hidden mt-7",
          id === 'minesweeper' ? "flex-shrink-0" : ""
        )}>
          {/* Inner Content Container - Clean 100% environment for apps */}
          <div className={cn(
            "w-full h-full overflow-hidden relative bg-white",
            id === 'minesweeper' ? "h-auto" : ""
          )}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

Window.displayName = 'Window';

export default Window;
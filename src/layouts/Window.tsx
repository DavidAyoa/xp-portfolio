import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import WindowMinimize from '../components/Buttons/WindowMinimize';
import WindowMaximize from '../components/Buttons/WindowMaximize';
import WindowClose from '../components/Buttons/WindowClose';
import WindowHeaderTools from '../components/Window/WindowHeaderTools';
import WindowHeaderSearch from '../components/Window/WindowHeaderSearch';
import WindowHeaderDropdown from '../components/Window/WindowHeaderDropdown';
import menuHeaderData from '../data/header-menu-data.json';

type MenuHeaderItem = {
  en: string[];
  fr: string[];
};

type MenuHeaderItems = {
  [key: string]: MenuHeaderItem;
  default: MenuHeaderItem;
  minesweeper: MenuHeaderItem;
  notepad: MenuHeaderItem;
  images: MenuHeaderItem;
  documents: MenuHeaderItem;
  contact: MenuHeaderItem;
  none: MenuHeaderItem;
};

interface MenuHeaderData {
  menuHeaderItems: MenuHeaderItems;
}
import cn from 'clsx'

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
  children?: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
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
  children
}) => {
  const { currentLanguage } = useLanguage();
  const [translatedTitle, setTranslatedTitle] = useState(
    title[currentLanguage] || title['fr'] || Object.values(title)[0]
  );
  const [maximized, setMaximized] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: initWidth, height: initHeight });
  const [windowPosition, setWindowPosition] = useState({ x: initPositionX, y: initPositionY });
  const [windowTransform, setWindowTransform] = useState(`translate(${initPositionX}px, ${initPositionY}px)`);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [resizeStartData, setResizeStartData] = useState({
    mouseX: 0,
    mouseY: 0,
    windowWidth: 0,
    windowHeight: 0,
    windowX: 0,
    windowY: 0
  });
  
  const windowRef = useRef<HTMLDivElement>(null);
  const lastUpdateTimestamp = useRef(0);
  const throttleDelay = 16; // 60 FPS
  
  const appHeight = window.innerHeight - 32;
  const appWidth = window.innerWidth;
  const isMobile = window.innerWidth <= 768;
  const isActive = activeWindow === id;

  // Update translations when language changes
  useEffect(() => {
    setTranslatedTitle(title[currentLanguage] || title['fr'] || Object.values(title)[0]);
  }, [currentLanguage, title]);

  // Handle window activation and z-index update
  const handleWindowActivation = useCallback(() => {
    if (activeWindow !== id) {
      setActiveWindow(id);
      setHighestZIndex(highestZIndex + 1);
    }
  }, [id, activeWindow, setActiveWindow, highestZIndex, setHighestZIndex]);

  // Translated menu header items
  const translatedMenuHeaderItems = useMemo(() => {
    const items = (menuHeaderData.menuHeaderItems as MenuHeaderItems)[menuHeaderItemsId as keyof MenuHeaderItems] || menuHeaderData.menuHeaderItems.default;
    return items ? items[currentLanguage as keyof MenuHeaderItem] || items.fr : [];
  }, [currentLanguage, menuHeaderItemsId]);

  // Window style for positioning and sizing (only non-class styles)
  const windowStyle = useMemo(() => {
    const currentZIndex = isActive ? highestZIndex : Math.max(1, highestZIndex - 10);
    
    if (maximized || isMobile) {
      return {
        width: '100vw',
        height: 'calc(100dvh - 2rem)',
        top: '0',
        left: '0',
        zIndex: currentZIndex
      };
    }
    
    return {
      width: `${windowSize.width}px`,
      height: `${windowSize.height}px`,
      transform: windowTransform,
      zIndex: currentZIndex
    };
  }, [maximized, isMobile, windowSize, windowTransform, isActive, highestZIndex]);

  // Dragging functions
  const startDrag = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (maximized || isMobile) return;
    
    setIsDragging(true);
    handleWindowActivation();
    
    // Calculate offset from mouse position to window top-left corner
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [maximized, isMobile, handleWindowActivation]);

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging || isResizing) return;
    
    const currentTime = performance.now();
    if (currentTime - lastUpdateTimestamp.current > throttleDelay) {
      // Calculate new position based on mouse position and offset
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      // Define boundaries
      const minX = -windowSize.width + 100; // Allow some part of window to be off-screen
      const minY = 0;
      const maxX = window.innerWidth - 100; // Keep at least 100px visible
      const maxY = window.innerHeight - 100;

      const boundedX = Math.min(Math.max(newX, minX), maxX);
      const boundedY = Math.min(Math.max(newY, minY), maxY);

      setWindowPosition({ x: boundedX, y: boundedY });
      setWindowTransform(`translate(${boundedX}px, ${boundedY}px)`);
      
      lastUpdateTimestamp.current = currentTime;
    }
  }, [isDragging, isResizing, dragOffset, windowSize]);

  const stopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Resizing functions
  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    handleWindowActivation();
    
    const direction = (e.target as HTMLElement).dataset.direction || '';
    setResizeDirection(direction);
    
    setResizeStartData({
      mouseX: e.clientX,
      mouseY: e.clientY,
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
      windowX: windowPosition.x,
      windowY: windowPosition.y
    });
  }, [handleWindowActivation, windowSize, windowPosition]);

  const handleResize = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartData.mouseX;
    const deltaY = e.clientY - resizeStartData.mouseY;
    
    let newWidth = resizeStartData.windowWidth;
    let newHeight = resizeStartData.windowHeight;
    let newX = resizeStartData.windowX;
    let newY = resizeStartData.windowY;

    switch (resizeDirection) {
      case 'right':
        newWidth = Math.min(Math.max(resizeStartData.windowWidth + deltaX, minWidth), appWidth - newX);
        break;
      case 'bottom':
        newHeight = Math.min(Math.max(resizeStartData.windowHeight + deltaY, minHeight), appHeight - newY);
        break;
      case 'corner':
        newWidth = Math.min(Math.max(resizeStartData.windowWidth + deltaX, minWidth), appWidth - newX);
        newHeight = Math.min(Math.max(resizeStartData.windowHeight + deltaY, minHeight), appHeight - newY);
        break;
      case 'left':
        const maxLeftResize = resizeStartData.windowWidth - minWidth;
        const leftDelta = Math.min(Math.max(deltaX, -maxLeftResize), resizeStartData.windowX);
        newWidth = resizeStartData.windowWidth - leftDelta;
        newX = resizeStartData.windowX + leftDelta;
        break;
      case 'top':
        const maxTopResize = resizeStartData.windowHeight - minHeight;
        const topDelta = Math.min(Math.max(deltaY, -maxTopResize), resizeStartData.windowY);
        newHeight = resizeStartData.windowHeight - topDelta;
        newY = resizeStartData.windowY + topDelta;
        break;
    }

    setWindowSize({ width: newWidth, height: newHeight });
    
    if (newX !== resizeStartData.windowX || newY !== resizeStartData.windowY) {
      setWindowPosition({ x: newX, y: newY });
      setWindowTransform(`translate(${newX}px, ${newY}px)`);
    }
  }, [isResizing, resizeDirection, resizeStartData, minWidth, minHeight, appWidth, appHeight]);

  const stopResize = useCallback(() => {
    setIsResizing(false);
    setResizeDirection('');
  }, []);

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
      return () => {
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', stopDrag);
      };
    }
  }, [isDragging, handleDrag, stopDrag]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', stopResize);
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
      };
    }
  }, [isResizing, handleResize, stopResize]);

  // Window control functions
  const toggleMaximize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMaximized(prev => !prev);
  }, []);

  const closeWindow = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  }, [onClose]);

  const handleMinimize = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMinimize();
  }, [onToggleMinimize]);

  return (
    <section
      ref={windowRef}
      className={cn(
        'absolute rounded-t-lg overflow-hidden select-none',
        'bg-window-blue-deactivated',
        isActive && 'bg-window-blue-active'
      )}
      style={windowStyle}
      id={id}
      onClick={handleWindowActivation}
    >
      {/* Window header */}
      <div
        className={cn(
          'absolute top-0 left-0 h-7 w-full z-40 flex justify-between items-center px-1',
          'bg-header-window-deactivated',
          isActive && 'bg-header-window-active',
          'cursor-grab'
        )}
        onMouseDown={startDrag}
      >
        <div className="h-5/6 text-white font-semibold flex items-center gap-1 select-none flex-1 overflow-hidden pr-1">
          <img 
            src={iconSrc} 
            alt={`${translatedTitle} icon`}
            className="w-4 h-4"
            draggable={false}
          />
          <div className="flex items-center overflow-hidden">
            <h4 className="text-header-window text-header-shadow truncate">
              {translatedTitle}
            </h4>
          </div>
        </div>
        
        <div className={cn(
          'h-5/6 mt-px flex items-center gap-px',
          isActive ? 'opacity-100' : 'opacity-60'
        )}>
          <WindowMinimize onClick={handleMinimize} />
          <WindowMaximize 
            onClick={toggleMaximize} 
            disabled={!resizable} 
            className={cn(
              !resizable ? 'opacity-60 cursor-default' : 'cursor-pointer'
            )} 
          />
          <WindowClose onClick={closeWindow} />
        </div>
      </div>
      
      {/* Window content */}
      <div className="absolute w-full h-full overflow-hidden p-0.75">
        <WindowHeaderDropdown dropdownItems={translatedMenuHeaderItems} windowsHeaderLogo={windowsHeaderLogo} />
        
        {headerToolsId && (
          <>
            <WindowHeaderTools id={id} headerToolsId={headerToolsId} />
            <WindowHeaderSearch 
              id={id} 
              title={translatedTitle} 
              iconSrc={iconSrc} 
              isSearchVisible={isSearchVisible} 
            />
          </>
        )}
        
        {/* Children components go here */}
        {children}
      </div>
      
      {/* Resize handles */}
      {resizable && !maximized && !isMobile && (
        <>
          {/* Right edge */}
          <div
            className="absolute bg-transparent top-0 right-0 w-2 h-full cursor-ew-resize"
            onMouseDown={startResize}
            data-direction="right"
          />
          {/* Bottom edge */}
          <div
            className="absolute bg-transparent bottom-0 left-0 h-2 w-full cursor-ns-resize"
            onMouseDown={startResize}
            data-direction="bottom"
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bg-transparent bottom-0 right-0 w-2.5 h-2.5 cursor-nwse-resize"
            onMouseDown={startResize}
            data-direction="corner"
          />
          {/* Left edge */}
          <div
            className="absolute bg-transparent top-0 left-0 w-2 h-full cursor-ew-resize"
            onMouseDown={startResize}
            data-direction="left"
          />
          {/* Top edge */}
          <div
            className="absolute bg-transparent top-7 left-0 h-2 w-full cursor-ns-resize"
            onMouseDown={startResize}
            data-direction="top"
          />
        </>
      )}
    </section>
  );
};

export default Window;
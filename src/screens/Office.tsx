import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import useWindows from '../hooks/useWindows';
import useVolume from '../hooks/useVolume';
import { useLanguage } from '../hooks/useLanguage';

// Components
// import MetaUpdater from '../MetaUpdater';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import DesktopAppsLayout from '../layouts/DesktopAppsLayout';
import Window from '../layouts/Window';

// Window Components (commented out as they don't exist yet)
// import Minesweeper from '@/components/Windows/Minesweeper';
// import MyCV from '@/components/Windows/MyCV/MyCV';
// import Music from '@/components/Windows/Music/Music';
import ContactMe from '../components/Window/ContactMe';
import MyProjects from '../components/Window/MyProjects';
// import Documents from '@/components/Windows/Documents/Documents';
import Pictures from '../components/Window/Pictures';
// import Calendar from '@/components/Windows/Calendar/Calendar';
import Notepad from '../components/Window/Notepad';
// import Doom from '@/components/Windows/Doom';
import Terminal from '../components/Window/Terminal';

import windowsData from '../data/windows-data.json';
import { createEntity } from '../types';
import type { Entity, WindowEntity } from '../types';

const Office: React.FC = () => {
  const navigate = useNavigate();
  const [showHeader, setShowHeader] = useState(false);
  const [windows, setWindows] = useState<WindowEntity[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  
  const { openWindowIds, addWindow, removeWindow, loadState: loadWindowsState } = useWindows();
  const { playAudio, unmuteAudio } = useVolume();
  const { setLanguage } = useLanguage();

  // Component mapping - maps component names to their implementations
  const components = {
    Terminal: Terminal,
    ContactMe: ContactMe,
    MyProjects: MyProjects,
    Pictures: Pictures,
    Notepad: Notepad,
    // Placeholder components for not-yet-implemented windows
    MyCV: () => <div className="p-4">MyCV component coming soon...</div>,
    Music: () => <div className="p-4">Music component coming soon...</div>,
    Documents: () => <div className="p-4">Documents component coming soon...</div>,
    Calendar: () => <div className="p-4">Calendar component coming soon...</div>,
    Minesweeper: () => <div className="p-4">Minesweeper component coming soon...</div>,
    Doom: () => <div className="p-4">Doom component coming soon...</div>,
  };

  // Parse and validate window data
  const parseWindowData = (data: any[]): Entity[] => {
    return data.map((item: any) => {
      console.log('Raw item:', item);
      
      // Create entity using createEntity to ensure all required fields are present
      const entity = createEntity({
        id: item.id || '',
        title: typeof item.title === 'object' && !Array.isArray(item.title) 
          ? item.title 
          : { en: String(item.title || 'Untitled'), fr: 'Sans titre' },
        subtitle: item.subtitle && typeof item.subtitle === 'object' && !Array.isArray(item.subtitle)
          ? item.subtitle
          : { en: '', fr: '' },
        onDesktop: item.onDesktop !== false,
        imgSrc: item.imgSrc || '',
        iconSrc: item.iconSrc || '',
        component: item.component || '',
        headerPosition: (item.headerPosition === 'left' || item.headerPosition === 'right' || item.headerPosition === 'center') 
          ? item.headerPosition 
          : 'left',
        // Optional window properties with type safety
        initPositionX: item.initPositionX !== undefined ? Number(item.initPositionX) : 100,
        initPositionY: item.initPositionY !== undefined ? Number(item.initPositionY) : 100,
        initWidth: item.initWidth !== undefined ? Number(item.initWidth) : 800,
        initHeight: item.initHeight !== undefined ? Number(item.initHeight) : 600,
        minWidth: item.minWidth !== undefined ? Number(item.minWidth) : 300,
        minHeight: item.minHeight !== undefined ? Number(item.minHeight) : 200,
        leftMenuType: item.leftMenuType,
        headerToolsId: item.headerToolsId,
        menuHeaderItemsId: item.menuHeaderItemsId || 'default',
        resizable: item.resizable,
        windowsHeaderLogo: item.windowsHeaderLogo,
        isSearchVisible: item.isSearchVisible
      });
      
      console.log('Created entity:', entity.id, 'with component:', entity.component);
      return entity;
    });
  };

  const [entities] = useState<Entity[]>(() => {
    console.log('Raw windowsData:', windowsData);
    return parseWindowData(windowsData);
  });

  // Initialize on mount
  useEffect(() => {
    // Set language from localStorage
    const storedLanguage = localStorage.getItem('userLanguage') || 'en';
    setLanguage(storedLanguage);

    // Load window states
    loadWindowsState();
    
    // Play startup sound
    playAudio('/sounds/start-windows.mp3');
    unmuteAudio();

    // Open previously opened windows
    openWindowIds.forEach(windowId => {
      openWindow(windowId);
    });

    // Cleanup
    return () => {
      const script = document.getElementById('spotify-player-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Toggle header visibility
  const toggleHeader = useCallback(() => {
    setShowHeader(prev => !prev);
  }, []);

  // Open a window by ID
  const openWindow = useCallback((windowId: string) => {
    console.log('openWindow called with ID:', windowId);
    console.log('Current entities:', entities.map(e => ({ id: e.id, component: e.component })));
    
    setWindows(prevWindows => {
      const existingWindow = prevWindows.find(window => window.id === windowId);
      
      if (existingWindow) {
        console.log('Window already exists, bringing to front');
        // If window exists, bring it to front and make it active
        const newZIndex = highestZIndex + 1;
        setHighestZIndex(newZIndex);
        
        return prevWindows.map(window => 
          window.id === windowId 
            ? { 
                ...window, 
                zIndex: newZIndex,
                visible: true
              } 
            : window
        );
      }
      
      // If window doesn't exist, create it
      const entity = entities.find(e => e.id === windowId);
      if (!entity) {
        console.warn('Entity not found for ID:', windowId);
        return prevWindows;
      }
      
      console.log('Creating new window for entity:', entity);
      
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      
      // Create a complete WindowEntity with all required properties
      const newWindow: WindowEntity = {
        ...entity,
        // Store the component name string
        component: entity.component,
        visible: true,
        zIndex: newZIndex,
        // Ensure title is properly typed as Record<string, string>
        title: typeof entity.title === 'string' 
          ? { en: entity.title, fr: entity.title } 
          : entity.title,
        // Ensure all required properties are provided with defaults
        initPositionX: entity.initPositionX ?? 100,
        initPositionY: entity.initPositionY ?? 100,
        initWidth: entity.initWidth ?? 800,
        initHeight: entity.initHeight ?? 600,
        minWidth: entity.minWidth ?? 300,
        minHeight: entity.minHeight ?? 200,
        // Set default values for required Window props
        resizable: entity.resizable ?? true,
        menuHeaderItemsId: entity.menuHeaderItemsId || 'default',
        windowsHeaderLogo: entity.windowsHeaderLogo ?? false,
        isSearchVisible: entity.isSearchVisible ?? false,
        // Copy over optional properties
        ...(entity.leftMenuType && { leftMenuType: entity.leftMenuType }),
        ...(entity.headerToolsId && { headerToolsId: entity.headerToolsId })
      };
      
      console.log('Created window:', newWindow);
      
      // Save to store
      addWindow(windowId);
      
      return [...prevWindows, newWindow];
    });
    
    setActiveWindow(windowId);
  }, [entities, highestZIndex, addWindow]);

  // Close a window
  const closeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows => {
      const newWindows = prevWindows.filter(window => window.id !== windowId);
      removeWindow(windowId);
      return newWindows;
    });
    
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow, removeWindow]);

  // Minimize a window
  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows => 
      prevWindows.map(window => 
        window.id === windowId 
          ? { ...window, visible: false } 
          : window
      )
    );
    
    // If the minimized window was active, clear the active window
    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  // Handle window click (bring to front)
  const handleWindowClick = useCallback((windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setWindows(prevWindows => 
      prevWindows.map(window => 
        window.id === windowId 
          ? { ...window, zIndex: newZIndex, visible: true } 
          : window
      )
    );
    
    setActiveWindow(windowId);
  }, [highestZIndex]);

  // Handle clicks outside of windows
  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    // Check if click is outside all windows
    const isClickInsideWindow = (e.target as HTMLElement).closest('.window-container');
    if (!isClickInsideWindow) {
      setActiveWindow(null);
    }
  }, []);

  // Check if a window is visible
  const isWindowVisible = useCallback((windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    return window ? window.visible : false;
  }, [windows]);

  // Handle entity actions
  const handleEntityAction = useCallback((action: string, ...args: any[]) => {
    console.log('handleEntityAction called with:', action, args);
    switch (action) {
      case 'openWindow':
        console.log('Opening window:', args[0]);
        openWindow(args[0]);
        break;
      case 'toggleHeader':
        toggleHeader();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }, [openWindow, toggleHeader]);

  // Helper function to render the appropriate component
  const renderWindowComponent = useCallback((componentName: string) => {
    console.log('Rendering component:', componentName);
    
    // Type assertion to access the component by name
    const componentMap: Record<string, React.ComponentType> = components;
    const ComponentToRender = componentMap[componentName];
    
    if (!ComponentToRender) {
      console.warn(`Component "${componentName}" not found in components mapping`);
      return <div className="p-4 text-red-500">Component not found: {componentName}</div>;
    }
    
    return <ComponentToRender />;
  }, []);

  return (
    <div 
      className="h-svh w-screen overflow-hidden bg-office-pic bg-no-repeat bg-cover bg-center relative"
      onClick={handleOutsideClick}
    >
      {/* <MetaUpdater /> */}
      
      {showHeader && (
        <Header 
          entities={entities}
          onToggleHeader={toggleHeader}
          onToggleWindow={openWindow}
        />
      )}
      
      <DesktopAppsLayout 
        entities={entities}
        onToggle={(entityId) => handleEntityAction('openWindow', entityId)}
      />
      
      {windows.map((window) => (
        <div 
          key={window.id} 
          className="window-container"
          style={{
            zIndex: window.zIndex,
            position: 'fixed',
            display: window.visible ? 'block' : 'none'
          }}
        >
          <Window
            id={window.id}
            title={typeof window.title === 'string' ? { en: window.title, fr: window.title } : window.title}
            iconSrc={window.iconSrc}
            initPositionX={window.initPositionX}
            initPositionY={window.initPositionY}
            initWidth={window.initWidth}
            initHeight={window.initHeight}
            minWidth={window.minWidth}
            minHeight={window.minHeight}
            headerToolsId={window.headerToolsId}
            menuHeaderItemsId={window.menuHeaderItemsId}
            resizable={window.resizable}
            windowsHeaderLogo={window.windowsHeaderLogo}
            isSearchVisible={window.isSearchVisible}
            onClose={() => closeWindow(window.id)}
            onToggleMinimize={() => minimizeWindow(window.id)}
            activeWindow={activeWindow}
            setActiveWindow={setActiveWindow}
            highestZIndex={highestZIndex}
            setHighestZIndex={setHighestZIndex}
          >
            {renderWindowComponent(window.component as string)}
          </Window>
        </div>
      ))}
      
      <Footer 
        entities={windows}
        onToggleHeader={toggleHeader}
        onToggleWindow={handleWindowClick}
      />
    </div>
  );
};

export default Office;
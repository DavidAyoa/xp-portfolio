import React, { useState, useEffect, useCallback, useRef } from 'react';
import ContextMenu from './ContextMenu';
import NotificationModal from './NotificationModal';
import useWindows from '../hooks/useWindows';
import useVolume from '../hooks/useVolume';

import Taskbar from './Taskbar';
import DesktopAppsLayout from '../layouts/DesktopAppsLayout';
import Windows from './Window/Windows';

import ContactMe from './Window/ContactMe';
import MyProjects from './Window/MyProjects';
import Pictures from './Window/Pictures';
import Notepad from './Window/Notepad';
import Terminal from './Window/Terminal';
import Paint from './Window/Paint';
import Minesweeper from './Window/Minesweeper';
import InternetExplorer from './Window/InternetExplorer';
import Winamp from './Window/Winamp';
import FileManager from './Window/FileManager';
import EmailClient from './Window/EmailClient';
import ComposeEmail from './Window/EmailClient/ComposeEmail';

import { desktopApps } from '../data/desktopApps';
import type { Entity, WindowEntity } from '../types';

interface DesktopProps {
  currentUser: string | null;
  onLogout?: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    // Close all windows first to ensure proper cleanup
    setWindows([]);
    // Give time for cleanup before calling parent logout
    setTimeout(() => {
      onLogout?.();
    }, 150);
  };
  const [showHeader, setShowHeader] = useState(false);
  const [windows, setWindows] = useState<WindowEntity[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<Set<string>>(new Set());
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'desktop' | 'icon'; iconId?: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const { openWindowIds, addWindow, removeWindow, loadState: loadWindowsState } = useWindows();
  const { playAudio, unmuteAudio } = useVolume();

  const components: Record<string, any> = {
    Terminal: Terminal,
    ContactMe: EmailClient,
    MyProjects: MyProjects,
    Pictures: Pictures,
    Notepad: Notepad,
    Paint: Paint,
    Minesweeper: Minesweeper,
    InternetExplorer: InternetExplorer,
    Winamp: Winamp,
    Music: Winamp,
    FileManager: (props: any) => <FileManager {...props} type="projects" />,
    OurComputer: (props: any) => <FileManager {...props} type="computer" />,
    Clients: (props: any) => <FileManager {...props} type="clients" />,
    SharedDocs: (props: any) => <FileManager {...props} type="sharedDocs" />,
    UserDocs: (props: any) => <FileManager {...props} type="userDocs" />,
    EmailClient: EmailClient,
    Email: EmailClient,
    ComposeEmail: (props: any) => <ComposeEmail {...props} onSend={(data: any) => {
      const mailtoLink = `mailto:${data.to}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      window.location.href = mailtoLink;
      props.onClose?.();
    }} />,
    MyCV: () => <div className="p-4">MyCV component coming soon...</div>,
    Documents: () => <div className="p-4">Documents component coming soon...</div>,
    Calendar: () => <div className="p-4">Calendar component coming soon...</div>,
    Doom: () => <div className="p-4">Doom component coming soon...</div>,
    ContactDetails: () => <Notepad initialText="=== CodePoets Contact Details ===

Company: CodePoets
Email: hello@codepoets.dev
Website: https://codepoets.dev
Phone: +1 (555) 123-4567

Services:
- Web Development
- UI/UX Design
- Portfolio Websites
- Custom Applications

Address:
123 Developer Street
Tech City, TC 12345
United States

Social Media:
- GitHub: @codepoets
- Twitter: @codepoets_dev
- LinkedIn: CodePoets

Note: We create digital poetry through code!" />,
  };


  const [entities] = useState<Entity[]>(desktopApps);

  useEffect(() => {
    // Event listener for opening windows from other components
    const handleOpenWindowEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      const windowId = customEvent.detail;
      if (windowId) {
        openWindow(windowId);
      }
    };

    window.addEventListener('openWindow', handleOpenWindowEvent);

    loadWindowsState();

    try {
      const audio = new Audio('/sounds/start-windows.mp3');
      audio.volume = 0.3;
      audio.play().catch(e => console.log('Startup sound failed:', e));
    } catch (e) {
      console.log('Audio not supported');
    }
    unmuteAudio();

    openWindowIds.forEach(windowId => {
      openWindow(windowId);
    });

    setTimeout(() => {
      setShowNotification(true);
    }, 2000);

    return () => {
      window.removeEventListener('openWindow', handleOpenWindowEvent);

      const script = document.getElementById('spotify-player-script');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const toggleHeader = useCallback(() => {
    setShowHeader(prev => !prev);
  }, []);

  const openingRef = useRef<Set<string>>(new Set());

  const openWindow = useCallback((windowId: string) => {
    // Prevent duplicate opens
    if (openingRef.current.has(windowId)) {
      console.log('🎵 Window is already being opened, ignoring duplicate call:', windowId);
      return;
    }
    openingRef.current.add(windowId);

    console.log('openWindow called with ID:', windowId);
    console.log('Current entities:', entities.map(e => ({ id: e.id, component: e.component })));

    setWindows(prevWindows => {
      console.log('🎵 Current windows in state:', prevWindows.map(w => ({ id: w.id, component: w.component })));
      const existingWindow = prevWindows.find(window => window.id === windowId);

      if (existingWindow) {
        console.log('🎵 Window already exists, bringing to front:', existingWindow.id);
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

      console.log('🎵 No existing window found, creating new one');

      const entity = entities.find(e => e.id === windowId);
      if (!entity) {
        console.warn('Entity not found for ID:', windowId);
        return prevWindows;
      }

      console.log('Creating new window for entity:', entity);

      // Calculate new z-index - ComposeEmail should always be on top
      const maxCurrentZIndex = Math.max(...prevWindows.map(w => w.zIndex || 0), highestZIndex);
      const newZIndex = maxCurrentZIndex + 1;
      setHighestZIndex(newZIndex);

      const componentName = entity.component as keyof typeof components;
      const ComponentToRender = components[componentName];

      console.log('Component name:', componentName, 'Component found:', !!ComponentToRender);

      const newWindow: WindowEntity = {
        ...entity,
        component: entity.component,
        visible: true,
        zIndex: newZIndex,
        title: typeof entity.title === 'string'
          ? { en: entity.title, fr: entity.title }
          : entity.title,
        initPositionX: entity.initPositionX ?? 100,
        initPositionY: entity.initPositionY ?? 100,
        initWidth: entity.initWidth ?? 800,
        initHeight: entity.initHeight ?? 600,
        minWidth: entity.minWidth ?? 300,
        minHeight: entity.minHeight ?? 200,
        resizable: entity.resizable ?? true,
        menuHeaderItemsId: entity.menuHeaderItemsId || 'default',
        windowsHeaderLogo: entity.windowsHeaderLogo ?? false,
        isSearchVisible: entity.isSearchVisible ?? false,
        invisible: (entity as any).invisible ?? false,
        ...(entity.leftMenuType && { leftMenuType: entity.leftMenuType }),
        ...(entity.headerToolsId && { headerToolsId: entity.headerToolsId })
      };

      console.log('Created window:', newWindow);

      addWindow(windowId);

      // Clear the opening flag after a short delay
      setTimeout(() => {
        openingRef.current.delete(windowId);
      }, 100);

      return [...prevWindows, newWindow];
    });

    setActiveWindow(windowId);
  }, [entities, highestZIndex, addWindow]);

  const closeWindow = useCallback((windowId: string) => {
    console.log('🎵 Closing window:', windowId);

    // Clear from opening ref if it exists
    openingRef.current.delete(windowId);

    setWindows(prevWindows => {
      const windowToClose = prevWindows.find(w => w.id === windowId);
      console.log('🎵 Window to close:', windowToClose);
      const newWindows = prevWindows.filter(window => window.id !== windowId);
      console.log('🎵 Windows after close:', newWindows.map(w => w.id));
      removeWindow(windowId);
      return newWindows;
    });

    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow, removeWindow]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prevWindows =>
      prevWindows.map(window =>
        window.id === windowId
          ? { ...window, visible: false }
          : window
      )
    );

    if (activeWindow === windowId) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const handleWindowClick = useCallback((windowId: string) => {
    console.log('🎯 handleWindowClick called with windowId:', windowId);
    console.log('🎯 Current activeWindow:', activeWindow);

    if (activeWindow !== windowId) {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);

      setWindows(prevWindows =>
        prevWindows.map(window =>
          window.id === windowId
            ? { ...window, zIndex: newZIndex, visible: true }
            : window
        )
      );

      // Only set the active window when it's different
      setActiveWindow(windowId);
      console.log('🎯 Setting activeWindow to:', windowId);
    }
  }, [highestZIndex, activeWindow]);

  const maximizeWindow = useCallback((windowId: string) => {
    setMaximizedWindows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(windowId)) {
        newSet.delete(windowId);
      } else {
        newSet.add(windowId);
      }
      return newSet;
    });

    handleWindowClick(windowId);
  }, [handleWindowClick]);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if (contextMenu && !(e.target as HTMLElement).closest('.context-menu')) {
      setContextMenu(null);
    }

    // Check if click is inside any window container
    const isClickInsideWindow = (e.target as HTMLElement).closest('.window-container');
    if (!isClickInsideWindow) {
      setActiveWindow(null);
    }
  }, [contextMenu]);

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

  const renderWindowComponent = useCallback((componentName: string) => {
    console.log('🎵 Rendering component:', componentName, 'Available components:', Object.keys(components));
    const ComponentToRender = components[componentName as keyof typeof components];

    if (!ComponentToRender) {
      console.warn(`Component "${componentName}" not found in components mapping`);
      return () => <div className="p-4 text-red-500">Component not found: {componentName}</div>;
    }

    // Return the component itself so Windows.tsx can call it with props
    return ComponentToRender;
  }, [components]);

  return (
    <div
      className="h-svh w-screen overflow-hidden bg-office-pic bg-no-repeat bg-cover bg-center relative"
      onClick={handleOutsideClick}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          type: 'desktop'
        });
      }}
    >

      <DesktopAppsLayout
        entities={entities}
        onToggle={(entityId) => handleEntityAction('openWindow', entityId)}
      />

      <Windows
        apps={windows.map((window) => ({
          id: window.id,
          header: {
            icon: window.iconSrc,
            title: typeof window.title === 'string' ? window.title : window.title.en,
            buttons: ['minimize', 'maximize', 'close'],
            invisible: (window as any).invisible || false
          },
          defaultSize: {
            width: window.initWidth,
            height: window.initHeight
          },
          defaultOffset: {
            x: window.initPositionX,
            y: window.initPositionY
          },
          resizable: window.resizable,
          maximized: maximizedWindows.has(window.id),
          minimized: !window.visible,
          component: renderWindowComponent(window.component as string),
          zIndex: window.zIndex || 1,
          invisible: (window as any).invisible || false,
          injectProps: {}
        }))}
        onMouseDown={handleWindowClick}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        focusedAppId={activeWindow}
      />

      <Taskbar
        apps={windows.filter(w => w.component !== 'ComposeEmail').map((w, index) => ({
          id: w.id, // Use string ID directly
          title: typeof w.title === 'string' ? w.title : w.title.en,
          component: w.component as string,
          minimized: !w.visible,
          maximized: maximizedWindows.has(w.id),
          zIndex: w.zIndex || 1
        }))}
        onFocusApp={(appId) => {
          console.log('🔥 onFocusApp called with appId:', appId);
          console.log('🔥 Current activeWindow:', activeWindow);
          console.log('🔥 Available windows:', windows.map(w => ({ id: w.id, visible: w.visible })));

          const window = windows.find(w => w.id === appId);
          console.log('🔥 Found window:', window ? { id: window.id, visible: window.visible } : 'NOT FOUND');

          if (window) {
            console.log('🔥 Window state check:');
            console.log('  - window.visible:', window.visible);
            console.log('  - window.id:', window.id);

            if (!window.visible) {
              console.log('🔥 RESTORING minimized window:', window.id);
              // Restore minimized window
              setWindows(prevWindows =>
                prevWindows.map(w =>
                  w.id === window.id ? { ...w, visible: true } : w
                )
              );
              // Focus the window
              handleWindowClick(window.id);
            } else {
              console.log('🔥 MINIMIZING visible window:', window.id);
              // If window is visible, minimize it (authentic Windows XP behavior)
              setWindows(prevWindows =>
                prevWindows.map(w =>
                  w.id === window.id
                    ? { ...w, visible: false }
                    : w
                )
              );
            }
          }
        }}
        onToggleStartMenu={toggleHeader}
        startMenuOpen={showHeader}
        onStartMenuItemClick={(entityId) => {
          console.log('🎯 Desktop received entityId from start menu:', entityId);
          if (entityId) {
            openWindow(entityId);
          } else {
            console.warn('🎯 Desktop: No entityId provided');
          }
        }}
        currentUser="CodePoets Team"
        onTriggerNotification={() => {
          setShowNotification(true);
        }}
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        onLogout={handleLogout}
      />

      {contextMenu && (
        <div className="context-menu">
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            type={contextMenu.type}
            iconId={contextMenu.iconId}
            onClose={() => setContextMenu(null)}
            onRefresh={() => {
              console.log('Refresh desktop');
            }}
          />
        </div>
      )}

      <NotificationModal
        onToggleFullscreen={() => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
        showOnLogin={true}
        triggerShow={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
};

export default Desktop;
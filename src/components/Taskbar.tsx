import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useLanguage } from '../hooks/useLanguage';
import StartMenu from './StartMenu/StartMenu';

interface App {
  id: string;
  title: string;
  component: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface TaskbarProps {
  apps: App[];
  onFocusApp: (appId: string) => void;
  onToggleStartMenu: () => void;
  startMenuOpen: boolean;
  onStartMenuItemClick: (item: string) => void;
  currentUser: string | null;
  onTriggerNotification: () => void;
  onToggleFullscreen: () => void;
  onLogout?: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  apps,
  onFocusApp,
  onToggleStartMenu,
  startMenuOpen,
  onStartMenuItemClick,
  currentUser,
  onTriggerNotification,
  onToggleFullscreen,
  onLogout
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [volumeDropdownOpen, setVolumeDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const startMenuRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const availableLanguages = languages?.map(lang => lang.code) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
        if (startMenuOpen) {
          onToggleStartMenu();
        }
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startMenuOpen, onToggleStartMenu, languageDropdownOpen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const getFlagIcon = (langCode: string) => {
    return `/img/icons/langs/flag-${langCode}.ico`;
  };

  const getLanguageName = (langCode: string) => {
    const names = {
      en: 'English',
      hi: 'हिंदी',
      fr: 'Français',
      es: 'Español',
      ar: 'العربية'
    };
    return names[langCode as keyof typeof names] || langCode;
  };

  const handleStartMenuClick = (item: string) => {
    console.log('🔥 Start menu clicked:', item);

    const itemMap: Record<string, string> = {
      'Our Computer': 'ourComputer',
      'Mail Us': 'contact',
      'Contact Details': 'contactDetails',
      'Our Work': 'myProjects',
      'Our Music': 'music',
      'Command Prompt': 'terminal',
      'About Us': 'contactDetails',
      'Schedule a Meeting': 'internetExplorer',
      'Our Pictures': 'myProjects',
      'Our Documents': 'myProjects',
      'Traditional Website': 'internetExplorer',
      'WhatsApp Messenger': 'internetExplorer',
      'Notepad': 'contactDetails',
      'Paint': 'paint',
      'Terminal': 'terminal',
      'Internet Explorer': 'internetExplorer',
    };

    // Handle special actions
    if (item === 'Log Off') {
      onLogout?.();
      return;
    }

    if (item === 'Restart') {
      window.location.reload();
      return;
    }

    const entityId = itemMap[item];
    console.log('🔥 Mapped to entityId:', entityId);

    if (entityId) {
      onStartMenuItemClick(entityId);
      // Close start menu after clicking
      onToggleStartMenu();
    } else {
      console.warn('🔥 No mapping found for item:', item);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 taskbar-gradient flex items-center z-50" style={{ height: '30px' }}>
      {/* Start Button */}
      <div className="relative" ref={startMenuRef}>
        <img
          src="/img/icons/start-icon.png"
          alt="Start"
          className={clsx(
            "h-full mr-2 cursor-pointer relative",
            startMenuOpen ? "brightness-85" : "hover:brightness-105 active:brightness-85"
          )}
          onClick={onToggleStartMenu}
        />

        {/* Start Menu */}
        {startMenuOpen && (
          <div className="absolute bottom-full left-0 shadow-2xl">
            <StartMenu
              onClick={handleStartMenuClick}
              currentUser={currentUser === 'team' ? 'CodePoets Team' : 'Guest User'}
            />
          </div>
        )}
      </div>

      {/* Task Buttons */}
      <div className="flex-1 flex items-center ml-2 overflow-hidden gap-1">
        {apps.map((app) => {
          const isHighestZIndex = apps.length === 0 || app.zIndex === Math.max(...apps.map(a => a.zIndex));
          const isFocused = !app.minimized && isHighestZIndex;
          const isMinimized = app.minimized;

          return (
            <button
              key={app.id}
              onClick={() => onFocusApp(app.id)}
              className={clsx(
                "xp-app-button relative",
                isFocused ? 'xp-app-button--focus' : 'xp-app-button--cover'
              )}
              style={{
                flex: '1',
                maxWidth: '150px',
                color: '#fff',
                borderRadius: '2px',
                marginTop: '2px',
                padding: '0 8px',
                height: '22px',
                fontSize: '11px',
                backgroundColor: isFocused ? '#1e52b7' : '#3c81f3',
                boxShadow: isFocused
                  ? 'inset 0 0 1px 1px rgba(0, 0, 0, 0.2), inset 1px 0 1px rgba(0, 0, 0, 0.7)'
                  : 'inset -1px 0px rgba(0, 0, 0, 0.3), inset 1px 1px 1px rgba(255, 255, 255, 0.2)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Tahoma, sans-serif',
                cursor: 'pointer'
              }}
            >
              <img
                src={`/img/icons/${app.component.toLowerCase()}-icon-sm.webp`}
                alt={app.title}
                style={{
                  height: '15px',
                  width: '15px'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/img/icons/default-icon.png';
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '27px',
                  right: '8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {app.title}
              </span>
              {isMinimized && (
                <div
                  style={{
                    position: 'absolute',
                    left: '-2px',
                    top: '-2px',
                    width: '10px',
                    height: '1px',
                    borderBottomRightRadius: '50%',
                    boxShadow: '2px 2px 3px rgba(255, 255, 255, 0.5)',
                    content: "''",
                    display: 'block'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="taskbar-systray-gradient flex items-center text-white text-xs font-tahoma px-3 relative h-full ml-2 border-l border-blue-900" style={{ boxShadow: 'inset 1px 0 1px #18bbff' }}>
        {/* System Tray Icons */}
        <div className="flex items-center mr-2 gap-1">
          {/* Language Switcher */}
          <div className="relative" ref={languageDropdownRef}>
            <img
              src={getFlagIcon(currentLanguage)}
              alt={currentLanguage}
              className="w-4 h-3 cursor-pointer"
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            />

            {/* Language Dropdown */}
            {languageDropdownOpen && availableLanguages && availableLanguages.length > 0 && (
              <div className="absolute bottom-full right-0 mb-1 bg-white border border-gray-400 shadow-lg rounded overflow-hidden min-w-30">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLanguageDropdownOpen(false);
                    }}
                    className="w-full px-2 py-1 text-left hover:bg-blue-100 flex items-center text-xs text-black font-tahoma"
                  >
                    <img
                      src={getFlagIcon(lang)}
                      alt={lang}
                      className="w-4 h-3 mr-2"
                    />
                    <span className="flex-1">{getLanguageName(lang)}</span>
                    {lang === currentLanguage && (
                      <span className="text-blue-600 ml-1">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fullscreen Toggle */}
          <img
            src="/img/codepoets-logo-light.png"
            alt={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="w-4 h-4 cursor-pointer"
            onClick={toggleFullscreen}
          />

          {/* Info/Notification */}
          <div className="relative">
            <img
              src="/img/icons/info-icon.webp"
              alt="Info"
              className="w-3 h-3 cursor-pointer"
              onClick={onTriggerNotification}
            />

          </div>
        </div>

        {/* Clock */}
        <div className="text-xs font-tahoma">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
import React, { useState } from 'react';
import clsx from 'clsx';
import { WindowDropDowns } from './WindowDropDowns';

interface InternetExplorerProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

const InternetExplorer: React.FC<InternetExplorerProps> = ({ onClose }) => {
  const [currentUrl, setCurrentUrl] = useState('http://www.google.com/');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<{clean: string, archive: string}[]>([
    { clean: 'http://www.google.com/', archive: 'https://web.archive.org/web/20010901000000/https://google.com' }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getArchiveUrl = (cleanUrl: string) => {
    const baseUrl = cleanUrl.replace(/^https?:\/\//, '');
    return `https://web.archive.org/web/20010901000000/https://${baseUrl}`;
  };

  const navigateToUrl = (cleanUrl: string) => {
    setIsLoading(true);
    setCurrentUrl(cleanUrl);
    const archiveUrl = getArchiveUrl(cleanUrl);
    const newEntry = { clean: cleanUrl, archive: archiveUrl };
    setHistory(prev => [...prev.slice(0, historyIndex + 1), newEntry]);
    setHistoryIndex(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleToolbarClick = (action: string) => {
    switch (action) {
      case 'back':
        if (historyIndex > 0) {
          setHistoryIndex(prev => prev - 1);
          setCurrentUrl(history[historyIndex - 1].clean);
        }
        break;
      case 'forward':
        if (historyIndex < history.length - 1) {
          setHistoryIndex(prev => prev + 1);
          setCurrentUrl(history[historyIndex + 1].clean);
        }
        break;
      case 'stop':
        setIsLoading(false);
        break;
      case 'refresh':
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
        break;
      case 'home':
        navigateToUrl('http://www.google.com/');
        break;
      case 'search':
        navigateToUrl('http://www.google.com/');
        break;
    }
  };

  const handleMenuClick = (item: string) => {
    switch (item) {
      case 'Close':
        onClose?.();
        break;
      case 'Home Page':
        handleToolbarClick('home');
        break;
      case 'Back':
        handleToolbarClick('back');
        break;
      case 'Refresh':
        handleToolbarClick('refresh');
        break;
      default:
        break;
    }
  };

  const dropDownData = {
    File: [
      { type: 'item', text: 'New Window', hotkey: 'Ctrl+N' },
      { type: 'item', text: 'Open...', hotkey: 'Ctrl+O' },
      { type: 'item', text: 'Save', hotkey: 'Ctrl+S', disable: true },
      { type: 'item', text: 'Save As...' },
      { type: 'separator' },
      { type: 'item', text: 'Page Setup...' },
      { type: 'item', text: 'Print...', hotkey: 'Ctrl+P' },
      { type: 'item', text: 'Print Preview...' },
      { type: 'separator' },
      { type: 'item', text: 'Properties' },
      { type: 'item', text: 'Work Offline' },
      { type: 'item', text: 'Close' },
    ],
    Edit: [
      { type: 'item', text: 'Cut', hotkey: 'Ctrl+X', disable: true },
      { type: 'item', text: 'Copy', hotkey: 'Ctrl+C', disable: true },
      { type: 'item', text: 'Paste', hotkey: 'Ctrl+V', disable: true },
      { type: 'separator' },
      { type: 'item', text: 'Select All', hotkey: 'Ctrl+A' },
      { type: 'separator' },
      { type: 'item', text: 'Find (on This Page)...', hotkey: 'Ctrl+F' },
    ],
    View: [
      { type: 'item', text: 'Toolbars' },
      { type: 'item', text: 'Status Bar', symbol: 'check' },
      { type: 'item', text: 'Explorer Bar' },
      { type: 'separator' },
      { type: 'item', text: 'Stop', hotkey: 'Esc' },
      { type: 'item', text: 'Refresh', hotkey: 'F5' },
      { type: 'separator' },
      { type: 'item', text: 'Text Size' },
      { type: 'item', text: 'Encoding' },
      { type: 'separator' },
      { type: 'item', text: 'Source' },
      { type: 'item', text: 'Full Screen', hotkey: 'F11' },
    ],
    Favorites: [
      { type: 'item', text: 'Add to Favorites...' },
      { type: 'item', text: 'Organize Favorites...' },
      { type: 'separator' },
      { type: 'item', text: 'MSN.com' },
      { type: 'item', text: 'Radio Station Guide' },
    ],
    Tools: [
      { type: 'item', text: 'Mail and News' },
      { type: 'item', text: 'Pop-up Blocker' },
      { type: 'item', text: 'Manage Add-ons...' },
      { type: 'item', text: 'Windows Update' },
      { type: 'separator' },
      { type: 'item', text: 'Internet Options...' },
    ],
    Help: [
      { type: 'item', text: 'Contents and Index' },
      { type: 'item', text: 'Tip of the Day' },
      { type: 'item', text: 'For Netscape Users' },
      { type: 'item', text: 'Online Support' },
      { type: 'item', text: 'Send Feedback' },
      { type: 'separator' },
      { type: 'item', text: 'About Internet Explorer' },
    ],
  };

  const ToolbarButton = ({ icon, text, disabled, onClick, hasArrow }: {
    icon: string;
    text?: string;
    disabled?: boolean;
    onClick: () => void;
    hasArrow?: boolean;
  }) => (
    <div
      className={clsx(
        "ie-toolbar-btn flex h-full items-center px-1 py-0.5 cursor-pointer relative",
        disabled && "grayscale opacity-70 cursor-default"
      )}
      onClick={!disabled ? onClick : undefined}
      style={{ fontSize: '11px' }}
    >
      <div
        className="h-7 w-7"
        style={{ backgroundImage: `url('/ie/${icon}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
      />
      {text && <span className="mr-1 ml-1" style={{ fontSize: '11px' }}>{text}</span>}
      {hasArrow && (
        <div className="h-full flex items-center ml-1">
          <div style={{
            width: 0,
            height: 0,
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: '3px solid #000'
          }} />
        </div>
      )}
    </div>
  );

  return (
    <>
      <style>
        {`
          .ie-toolbar-btn {
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 3px;
          }
          .ie-toolbar-btn:not(.grayscale):hover {
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.1) !important;
          }
          .ie-toolbar-btn:not(.grayscale):active {
            border: 1px solid rgb(185, 185, 185) !important;
            background-color: #dedede !important;
            box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.7) !important;
            color: rgba(255, 255, 255, 0.7) !important;
          }
          .ie-toolbar-btn:not(.grayscale):active > * {
            transform: translate(1px, 1px) !important;
          }
          .ie-address-input {
            border: none;
            outline: none;
            background: transparent;
            width: 100%;
            font-size: 11px;
            font-family: 'Tahoma', sans-serif;
          }
        `}
      </style>
      <div
        className="h-full w-full absolute flex overflow-hidden flex-col"
        style={{
          background: 'linear-gradient(to right, #edede5 0%, #ede8cd 100%)'
        }}
      >
      {/* Menu Bar */}
      <section
        className="relative flex items-center h-6 flex-shrink-0"
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.7)'
        }}
      >
        <div
          className="h-full flex-1 flex items-center pl-0.5"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
            borderRight: '1px solid rgba(0, 0, 0, 0.15)'
          }}
        >
          <WindowDropDowns
            items={dropDownData}
            onClickItem={handleMenuClick}
            height={23}
          />
        </div>
        <img
          className="h-full w-10 object-contain"
          src={isLoading ? "/ie/ie-loading.gif" : "/ie/ie-windows-logo.png"}
          alt={isLoading ? "loading" : "windows"}
          style={{
            borderLeft: '1px solid white',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        />
      </section>

      {/* Toolbar */}
      <section
        className="h-9 flex items-center gap-px px-1"
        style={{
          paddingTop: '3px',
          paddingBottom: '2px',
          paddingLeft: '5px',
          paddingRight: '5px',
          borderBottom: '1px solid #ACA899',
          backgroundColor: '#ECE9D8',
          fontSize: '11px'
        }}
      >
        <ToolbarButton icon="ie-backward.png" text="Back" onClick={() => handleToolbarClick('back')} hasArrow />
        <ToolbarButton
          icon="ie-forward.png"
          disabled={historyIndex >= history.length - 1}
          onClick={() => handleToolbarClick('forward')}
          hasArrow
        />
        <ToolbarButton icon="ie-cancel.png" onClick={() => handleToolbarClick('stop')} />
        <ToolbarButton icon="ie-reload.png" onClick={() => handleToolbarClick('refresh')} />
        <ToolbarButton icon="ie-home.png" onClick={() => handleToolbarClick('home')} />

        <div className="h-4/5 w-px bg-gray-400 mx-0.5" />

        <ToolbarButton icon="ie-search.png" text="Search" onClick={() => handleToolbarClick('search')} />
        <ToolbarButton icon="ie-bookmark.png" text="Favorites" onClick={() => {}} />
        <ToolbarButton icon="ie-clock.png" onClick={() => {}} />

        <div className="h-4/5 w-px bg-gray-400 mx-0.5" />

        <ToolbarButton icon="ie-mail.png" onClick={() => {}} hasArrow />
        <ToolbarButton icon="ie-fax.png" onClick={() => {}} />
        <ToolbarButton icon="ie-write.png" disabled onClick={() => {}} />
        <ToolbarButton icon="ie-avatars.png" onClick={() => {}} />
      </section>

      {/* Address Bar */}
      <section
        className="h-5 flex items-center px-0.5 pb-0.5"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.7)',
          fontSize: '11px',
          boxShadow: 'inset 0 -2px 3px -1px #2d2d2d'
        }}
      >
        <div className="px-1" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Address</div>
        <div
          className="flex-1 h-full flex items-center bg-white relative"
          style={{ border: '1px solid rgba(122, 122, 255, 0.6)' }}
        >
          <div
            className="w-3.5 h-3.5 ml-0.5"
            style={{ backgroundImage: "url('/ie/ie-done.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          />
          <input
            className="ie-address-input absolute left-4 right-4"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                navigateToUrl(currentUrl);
              }
            }}
          />
          <div
            className="absolute right-0.5 w-3.5 h-3.5 cursor-pointer hover:brightness-110"
            style={{ backgroundImage: "url('/ie/ie-caret-down.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          />
        </div>
        <div
          className="flex items-center h-full px-1 cursor-pointer rounded-sm hover:bg-gradient-to-b hover:from-white hover:to-gray-200"
          onClick={() => navigateToUrl(currentUrl)}
        >
          <div
            className="w-5 h-4 mr-1"
            style={{
              backgroundImage: "url('/ie/ie-go.png')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
          <span style={{ fontSize: '11px' }}>Go</span>
        </div>

        <div className="h-full w-px bg-gray-400 shadow-sm mx-1" />

        <div className="flex items-center px-1 h-full relative">
          <span style={{ color: 'rgba(0, 0, 0, 0.5)', fontSize: '11px' }}>Links</span>
          <div
            className="absolute right-0.5 w-2 h-1"
            style={{
              backgroundImage: "url('/ie/ie-double-caret.png')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              top: '3px'
            }}
          />
        </div>
      </section>

      {/* Content Area */}
      <div
        className="flex-1 overflow-auto pl-px relative"
        style={{
          borderLeft: '1px solid #6f6f6f',
          backgroundColor: '#f1f1f1'
        }}
      >
        {isLoading ? (
          <div className="p-5 text-center">Loading...</div>
        ) : (
          <iframe
            src={history[historyIndex]?.archive || 'https://web.archive.org/web/20010901000000/https://google.com'}
            className="w-full h-full border-none absolute top-0 left-0"
            title="Internet Explorer"
          />
        )}
      </div>

      {/* Status Bar */}
      <footer
        className="h-5 flex items-center pt-0.5"
        style={{
          borderTop: '1px solid transparent',
          boxShadow: 'inset 0 1px 3px rgba(50, 50, 50, 0.8)',
          backgroundColor: 'rgb(236, 233, 216)'
        }}
      >
        <div className="flex-1 h-full flex items-center pl-0.5">
          <div
            className="w-3.5 h-3.5 mr-1"
            style={{ backgroundImage: "url('/ie/ie-done.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          />
          <span style={{ fontSize: '11px' }}>Done</span>
        </div>
        <div
          className="w-5 border-l"
          style={{
            height: '85%',
            borderLeftColor: 'rgba(0, 0, 0, 0.15)',
            boxShadow: 'inset 1px 0 rgba(255, 255, 255, 0.7)'
          }}
        />
        <div
          className="w-5 border-l"
          style={{
            height: '85%',
            borderLeftColor: 'rgba(0, 0, 0, 0.15)',
            boxShadow: 'inset 1px 0 rgba(255, 255, 255, 0.7)'
          }}
        />
        <div
          className="w-5 border-l"
          style={{
            height: '85%',
            borderLeftColor: 'rgba(0, 0, 0, 0.15)',
            boxShadow: 'inset 1px 0 rgba(255, 255, 255, 0.7)'
          }}
        />
        <div
          className="w-5 border-l"
          style={{
            height: '85%',
            borderLeftColor: 'rgba(0, 0, 0, 0.15)',
            boxShadow: 'inset 1px 0 rgba(255, 255, 255, 0.7)'
          }}
        />
        <div
          className="flex items-center w-36 border-l pl-1 relative"
          style={{
            height: '80%',
            borderLeftColor: 'rgba(0, 0, 0, 0.11)',
            boxShadow: 'inset 1px 0 rgba(255, 255, 255, 0.7)'
          }}
        >
          <div
            className="w-3.5 h-3.5 mr-1"
            style={{ backgroundImage: "url('/ie/ie-internet.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          />
          <span style={{ fontSize: '11px' }}>Internet</span>
          <div
            className="absolute w-0.5 h-0.5"
            style={{
              right: '11px',
              bottom: '-1px',
              boxShadow: `
                2px 0px rgba(0, 0, 0, 0.25),
                5.5px 0px rgba(0, 0, 0, 0.25),
                9px 0px rgba(0, 0, 0, 0.25),
                5.5px -3.5px rgba(0, 0, 0, 0.25),
                9px -3.5px rgba(0, 0, 0, 0.25),
                9px -7px rgba(0, 0, 0, 0.25),
                3px 1px rgba(255, 255, 255, 1),
                6.5px 1px rgba(255, 255, 255, 1),
                10px 1px rgba(255, 255, 255, 1),
                10px -2.5px rgba(255, 255, 255, 1),
                10px -6px rgba(255, 255, 255, 1)
              `
            }}
          />
        </div>
      </footer>
      </div>
    </>
  );
};

export default InternetExplorer;
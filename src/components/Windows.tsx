import React, { useRef, memo, useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import windowsData from '../data/windows-data.json';
import FileManager from './Window/FileManager';
import ContactMe from './Window/ContactMe';
import MyProjects from './Window/MyProjects';
import Terminal from './Window/Terminal';
import InternetExplorer from './Window/InternetExplorer';
import Minesweeper from './Window/Minesweeper';
import Winamp from './Window/Winamp';

interface App {
  id: number;
  title: string;
  component: string;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
}

interface WindowsProps {
  apps: App[];
  onFocus: (appId: number) => void;
  onClose: (appId: number) => void;
  onMinimize: (appId: number) => void;
  onMaximize: (appId: number) => void;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Header Buttons Component (Exact from winXP-example)
const HeaderButtons: React.FC<{
  buttons?: string[];
  onMaximize: () => void;
  onMinimize: () => void;
  onClose: () => void;
  maximized: boolean;
  resizable: boolean;
  isFocus: boolean;
}> = ({ buttons, onMaximize, onMinimize, onClose, maximized, resizable, isFocus }) => {
  const buttonElements = {
    minimize: (
      <button
        key="minimize"
        className="header__button header__button--minimize"
        onMouseUp={onMinimize}
      />
    ),
    maximize: (
      <button
        key="maximize"
        className={`header__button ${
          maximized ? 'header__button--maximized' : 'header__button--maximize'
        } ${resizable ? '' : 'header__button--disable'}`}
        onMouseUp={onMaximize}
      />
    ),
    close: (
      <button
        key="button"
        className="header__button header__button--close"
        onMouseUp={onClose}
      />
    ),
  };

  return (
    <div
      className="header__buttons"
      style={{
        opacity: isFocus ? 1 : 0.6,
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-1px',
        marginRight: '1px',
      }}
    >
      {buttons ? (
        buttons.map((b: string) => buttonElements[b as keyof typeof buttonElements])
      ) : (
        <>
          {buttonElements.minimize}
          {buttonElements.maximize}
          {buttonElements.close}
        </>
      )}
    </div>
  );
};

// Window Component (Exact from winXP-example)
const Window = memo<{
  id: number;
  onMouseDown: () => void;
  onMouseUpClose: () => void;
  onMouseUpMinimize: () => void;
  onMouseUpMaximize: () => void;
  title: string;
  defaultSize: { width: number; height: number };
  defaultOffset: { x: number; y: number };
  resizable: boolean;
  maximized: boolean;
  component: string;
  zIndex: number;
  isFocus: boolean;
  invisible?: boolean;
}>(function WindowComponent({
  id,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  title,
  defaultSize,
  defaultOffset,
  resizable,
  maximized,
  component,
  zIndex,
  isFocus,
  invisible = false,
}) {
  function _onMouseDown() {
    onMouseDown();
  }
  function _onMouseUpClose() {
    onMouseUpClose();
  }
  function _onMouseUpMinimize() {
    onMouseUpMinimize();
  }
  function _onMouseUpMaximize() {
    if (resizable) onMouseUpMaximize();
  }

  const onDoubleClickHeader = (e: React.MouseEvent) => {
    if (e.target !== dragRef.current) return;
    _onMouseUpMaximize();
  };

  const dragRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Simple window state management (simplified version of useElementResize)
  const [offset, setOffset] = useState(defaultOffset);
  const [size, setSize] = useState(defaultSize);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    let startX = 0;
    let startY = 0;
    let startOffset = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === dragRef.current) {
        setDragging(true);
        startX = e.clientX;
        startY = e.clientY;
        startOffset = { ...offset };
        e.preventDefault();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        setOffset({
          x: Math.max(0, startOffset.x + deltaX),
          y: Math.max(0, startOffset.y + deltaY)
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    target.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      target.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [offset, dragging]);

  const renderWindowContent = () => {
    switch (component) {
      case 'FileManager':
        return <FileManager onClose={_onMouseUpClose} />;

      case 'OurComputer':
        return <FileManager onClose={_onMouseUpClose} />;

      case 'Paint':
        return (
          <div style={{ height: '100%', backgroundColor: 'white' }}>
            <div style={{ height: '28px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', padding: '4px', backgroundColor: 'white', border: '1px solid #999' }}>
                {['⬜', '✏️', '🖌️', '🪣'].map((tool, i) => (
                  <button key={i} style={{ width: '24px', height: '24px', border: '1px solid #999', backgroundColor: 'white', cursor: 'pointer' }}>
                    {tool}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1px', padding: '4px', backgroundColor: 'white', border: '1px solid #999' }}>
                {['#000000', '#ffffff', '#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'].map((color, i) => (
                  <div key={i} style={{ width: '16px', height: '16px', backgroundColor: color, border: '1px solid #999', cursor: 'pointer' }} />
                ))}
              </div>
            </div>
            <div style={{ flex: 1, height: 'calc(100% - 28px)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              🎨 Canvas Area
            </div>
          </div>
        );

      case 'ContactDetails':
        return (
          <div style={{ height: '100%', backgroundColor: 'white', fontFamily: 'monospace' }}>
            <div style={{ height: '24px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc', padding: '2px 8px', fontSize: '11px' }}>
              <span style={{ cursor: 'pointer', padding: '2px 8px' }}>File</span>
              <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Edit</span>
              <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Format</span>
              <span style={{ cursor: 'pointer', padding: '2px 8px' }}>View</span>
              <span style={{ cursor: 'pointer', padding: '2px 8px' }}>Help</span>
            </div>
            <div style={{ padding: '16px', height: 'calc(100% - 24px)', overflow: 'auto' }}>
              <div style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold' }}>📧 Contact Information</div>
              <div style={{ borderBottom: '1px solid #ccc', marginBottom: '16px' }}></div>
              <div style={{ lineHeight: '1.8' }}>
                <div><strong>Company:</strong> CodePoets</div>
                <div><strong>Email:</strong> hello@codepoets.dev</div>
                <div><strong>Website:</strong> https://codepoets.dev</div>
                <div><strong>Phone:</strong> +1 (555) 123-4567</div>
                <div style={{ marginTop: '16px' }}>
                  <strong>Address:</strong><br />
                  123 Developer Street<br />
                  Tech City, TC 12345<br />
                  United States
                </div>
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>💼 Services:</div>
                  <div style={{ marginLeft: '16px' }}>
                    • Web Development<br />
                    • Mobile Applications<br />
                    • UI/UX Design<br />
                    • Cloud Solutions<br />
                    • Technical Consulting
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ContactMe':
        return <ContactMe onClose={_onMouseUpClose} />;

      case 'MyProjects':
        return <MyProjects onClose={_onMouseUpClose} />;

      case 'Terminal':
        return <Terminal onClose={_onMouseUpClose} />;

      case 'InternetExplorer':
        return <InternetExplorer onClose={_onMouseUpClose} />;

      case 'Minesweeper':
        return <Minesweeper onClose={_onMouseUpClose} />;

      case 'Music':
        return <Winamp onClose={_onMouseUpClose} />;

      default:
        return (
          <div style={{ padding: '16px', height: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Coming Soon</div>
            <div style={{ color: '#666' }}>The {component} application is under development.</div>
          </div>
        );
    }
  };

  let width, height, x, y;
  if (maximized) {
    width = window.innerWidth + 6;
    height = window.innerHeight - 24;
    x = -3;
    y = -3;
  } else {
    width = size.width;
    height = size.height;
    x = offset.x;
    y = offset.y;
  }

  return (
    <div
      ref={ref}
      onMouseDown={_onMouseDown}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        zIndex,
        position: 'absolute',
        display: 'flex',
        padding: invisible ? '0px' : '3px',
        backgroundColor: invisible ? 'transparent' : (isFocus ? '#0831d9' : '#6582f5'),
        flexDirection: 'column',
        borderTopLeftRadius: invisible ? '0px' : '8px',
        borderTopRightRadius: invisible ? '0px' : '8px',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      {/* Header Background */}
      {!invisible && (
        <div
          style={{
            background: isFocus
              ? 'linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)'
              : 'linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            height: '28px',
            pointerEvents: 'none',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            overflow: 'hidden',
          }}
        >
        <div
          style={{
            content: '',
            display: 'block',
            position: 'absolute',
            left: 0,
            opacity: isFocus ? 1 : 0.3,
            background: 'linear-gradient(to right, #1638e6 0%, transparent 100%)',
            top: 0,
            bottom: 0,
            width: '15px',
          }}
        />
        <div
          style={{
            content: '',
            opacity: isFocus ? 1 : 0.4,
            display: 'block',
            position: 'absolute',
            right: 0,
            background: 'linear-gradient(to left, #1638e6 0%, transparent 100%)',
            top: 0,
            bottom: 0,
            width: '15px',
          }}
        />
      </div>
      )}

      {/* Header */}
      {!invisible && (
        <header
          ref={dragRef}
          onDoubleClick={onDoubleClickHeader}
        style={{
          display: 'flex',
          height: '25px',
          lineHeight: '25px',
          fontWeight: 700,
          fontSize: '12px',
          textShadow: '1px 1px #000',
          color: 'white',
          position: 'absolute',
          left: '3px',
          right: '3px',
          alignItems: 'center',
          cursor: 'move',
        }}
      >
        <img
          onDoubleClick={_onMouseUpClose}
          src="/img/icons/app-icon.png"
          alt={title}
          style={{
            width: '15px',
            height: '15px',
            marginLeft: '1px',
            marginRight: '3px',
          }}
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div style={{
          flex: 1,
          pointerEvents: 'none',
          paddingRight: '5px',
          letterSpacing: '0.5px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}>
          {title}
        </div>
        <HeaderButtons
          onMaximize={_onMouseUpMaximize}
          onMinimize={_onMouseUpMinimize}
          onClose={_onMouseUpClose}
          maximized={maximized}
          resizable={resizable}
          isFocus={isFocus}
        />
      </header>
      )}

      {/* Content */}
      <div style={{
        flex: 1,
        position: 'relative',
        marginTop: invisible ? '0px' : '25px',
        height: invisible ? '100%' : 'calc(100% - 25px)',
      }}>
        {renderWindowContent()}
      </div>
    </div>
  );
});

const Windows: React.FC<WindowsProps> = ({
  apps,
  onFocus,
  onClose,
  onMinimize,
  onMaximize
}) => {
  const focusedAppId = apps.reduce((maxApp, app) =>
    app.zIndex > maxApp.zIndex ? app : maxApp,
    apps[0]
  )?.id;

  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      <style>{`
        .header__button {
          margin-right: 1px;
          position: relative;
          width: 22px;
          height: 22px;
          border: 1px solid #fff;
          border-radius: 3px;
          cursor: pointer;
        }
        .header__button:hover {
          filter: brightness(120%);
        }
        .header__button:hover:active {
          filter: brightness(90%);
        }
        .header__button--minimize {
          box-shadow: inset 0 -1px 2px 1px #4646ff;
          background-image: radial-gradient(
            circle at 90% 90%,
            #0054e9 0%,
            #2263d5 55%,
            #4479e4 70%,
            #a3bbec 90%,
            white 100%
          );
        }
        .header__button--minimize:before {
          content: '';
          position: absolute;
          left: 4px;
          top: 13px;
          height: 3px;
          width: 8px;
          background-color: white;
        }
        .header__button--maximize {
          box-shadow: inset 0 -1px 2px 1px #4646ff;
          background-image: radial-gradient(
            circle at 90% 90%,
            #0054e9 0%,
            #2263d5 55%,
            #4479e4 70%,
            #a3bbec 90%,
            white 100%
          );
        }
        .header__button--maximize:before {
          content: '';
          position: absolute;
          display: block;
          left: 4px;
          top: 4px;
          box-shadow: inset 0 3px white, inset 0 0 0 1px white;
          height: 12px;
          width: 12px;
        }
        .header__button--maximized {
          box-shadow: inset 0 -1px 2px 1px #4646ff;
          background-image: radial-gradient(
            circle at 90% 90%,
            #0054e9 0%,
            #2263d5 55%,
            #4479e4 70%,
            #a3bbec 90%,
            white 100%
          );
        }
        .header__button--maximized:before {
          content: '';
          position: absolute;
          display: block;
          left: 7px;
          top: 4px;
          box-shadow: inset 0 2px white, inset 0 0 0 1px white;
          height: 8px;
          width: 8px;
        }
        .header__button--maximized:after {
          content: '';
          position: absolute;
          display: block;
          left: 4px;
          top: 7px;
          box-shadow: inset 0 2px white, inset 0 0 0 1px white, 1px -1px #136dff;
          height: 8px;
          width: 8px;
          background-color: #136dff;
        }
        .header__button--close {
          box-shadow: inset 0 -1px 2px 1px #da4600;
          background-image: radial-gradient(
            circle at 90% 90%,
            #cc4600 0%,
            #dc6527 55%,
            #cd7546 70%,
            #ffccb2 90%,
            white 100%
          );
        }
        .header__button--close:before {
          content: '';
          position: absolute;
          left: 9px;
          top: 2px;
          transform: rotate(45deg);
          height: 16px;
          width: 2px;
          background-color: white;
        }
        .header__button--close:after {
          content: '';
          position: absolute;
          left: 9px;
          top: 2px;
          transform: rotate(-45deg);
          height: 16px;
          width: 2px;
          background-color: white;
        }
        .header__button--disable {
          outline: none;
          opacity: 0.5;
        }
        .header__button--disable:hover {
          filter: brightness(100%);
        }
      `}</style>
      {apps.map(app => (
        !app.minimized && (
          <Window
            key={app.id}
            id={app.id}
            onMouseDown={() => onFocus(app.id)}
            onMouseUpClose={() => onClose(app.id)}
            onMouseUpMinimize={() => onMinimize(app.id)}
            onMouseUpMaximize={() => onMaximize(app.id)}
            title={app.title}
            defaultSize={{ width: app.width, height: app.height }}
            defaultOffset={{ x: 50 + (app.id * 30), y: 50 + (app.id * 30) }}
            resizable={true}
            maximized={app.maximized}
            component={app.component}
            zIndex={app.zIndex}
            isFocus={focusedAppId === app.id}
          />
        )
      ))}
    </div>
  );
};

export default Windows;
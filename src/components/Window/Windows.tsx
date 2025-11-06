import React, { useRef, memo } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import clsx from 'clsx';

import useElementResize from '../../hooks/useElementResize';
import HeaderButtons from './HeaderButtons';

interface WindowHeader {
  icon: string;
  title: string;
  buttons?: string[];
  invisible?: boolean;
}

interface App {
  id: string;
  header: WindowHeader;
  defaultSize: { width: number; height: number };
  defaultOffset: { x: number; y: number };
  resizable: boolean;
  maximized: boolean;
  minimized: boolean;
  component: (props: any) => React.ReactElement;
  zIndex: number;
  invisible?: boolean;
  injectProps?: Record<string, any>;
}

interface WindowsProps {
  apps: App[];
  onMouseDown: (appId: string) => void;
  onClose: (appId: string) => void;
  onMinimize: (appId: string) => void;
  onMaximize: (appId: string) => void;
  focusedAppId: string | null;
}

function Windows({
  apps,
  onMouseDown,
  onClose,
  onMinimize,
  onMaximize,
  focusedAppId,
}: WindowsProps) {
  return (
    <div className="relative z-0">
      {apps.map(app => (
        <Window
          show={!app.minimized}
          key={app.id}
          id={app.id}
          onMouseDown={onMouseDown}
          onMouseUpClose={onClose}
          onMouseUpMinimize={onMinimize}
          onMouseUpMaximize={onMaximize}
          isFocus={focusedAppId === app.id}
          {...app}
        />
      ))}
    </div>
  );
}

interface WindowProps {
  injectProps?: Record<string, any>;
  id: string;
  onMouseDown: (appId: string) => void;
  onMouseUpClose: (appId: string) => void;
  onMouseUpMinimize: (appId: string) => void;
  onMouseUpMaximize: (appId: string) => void;
  header: WindowHeader;
  defaultSize: { width: number; height: number };
  defaultOffset: { x: number; y: number };
  resizable: boolean;
  maximized: boolean;
  component: (props: any) => React.ReactElement;
  zIndex: number;
  isFocus: boolean;
  invisible?: boolean;
  className?: string;
  show?: boolean;
}

const Window = memo(function Window({
  injectProps,
  id,
  onMouseDown,
  onMouseUpClose,
  onMouseUpMinimize,
  onMouseUpMaximize,
  header,
  defaultSize,
  defaultOffset,
  resizable,
  maximized,
  component,
  zIndex,
  isFocus,
  invisible = false,
  className,
  show = true,
}: WindowProps) {
  function _onMouseDown(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isFocus) {
      onMouseDown(id);
    }
  }
  function _onMouseUpClose() {
    onMouseUpClose(id);
  }
  function _onMouseUpMinimize() {
    onMouseUpMinimize(id);
  }
  function _onMouseUpMaximize() {
    if (resizable) onMouseUpMaximize(id);
  }
  function onDoubleClickHeader(e: React.MouseEvent) {
    if (e.target !== dragRef.current) return;
    _onMouseUpMaximize();
  }

  const dragRef = useRef<HTMLElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const { offset, size } = useElementResize(ref, {
    dragRef,
    defaultOffset,
    defaultSize,
    boundary: {
      top: 1,
      right: windowWidth - 1,
      bottom: windowHeight - 31,
      left: 1,
    },
    resizable,
    resizeThreshold: 10,
  });

  const isMobile = windowWidth < 768;

  let width: number | string, height: number | string, x: number, y: number;
  if (isMobile) {
    width = windowWidth;
    height = windowHeight - 31;
    x = 0;
    y = 0;
  } else if (maximized) {
    width = windowWidth + 6;
    height = windowHeight - 24;
    x = -3;
    y = -3;
  } else {
    width = size.width;
    height = size.height;
    x = offset.x;
    y = offset.y;
  }

  const windowClasses = clsx(
    'absolute flex flex-col window-container',
    {
      'block': show,
      'hidden': !show,
      'bg-transparent': header.invisible,
      'bg-blue-600': !header.invisible && isFocus,
      'bg-blue-400': !header.invisible && !isFocus,
      'p-0': header.invisible,
      'p-1': !header.invisible,
      'rounded-t-lg': !header.invisible,
      'border border-blue-800': !header.invisible,
      'shadow-lg': !header.invisible,
    }
  );

  return (
    <div
      className={clsx(windowClasses, className)}
      ref={ref}
      onMouseDown={invisible ? undefined : _onMouseDown}
      style={{
        transform: `translate(${x}px,${y}px)`,
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        zIndex,
      }}
    >
      {!invisible && (
        <div
          className={clsx(
            'absolute left-0 top-0 right-0 h-7 pointer-events-none rounded-t-lg overflow-hidden',
            {
              'bg-gradient-to-b from-blue-600 via-blue-500 to-blue-700': isFocus,
              'bg-gradient-to-b from-blue-300 via-blue-200 to-blue-400': !isFocus,
            }
          )}
          style={{
            background: isFocus
              ? 'linear-gradient(to bottom,#0058ee 0%,#3593ff 4%,#288eff 6%,#127dff 8%,#036ffc 10%,#0262ee 14%,#0057e5 20%,#0054e3 24%,#0055eb 56%,#005bf5 66%,#026afe 76%,#0062ef 86%,#0052d6 92%,#0040ab 94%,#003092 100%)'
              : 'linear-gradient(to bottom, #7697e7 0%,#7e9ee3 3%,#94afe8 6%,#97b4e9 8%,#82a5e4 14%,#7c9fe2 17%,#7996de 25%,#7b99e1 56%,#82a9e9 81%,#80a5e7 89%,#7b96e1 94%,#7a93df 97%,#abbae3 100%)'
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-blue-800 to-transparent"
            style={{ opacity: isFocus ? 1 : 0.3 }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-blue-800 to-transparent"
            style={{ opacity: isFocus ? 1 : 0.4 }}
          />
        </div>
      )}
      {!invisible && (
        <header
          className={clsx(
            'flex h-6 items-center absolute left-1 right-1 text-white font-bold text-xs z-10',
            'font-sans tracking-wide',
          )}
          style={{
            textShadow: '1px 1px 0px #09177f',
          }}
          ref={dragRef}
          onDoubleClick={onDoubleClickHeader}
          onMouseDown={_onMouseDown}
        >
          <img
            onDoubleClick={_onMouseUpClose}
            src={header.icon}
            alt={header.title}
            className="w-4 h-4 ml-0.5 mr-1"
            draggable={false}
          />
          <div className="flex-1 pointer-events-none pr-1 tracking-wide overflow-hidden whitespace-nowrap text-ellipsis">
            {header.title}
          </div>
          <HeaderButtons
            buttons={header.buttons}
            onMaximize={_onMouseUpMaximize}
            onMinimize={_onMouseUpMinimize}
            onClose={_onMouseUpClose}
            maximized={maximized}
            resizable={resizable}
            isFocus={isFocus}
          />
        </header>
      )}
      <div
        className={clsx(
          'flex-1 relative',
          {
            'mt-0 h-full bg-transparent border-none': header.invisible,
            'mt-6 bg-gray-100 border border-gray-400': !header.invisible,
          }
        )}
        style={{
          height: header.invisible ? '100%' : 'calc(100% - 25px)',
        }}
        onMouseDown={invisible ? undefined : _onMouseDown}
      >
        {component({
          onClose: _onMouseUpClose,
          onMinimize: _onMouseUpMinimize,
          isFocus,
          ...injectProps,
        })}
      </div>
    </div>
  );
});


export default Windows;
import React from 'react';
import clsx from 'clsx';

interface HeaderButtonsProps {
  buttons?: string[];
  onMaximize?: () => void;
  onMinimize?: () => void;
  onClose?: () => void;
  maximized?: boolean;
  resizable?: boolean;
  className?: string;
  isFocus?: boolean;
}

function HeaderButtons({
  buttons,
  onMaximize,
  onMinimize,
  onClose,
  maximized,
  resizable,
  className,
  isFocus,
}: HeaderButtonsProps) {
  const baseButtonStyles = "relative w-[21px] h-[21px] mr-1 border border-white rounded hover:brightness-110 active:brightness-90";

  const blueGradientStyle = {
    background: 'radial-gradient(circle at 90% 90%, #0054e9 0%, #2263d5 55%, #4479e4 70%, #a3bbec 90%, white 100%)',
    boxShadow: 'inset 0 -1px 2px 1px #4646ff'
  };

  const redGradientStyle = {
    background: 'radial-gradient(circle at 90% 90%, #cc4600 0%, #dc6527 55%, #cd7546 70%, #ffccb2 90%, white 100%)',
    boxShadow: 'inset 0 -1px 2px 1px #da4600'
  };

  const buttonElements: Record<string, React.ReactElement> = {
    minimize: (
      <button
        key="minimize"
        className={baseButtonStyles}
        style={blueGradientStyle}
        onMouseUp={onMinimize}
      >
        <div className="absolute left-1/2 top-3 h-0.5 w-2 bg-white transform -translate-x-1/2" />
      </button>
    ),
    maximize: (
      <button
        key="maximize"
        className={clsx(baseButtonStyles, {
          'opacity-50 pointer-events-none': !resizable,
        })}
        style={blueGradientStyle}
        onMouseUp={onMaximize}
      >
        {maximized ? (
          <>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2"
              style={{
                boxShadow: 'inset 0 2px white, inset 0 0 0 1px white',
                marginLeft: '1px',
                marginTop: '-1px'
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2"
              style={{
                background: '#136dff',
                boxShadow: 'inset 0 2px white, inset 0 0 0 1px white, 1px -1px #136dff',
                marginLeft: '-1px',
                marginTop: '1px'
              }}
            />
          </>
        ) : (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3"
            style={{
              boxShadow: 'inset 0 3px white, inset 0 0 0 1px white'
            }}
          />
        )}
      </button>
    ),
    close: (
      <button
        key="close"
        className={baseButtonStyles}
        style={redGradientStyle}
        onMouseUp={onClose}
      >
        <div className="absolute left-1/2 top-1/2 h-4 w-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
        <div className="absolute left-1/2 top-1/2 h-4 w-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45" />
      </button>
    ),
  };

  return (
    <div className={clsx(
      'h-5 flex items-center -mt-px mr-px',
      {
        'opacity-100': isFocus,
        'opacity-60': !isFocus,
      },
      className
    )}>
      {buttons ? (
        buttons.map(b => buttonElements[b])
      ) : (
        <>
          {buttonElements.minimize}
          {buttonElements.maximize}
          {buttonElements.close}
        </>
      )}
    </div>
  );
}

export default HeaderButtons;
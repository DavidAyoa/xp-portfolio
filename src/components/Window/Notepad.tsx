import React, { useState } from 'react';
import clsx from 'clsx';

interface NotepadProps {
  onClose?: () => void;
  initialText?: string;
}

const Notepad: React.FC<NotepadProps> = ({ onClose, initialText = '' }) => {
  const [docText, setDocText] = useState(initialText);
  const [wordWrap, setWordWrap] = useState(false);

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Exit':
        onClose?.();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }

  function onTextAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.which === 9) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      setDocText(`${docText.substring(0, start)}\t${docText.substring(end)}`);

      requestAnimationFrame(() => {
        target.selectionStart = start + 1;
        target.selectionEnd = start + 1;
      });
    }
  }

  return (
    <div
      className="h-full flex flex-col items-stretch"
      style={{
        background: 'linear-gradient(to right, #edede5 0%, #ede8cd 100%)'
      }}
    >
      <section className="relative h-5 flex-shrink-0 border-b border-white">
        <SimpleMenu onClickItem={onClickOptionItem} />
      </section>
      <textarea
        className={clsx(
          'flex-auto outline-none font-mono text-sm leading-tight resize-none p-0.5 bg-white overflow-y-scroll border border-blue-300',
          {
            'whitespace-nowrap overflow-x-scroll': !wordWrap,
          }
        )}
        style={{
          fontFamily: "'Lucida Console', monospace",
          fontSize: '13px',
          lineHeight: '14px'
        }}
        value={docText}
        onChange={e => setDocText(e.target.value)}
        onKeyDown={onTextAreaKeyDown}
        spellCheck={false}
      />
    </div>
  );
};

const SimpleMenu: React.FC<{ onClickItem: (item: string) => void }> = ({ onClickItem }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = {
    File: [
      { text: 'New', disabled: true },
      { text: 'Open...', disabled: true },
      { text: 'Save', disabled: true },
      { text: 'Save As...', disabled: true },
      { text: 'separator' },
      { text: 'Page Setup...', disabled: true },
      { text: 'Print...', disabled: true },
      { text: 'separator' },
      { text: 'Exit', disabled: false }
    ],
    Edit: [
      { text: 'Undo', disabled: true },
      { text: 'separator' },
      { text: 'Cut', disabled: true },
      { text: 'Copy', disabled: true },
      { text: 'Paste', disabled: true },
      { text: 'Delete', disabled: true },
      { text: 'separator' },
      { text: 'Find...', disabled: true },
      { text: 'Find Next', disabled: true },
      { text: 'Replace...', disabled: true },
      { text: 'Go To...', disabled: true },
      { text: 'separator' },
      { text: 'Select All', disabled: true },
      { text: 'Time/Date', disabled: false }
    ],
    Format: [
      { text: 'Word Wrap', disabled: false },
      { text: 'Font...', disabled: true }
    ],
    View: [
      { text: 'Status Bar', disabled: true }
    ],
    Help: [
      { text: 'Help Topics', disabled: true },
      { text: 'About Notepad', disabled: true }
    ]
  };

  return (
    <div className="flex items-center h-full px-1 text-xs" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {Object.keys(menus).map(menuName => (
        <div
          key={menuName}
          className={clsx(
            'relative px-2 py-0.5 cursor-pointer',
            {
              'bg-blue-600 text-white': activeMenu === menuName,
              'bg-transparent text-black': activeMenu !== menuName,
            }
          )}
          onMouseEnter={() => setActiveMenu(menuName)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          {menuName}
          {activeMenu === menuName && (
            <div className="absolute top-full left-0 bg-white border border-gray-500 shadow-lg z-50 min-w-38 text-xs">
              {menus[menuName as keyof typeof menus].map((item, index) => (
                item.text === 'separator' ? (
                  <div key={index} className="h-px bg-gray-300 my-0.5" />
                ) : (
                  <div
                    key={index}
                    className={clsx(
                      'px-5 py-1 hover:bg-blue-600 hover:text-white',
                      {
                        'text-gray-400 cursor-default hover:bg-transparent hover:text-gray-400': item.disabled,
                        'text-black cursor-pointer': !item.disabled,
                      }
                    )}
                    onClick={() => !item.disabled && onClickItem(item.text)}
                  >
                    {item.text}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default Notepad;
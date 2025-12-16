import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NotepadProps {
  onClose?: () => void;
  initialText?: string;
  startInMarkdownMode?: boolean;
}

interface HeaderItem {
  id: string;
  text: string;
  level: number;
}

const Notepad: React.FC<NotepadProps> = ({ onClose, initialText = '', startInMarkdownMode = false }) => {
  const [docText, setDocText] = useState(initialText);
  const [wordWrap, setWordWrap] = useState(false);
  const [markdownMode, setMarkdownMode] = useState(startInMarkdownMode);
  const [headers, setHeaders] = useState<HeaderItem[]>([]);
  const markdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (markdownMode && docText) {
      extractHeaders(docText);
    }
  }, [markdownMode, docText]);

  function extractHeaders(text: string) {
    const headerRegex = /^#{1,6}\s+(.+)$/gm;
    const matches = [...text.matchAll(headerRegex)];
    const headerList: HeaderItem[] = matches.map(match => {
      const level = match[0].indexOf(' ');
      const text = match[1].replace(/\*\*/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { id, text, level };
    });
    setHeaders(headerList);
  }

  function scrollToHeader(id: string) {
    const element = document.getElementById(id);
    if (element && markdownContainerRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Exit':
        onClose?.();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Markdown Preview':
        setMarkdownMode(!markdownMode);
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
        <SimpleMenu
          onClickItem={onClickOptionItem}
          markdownMode={markdownMode}
          headers={headers}
          onNavigate={scrollToHeader}
        />
      </section>
      {markdownMode ? (
        <>
          <style>{`
            .markdown-preview h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; border-bottom: 1px solid #ccc; padding-bottom: 0.3em; }
            .markdown-preview h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
            .markdown-preview h3 { font-size: 1.3em; font-weight: bold; margin: 0.83em 0; }
            .markdown-preview h4 { font-size: 1.1em; font-weight: bold; margin: 1em 0; }
            .markdown-preview h5 { font-size: 0.9em; font-weight: bold; margin: 1.2em 0; }
            .markdown-preview h6 { font-size: 0.8em; font-weight: bold; margin: 1.4em 0; }
            .markdown-preview p { margin: 1em 0; }
            .markdown-preview ul, .markdown-preview ol { margin: 1em 0; padding-left: 2em; }
            .markdown-preview li { margin: 0.5em 0; }
            .markdown-preview blockquote { margin: 1em 0; padding: 0.5em 1em; border-left: 4px solid #3b82f6; background: #eff6ff; color: #1e40af; }
            .markdown-preview code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; font-size: 0.9em; color: #c7254e; }
            .markdown-preview pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 6px; overflow-x: auto; margin: 1em 0; }
            .markdown-preview pre code { background: none; padding: 0; color: #e2e8f0; }
            .markdown-preview table { border-collapse: collapse; width: 100%; margin: 1em 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .markdown-preview table th, .markdown-preview table td { border: 1px solid #ddd; padding: 10px 14px; text-align: left; }
            .markdown-preview table th { background-color: #3b82f6; color: white; font-weight: bold; }
            .markdown-preview table tr:nth-child(even) { background-color: #f9fafb; }
            .markdown-preview table tr:hover { background-color: #f3f4f6; }
            .markdown-preview a { color: #2563eb; text-decoration: underline; }
            .markdown-preview a:hover { color: #1d4ed8; }
            .markdown-preview hr { border: 0; border-top: 2px solid #e5e7eb; margin: 1.5em 0; }
            .markdown-preview img { max-width: 100%; height: auto; border-radius: 4px; }
            .markdown-preview input[type="checkbox"] { margin-right: 0.5em; }
            .markdown-preview strong { font-weight: 700; color: #1f2937; }
            .markdown-preview em { font-style: italic; }
          `}</style>
          <div
            ref={markdownContainerRef}
            className="markdown-preview flex-auto overflow-y-scroll p-4 bg-white border border-blue-300"
            style={{
              fontFamily: "Segoe UI, Tahoma, sans-serif",
              fontSize: '14px',
              lineHeight: '1.6'
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h1 id={id}>{children}</h1>;
                },
                h2: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h3 id={id}>{children}</h3>;
                },
                h4: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h4 id={id}>{children}</h4>;
                },
                h5: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h5 id={id}>{children}</h5>;
                },
                h6: ({ children }) => {
                  const text = String(children).replace(/\*\*/g, '').trim();
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h6 id={id}>{children}</h6>;
                },
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#0066cc', textDecoration: 'underline' }}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {docText}
            </ReactMarkdown>
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

const SimpleMenu: React.FC<{
  onClickItem: (item: string) => void;
  markdownMode: boolean;
  headers: HeaderItem[];
  onNavigate: (id: string) => void;
}> = ({ onClickItem, markdownMode, headers, onNavigate }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus: Record<string, Array<{ text: string; disabled: boolean; checked?: boolean; id?: string; isNavItem?: boolean }>> = {
    File: [
      { text: 'New', disabled: true },
      { text: 'Open...', disabled: true },
      { text: 'Save', disabled: true },
      { text: 'Save As...', disabled: true },
      { text: 'separator', disabled: false },
      { text: 'Page Setup...', disabled: true },
      { text: 'Print...', disabled: true },
      { text: 'separator', disabled: false },
      { text: 'Exit', disabled: false }
    ],
    Edit: [
      { text: 'Undo', disabled: true },
      { text: 'separator', disabled: false },
      { text: 'Cut', disabled: true },
      { text: 'Copy', disabled: true },
      { text: 'Paste', disabled: true },
      { text: 'Delete', disabled: true },
      { text: 'separator', disabled: false },
      { text: 'Find...', disabled: true },
      { text: 'Find Next', disabled: true },
      { text: 'Replace...', disabled: true },
      { text: 'Go To...', disabled: true },
      { text: 'separator', disabled: false },
      { text: 'Select All', disabled: true },
      { text: 'Time/Date', disabled: false }
    ],
    Format: [
      { text: 'Word Wrap', disabled: false },
      { text: 'Font...', disabled: true }
    ],
    View: [
      { text: 'Markdown Preview', disabled: false, checked: markdownMode },
      { text: 'Status Bar', disabled: true }
    ],
    Navigate: markdownMode ? headers.map(h => ({
      text: h.text,
      disabled: false,
      id: h.id,
      isNavItem: true
    })) : [{ text: '(Only in Markdown Preview)', disabled: true }],
    Help: [
      { text: 'Help Topics', disabled: true },
      { text: 'About Notepad', disabled: true }
    ]
  };

  return (
    <div className="flex items-center h-full px-1 text-[11px] font-[Tahoma,sans-serif]">
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
            <div className="absolute top-full left-0 bg-white border border-gray-500 shadow-lg z-50 min-w-38 text-[11px] max-h-96 overflow-y-auto">
              {menus[menuName as keyof typeof menus].map((item, index) => (
                item.text === 'separator' ? (
                  <div key={index} className="h-px bg-gray-300 my-0.5" />
                ) : (
                  <div
                    key={index}
                    className={clsx(
                      'px-5 py-1 hover:bg-blue-600 hover:text-white whitespace-nowrap',
                      {
                        'text-gray-400 cursor-default hover:bg-transparent hover:text-gray-400': item.disabled,
                        'text-black cursor-pointer': !item.disabled,
                      }
                    )}
                    onClick={() => {
                      if (!item.disabled) {
                        if (item.isNavItem && item.id) {
                          onNavigate(item.id);
                          setActiveMenu(null);
                        } else {
                          onClickItem(item.text);
                        }
                      }
                    }}
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
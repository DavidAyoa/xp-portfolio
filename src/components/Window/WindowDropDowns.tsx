import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface DropDownItem {
  type: 'item' | 'separator' | 'menu';
  text?: string;
  hotkey?: string;
  disable?: boolean;
  symbol?: string;
  position?: { left: string; top: string };
  items?: DropDownItem[];
}

interface WindowDropDownProps {
  items: DropDownItem[];
  onClick: (name: string) => void;
  position?: { top: string; left: string };
}

const WindowDropDown: React.FC<WindowDropDownProps> = ({ items, onClick, position }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div
      className="absolute bg-white border border-gray-400 shadow-md z-[1000] p-0.5"
      style={{
        ...position,
        fontSize: '11px',
        minWidth: '160px',
        width: 'max-content',
        boxShadow: '2px 2px 1px rgb(100, 100, 100)',
      }}
    >
      {items.map((item, index) => {
        if (item.type === 'separator') {
          return (
            <div
              key={index}
              className="h-px bg-gray-300 my-1"
            />
          );
        }

        return (
          <div
            key={index}
            className={clsx(
              "grid grid-cols-[16px_auto_auto_15px_0px] items-center cursor-pointer px-1 py-0.5 whitespace-nowrap",
              item.disable && "text-gray-400 cursor-default",
              hoveredIndex === index && !item.disable && "bg-orange-400 invert"
            )}
            style={{
              fontSize: '11px',
              lineHeight: '18px',
              fontFamily: 'Tahoma, "Noto Sans", sans-serif',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
            onClick={() => !item.disable && onClick(item.text || '')}
          >
            <span></span>
            <span>{item.text}</span>
            {item.hotkey && (
              <span className="text-right pr-2 text-[11px]">{item.hotkey}</span>
            )}
            {item.type === 'menu' && <span className="justify-self-center">▶</span>}
            <span></span>
          </div>
        );
      })}
    </div>
  );
};

interface WindowDropDownsProps {
  items: Record<string, DropDownItem[]>;
  onClickItem: (name: string) => void;
  className?: string;
  height?: number;
}

export const WindowDropDowns: React.FC<WindowDropDownsProps> = ({
  items,
  onClickItem,
  className,
  height = 21,
}) => {
  const dropDown = useRef<HTMLDivElement>(null);
  const [openOption, setOpenOption] = useState('');

  function hoverOption(option: string) {
    if (openOption) setOpenOption(option);
  }

  function _onClickItem(name: string) {
    setOpenOption('');
    onClickItem(name);
  }

  function onMouseUp(e: MouseEvent) {
    if (!dropDown.current?.contains(e.target as Node)) setOpenOption('');
  }

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div
      ref={dropDown}
      className="flex relative bg-[#ECE9D8]"
      style={{ height: `${height}px`, lineHeight: `${height}px`, fontSize: '11px' }}
    >
      {Object.keys(items).map(name => (
        <div className="relative h-full" key={name}>
          <div
            onMouseDown={() => setOpenOption(name)}
            onMouseEnter={() => hoverOption(name)}
            className={clsx(
              "px-2 cursor-pointer h-full flex items-center mx-px border border-transparent whitespace-nowrap",
              openOption === name
                ? "bg-[#1660e8] text-white border-[#1660e8]"
                : "hover:bg-[#1660e8] hover:text-white hover:border-[#1660e8]"
            )}
            style={{ fontSize: '11px', fontFamily: 'Tahoma, "Noto Sans", sans-serif' }}
          >
            {name}
          </div>
          {openOption === name && (
            <WindowDropDown
              onClick={_onClickItem}
              items={items[name]}
              position={{ top: `${height}px`, left: '0' }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default WindowDropDowns;
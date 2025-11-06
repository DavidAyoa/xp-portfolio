import React, { useRef, useEffect } from 'react';
import { logger } from '../utils/logger';

interface Icon {
  id: string;
  title: string;
  imgSrc: string;
  component: string;
  isFocus: boolean;
}

interface DesktopIconsProps {
  icons: Icon[];
  onDoubleClick: (component: string) => void;
  onFocus: (iconId: string) => void;
  displayFocus: boolean;
  onIconMeasure?: (iconRect: { id: string; x: number; y: number; w: number; h: number }) => void;
  onIconContextMenu?: (iconId: string, x: number, y: number) => void;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({
  icons,
  onDoubleClick,
  onFocus,
  displayFocus,
  onIconMeasure,
  onIconContextMenu
}) => {
  // Remove React synthetic event handlers - we'll use native event listeners instead

  const IconComponent: React.FC<{ icon: Icon }> = ({ icon }) => {
    const ref = useRef<HTMLDivElement>(null);
    const hasMeasuredRef = useRef(false);

    useEffect(() => {
      const target = ref.current;
      if (!target || !onIconMeasure || hasMeasuredRef.current) return;

      // Use requestAnimationFrame to ensure DOM is rendered
      const measureIcon = () => {
        const { left, top, width, height } = target.getBoundingClientRect();
        const posX = left + window.scrollX;
        const posY = top + window.scrollY;

        onIconMeasure({ id: icon.id, x: posX, y: posY, w: width, h: height });
        hasMeasuredRef.current = true;
      };

      requestAnimationFrame(measureIcon);
    }, [icon.id]);

    // Simple event handlers like winXP-example - NO preventDefault on mouseDown
    const handleMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      logger.log('🎯 ICON MOUSE DOWN:', icon.id);
      onFocus(icon.id);
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      logger.log('🎯 DOUBLE CLICK:', icon.component);
      onDoubleClick(icon.component);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (onIconContextMenu) {
        logger.log('📋 CONTEXT MENU:', icon.id);
        onIconContextMenu(icon.id, e.clientX, e.clientY);
      }
    };

    return (
      <div
        ref={ref}
        key={icon.id}
        className="flex flex-col items-center w-20 cursor-pointer"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        style={{
          transition: 'none',
          transform: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.filter = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.filter = 'none';
        }}
      >
        <img
          src={icon.imgSrc}
          alt={icon.title}
          className="w-8 h-8 mb-1"
          style={{
            filter: displayFocus && icon.isFocus ? 'brightness(0.7)' : 'none',
            transition: 'none',
            transform: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = displayFocus && icon.isFocus ? 'brightness(0.7)' : 'none';
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = displayFocus && icon.isFocus ? 'brightness(0.7)' : 'none';
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
          }}
        />
        <span
          className="text-white text-center px-1 py-0.5 leading-tight"
          style={{
            fontSize: '10px',
            backgroundColor: displayFocus && icon.isFocus ? '#0B61FF' : 'transparent',
            textShadow: displayFocus && icon.isFocus ? 'none' : '1px 1px 2px rgba(0,0,0,0.8)',
            transition: 'none',
            transform: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = displayFocus && icon.isFocus ? '#0B61FF' : 'transparent';
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = displayFocus && icon.isFocus ? '#0B61FF' : 'transparent';
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'none';
          }}
        >
          {icon.title.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
              {line}
              {index < array.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      </div>
    );
  };

  return (
    <div className="absolute top-0 left-0 p-4">
      <div className="grid grid-cols-1 gap-4">
        {icons.map((icon) => (
          <IconComponent key={icon.id} icon={icon} />
        ))}
      </div>
    </div>
  );
};

export default DesktopIcons;
import React, { useState } from 'react';
import './SubMenu.css';

interface MenuItem {
  type: 'item' | 'separator' | 'menu';
  icon?: string;
  text?: string;
  items?: MenuItem[];
  left?: string;
  bottom?: string;
}

interface SubMenuProps {
  data: MenuItem[];
  onClick: (item: string) => void;
  left?: string;
  bottom?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ data, onClick, left = '100%', bottom = '-1px' }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

  return (
    <div
      className="sub-menu"
      style={{
        left,
        bottom,
      }}
    >
      {data.map((item, index) => (
        <SubMenuItem
          onClick={onClick}
          onHover={setHoverIndex}
          key={index}
          hover={hoverIndex === index}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
};

interface SubMenuItemProps {
  index: number;
  item: MenuItem;
  hover: boolean;
  onHover: (index: number) => void;
  onClick: (item: string) => void;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ index, item, hover, onHover, onClick }) => {
  function _onMouseOver() {
    onHover(index);
  }

  function _onClick() {
    if (item.text) {
      onClick(item.text);
    }
  }

  switch (item.type) {
    case 'item':
      return (
        <div
          onClick={_onClick}
          onMouseEnter={_onMouseOver}
          className="sub-menu-item"
        >
          <img className="sub-menu-img" src={item.icon} alt="" />
          <div className="sub-menu-text">{item.text}</div>
        </div>
      );
    case 'separator':
      return <div className="sub-menu-separator" />;
    case 'menu':
      return (
        <div
          onMouseEnter={_onMouseOver}
          className={`sub-menu-item ${hover ? 'hover' : ''}`}
        >
          <img className="sub-menu-img" src={item.icon} alt="" />
          <div className="sub-menu-text">{item.text}</div>
          <div className="sub-menu-arrow">
            {hover && item.items && (
              <SubMenu
                data={item.items}
                bottom={item.bottom}
                onClick={onClick}
              />
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default SubMenu;
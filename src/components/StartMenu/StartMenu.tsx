import React, { useState } from 'react';
import clsx from 'clsx';
import SubMenu from './SubMenu';
import './StartMenu.css';

interface StartMenuProps {
  className?: string;
  onClick: (item: string) => void;
  currentUser?: string;
}

interface MenuItem {
  type: 'item' | 'separator' | 'menu';
  icon?: string;
  text?: string | React.ReactNode;
  items?: MenuItem[];
  subtext?: string;
  left?: string;
  bottom?: string;
}

const StartMenu: React.FC<StartMenuProps> = ({ className, onClick, currentUser = "CodePoets Team" }) => {
  const [hovering, setHovering] = useState('');

  const allProgramsData: MenuItem[] = [
    {
      type: 'item',
      icon: '/img/icons/windowsIcons/227(32x32).png',
      text: 'Set Program Access and Defaults',
    },
    {
      type: 'separator',
    },
    {
      type: 'menu',
      icon: '/img/icons/windowsIcons/358(16x16).png',
      text: 'Accessories',
      items: [
        {
          type: 'item',
          icon: '/img/icons/cmd-icon-sm.webp',
          text: 'Command Prompt',
        },
        {
          type: 'item',
          icon: '/img/icons/notepad/notepad-icon-sm.webp',
          text: 'Notepad',
        },
        {
          type: 'item',
          icon: '/img/icons/paint.png',
          text: 'Paint',
        },
      ],
    },
    {
      type: 'menu',
      icon: '/img/icons/windowsIcons/358(16x16).png',
      text: 'Games',
      items: [
        {
          type: 'item',
          icon: '/img/icons/minesweeper/minesweeper-icon-sm.webp',
          text: 'Minesweeper',
        },
      ],
    },
    {
      type: 'item',
      icon: '/img/icons/explorer-icon-sm.webp',
      text: 'Internet Explorer',
    },
  ];

  const myRecentDocuments: MenuItem[] = [
    {
      type: 'item',
      icon: '/img/icons/empty.png',
      text: '(Empty)',
    },
  ];

  const connectTo: MenuItem[] = [
    {
      type: 'item',
      icon: '/img/icons/windowsIcons/309(16x16).png',
      text: 'Show all connections',
    },
  ];

  function onMouseEnter(text: string) {
    setHovering(text);
  }

  const MenuItem: React.FC<{
    style?: React.CSSProperties;
    text: string | React.ReactNode;
    icon: string;
    children?: React.ReactNode;
    subtext?: string;
  }> = ({ style, text, icon, children, subtext }) => {
    function _onClick() {
      if (typeof text === 'string') {
        onClick(text);
      }
    }

    function _onMouseEnter() {
      if (typeof text === 'string') {
        onMouseEnter(text);
      }
    }

    return (
      <div
        className="menu__item"
        style={style}
        onClick={_onClick}
        onMouseEnter={_onMouseEnter}
      >
        <img className="menu__item__img" src={icon} alt={typeof text === 'string' ? text : ''} />
        <div className="menu__item__texts">
          <div className="menu__item__text">{text}</div>
          {subtext && <div className="menu__item__subtext">{subtext}</div>}
          {children}
        </div>
      </div>
    );
  };

  const MenuItems: React.FC<{ items: Array<{ icon: string; text: string; subtext?: string }> }> = ({ items }) => {
    return (
      <>
        {items.map((item, i) => (
          <MenuItem key={i} {...item} />
        ))}
      </>
    );
  };

  return (
    <div className={clsx("start-menu", className)}>
      {/* Header */}
      <header className="start-menu__header">
        <div className="start-menu__header-shine"></div>
        <img
          className="header__img"
          src={currentUser === 'CodePoets Team' ? '/img/team-logo.webp' : '/img/guest.JPG'}
          alt="avatar"
        />
        <span className="header__text">{currentUser}</span>
      </header>

      {/* Menu */}
      <section className="menu">
        {/* Orange gradient line */}
        <hr className="orange-hr" />

        {/* Left Panel */}
        <div className="menu__left">
          <MenuItem
            text="Internet"
            icon="/img/icons/explorer-icon-sm.webp"
            subtext="Internet Explorer"
          />
          <MenuItem
            text="E-mail"
            icon="/img/icons/contact/email-icon-sm.webp"
            subtext="Email Client"
          />

          <div className="menu__separator"></div>

          <MenuItems
            items={[
              { icon: '/img/icons/minesweeper/minesweeper-icon-sm.webp', text: 'Minesweeper' },
              { icon: '/img/icons/notepad/notepad-icon-sm.webp', text: 'Notepad' },
              { icon: '/img/icons/music/winamp-icon-lg.png', text: 'Winamp' },
              { icon: '/img/icons/paint.png', text: 'Paint' },
              { icon: '/img/icons/cmd-icon-sm.webp', text: 'Terminal' },
            ]}
          />

          <div className="flex-1" />
          <div className="menu__separator"></div>

          <div
            className="menu__item"
            style={
              hovering === 'All Programs'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            onMouseEnter={() => onMouseEnter('All Programs')}
          >
            <img className="menu__item__img" src="/img/icons/empty.png" alt="" />
            <div className="menu__item__texts">
              <div className="menu__item__text">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  All Programs
                  <img
                    src="/img/icons/windowsIcons/all-programs.ico"
                    alt=""
                    style={{ marginLeft: '5px', height: '18px' }}
                  />
                </div>
              </div>
            </div>
            {hovering === 'All Programs' && (
              <SubMenu data={allProgramsData} onClick={onClick} left="100%" bottom="0" />
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="menu__right">
          <MenuItem text="My Documents" icon="/img/icons/documents/folder-docs-icon-sm.webp" />

          <div
            className="menu__item"
            style={
              hovering === 'My Recent Documents'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            onMouseEnter={() => onMouseEnter('My Recent Documents')}
          >
            <img className="menu__item__img" src="/img/icons/windowsIcons/301(32x32).png" alt="" />
            <div className="menu__item__texts">
              <div className="menu__item__text">My Recent Documents</div>
              <div
                style={{
                  borderLeftColor: hovering === 'My Recent Documents' ? '#FFF' : '#00136b',
                }}
                className="menu__arrow"
              />
              {hovering === 'My Recent Documents' && (
                <SubMenu
                  left="153px"
                  data={myRecentDocuments}
                  onClick={onClick}
                />
              )}
            </div>
          </div>

          <MenuItems
            items={[
              { icon: '/img/icons/documents/folder-docs-icon-sm.webp', text: 'My Pictures' },
              { icon: '/img/icons/music/winamp-icon-lg.png', text: 'My Music' },
              { icon: '/img/icons/computer-icon-lg.png', text: 'My Computer' },
            ]}
          />

          <div className="menu__separator menu__separator--right"></div>

          <MenuItems
            items={[
              { icon: '/img/icons/windowsIcons/300(32x32).png', text: 'Control Panel' },
              { icon: '/img/icons/windowsIcons/227(32x32).png', text: 'Set Program Access and Defaults' },
            ]}
          />

          <div
            className="menu__item"
            style={
              hovering === 'Connect To'
                ? {
                    backgroundColor: '#2f71cd',
                    color: '#FFF',
                  }
                : {}
            }
            onMouseEnter={() => onMouseEnter('Connect To')}
          >
            <img className="menu__item__img" src="/img/icons/windowsIcons/309(32x32).png" alt="" />
            <div className="menu__item__texts">
              <div className="menu__item__text">Connect To</div>
              <div
                style={{
                  borderLeftColor: hovering === 'Connect To' ? '#FFF' : '#00136b',
                }}
                className="menu__arrow"
              />
              {hovering === 'Connect To' && (
                <SubMenu left="153px" data={connectTo} onClick={onClick} />
              )}
            </div>
          </div>

          <MenuItem text="Printers and Faxes" icon="/img/icons/windowsIcons/549(32x32).png" />

          <div className="menu__separator menu__separator--right"></div>

          <MenuItems
            items={[
              { icon: '/img/icons/windowsIcons/747(32x32).png', text: 'Help and Support' },
              { icon: '/img/icons/windowsIcons/299(32x32).png', text: 'Search' },
              { icon: '/img/icons/windowsIcons/743(32x32).png', text: 'Run...' },
            ]}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="start-menu__footer">
        <div className="footer__item" onClick={() => onClick('Log Off')}>
          <img className="footer__item__img" src="/img/icons/windowsIcons/546(32x32).png" alt="" />
          <span>Log Off</span>
        </div>
        <div
          className="footer__item"
          onClick={() => onClick('Turn Off Computer')}
        >
          <img className="footer__item__img" src="/img/icons/windowsIcons/310(32x32).png" alt="" />
          <span>Turn Off Computer</span>
        </div>
      </footer>
    </div>
  );
};

export default StartMenu;
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { WindowDropDowns } from './WindowDropDowns';

// Asset imports (using public folder paths for now)
const assets = {
  go: '/windowsIcons/290.png',
  search: '/windowsIcons/299(32x32).png',
  computer: '/windowsIcons/676(16x16).png',
  back: '/windowsIcons/back.png',
  forward: '/windowsIcons/forward.png',
  up: '/windowsIcons/up.png',
  viewInfo: '/windowsIcons/view-info.ico',
  remove: '/windowsIcons/302(16x16).png',
  control: '/windowsIcons/300(16x16).png',
  network: '/windowsIcons/693(16x16).png',
  folderSmall: '/windowsIcons/318(16x16).png',
  menu: '/windowsIcons/358(32x32).png',
  folder: '/windowsIcons/318(48x48).png',
  folderOpen: '/windowsIcons/337(32x32).png',
  disk: '/windowsIcons/334(48x48).png',
  cd: '/windowsIcons/111(48x48).png',
  dropdown: '/windowsIcons/dropdown.png',
  pullup: '/windowsIcons/pullup.png',
  windows: '/windowsIcons/windows.png',
  logo: '/github-logo.png',
  txtIcon: '/img/icons/documents/txt-icon.webp'
};

// Dropdown menu data
const dropDownData = {
  File: [
    { type: 'item' as const, text: 'Create Shortcut', disable: true },
    { type: 'item' as const, text: 'Delete', disable: true },
    { type: 'item' as const, text: 'Rename', disable: true },
    { type: 'item' as const, text: 'Properties', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Close' }
  ],
  Edit: [
    { type: 'item' as const, text: 'Undo', hotkey: 'Ctrl+Z', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Cut', hotkey: 'Ctrl+X', disable: true },
    { type: 'item' as const, text: 'Copy', hotkey: 'Ctrl+C', disable: true },
    { type: 'item' as const, text: 'Paste', hotkey: 'Ctrl+V', disable: true },
    { type: 'item' as const, text: 'Paste Shortcut', disable: true },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Select All', hotkey: 'Ctrl+A' },
    { type: 'item' as const, text: 'Invert Selection' }
  ],
  View: [
    { type: 'item' as const, text: 'Thumbnails' },
    { type: 'item' as const, text: 'Tiles', symbol: 'circle' },
    { type: 'item' as const, text: 'Icons' },
    { type: 'item' as const, text: 'List' },
    { type: 'item' as const, text: 'Details' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'Refresh' }
  ],
  Favorites: [
    { type: 'item' as const, text: 'Add to Favorites...' },
    { type: 'item' as const, text: 'Organize Favorites...' }
  ],
  Tools: [
    { type: 'item' as const, text: 'Map Network Drive...' },
    { type: 'item' as const, text: 'Disconnect Network Drive...' },
    { type: 'item' as const, text: 'Folder Options...' }
  ],
  Help: [
    { type: 'item' as const, text: 'Help and Support Center' },
    { type: 'separator' as const },
    { type: 'item' as const, text: 'About Windows' }
  ]
};

interface FileManagerProps {
  onClose?: () => void;
  type?: 'computer' | 'projects' | 'clients' | 'sharedDocs' | 'userDocs' | 'aboutUsPictures';
}

function FileManager({ onClose, type = 'computer' }: FileManagerProps) {
  console.log('🗂️ FileManager rendering with type:', type);
  const [currentView, setCurrentView] = useState<string>(type);
  const [history, setHistory] = useState<string[]>([type]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Image viewer states
  const [viewerMode, setViewerMode] = useState<'none' | 'scroll' | 'carousel'>('none');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const isProjects = currentView === 'projects';
  const isClients = currentView === 'clients';
  const isSharedDocs = currentView === 'sharedDocs';
  const isUserDocs = currentView === 'userDocs';
  const isAboutUsPictures = currentView === 'aboutUsPictures';

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const navigateTo = (view: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(view);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentView(view);
  };

  const goBack = () => {
    if (canGoBack) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentView(history[newIndex]);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentView(history[newIndex]);
    }
  };

  // Image viewer handlers
  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
    setViewerMode('scroll');

    // Scroll to the selected image after a brief delay for rendering
    setTimeout(() => {
      const imageElement = document.getElementById(`scroll-image-${index}`);
      if (imageElement) {
        imageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleImageClick = () => {
    if (viewerMode === 'scroll') {
      setViewerMode('carousel');
    }
  };

  const closeViewer = () => {
    setViewerMode('none');
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % aboutUsPictures.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => {
      const picturesLength = aboutUsPictures?.length || 5;
      return (prev - 1 + picturesLength) % picturesLength;
    });
  };

  // Project folders for "Our Work"
  const projectFolders = [
    { name: 'E-Commerce Platform', icon: assets.folder },
    { name: 'Portfolio Website', icon: assets.folder },
    { name: 'Mobile Banking App', icon: assets.folder },
    { name: 'CRM Dashboard', icon: assets.folder },
    { name: 'AI Chatbot System', icon: assets.folder },
    { name: 'Cloud Storage App', icon: assets.folder },
    { name: 'Social Media Analytics', icon: assets.folder },
  ];

  // Client folders
  const clientFolders = [
    { name: 'Acme Corporation', icon: assets.folder },
    { name: 'TechStart Inc.', icon: assets.folder },
    { name: 'Global Solutions Ltd.', icon: assets.folder },
    { name: 'Innovation Partners', icon: assets.folder },
    { name: 'Digital Ventures', icon: assets.folder },
    { name: 'Future Systems', icon: assets.folder },
    { name: 'Nexus Technologies', icon: assets.folder },
    { name: 'Prime Industries', icon: assets.folder },
  ];

  // Shared Documents content (has files, use folder)
  const sharedDocuments = [
    { name: 'Information About Us', icon: assets.folder, onClick: () => navigateTo('aboutUsPictures') },
  ];

  // About Us Pictures
  const aboutUsPictures = [
    { name: 'Luffy One Piece 4k Wallpaper', src: '/pictures/Luffy One Piece 4k Wallpaper.jpg' },
    { name: 'One Piece 4k Wallpaper Top Ultra Background (1)', src: '/pictures/One Piece 4k Wallpaper Top Ultra Background (1).png' },
    { name: 'One Piece 4k Wallpaper Top Ultra Background', src: '/pictures/One Piece 4k Wallpaper Top Ultra Background.png' },
    { name: 'wallpaperflare.com_wallpaper (1)', src: '/pictures/wallpaperflare.com_wallpaper (1).jpg' },
    { name: 'wallpaperflare.com_wallpaper', src: '/pictures/wallpaperflare.com_wallpaper.jpg' },
  ];

  // User Documents content (txt file, use txt icon)
  const userDocuments = [
    { name: 'Team Members.txt', icon: assets.txtIcon },
  ];
  function onClickOptionItem(item: string) {
    switch (item) {
      case 'Close':
        onClose?.();
        break;
      default:
        // Handle other menu items
        break;
    }
  }

  return (
    <div className="h-full w-full absolute flex overflow-hidden flex-col bg-gradient-to-r from-[#edede5] to-[#ede8cd]">
      {/* Toolbar */}
      <section className="relative flex items-center h-6 border-b border-white/70 flex-shrink-0">
        <div className="h-[23px] border-b border-black/10 border-r border-black/10 px-[2px] py-[1px] flex-1">
          <WindowDropDowns
            items={dropDownData}
            onClickItem={onClickOptionItem}
          />
        </div>
        <img
          className="h-full border-l border-white border-b border-black/10"
          src={assets.windows}
          alt="windows"
        />
      </section>

      {/* Function Bar */}
      <section className="h-9 flex items-center text-[11px] px-1 py-0 border-b border-black/10 flex-shrink-0">
        {/* Back button */}
        <div
          className={clsx(
            "flex h-full items-center border border-transparent cursor-pointer",
            canGoBack
              ? "hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)] active:border-[#b9b9b9] active:bg-[#dedede]"
              : "grayscale opacity-70 pointer-events-none"
          )}
          onClick={goBack}
        >
          <img className="h-[30px] w-[30px]" src={assets.back} alt="back" />
          <span className="mr-1 text-[11px]">Back</span>
          <div className="h-full flex items-center mx-1">
            <div className="border-l-[3px] border-r-[3px] border-b-0 border-l-black border-r-transparent border-solid" />
          </div>
        </div>

        {/* Forward button */}
        <div
          className={clsx(
            "flex h-full items-center border border-transparent cursor-pointer",
            canGoForward
              ? "hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)] active:border-[#b9b9b9] active:bg-[#dedede]"
              : "grayscale opacity-70 pointer-events-none"
          )}
          onClick={goForward}
        >
          <img className="h-[30px] w-[30px]" src={assets.forward} alt="forward" />
          <div className="h-full flex items-center mx-1">
            <div className="border-l-[3px] border-r-[3px] border-b-0 border-l-black border-r-transparent border-solid" />
          </div>
        </div>

        {/* Up button */}
        <div className="flex h-full items-center border border-transparent rounded hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)] active:border-[#b9b9b9] active:bg-[#dedede] active:shadow-[inset_0_-1px_1px_rgba(255,255,255,0.7)]">
          <img className="h-[22px] w-[22px] mx-1" src={assets.up} alt="up" />
        </div>

        {/* Separator */}
        <div className="h-[90%] w-px bg-black/20 mx-[2px]" />

        {/* Search button */}
        <div className="flex h-full items-center border border-transparent rounded hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]">
          <img className="h-[22px] w-[22px] mx-1" src={assets.search} alt="search" />
          <span className="mr-1 text-[11px]">Search</span>
        </div>

        {/* Folders button */}
        <div className="flex h-full items-center border border-transparent rounded hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]">
          <img className="h-[22px] w-[22px] mx-1" src={assets.folderOpen} alt="folders" />
          <span className="mr-1 text-[11px]">Folders</span>
        </div>

        {/* Separator */}
        <div className="h-[90%] w-px bg-black/20 mx-[2px]" />

        {/* Views button */}
        <div className="flex h-full items-center border border-transparent rounded hover:border-black/10 hover:shadow-[inset_0_-1px_1px_rgba(0,0,0,0.1)]">
          <img className="h-[22px] w-[22px] mx-[2px]" src={assets.menu} alt="menu" />
          <div className="h-full flex items-center mx-1">
            <div className="border-l-[3px] border-r-[3px] border-b-0 border-l-black border-r-transparent border-solid" />
          </div>
        </div>
      </section>

      {/* Address Bar */}
      <section className="flex-shrink-0 border-t border-white/70 h-5 text-[11px] flex items-center px-[2px] shadow-[inset_0_-2px_3px_-1px_#b0b0b0]">
        <div className="text-black/50 px-[5px] leading-[100%]">Address</div>
        <div className="border border-[rgba(122,122,255,0.6)] h-full flex flex-1 items-center bg-white relative">
          <img className="w-[14px] h-[14px]" src={isAboutUsPictures || isSharedDocs || isUserDocs ? assets.folder : isClients ? assets.cd : isProjects ? assets.folder : assets.computer} alt="folder" />
          <div className="whitespace-nowrap absolute left-4 right-[17px] overflow-hidden text-ellipsis">
            {isAboutUsPictures
              ? 'My Computer > Shared Documents > Information About Us'
              : isSharedDocs
              ? 'My Computer > Shared Documents'
              : isUserDocs
              ? "My Computer > User's Documents"
              : isClients
              ? 'My Computer > Clients (C:)'
              : isProjects
              ? 'My Computer > Our Work'
              : 'My Computer'}
          </div>
          <img
            className="w-[15px] h-[15px] absolute right-[1px] hover:brightness-110"
            src={assets.dropdown}
            alt="dropdown"
          />
        </div>
        <div className="flex items-center px-[5px] h-full relative">
          <img className="h-[95%] border border-white/20 mr-[3px]" src={assets.go} alt="go" />
          <span className="text-[11px]">Go</span>
        </div>
      </section>

      {/* Content Area */}
      <div className="flex-1 border border-black/40 border-t-0 bg-[#f1f1f1] overflow-auto text-[11px] relative">
        <div className="flex h-full overflow-auto">
          {/* Left Sidebar */}
          <div className="w-[180px] h-full bg-gradient-to-b from-[#748aff] to-[#4057d3] overflow-auto p-[10px]">
            {/* System Tasks Card */}
            <div className="rounded-t-[3px] w-full overflow-hidden mb-3">
              <div className="flex items-center h-[23px] pl-[11px] pr-[2px] cursor-pointer bg-gradient-to-r from-[rgb(240,240,255)] via-[rgb(240,240,255)] to-[rgb(168,188,255)]">
                <div className="font-bold text-[#0c327d] flex-1 text-[11px]">System Tasks</div>
                <img className="w-[18px] h-[18px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]" src={assets.pullup} alt="pullup" />
              </div>
              <div className="px-[10px] py-[5px] bg-gradient-to-r from-[rgb(180,200,251)] via-[rgb(164,185,251)] to-[rgb(180,200,251)] bg-[rgba(198,211,255,0.87)]">
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.viewInfo} alt="view" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Start a new project
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.remove} alt="remove" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    See Traditional Website
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.control} alt="control" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Join our team
                  </div>
                </div>
              </div>
            </div>

            {/* Other Places Card */}
            <div className="rounded-t-[3px] w-full overflow-hidden mb-3">
              <div className="flex items-center h-[23px] pl-[11px] pr-[2px] cursor-pointer bg-gradient-to-r from-[rgb(240,240,255)] via-[rgb(240,240,255)] to-[rgb(168,188,255)]">
                <div className="font-bold text-[#0c327d] flex-1 text-[11px]">Other Places</div>
                <img className="w-[18px] h-[18px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]" src={assets.pullup} alt="pullup" />
              </div>
              <div className="px-[10px] py-[5px] bg-gradient-to-r from-[rgb(180,200,251)] via-[rgb(164,185,251)] to-[rgb(180,200,251)] bg-[rgba(198,211,255,0.87)]">
                <div className="mb-[2px]">
                  <div className="font-bold text-[10px] leading-[14px] text-[#0c327d] mb-1">Our Offices</div>
                  <div className="flex mb-[2px]">
                    <img className="w-[14px] h-[14px] mr-[5px]" src={assets.network} alt="network" />
                    <a
                      href="https://maps.google.com/?q=New+York+City"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    >
                      New York
                    </a>
                  </div>
                  <div className="flex mb-[2px]">
                    <img className="w-[14px] h-[14px] mr-[5px]" src={assets.network} alt="network" />
                    <a
                      href="https://maps.google.com/?q=London+UK"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    >
                      London
                    </a>
                  </div>
                  <div className="flex mb-[2px]">
                    <img className="w-[14px] h-[14px] mr-[5px]" src={assets.network} alt="network" />
                    <a
                      href="https://maps.google.com/?q=Tokyo+Japan"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    >
                      Tokyo
                    </a>
                  </div>
                  <div className="flex mb-[2px]">
                    <img className="w-[14px] h-[14px] mr-[5px]" src={assets.network} alt="network" />
                    <a
                      href="https://maps.google.com/?q=Dubai+UAE"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    >
                      Dubai
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Card */}
            <div className="rounded-t-[3px] w-full overflow-hidden">
              <div className="flex items-center h-[23px] pl-[11px] pr-[2px] cursor-pointer bg-gradient-to-r from-[rgb(240,240,255)] via-[rgb(240,240,255)] to-[rgb(168,188,255)]">
                <div className="font-bold text-[#0c327d] flex-1 text-[11px]">Details</div>
                <img className="w-[18px] h-[18px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]" src={assets.pullup} alt="pullup" />
              </div>
              <div className="px-[10px] py-[5px] bg-gradient-to-r from-[rgb(180,200,251)] via-[rgb(164,185,251)] to-[rgb(180,200,251)] bg-[rgba(198,211,255,0.87)]">
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.logo} alt="github" />
                  <a
                    href="https://github.com/DavidAyoa/xp-portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="h-full overflow-auto bg-white flex-1">
            {isAboutUsPictures ? (
              /* About Us Pictures View */
              <div className="p-4">
                <div className="flex flex-wrap gap-3">
                  {aboutUsPictures.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer p-2 hover:bg-[#e6f3ff] border border-transparent hover:border-[#99ccff] rounded"
                      style={{ width: '120px' }}
                      onClick={() => openImageViewer(index)}
                    >
                      {/* Thumbnail */}
                      <div
                        className="bg-white border border-gray-400 flex items-center justify-center mb-1 overflow-hidden"
                        style={{
                          width: '96px',
                          height: '96px',
                          boxShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      {/* Filename */}
                      <div
                        className="text-center break-words w-full px-1"
                        style={{
                          fontSize: '11px',
                          lineHeight: '1.3',
                          color: '#000',
                          fontFamily: 'Tahoma, sans-serif'
                        }}
                      >
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isSharedDocs ? (
              /* Shared Documents View */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Shared Documents
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {sharedDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={doc.onClick}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={doc.icon} alt="document" />
                      <div className="whitespace-nowrap h-full">{doc.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isUserDocs ? (
              /* User Documents View */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  User's Documents
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {userDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={doc.icon} alt="document" />
                      <div className="whitespace-nowrap h-full">{doc.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isClients ? (
              /* Clients View */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Our Clients
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {clientFolders.map((client, index) => (
                    <div key={index} className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={client.icon} alt="folder" />
                      <div className="whitespace-nowrap h-full">{client.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isProjects ? (
              /* Our Work - Project Folders */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Company Projects
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {projectFolders.map((project, index) => (
                    <div key={index} className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={project.icon} alt="folder" />
                      <div className="whitespace-nowrap h-full">{project.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Files Stored on This Computer */}
                <div className="mb-4">
                  <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                    Files Stored on This Computer
                  </div>
                  <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('sharedDocs')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                      <div className="whitespace-nowrap h-full">Shared Documents</div>
                    </div>
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('userDocs')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                      <div className="whitespace-nowrap h-full">User's Documents</div>
                    </div>
                  </div>
                </div>

                {/* Hard Disk Drives */}
                <div className="mb-4">
                  <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                    Hard Disk Drives
                  </div>
                  <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                    <div className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">B: Branding</div>
                    </div>
                    <div className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">M: Marketing</div>
                    </div>
                    <div className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">T: Tech</div>
                    </div>
                    <div className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded">
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">W: Web</div>
                    </div>
                  </div>
                </div>

                {/* Devices with Removable Storage */}
                <div className="mb-4">
                  <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                    Devices with Removable Storage
                  </div>
                  <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onClick={() => {
                        const event = new CustomEvent('openWindow', { detail: 'clients' });
                        window.dispatchEvent(event);
                      }}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.cd} alt="cd" />
                      <div className="whitespace-nowrap h-full">Clients (C:)</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Viewer Overlay - Rendered via Portal */}
      {viewerMode !== 'none' && createPortal(
        <div
          className="flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 2147483647
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeViewer();
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeViewer}
            className="absolute top-6 right-8 text-white text-4xl flex items-center justify-center hover:text-red-500 transition-all z-50 cursor-pointer"
            style={{ fontWeight: 'bold', background: 'transparent', border: 'none' }}
          >
            ×
          </button>

          {/* Mode Toggle Button */}
          <div className="absolute top-4 left-4 z-50 flex flex-col" style={{ width: 'fit-content' }}>
            <button
              onClick={() => setViewerMode(viewerMode === 'scroll' ? 'carousel' : 'scroll')}
              className="text-white text-xs px-3 py-1 flex items-center justify-center hover:bg-white hover:bg-opacity-30 transition-all cursor-pointer whitespace-nowrap"
              style={{ fontFamily: 'Tahoma, sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', width: 'fit-content' }}
            >
              {viewerMode === 'scroll' ? '🎠 Carousel' : '📜 Scroll'}
            </button>
            <div
              className="text-white text-xs mt-1 text-center"
              style={{
                fontFamily: 'Tahoma, sans-serif',
                fontSize: '10px',
                opacity: 0.7,
                minWidth: '100%',
                maxWidth: '110%',
                overflow: 'hidden'
              }}
            >
              {viewerMode === 'scroll' ? (
                <>Click here to switch<br />to carousel</>
              ) : (
                <>Click here to switch<br />to scroll</>
              )}
            </div>
          </div>

          {viewerMode === 'scroll' ? (
            /* Scroll Mode - Vertical Stack */
            <div className="w-full h-full overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col items-center gap-0 py-8">
                {aboutUsPictures.map((image, index) => (
                  <div
                    key={index}
                    id={`scroll-image-${index}`}
                    className="cursor-pointer"
                    onClick={handleImageClick}
                    style={{ width: '85%' }}
                  >
                    <img
                      src={image.src}
                      alt={image.name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Carousel Mode - Single Image with Navigation */
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 text-white text-4xl flex items-center justify-center cursor-pointer z-10"
                style={{ fontWeight: 'bold', background: 'transparent', border: 'none' }}
              >
                ‹
              </button>

              {/* Current Image */}
              <div className="flex items-center justify-center" style={{ maxHeight: '70vh' }}>
                <img
                  src={aboutUsPictures[selectedImageIndex].src}
                  alt={aboutUsPictures[selectedImageIndex].name}
                  style={{ width: 'auto', height: '70vh', maxWidth: '90vw', objectFit: 'contain', display: 'block' }}
                />
              </div>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 text-white text-4xl flex items-center justify-center cursor-pointer z-10"
                style={{ fontWeight: 'bold', background: 'transparent', border: 'none' }}
              >
                ›
              </button>

              {/* Image Name at Bottom */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <div className="text-white" style={{ fontSize: '16px', fontFamily: 'Tahoma, sans-serif' }}>
                  {aboutUsPictures[selectedImageIndex].name}
                </div>
                <div className="text-white mt-1" style={{ fontSize: '12px', opacity: 0.7 }}>
                  {selectedImageIndex + 1} / {aboutUsPictures.length}
                </div>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
}

export default FileManager;
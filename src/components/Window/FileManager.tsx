import React from 'react';
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
  document: '/windowsIcons/308(16x16).png',
  folderSmall: '/windowsIcons/318(16x16).png',
  menu: '/windowsIcons/358(32x32).png',
  folder: '/windowsIcons/318(48x48).png',
  folderOpen: '/windowsIcons/337(32x32).png',
  disk: '/windowsIcons/334(48x48).png',
  cd: '/windowsIcons/111(48x48).png',
  dropdown: '/windowsIcons/dropdown.png',
  pullup: '/windowsIcons/pullup.png',
  windows: '/windowsIcons/windows.png',
  logo: '/github-logo.png'
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
}

function FileManager({ onClose }: FileManagerProps) {
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
        {/* Back button (disabled) */}
        <div className="flex h-full items-center border border-transparent grayscale opacity-70">
          <img className="h-[30px] w-[30px]" src={assets.back} alt="back" />
          <span className="mr-1 text-[11px]">Back</span>
          <div className="h-full flex items-center mx-1">
            <div className="border-l-[3px] border-r-[3px] border-b-0 border-l-black border-r-transparent border-solid" />
          </div>
        </div>

        {/* Forward button (disabled) */}
        <div className="flex h-full items-center border border-transparent grayscale opacity-70">
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
          <img className="w-[14px] h-[14px]" src={assets.computer} alt="computer" />
          <div className="whitespace-nowrap absolute left-4 right-[17px]">My Computer</div>
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
                    View system information
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.remove} alt="remove" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Add or remove programs
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.control} alt="control" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Change a setting
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
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.network} alt="network" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    My Network Places
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.document} alt="document" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    My Documents
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.folderSmall} alt="folder" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Shared Documents
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.control} alt="control" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    Control Panel
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
            {/* Files Stored on This Computer */}
            <div className="mb-4">
              <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                Files Stored on This Computer
              </div>
              <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                <div className="flex items-center w-[200px] mb-[15px] h-auto">
                  <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                  <div className="whitespace-nowrap h-full">Shared Documents</div>
                </div>
                <div className="flex items-center w-[200px] mb-[15px] h-auto">
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
                <div className="flex items-center w-[200px] mb-[15px] h-auto">
                  <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                  <div className="whitespace-nowrap h-full">Local Disk (C:)</div>
                </div>
              </div>
            </div>

            {/* Devices with Removable Storage */}
            <div className="mb-4">
              <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                Devices with Removable Storage
              </div>
              <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                <div className="flex items-center w-[200px] mb-[15px] h-auto">
                  <img className="w-[45px] h-[45px] mr-[5px]" src={assets.cd} alt="cd" />
                  <div className="whitespace-nowrap h-full">CD Drive (D:)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileManager;
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { WindowDropDowns } from './WindowDropDowns';
import { logger } from '../../utils/logger';

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
  type?: 'computer' | 'projects' | 'clients' | 'ourDocuments' | 'ourTeam' | 'aboutUsPictures' | 'ourPictures' | 'portfolio' | 'portfolioWebsite' | 'portfolioBranding' | 'portfolioTech' | 'portfolioMarketing' | 'makeADifference' | 'mudNMoon' | 'copperwell' | 'bolt' | 'clientStartups' | 'clientImpact' | 'clientRetail' | 'clientHealthcare' | 'clientArchitecture' | 'clientEducation' | 'clientHoreca' | 'clientCorporate' | 'clientRealEstate' | 'clientMedia' | 'clientTechnology' | 'clientAgencies';
}

function FileManager({ onClose, type = 'computer' }: FileManagerProps) {
  logger.log('🗂️ FileManager rendering with type:', type);
  const [currentView, setCurrentView] = useState<string>(type);
  const [history, setHistory] = useState<string[]>([type]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Image viewer states
  const [viewerMode, setViewerMode] = useState<'none' | 'scroll' | 'carousel'>('none');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const isProjects = currentView === 'projects';
  const isClients = currentView === 'clients';
  const isOurDocuments = currentView === 'ourDocuments';
  const isOurTeam = currentView === 'ourTeam';
  const isAboutUsPictures = currentView === 'aboutUsPictures';
  const isOurPictures = currentView === 'ourPictures';
  const isPortfolio = currentView === 'portfolio';
  const isPortfolioWebsite = currentView === 'portfolioWebsite';
  const isPortfolioBranding = currentView === 'portfolioBranding';
  const isPortfolioTech = currentView === 'portfolioTech';
  const isPortfolioMarketing = currentView === 'portfolioMarketing';
  const isMakeADifference = currentView === 'makeADifference';
  const isMudNMoon = currentView === 'mudNMoon';
  const isCopperwell = currentView === 'copperwell';
  const isBolt = currentView === 'bolt';

  // Client category views
  const isClientStartups = currentView === 'clientStartups';
  const isClientImpact = currentView === 'clientImpact';
  const isClientRetail = currentView === 'clientRetail';
  const isClientHealthcare = currentView === 'clientHealthcare';
  const isClientArchitecture = currentView === 'clientArchitecture';
  const isClientEducation = currentView === 'clientEducation';
  const isClientHoreca = currentView === 'clientHoreca';
  const isClientCorporate = currentView === 'clientCorporate';
  const isClientRealEstate = currentView === 'clientRealEstate';
  const isClientMedia = currentView === 'clientMedia';
  const isClientTechnology = currentView === 'clientTechnology';
  const isClientAgencies = currentView === 'clientAgencies';
  const isAnyClientCategory = isClientStartups || isClientImpact || isClientRetail || isClientHealthcare || isClientArchitecture || isClientEducation || isClientHoreca || isClientCorporate || isClientRealEstate || isClientMedia || isClientTechnology || isClientAgencies;

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
    // Open in carousel mode for ourPictures, scroll mode for branding and others
    const initialMode = isOurPictures ? 'carousel' : 'scroll';
    setViewerMode(initialMode);

    // Scroll to the selected image after a brief delay for rendering (only for scroll mode)
    if (initialMode === 'scroll') {
      setTimeout(() => {
        const imageElement = document.getElementById(`scroll-image-${index}`);
        if (imageElement) {
          imageElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
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
    setSelectedImageIndex((prev) => (prev + 1) % currentPictures.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => {
      const picturesLength = currentPictures?.length || 5;
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

  // About Us Pictures
  const aboutUsPictures = [
    { name: 'Luffy One Piece 4k Wallpaper', src: '/pictures/Luffy One Piece 4k Wallpaper.jpg' },
    { name: 'One Piece 4k Wallpaper Top Ultra Background (1)', src: '/pictures/One Piece 4k Wallpaper Top Ultra Background (1).png' },
    { name: 'One Piece 4k Wallpaper Top Ultra Background', src: '/pictures/One Piece 4k Wallpaper Top Ultra Background.png' },
    { name: 'wallpaperflare.com_wallpaper (1)', src: '/pictures/wallpaperflare.com_wallpaper (1).jpg' },
    { name: 'wallpaperflare.com_wallpaper', src: '/pictures/wallpaperflare.com_wallpaper.jpg' },
  ];

  // Our Pictures
  const ourPictures = [
    { name: 'Office 1', src: '/our_pictures/office0.jpg' },
    { name: 'Office 2', src: '/our_pictures/office1.jpg' },
    { name: 'Office 3', src: '/our_pictures/office2.jpg' },
    { name: 'Office 4', src: '/our_pictures/office3.jpg' },
    { name: 'Office 5', src: '/our_pictures/office4.jpg' },
    { name: 'Office 6', src: '/our_pictures/office5.jpg' },
    { name: 'Office 7', src: '/our_pictures/office6.jpg' },
    { name: 'Our Team 1', src: '/our_pictures/ourteam1.jpg' },
    { name: 'Our Team 2', src: '/our_pictures/ourteam2.jpg' },
    { name: 'Our Team 3', src: '/our_pictures/ourteam3.jpg' },
  ];

  // Branding project images
  const boltImages = Array.from({ length: 16 }, (_, i) => ({
    name: `Bolt ${i + 1}`,
    src: `/branding/Bolt/Bolt${i + 1}.png`
  }));

  const copperwellImages = Array.from({ length: 27 }, (_, i) => ({
    name: `Copperwell ${i + 1}`,
    src: `/branding/Copperwell/Copperwell${i + 1}.png`
  }));

  const mudNMoonImages = Array.from({ length: 32 }, (_, i) => ({
    name: `Mud N Moon ${i + 1}`,
    src: `/branding/Mud N Moon/mudandmoon${i + 1}.webp`
  }));

  // Current pictures based on view type
  const currentPictures = isOurPictures ? ourPictures
    : isBolt ? boltImages
    : isCopperwell ? copperwellImages
    : isMudNMoon ? mudNMoonImages
    : aboutUsPictures;

  // Our Documents content (PDF files) - was sharedDocuments
  const ourDocumentsData = [
    { name: 'Codepoets Visiting card 2025 (1).pdf', icon: '/img/icons/documents/pdf-icon.png', url: '/documents/our_documents/Codepoets Visiting card 2025 (1).pdf' },
    { name: 'Logo _ Branding Questionnaire - 2025.pdf', icon: '/img/icons/documents/pdf-icon.png', url: '/documents/our_documents/Logo _ Branding Questionnaire - 2025.pdf' },
    { name: 'Website Design Questionnaire - 2025.pdf', icon: '/img/icons/documents/pdf-icon.png', url: '/documents/our_documents/Website Design Questionnaire - 2025.pdf' },
  ];

  // Our Team content - team members with photos and LinkedIn
  const ourTeamData = [
    { name: 'Himanshu Desai', role: 'CEO', photo: '/our_team/Himanshu Desai Profile Picture.jpg', linkedin: 'https://www.linkedin.com/in/himanshubdesai/' },
    { name: 'Jinal Shah', role: 'COO', photo: '/our_team/Jinal Desai.jpg', linkedin: 'https://www.linkedin.com/in/studiopastels/' },
    { name: 'Naaz Mistry', role: 'Operations', photo: '/our_team/Naaz Mistry.png', linkedin: 'https://www.linkedin.com/in/naaz-mistry/' },
    { name: 'Prachi Pandey', role: 'Operations', photo: '/our_team/Prachi Pandey.jpg', linkedin: 'https://www.linkedin.com/in/prachi-pandey-27086a273/' },
    { name: 'David Ajibade', role: 'Full Stack', photo: '/our_team/David Ajibade.jpg', linkedin: 'https://www.linkedin.com/in/dayv/' },
    { name: 'Rajkeshar Yadav', role: 'Full Stack', photo: '/our_team/Rajkeshar Yadav.jpg', linkedin: 'https://www.linkedin.com/in/reach2rajkeshar' },
    { name: 'Darshan Zadafiya', role: 'Web', photo: '/our_team/Darshan Zadafiya.png', linkedin: 'https://www.linkedin.com/in/darshan-zadafiya-671896203' },
    { name: 'Matthew Ajibade', role: 'Web', photo: '/our_team/MATTHEW AJIBADE.jpg', linkedin: 'https://www.linkedin.com/in/ajitech/' },
    { name: 'Vikram Kunvar', role: 'Web', photo: '/our_team/Vikram Kunvar.jpg', linkedin: 'https://www.linkedin.com/in/vikram-kunvar/' },
    { name: 'Uttam Pokar', role: 'Design', photo: '/our_team/Uttam Pokar.jpg', linkedin: 'https://www.linkedin.com/in/mr-uttam-patel/' },
    { name: 'Moshood Salaudeen', role: 'Design', photo: '/our_team/Moshood Salaudeen.jpg', linkedin: 'https://www.linkedin.com/in/moshood-olawale-salaudeen-015714106/' },
    { name: 'Agam Shah', role: 'Media', photo: '/our_team/Agam Shah.jpg', linkedin: 'https://www.linkedin.com/in/agam-shah-629279129/' },
    { name: 'Kashyap Patel', role: 'Media', photo: '/our_team/Kashyap Patel.jpg', linkedin: 'https://www.linkedin.com/in/patel-kashyap-9a0a8811a/' },
    { name: 'Hiral Desai', role: 'Digital Marketing', photo: '/our_team/Hiral Desai.jpg', linkedin: 'https://www.linkedin.com/in/hiral-desai-079767100/' },
  ];

  // Client categories with their logos
  const clientCategories = [
    { id: 'clientStartups', name: 'Startups', icon: assets.folder },
    { id: 'clientImpact', name: 'Impact', icon: assets.folder },
    { id: 'clientRetail', name: 'Retail', icon: assets.folder },
    { id: 'clientHealthcare', name: 'Healthcare', icon: assets.folder },
    { id: 'clientArchitecture', name: 'Architecture', icon: assets.folder },
    { id: 'clientEducation', name: 'Education', icon: assets.folder },
    { id: 'clientHoreca', name: 'Horeca', icon: assets.folder },
    { id: 'clientCorporate', name: 'Corporate', icon: assets.folder },
    { id: 'clientRealEstate', name: 'Real Estate', icon: assets.folder },
    { id: 'clientMedia', name: 'Media', icon: assets.folder },
    { id: 'clientTechnology', name: 'Technology', icon: assets.folder },
    { id: 'clientAgencies', name: 'Agencies', icon: assets.folder },
  ];

  const clientLogos: Record<string, string[]> = {
    clientStartups: Array.from({ length: 6 }, (_, i) => `/clients/1. Startups/Use this folder/Startup ${i + 1}.png`),
    clientImpact: Array.from({ length: 15 }, (_, i) => `/clients/2. Impact/Startups (1)/Impact ${i + 1}.png`),
    clientRetail: Array.from({ length: 5 }, (_, i) => `/clients/3. Retail/Startups (2)/Reatil ${i + 1}.png`),
    clientHealthcare: Array.from({ length: 9 }, (_, i) => `/clients/4. Healthcare/Startups (3)/Healthcare ${i + 1}.png`),
    clientArchitecture: Array.from({ length: 4 }, (_, i) => `/clients/5. Architecture/Startups (4)/Architecture ${i + 1}.png`),
    clientEducation: Array.from({ length: 5 }, (_, i) => `/clients/6. Education/Startups (5)/Education ${i + 1}.png`),
    clientHoreca: Array.from({ length: 4 }, (_, i) => `/clients/7. Horeca/Startups (6)/Horeca ${i + 1}.png`),
    clientCorporate: Array.from({ length: 6 }, (_, i) => `/clients/8. Corporate/Startups (7)/Corporate  ${i + 1}.png`),
    clientRealEstate: Array.from({ length: 5 }, (_, i) => `/clients/9. Real Estate/Startups (8)/Real Estate ${i + 1}.png`),
    clientMedia: Array.from({ length: 3 }, (_, i) => `/clients/10. Media/Startups (9)/Media ${i + 1}.png`),
    clientTechnology: ['/clients/11. Technology/Technology 1.png'],
    clientAgencies: Array.from({ length: 5 }, (_, i) => `/clients/12. Agencies/Startups (10)/Agencies ${i + 1}.png`),
  };

  // Website portfolio projects
  const websiteProjects = [
    { name: 'Apollo', category: 'Startups', image: '/websites/website1.png', url: 'https://apollo-management-stg.webflow.io/' },
    { name: 'Design Shack', category: 'Agency', image: '/websites/website2.svg', url: 'https://design-shack.webflow.io/' },
    { name: 'Disrptve', category: 'Agency', image: '/websites/website3.png', url: 'https://www.disrptve.com/' },
    { name: 'Make a Diff', category: 'Impact', image: '/websites/website4.png', url: 'https://makeadiff.in' },
    { name: 'Craftroots', category: 'Retail', image: '/websites/website5.webp', url: 'https://craftroots.com/' },
    { name: 'Studio Pastels', category: 'Interior', image: '/websites/website6.png', url: 'https://studiopastels.com/' },
    { name: 'Ingrazia', category: 'Interior', image: '/websites/website7.png', url: 'https://studioingrazia.com/home/' },
    { name: 'SchoolExl', category: 'Education', image: '/websites/website8.png', url: 'https://schoolexl.com/' },
    { name: 'Dalhousie Public School', category: 'Education', image: '/websites/Website9.svg', url: 'https://dalhousiepublicschool.com/' },
    { name: "Radhika's", category: 'Horeca', image: '/websites/Website10.png', url: 'https://radhikas.in/' },
    { name: 'G2 Electric', category: 'Corporate', image: '/websites/website11.webp', url: 'https://g2india.com/' },
    { name: 'String Ag', category: 'Corporate', image: '/websites/Website12.png', url: 'https://ag.stringbio.com/' },
    { name: 'Daimi Properties', category: 'Real Estate', image: '/websites/Website13.png', url: 'http://daimiproperties.com/' },
    { name: 'Housivity', category: 'Real Estate', image: '/websites/Website14.png', url: 'https://housivity.com' },
    { name: 'Sanjukta Sinha Dance Company', category: 'Media', image: '/websites/Website15.webp', url: 'https://sanjuktasinhadancecompany.com/' },
    { name: 'Shivdutt Das Art Foundation', category: 'Media', image: '/websites/Website16.png', url: 'https://www.sdaf.in/' },
    { name: 'Robocup', category: 'Technology', image: '/websites/Website17.avif', url: 'https://robocup.fun/' },
  ];

  const getClientCategoryName = (view: string): string => {
    const category = clientCategories.find(c => c.id === view);
    return category?.name || '';
  };

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
          <img className="w-[14px] h-[14px]" src={isAboutUsPictures || isOurPictures || isOurDocuments || isOurTeam || isPortfolio || isPortfolioWebsite || isPortfolioBranding || isPortfolioTech || isPortfolioMarketing || isMakeADifference || isMudNMoon || isCopperwell || isBolt || isAnyClientCategory ? assets.folder : isClients ? assets.cd : isProjects ? assets.folder : assets.computer} alt="folder" />
          <div className="whitespace-nowrap absolute left-4 right-[17px] overflow-hidden text-ellipsis">
            {isAboutUsPictures
              ? 'My Computer > Our Documents > Information About Us'
              : isOurPictures
              ? 'My Computer > Our Pictures'
              : isOurDocuments
              ? 'My Computer > Our Documents'
              : isOurTeam
              ? 'My Computer > Our Team'
              : isClients
              ? 'My Computer > Clients (C:)'
              : isAnyClientCategory
              ? `My Computer > Clients (C:) > ${getClientCategoryName(currentView)}`
              : isProjects
              ? 'My Computer > Our Work'
              : isPortfolio
              ? 'My Computer > Portfolio (P:)'
              : isPortfolioWebsite
              ? 'My Computer > Portfolio (P:) > Website'
              : isPortfolioBranding
              ? 'My Computer > Portfolio (P:) > Branding'
              : isPortfolioTech
              ? 'My Computer > Portfolio (P:) > Tech'
              : isPortfolioMarketing
              ? 'My Computer > Portfolio (P:) > Marketing'
              : isMakeADifference
              ? 'My Computer > Portfolio (P:) > Website > Make a Difference'
              : isMudNMoon
              ? 'My Computer > Portfolio (P:) > Branding > Mud N Moon'
              : isCopperwell
              ? 'My Computer > Portfolio (P:) > Branding > Copperwell'
              : isBolt
              ? 'My Computer > Portfolio (P:) > Branding > Bolt'
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
                  <div
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    onClick={() => window.open('https://wa.me/919722558800/?text=Project', '_blank')}
                  >
                    Start a new project
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.remove} alt="remove" />
                  <div className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline">
                    See Agency Website
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src={assets.control} alt="control" />
                  <div
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                    onClick={() => window.open('https://wa.me/919722558800/?text=Join', '_blank')}
                  >
                    Join our team
                  </div>
                </div>
              </div>
            </div>

            {/* Our Offices Card */}
            <div className="rounded-t-[3px] w-full overflow-hidden mb-3">
              <div className="flex items-center h-[23px] pl-[11px] pr-[2px] cursor-pointer bg-gradient-to-r from-[rgb(240,240,255)] via-[rgb(240,240,255)] to-[rgb(168,188,255)]">
                <div className="font-bold text-[#0c327d] flex-1 text-[11px]">Our Offices</div>
                <img className="w-[18px] h-[18px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]" src={assets.pullup} alt="pullup" />
              </div>
              <div className="px-[10px] py-[5px] bg-gradient-to-r from-[rgb(180,200,251)] via-[rgb(164,185,251)] to-[rgb(180,200,251)] bg-[rgba(198,211,255,0.87)]">
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/india.png" alt="India" />
                  <a
                    href="https://codepoets.digital/indiaoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Gandhinagar
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/united-arab-emirates.png" alt="UAE" />
                  <a
                    href="https://codepoets.digital/uaeoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Dubai
                  </a>
                </div>
                {/* Commented out - to be added later
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/united-states.png" alt="USA" />
                  <a
                    href="https://codepoets.digital/usaoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Los Angeles
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/united-kingdom.png" alt="UK" />
                  <a
                    href="https://codepoets.digital/ukoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    London
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/nigeria.png" alt="Nigeria" />
                  <a
                    href="https://codepoets.digital/nigeriaoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Lagos
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/flags/kenya.png" alt="Kenya" />
                  <a
                    href="https://codepoets.digital/kenyaoffice"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Nairobi
                  </a>
                </div>
                */}
              </div>
            </div>

            {/* Other Ventures Card */}
            <div className="rounded-t-[3px] w-full overflow-hidden mb-3">
              <div className="flex items-center h-[23px] pl-[11px] pr-[2px] cursor-pointer bg-gradient-to-r from-[rgb(240,240,255)] via-[rgb(240,240,255)] to-[rgb(168,188,255)]">
                <div className="font-bold text-[#0c327d] flex-1 text-[11px]">Other Ventures</div>
                <img className="w-[18px] h-[18px] drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)]" src={assets.pullup} alt="pullup" />
              </div>
              <div className="px-[10px] py-[5px] bg-gradient-to-r from-[rgb(180,200,251)] via-[rgb(164,185,251)] to-[rgb(180,200,251)] bg-[rgba(198,211,255,0.87)]">
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/img/icons/windowsIcons/549(32x32).png" alt="OfficiallyYours" />
                  <a
                    href="https://officiallyours.co.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    OfficiallyYours
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/img/icons/windowsIcons/747(32x32).png" alt="Age of AI" />
                  <a
                    href="https://ageofai.digital"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    Age of AI
                  </a>
                </div>
                <div className="flex mb-[2px]">
                  <img className="w-[14px] h-[14px] mr-[5px]" src="/img/icons/windowsIcons/743(32x32).png" alt="SchoolExl" />
                  <a
                    href="https://schoolexl.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] leading-[14px] text-[#0c327d] hover:cursor-pointer hover:text-[#2b72ff] hover:underline"
                  >
                    SchoolExl
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Content */}
          <div className="h-full overflow-auto bg-white flex-1">
            {isAboutUsPictures || isOurPictures ? (
              /* About Us Pictures View */
              <div className="p-4">
                <div className="flex flex-wrap gap-3">
                  {currentPictures.map((image, index) => (
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
            ) : isOurDocuments ? (
              /* Our Documents View - PDF Files (was Shared Documents) */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Our Documents
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {ourDocumentsData.map((doc, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-[120px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-2 rounded group"
                      onDoubleClick={() => window.open(doc.url, '_blank')}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        const link = document.createElement('a');
                        link.href = doc.url;
                        link.download = doc.name;
                        link.click();
                      }}
                    >
                      <img className="w-[48px] h-[48px] mb-1" src={doc.icon} alt="pdf" />
                      <div className="text-xs text-center break-words w-full">{doc.name}</div>
                      <div className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Double-click to open
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-[15px] text-xs text-gray-600 mt-2">
                  <p>• Double-click to open in new tab</p>
                  <p>• Right-click to download</p>
                </div>
              </div>
            ) : isOurTeam ? (
              /* Our Team View - Team members with photos and LinkedIn */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Our Team
                </div>
                <div className="flex items-start px-[15px] pt-[15px] flex-wrap gap-4">
                  {ourTeamData.map((member, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-[100px] mb-[10px] h-auto p-2 rounded group"
                    >
                      <img
                        className="w-[64px] h-[64px] mb-2 rounded-full object-cover border-2 border-gray-200"
                        src={member.photo}
                        alt={member.name}
                      />
                      <div className="text-xs text-center font-semibold">{member.name}</div>
                      <div className="text-[10px] text-gray-500 text-center">{member.role}</div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-[#0066cc] hover:underline mt-1"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : isClients ? (
              /* Clients View - Category Folders */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Client Categories
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  {clientCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo(category.id)}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={category.icon} alt="folder" />
                      <div className="whitespace-nowrap h-full">{category.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isAnyClientCategory ? (
              /* Client Category View - Show Logos */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  {getClientCategoryName(currentView)} Clients
                </div>
                <div className="flex items-start px-[15px] pt-[15px] flex-wrap gap-4">
                  {clientLogos[currentView]?.map((logo, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center w-[120px] h-[100px] p-2 rounded hover:bg-blue-50"
                    >
                      <img
                        className="max-w-[100px] max-h-[70px] object-contain"
                        src={logo}
                        alt={`Client ${index + 1}`}
                      />
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
            ) : isPortfolioWebsite ? (
              /* Portfolio > Website - Website Projects with Thumbnails */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Website Projects
                </div>
                <div className="flex items-start px-[15px] pt-[15px] flex-wrap gap-4">
                  {websiteProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-[140px] mb-[10px] p-2 rounded cursor-pointer hover:bg-blue-50 group"
                      onClick={() => window.open(project.url, '_blank')}
                    >
                      <div
                        className="bg-white border border-gray-300 flex items-center justify-center mb-2 overflow-hidden rounded"
                        style={{
                          width: '120px',
                          height: '80px',
                          boxShadow: '1px 1px 3px rgba(0,0,0,0.15)'
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div className="text-xs text-center font-semibold">{project.name}</div>
                      <div className="text-[10px] text-gray-500 text-center">({project.category})</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isPortfolioBranding ? (
              /* Portfolio > Branding */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Branding Projects
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  <div
                    className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                    onDoubleClick={() => navigateTo('mudNMoon')}
                  >
                    <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                    <div className="whitespace-nowrap h-full">Mud N Moon</div>
                  </div>
                  <div
                    className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                    onDoubleClick={() => navigateTo('copperwell')}
                  >
                    <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                    <div className="whitespace-nowrap h-full">Copperwell</div>
                  </div>
                  <div
                    className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                    onDoubleClick={() => navigateTo('bolt')}
                  >
                    <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                    <div className="whitespace-nowrap h-full">Bolt</div>
                  </div>
                </div>
              </div>
            ) : isMakeADifference ? (
              /* Portfolio > Website > Make a Difference - Empty */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Make a Difference
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  <div className="text-xs text-gray-500 px-[15px]">This folder is empty.</div>
                </div>
              </div>
            ) : isMudNMoon ? (
              /* Portfolio > Branding > Mud N Moon - Image Gallery */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Mud N Moon
                </div>
                <div className="flex flex-wrap gap-3 p-4">
                  {mudNMoonImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer p-2 hover:bg-[#e6f3ff] border border-transparent hover:border-[#99ccff] rounded"
                      style={{ width: '120px' }}
                      onClick={() => openImageViewer(index)}
                    >
                      <div
                        className="bg-white border border-gray-400 flex items-center justify-center mb-1 overflow-hidden"
                        style={{ width: '96px', height: '96px', boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                      >
                        <img src={image.src} alt={image.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="text-center break-words w-full px-1" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isCopperwell ? (
              /* Portfolio > Branding > Copperwell - Image Gallery */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Copperwell
                </div>
                <div className="flex flex-wrap gap-3 p-4">
                  {copperwellImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer p-2 hover:bg-[#e6f3ff] border border-transparent hover:border-[#99ccff] rounded"
                      style={{ width: '120px' }}
                      onClick={() => openImageViewer(index)}
                    >
                      <div
                        className="bg-white border border-gray-400 flex items-center justify-center mb-1 overflow-hidden"
                        style={{ width: '96px', height: '96px', boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                      >
                        <img src={image.src} alt={image.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="text-center break-words w-full px-1" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isBolt ? (
              /* Portfolio > Branding > Bolt - Image Gallery */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Bolt
                </div>
                <div className="flex flex-wrap gap-3 p-4">
                  {boltImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center cursor-pointer p-2 hover:bg-[#e6f3ff] border border-transparent hover:border-[#99ccff] rounded"
                      style={{ width: '120px' }}
                      onClick={() => openImageViewer(index)}
                    >
                      <div
                        className="bg-white border border-gray-400 flex items-center justify-center mb-1 overflow-hidden"
                        style={{ width: '96px', height: '96px', boxShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                      >
                        <img src={image.src} alt={image.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="text-center break-words w-full px-1" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : isPortfolioTech ? (
              /* Portfolio > Tech */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Tech Projects
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  <div className="text-sm text-gray-600 px-[15px] italic">This drive is being populated...</div>
                </div>
              </div>
            ) : isPortfolioMarketing ? (
              /* Portfolio > Marketing */
              <div className="mb-4">
                <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                  Marketing Projects
                </div>
                <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                  <div className="text-sm text-gray-600 px-[15px] italic">This drive is being populated...</div>
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
                      onDoubleClick={() => navigateTo('ourDocuments')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                      <div className="whitespace-nowrap h-full">Our Documents</div>
                    </div>
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('ourTeam')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.folder} alt="folder" />
                      <div className="whitespace-nowrap h-full">Our Team</div>
                    </div>
                  </div>
                </div>

                {/* Portfolio */}
                <div className="mb-4">
                  <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                    Portfolio
                  </div>
                  <div className="flex items-center px-[15px] pt-[15px] flex-wrap">
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('portfolioWebsite')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">W: Website</div>
                    </div>
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('portfolioBranding')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">B: Branding</div>
                    </div>
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('portfolioMarketing')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">M: Marketing</div>
                    </div>
                    <div
                      className="flex items-center w-[200px] mb-[15px] h-auto cursor-pointer hover:bg-blue-50 p-1 rounded"
                      onDoubleClick={() => navigateTo('portfolioTech')}
                    >
                      <img className="w-[45px] h-[45px] mr-[5px]" src={assets.disk} alt="disk" />
                      <div className="whitespace-nowrap h-full">T: Tech</div>
                    </div>
                  </div>
                </div>

                {/* Clients with Lifelong Collaborations */}
                <div className="mb-4">
                  <div className="w-[300px] font-bold px-3 py-1 relative after:content-[''] after:block after:bg-gradient-to-r after:from-[#70bfff] after:to-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-full">
                    Clients with Lifelong Collaborations
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
                {currentPictures.map((image, index) => (
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
                  src={currentPictures[selectedImageIndex].src}
                  alt={currentPictures[selectedImageIndex].name}
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
                  {currentPictures[selectedImageIndex].name}
                </div>
                <div className="text-white mt-1" style={{ fontSize: '12px', opacity: 0.7 }}>
                  {selectedImageIndex + 1} / {currentPictures.length}
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
// Desktop Apps Data - React approach instead of JSON
import type { Entity } from '../types';

export const desktopApps: Entity[] = [
  {
    id: "ourComputer",
    title: {
      en: "Our Computer",
      fr: "Notre Ordinateur",
      es: "Nuestro Ordenador",
      hi: "हमारा कंप्यूटर",
      ar: "حاسوبنا"
    },
    subtitle: {
      en: "System information and files",
      fr: "Informations système et fichiers"
    },
    imgSrc: "/img/icons/computer-icon-lg.png",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/computer-icon-lg.png",
    initPositionX: 50,
    initPositionY: 50,
    initWidth: 660,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "FileManager",
    leftMenuType: "computer"
  },
  {
    id: "contact",
    title: {
      en: "Mail Us",
      fr: "Nous Écrire",
      es: "Escríbenos",
      hi: "हमें मेल करें",
      ar: "راسلنا"
    },
    subtitle: {
      en: "Send us an email",
      fr: "Envoyez-nous un email"
    },
    imgSrc: "/img/icons/contact/email-icon-lg.webp",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "contact",
    iconSrc: "/img/icons/contact/email-icon-sm.webp",
    initPositionX: 210,
    initPositionY: 140,
    initWidth: 590,
    initHeight: 440,
    minWidth: 200,
    minHeight: 160,
    component: "ContactMe",
    leftMenuType: ""
  },
  {
    id: "contactDetails",
    title: {
      en: "Contact Details\n- Notepad",
      fr: "Coordonnées",
      es: "Detalles de Contacto",
      hi: "संपर्क विवरण",
      ar: "تفاصيل الاتصال"
    },
    subtitle: {
      en: "Our contact information",
      fr: "Nos informations de contact"
    },
    imgSrc: "/img/icons/notepad/notepad-icon-lg.webp",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: true,
    headerPosition: "right",
    headerToolsId: "",
    menuHeaderItemsId: "notepad",
    iconSrc: "/img/icons/notepad/notepad-icon-sm.webp",
    initPositionX: 120,
    initPositionY: 120,
    initWidth: 400,
    initHeight: 300,
    minWidth: 300,
    minHeight: 200,
    component: "ContactDetails",
    leftMenuType: ""
  },
  {
    id: "myProjects",
    title: {
      en: "Our Work",
      fr: "Notre Travail",
      es: "Nuestro Trabajo",
      hi: "हमारा काम",
      ar: "أعمالنا"
    },
    subtitle: {
      en: "See all our projects",
      fr: "Voir tous nos projets"
    },
    imgSrc: "/img/icons/documents/folder-docs-icon-lg.webp",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/documents/folder-docs-icon-sm.webp",
    initPositionX: 180,
    initPositionY: 100,
    initWidth: 660,
    initHeight: 500,
    minWidth: 200,
    minHeight: 160,
    component: "MyProjects",
    leftMenuType: "default"
  },
  {
    id: "music",
    title: {
      en: "Our Music",
      fr: "Notre Musique",
      es: "Nuestra Música",
      hi: "हमारा संगीत",
      ar: "موسيقانا"
    },
    subtitle: {
      en: "Spotify Playlist",
      fr: "Playlist Spotify"
    },
    imgSrc: "/img/icons/music/winamp-icon-lg.png",
    onDesktop: true,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "right",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/music/winamp-icon-lg.png",
    initPositionX: 0,
    initPositionY: 0,
    initWidth: 0,
    initHeight: 0,
    minWidth: 0,
    minHeight: 0,
    component: "Winamp",
    invisible: true,
    leftMenuType: ""
  },
  {
    id: "terminal",
    title: {
      en: "AI Terminal",
      fr: "Terminal IA",
      es: "Terminal IA",
      hi: "AI टर्मिनल",
      ar: "محطة الذكاء الاصطناعي"
    },
    subtitle: {
      en: "Talk to Codepoets via AI",
      fr: "Parlez à Codepoets via IA"
    },
    imgSrc: "/img/icons/cmd-icon-lg.webp",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/cmd-icon-sm.webp",
    initPositionX: 190,
    initPositionY: 310,
    initWidth: 525,
    initHeight: 350,
    minWidth: 200,
    minHeight: 160,
    component: "Terminal",
    leftMenuType: ""
  },
  {
    id: "paint",
    title: {
      en: "Paint",
      fr: "Peinture",
      es: "Pintura",
      hi: "पेंट",
      ar: "الرسام"
    },
    subtitle: {
      en: "Draw and create art",
      fr: "Dessiner et créer de l'art"
    },
    imgSrc: "/img/icons/paint.png",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/paint.png",
    initPositionX: 300,
    initPositionY: 200,
    initWidth: 800,
    initHeight: 600,
    minWidth: 600,
    minHeight: 400,
    component: "Paint",
    leftMenuType: ""
  },
  {
    id: "internetExplorer",
    title: {
      en: "Internet Explorer",
      fr: "Internet Explorer",
      es: "Internet Explorer",
      hi: "इंटरनेट एक्सप्लोरर",
      ar: "إنترنت إكسبلورر"
    },
    subtitle: {
      en: "Browse the web",
      fr: "Naviguer sur le web"
    },
    imgSrc: "/img/icons/explorer-icon-lg.webp",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/explorer-icon-sm.webp",
    initPositionX: 100,
    initPositionY: 80,
    initWidth: 1000,
    initHeight: 700,
    minWidth: 800,
    minHeight: 500,
    component: "InternetExplorer",
    leftMenuType: ""
  },
  {
    id: "minesweeper",
    title: {
      en: "Minesweeper",
      fr: "Démineur",
      es: "Buscaminas",
      hi: "माइनस्वीपर",
      ar: "كاسح الألغام"
    },
    subtitle: {
      en: "Classic puzzle game",
      fr: "Jeu de puzzle classique"
    },
    imgSrc: "/img/icons/minesweeper/minesweeper-icon-lg.webp",
    onDesktop: true,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "right",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/minesweeper/minesweeper-icon-sm.webp",
    initPositionX: 160,
    initPositionY: 270,
    initWidth: 200,
    initHeight: 280,
    minWidth: 150,
    minHeight: 200,
    component: "Minesweeper",
    leftMenuType: ""
  }
];
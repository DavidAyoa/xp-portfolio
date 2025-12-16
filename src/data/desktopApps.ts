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
    component: "OurComputer",
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
      en: "Contact Us",
      fr: "Nous Contacter",
      es: "Contáctenos",
      hi: "हमसे संपर्क करें",
      ar: "اتصل بنا"
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
    id: "ourServices",
    title: {
      en: "Our Services",
      fr: "Nos Services",
      es: "Nuestros Servicios",
      hi: "हमारी सेवाएं",
      ar: "خدماتنا"
    },
    subtitle: {
      en: "What we offer",
      fr: "Ce que nous offrons"
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
    initPositionX: 140,
    initPositionY: 240,
    initWidth: 600,
    initHeight: 450,
    minWidth: 400,
    minHeight: 300,
    component: "OurServices",
    leftMenuType: ""
  },
  {
    id: "aboutUs",
    title: {
      en: "About Us",
      fr: "À Propos de Nous",
      es: "Sobre Nosotros",
      hi: "हमारे बारे में",
      ar: "معلومات عنا"
    },
    subtitle: {
      en: "Who we are",
      fr: "Qui nous sommes"
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
    initPositionX: 160,
    initPositionY: 160,
    initWidth: 650,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "AboutUs",
    leftMenuType: ""
  },
  {
    id: "notepad",
    title: {
      en: "Notepad",
      fr: "Bloc-notes",
      es: "Bloc de notas",
      hi: "नोटपैड",
      ar: "المفكرة"
    },
    subtitle: {
      en: "Text Editor",
      fr: "Éditeur de texte"
    },
    imgSrc: "/img/icons/notepad/notepad-icon-lg.webp",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: true,
    headerPosition: "right",
    headerToolsId: "",
    menuHeaderItemsId: "notepad",
    iconSrc: "/img/icons/notepad/notepad-icon-sm.webp",
    initPositionX: 180,
    initPositionY: 180,
    initWidth: 500,
    initHeight: 400,
    minWidth: 300,
    minHeight: 200,
    component: "BlankNotepad",
    leftMenuType: ""
  },
  {
    id: "scheduleMeeting",
    title: {
      en: "Schedule a Meeting",
      fr: "Planifier une réunion",
      es: "Programar una reunión",
      hi: "मीटिंग शेड्यूल करें",
      ar: "جدولة اجتماع"
    },
    subtitle: {
      en: "Book a meeting with us",
      fr: "Réserver une réunion avec nous"
    },
    imgSrc: "/img/icons/windowsIcons/301(32x32).png",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/windowsIcons/301(32x32).png",
    initPositionX: 120,
    initPositionY: 100,
    initWidth: 1000,
    initHeight: 700,
    minWidth: 800,
    minHeight: 500,
    component: "ScheduleMeeting",
    leftMenuType: ""
  },
  {
    id: "agencyWebsite",
    title: {
      en: "Agency Website",
      fr: "Site Web de l'Agence",
      es: "Sitio Web de la Agencia",
      hi: "एजेंसी वेबसाइट",
      ar: "موقع الوكالة"
    },
    subtitle: {
      en: "Visit our main website",
      fr: "Visitez notre site principal"
    },
    imgSrc: "/img/icons/explorer-icon-lg.webp",
    onDesktop: false,
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
    component: "AgencyWebsite",
    leftMenuType: ""
  },
  {
    id: "ourPictures",
    title: {
      en: "Our Pictures",
      fr: "Nos Images",
      es: "Nuestras Imágenes",
      hi: "हमारी तस्वीरें",
      ar: "صورنا"
    },
    subtitle: {
      en: "Photo Gallery",
      fr: "Galerie de photos"
    },
    imgSrc: "/windowsIcons/289(32x32).png",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/documents/folder-docs-icon-sm.webp",
    initPositionX: 150,
    initPositionY: 120,
    initWidth: 800,
    initHeight: 600,
    minWidth: 600,
    minHeight: 400,
    component: "OurPictures",
    leftMenuType: ""
  },
  {
    id: "chatWithUs",
    title: {
      en: "Chat with Us",
      fr: "Discutez avec Nous",
      es: "Chatea con Nosotros",
      hi: "हमसे बात करें",
      ar: "تحدث معنا"
    },
    subtitle: {
      en: "WhatsApp Chat",
      fr: "Discussion WhatsApp"
    },
    imgSrc: "/img/Whatsapp.svg",
    onDesktop: true,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/Whatsapp.svg",
    initPositionX: 0,
    initPositionY: 0,
    initWidth: 0,
    initHeight: 0,
    minWidth: 0,
    minHeight: 0,
    component: "ChatWithUs",
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
    onDesktop: false,
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
    component: "FileManager",
    leftMenuType: "default"
  },
  {
    id: "ourShowreel",
    title: {
      en: "Our Showreel",
      fr: "Notre Showreel",
      es: "Nuestro Showreel",
      hi: "हमारा शोरील",
      ar: "عرضنا"
    },
    subtitle: {
      en: "Watch our showreel video",
      fr: "Regardez notre vidéo showreel"
    },
    imgSrc: "/windowsIcons/846(32x32).png",
    onDesktop: true,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/windowsIcons/846(32x32).png",
    initPositionX: 150,
    initPositionY: 100,
    initWidth: 800,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "OurShowreel",
    leftMenuType: ""
  },
  {
    id: "music",
    title: {
      en: "Winamp",
      fr: "Winamp",
      es: "Winamp",
      hi: "Winamp",
      ar: "Winamp"
    },
    subtitle: {
      en: "Music Player",
      fr: "Lecteur de musique"
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
      hi: "एआई टर्मिनल",
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
    id: "composeEmail",
    title: {
      en: "New Message",
      fr: "Nouveau Message"
    },
    subtitle: {
      en: "Compose a new email"
    },
    imgSrc: "/img/icons/email/new-mail.png",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/email/new-mail.png",
    initPositionX: 280,
    initPositionY: 160,
    initWidth: 500,
    initHeight: 400,
    minWidth: 400,
    minHeight: 300,
    component: "ComposeEmail",
    leftMenuType: ""
  },
  {
    id: "clients",
    title: {
      en: "Clients (C:)",
      fr: "Clients (C:)",
      es: "Clientes (C:)",
      hi: "क्लाइंट्स (C:)",
      ar: "العملاء (C:)"
    },
    subtitle: {
      en: "Our client portfolio",
      fr: "Notre portefeuille clients"
    },
    imgSrc: "/img/icons/documents/folder-docs-icon-lg.webp",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/documents/folder-docs-icon-sm.webp",
    initPositionX: 220,
    initPositionY: 120,
    initWidth: 660,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "Clients",
    leftMenuType: "clients"
  },
  {
    id: "ourDocuments",
    title: {
      en: "Our Documents",
      fr: "Nos Documents",
      es: "Nuestros Documentos",
      hi: "हमारे दस्तावेज़",
      ar: "وثائقنا"
    },
    subtitle: {
      en: "Company documents and files",
      fr: "Documents et fichiers de l'entreprise"
    },
    imgSrc: "/img/icons/documents/folder-docs-icon-lg.webp",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/documents/folder-docs-icon-sm.webp",
    initPositionX: 240,
    initPositionY: 140,
    initWidth: 660,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "OurDocuments",
    leftMenuType: "ourDocuments"
  },
  {
    id: "ourTeam",
    title: {
      en: "Our Team",
      fr: "Notre Équipe",
      es: "Nuestro Equipo",
      hi: "हमारी टीम",
      ar: "فريقنا"
    },
    subtitle: {
      en: "Team member profiles and information"
    },
    imgSrc: "/img/icons/documents/folder-docs-icon-lg.webp",
    onDesktop: false,
    resizable: true,
    windowsHeaderLogo: true,
    isSearchVisible: true,
    headerPosition: "left",
    headerToolsId: "default",
    menuHeaderItemsId: "default",
    iconSrc: "/img/icons/documents/folder-docs-icon-sm.webp",
    initPositionX: 260,
    initPositionY: 160,
    initWidth: 660,
    initHeight: 500,
    minWidth: 400,
    minHeight: 300,
    component: "OurTeam",
    leftMenuType: "ourTeam"
  },
  {
    id: "officiallyYours",
    title: {
      en: "OfficiallyYours",
      fr: "OfficiallyYours",
      es: "OfficiallyYours",
      hi: "OfficiallyYours",
      ar: "OfficiallyYours"
    },
    subtitle: {
      en: "Visit OfficiallyYours",
      fr: "Visitez OfficiallyYours"
    },
    imgSrc: "/img/icons/windowsIcons/549(32x32).png",
    onDesktop: false,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/windowsIcons/549(32x32).png",
    initPositionX: 0,
    initPositionY: 0,
    initWidth: 0,
    initHeight: 0,
    minWidth: 0,
    minHeight: 0,
    component: "OfficiallyYours",
    leftMenuType: ""
  },
  {
    id: "ageOfAI",
    title: {
      en: "Age of AI",
      fr: "Age of AI",
      es: "Age of AI",
      hi: "Age of AI",
      ar: "Age of AI"
    },
    subtitle: {
      en: "Visit Age of AI",
      fr: "Visitez Age of AI"
    },
    imgSrc: "/img/icons/windowsIcons/747(32x32).png",
    onDesktop: false,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/windowsIcons/747(32x32).png",
    initPositionX: 0,
    initPositionY: 0,
    initWidth: 0,
    initHeight: 0,
    minWidth: 0,
    minHeight: 0,
    component: "AgeOfAI",
    leftMenuType: ""
  },
  {
    id: "schoolExl",
    title: {
      en: "SchoolExl",
      fr: "SchoolExl",
      es: "SchoolExl",
      hi: "SchoolExl",
      ar: "SchoolExl"
    },
    subtitle: {
      en: "Visit SchoolExl",
      fr: "Visitez SchoolExl"
    },
    imgSrc: "/img/icons/windowsIcons/743(32x32).png",
    onDesktop: false,
    resizable: false,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    headerPosition: "left",
    headerToolsId: "",
    menuHeaderItemsId: "none",
    iconSrc: "/img/icons/windowsIcons/743(32x32).png",
    initPositionX: 0,
    initPositionY: 0,
    initWidth: 0,
    initHeight: 0,
    minWidth: 0,
    minHeight: 0,
    component: "SchoolExl",
    leftMenuType: ""
  },
];
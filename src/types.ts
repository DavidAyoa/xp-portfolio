export interface Entity {
  id: string;
  title: Record<string, string>;
  subtitle?: Record<string, string>;
  onDesktop: boolean;
  imgSrc: string;
  iconSrc: string;
  component: string;
  headerPosition: 'left' | 'right' | 'center';
  // Optional window properties
  initPositionX?: number;
  initPositionY?: number;
  initWidth?: number;
  initHeight?: number;
  minWidth?: number;
  minHeight?: number;
  leftMenuType?: string;
  headerToolsId?: string;
  menuHeaderItemsId?: string;
  resizable?: boolean;
  windowsHeaderLogo?: boolean;
  isSearchVisible?: boolean;
  // Additional optional properties
  imageStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export interface WindowEntity extends Entity {
  visible: boolean;
  zIndex: number;
  // Override required properties for windows
  initPositionX: number;
  initPositionY: number;
  initWidth: number;
  initHeight: number;
  minWidth: number;
  minHeight: number;
  resizable: boolean;
  menuHeaderItemsId: string;
  windowsHeaderLogo: boolean;
  isSearchVisible: boolean;
}
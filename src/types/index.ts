import { z } from 'zod';
import type { ComponentType, ReactNode } from 'react';

export interface Document {
  id: string;
  name: string;
  // Add other document properties as needed
}

export interface Project {
  id: string;
  name: string;
  // Add other project properties as needed
}

export type TitleType = string | Record<string, string>;
export type HeaderPosition = 'left' | 'right';

// Zod Schemas
export const headerPositionSchema = z.union([z.literal('left'), z.literal('right')]);

// Helper function to normalize title to Record<string, string>
export function normalizeTitle(title: unknown): string | Record<string, string> {
  if (typeof title === 'string') {
    return title;
  }
  if (title && typeof title === 'object' && !Array.isArray(title)) {
    return title as Record<string, string>;
  }
  return 'Untitled';
};

export const baseEntitySchema = z.object({
  id: z.string(),
  title: z.union([z.string(), z.record(z.string())]),
  subtitle: z.union([z.string(), z.record(z.string())]).optional(),
  onDesktop: z.boolean(),
  imgSrc: z.string(),
  iconSrc: z.string(),
  headerPosition: headerPositionSchema,
  resizable: z.boolean(),
  windowsHeaderLogo: z.boolean(),
  isSearchVisible: z.boolean(),
  leftMenuType: z.string().optional(),
  headerToolsId: z.string().optional(),
  menuHeaderItemsId: z.string(),
  initPositionX: z.number(),
  initPositionY: z.number(),
  initWidth: z.number(),
  initHeight: z.number(),
  minWidth: z.number(),
  minHeight: z.number(),
  imageStyle: z.record(z.any()).optional(),
  textStyle: z.record(z.any()).optional(),
});

export const entitySchema = baseEntitySchema.extend({
  component: z.string(),
});

export const windowEntitySchema = baseEntitySchema.extend({
  component: z.any(), // This will be a React component
  visible: z.boolean(),
  zIndex: z.number(),
});

// TypeScript Types
export interface BaseEntity {
  id: string;
  title: string | Record<string, string>;
  subtitle?: string | Record<string, string>;
  onDesktop: boolean;
  imgSrc: string;
  iconSrc: string;
  headerPosition: HeaderPosition;
  resizable: boolean;
  windowsHeaderLogo: boolean;
  isSearchVisible: boolean;
  leftMenuType?: string;
  headerToolsId?: string;
  menuHeaderItemsId: string;
  initPositionX: number;
  initPositionY: number;
  initWidth: number;
  initHeight: number;
  minWidth: number;
  minHeight: number;
  imageStyle?: Record<string, any>;
  textStyle?: Record<string, any>;
}

export interface Entity extends BaseEntity {
  component: string;
}

export interface WindowEntity extends BaseEntity {
  component: string | ComponentType<any>;
  visible: boolean;
  zIndex: number;
}

// Type Guards
export function isEntity(item: unknown): item is Entity {
  const result = entitySchema.safeParse(item);
  return result.success;
}

export function isWindowEntity(item: unknown): item is WindowEntity {
  const result = windowEntitySchema.safeParse(item);
  return result.success && typeof (item as any)?.component === 'function';
}

export function createEntity(overrides: Partial<Entity> = {}): Entity {
  const base: Omit<Entity, 'component'> = {
    id: '',
    title: 'Untitled',
    onDesktop: true,
    imgSrc: '',
    iconSrc: '',
    headerPosition: 'left',
    resizable: true,
    windowsHeaderLogo: false,
    isSearchVisible: false,
    menuHeaderItemsId: 'default',
    initPositionX: 100,
    initPositionY: 100,
    initWidth: 800,
    initHeight: 600,
    minWidth: 300,
    minHeight: 200,
    ...overrides,
  };

  return {
    ...base,
    component: '',
  };
}

export function createWindowEntity(overrides: Partial<Omit<WindowEntity, 'component'>> & { component: ComponentType<any> }): WindowEntity {
  // Create base entity without the component
  const { component, ...rest } = overrides;
  const base = createEntity(rest);
  
  return {
    ...base,
    component: component || (() => null),
    visible: overrides.visible ?? true,
    zIndex: overrides.zIndex ?? 1,
  };
}

export interface DesktopAppsLayoutProps {
  entities: Entity[];
  onEntityClick?: (entity: Entity) => void;
  children?: ReactNode;
}

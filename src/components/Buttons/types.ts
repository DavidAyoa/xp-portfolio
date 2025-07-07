import type { MouseEvent } from 'react';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

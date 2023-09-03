import { createContext, useContext } from 'react';

export type Breakpoint = 'xxxl' | 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs' | 'xxxs';
export type AllowMedia<T> = T | Partial<Record<Breakpoint, T>>;

type ValOrArr<T> = T | T[];
type ValOrTupleOfTwo<T> = T | [T, T];

export interface LayoutContextProps {
  type?: AllowMedia<'grid' | 'flex'>;
  cols?: AllowMedia<ValOrArr<number | string>>;
  gap?: AllowMedia<ValOrTupleOfTwo<number | string>>;

  /** Minimum column size in auto mode. Auto mode allows to create columns of equal size without media queries. */
  auto?: AllowMedia<number>;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const useLayout = (): LayoutContextProps => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('This component must be used within a <Layout> component');
  }

  return context;
};

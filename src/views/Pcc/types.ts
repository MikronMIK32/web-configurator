import type { HTMLProps } from 'react';

export type GridCellProps = {
  col: number;
  row: number;
  width: number | 'cols';
  height: number | 'rows';
};
export interface HorizontalLineProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {
  color?: string;
}

export type Connection = 'none' | 'line' | 'right' | 'bidirectional' | 'biline';

export interface InputBlockProps {
  width: number; // how many cells is the width
  value: string;
  onChange?: (value: string) => void;
  prefix?: string;
  prefixAlign?: 'left' | 'right' | 'center';
  postfix?: string;
  postfixAlign?: 'left' | 'right' | 'center';
  className?: string;

  editable?: boolean;

  connectionRight?: Connection;
  connectionLeft?: Connection;
}

export interface Pin {
  name: string;
  code: string;
  isActive: boolean;
}

export interface MultiplexorProps {
  className?: string;
  pins: Pin[];
}
export interface VerticalLineProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {
  color?: string;
}

export type SchemaItem =
  | ({ type: 'multiplexor' } & MultiplexorProps & GridCellProps)
  | ({ type: 'input-block' } & InputBlockProps & GridCellProps)
  | ({ type: 'vertical-line' } & VerticalLineProps & GridCellProps)
  | ({ type: 'horizontal-line' } & HorizontalLineProps & GridCellProps);

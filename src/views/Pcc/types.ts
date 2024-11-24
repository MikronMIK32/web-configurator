import type { HTMLProps } from 'react';

export type GridCellProps = {
  col: number;
  row: number;
  width: number | 'cols';
  height: number | 'rows';
};

export interface IntersectionProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {}

export interface HorizontalLineProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {
  color?: string;
  totalWidth: number;

  connectionRight?: boolean;
  connectionLeft?: boolean;
}

export type Connection = 'none' | 'line' | 'right' | 'bidirectional' | 'biline';

export interface InputBlockProps {
  name?: string;
  totalWidth: number;
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
  name?: string;
  pins: Pin[];
  cellSize: number;
}
export interface VerticalLineProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {
  color?: string;
  totalHeight: number;

  connectionTop?: boolean;
  connectionBottom?: boolean;
}

export type SchemaItem =
  | ({ type: 'multiplexor' } & MultiplexorProps & GridCellProps)
  | ({ type: 'input-block' } & InputBlockProps & GridCellProps)
  | ({ type: 'vertical-line' } & VerticalLineProps & GridCellProps)
  | ({ type: 'horizontal-line' } & HorizontalLineProps & GridCellProps)
  | ({ type: 'intersection' } & IntersectionProps & GridCellProps);

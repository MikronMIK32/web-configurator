import type { HTMLProps } from 'react';

export type GridCellProps = {
  col: number;
  row: number;
  width: number | 'cols';
  height: number | 'rows';
};

export interface IntersectionProps extends Omit<HTMLProps<HTMLDivElement>, 'color'> {}

export type Connection = 'none' | 'line' | 'left' | 'right' | 'bidirectional' | 'biline';

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

  color?: string;
  backgroundColor?: string;

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
  prefix?: string;
  prefixAlign?: 'left' | 'right' | 'center';
}

export interface WireProps {
  name?: string;
  color?: string;
  points: Array<{ col: number; row: number }>;
}

export type SchemaItem =
  | ({ type: 'multiplexor' } & MultiplexorProps & GridCellProps)
  | ({ type: 'input-block' } & InputBlockProps & GridCellProps)
  | ({ type: 'wire' } & WireProps & GridCellProps)
  | ({ type: 'intersection' } & IntersectionProps & GridCellProps);

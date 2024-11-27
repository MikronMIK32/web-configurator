import type { ReactElement } from 'react';

export type GridCellProps = {
  col: number;
  row: number;
  width: number;
  height: number;

  name?: string;
};

export type Connection = 'none' | 'line' | 'left' | 'right' | 'bidirectional' | 'biline';

export interface Point {
  x: number;
  y: number;
}

export interface Polyline {
  points: Point[];
}

export type IComponent<TProps extends GridCellProps, TName extends string> = {
  name: TName;
  props?: TProps;
  AtlasComponent: (props: TProps) => ReactElement;
  NativeComponent: (props: TProps) => ReactElement;
};

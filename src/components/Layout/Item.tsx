/* eslint-disable @typescript-eslint/no-shadow */
import { HTMLProps, ReactNode, Ref, forwardRef } from 'react';

import { useCSSProperty } from './helpers';
import { AllowMedia, useLayout } from './useLayout';

export interface LayoutItemProps extends HTMLProps<HTMLDivElement> {
  /** Item content. */
  children?: ReactNode;
  /** Column settings. */
  col?: AllowMedia<number | [number, number] | string>;
  /** Row settings. For grids only. */
  row?: AllowMedia<number | [number, number] | string>;
  /** Area name. For grids only. */
  area?: AllowMedia<string>;
  /** Main axis self alignment. For grids only. */
  justify?: AllowMedia<'start' | 'end' | 'center' | 'stretch'>;
  /** Cross axis self alignment. */
  align?: AllowMedia<'start' | 'end' | 'center' | 'stretch'>;
  /** Order. */
  order?: AllowMedia<number>;
  /** Expand on all available space. For flex only.  */
  grow?: AllowMedia<boolean | number>;

  shrink?: AllowMedia<number>;
}

/**
 * Inner `Layout` component for creating layout cells.
 */
const Item = (
  { children, col, row, area, justify, align, order, grow, shrink, ...props }: LayoutItemProps,
  ref: Ref<HTMLDivElement>
) => {
  const { type, gap, cols, auto } = useLayout();

  return (
    <div
      ref={ref}
      css={[
        useCSSProperty({
          name: 'gridColumn',
          props: { col },
          condition: type === 'grid',
          transform: ({ col }) => {
            if (Array.isArray(col)) return `${col[0]} / ${col[1]}`;
            if (Number.isInteger(col)) return `span ${col}`;
            return col;
          },
        }),
        useCSSProperty({
          name: 'gridRow',
          props: { row },
          condition: type === 'grid',
          transform: ({ row }) => {
            if (Array.isArray(row)) return `${row[0]} / ${row[1]}`;
            if (Number.isInteger(row)) return `span ${row}`;
            return row;
          },
        }),
        useCSSProperty({ name: 'gridArea', props: { area }, condition: type === 'grid' }),
        useCSSProperty({ name: 'justifySelf', props: { justify }, condition: type === 'grid' }),
        useCSSProperty({
          name: 'alignSelf',
          props: { align },
          transform: ({ align }) => {
            if (type === 'flex' && (align === 'start' || align === 'end')) return `flex-${align}`;
            return align;
          },
        }),
        useCSSProperty({ name: 'order', props: { order } }),
        useCSSProperty({
          name: 'flexGrow',
          props: { grow, auto },
          condition: type === 'flex',
          transform: ({ grow, auto }) => {
            if (auto) return 1;
            return !Number.isInteger(grow) ? Number(grow) : grow;
          },
        }),
        useCSSProperty({
          name: 'flexShrink',
          props: { shrink, auto },
          condition: type === 'flex',
          transform: ({ shrink, auto }) => {
            if (auto) return undefined;
            return !Number.isInteger(shrink) ? Number(shrink) : shrink;
          },
        }),
        useCSSProperty({
          name: 'padding',
          props: { gap },
          condition: type === 'flex',
          transform: ({ gap }) => {
            if (Array.isArray(gap)) return `${gap[0]}px 0 0 ${gap[1]}px`;
            return `${gap}px 0 0 ${gap}px`;
          },
        }),
        useCSSProperty({
          name: 'flexBasis',
          props: { col, auto },
          condition: type === 'flex',
          transform: ({ col, auto }) => {
            if (auto) return auto;
            if (typeof cols === 'number' && Number.isInteger(Number(col)))
              return `${Math.floor((100 * col * 100) / cols) / 100}%`;
            return col;
          },
        }),
      ]}
      {...props}
    >
      {children}
    </div>
  );
};

export default forwardRef(Item) as never as typeof Item;

import { CSSObject } from '@emotion/react';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { useRef, useMemo, CSSProperties } from 'react';

export enum DroppanelPivot {
  TopRight,
  TopLeft,
  BottomRight,
  BottomLeft,
}

export enum DroppanelMode {
  Normal,
  Fixed,
}

export interface DroppanelOption<T> {
  text: string;
  value: T;
  isActive: boolean;
}

interface DroppanelProps<T> {
  mode: DroppanelMode;
  pivot: DroppanelPivot;
  initialPos: { x: number; y: number };
  options: DroppanelOption<T>[];
  isOpen: boolean;
  onSelect: (option: DroppanelOption<T>) => void;
}

const Droppanel = <T extends string | number>({
  isOpen,
  mode,
  pivot,
  initialPos,
  options,
  onSelect,
}: DroppanelProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const style = useMemo<CSSProperties>(() => {
    if (mode === DroppanelMode.Normal) return {};

    let offsetLeft = 0;
    let offsetTop = 0;

    if (containerRef.current) {
      const computedStyle = window.getComputedStyle(containerRef.current);
      const w = parseInt(computedStyle.width, 10);
      const h = parseInt(computedStyle.height, 10);

      if (
        pivot === DroppanelPivot.TopRight ||
        pivot === DroppanelPivot.BottomRight
      ) {
        offsetLeft -= w;
      }
      if (
        pivot === DroppanelPivot.BottomRight ||
        pivot === DroppanelPivot.BottomLeft
      ) {
        offsetTop -= h;
      }
    }

    return {
      left: `${initialPos.x + offsetLeft}px`,
      top: `${initialPos.y + offsetTop}px`,
    };
  }, [containerRef, initialPos.x, initialPos.y, mode, pivot]);

  const containerCSS = useMemo<CSSObject>(
    () => ({
      background: colors.white,
      border: colors.borderLight,
      zIndex: 2,
      ...(mode === DroppanelMode.Fixed && {
        position: 'fixed',
      }),
      ...(!isOpen && {
        visibility: 'hidden',
        pointerEvents: 'none',
      }),
    }),
    [isOpen, mode],
  );

  return (
    <div ref={containerRef} css={containerCSS} style={style}>
      {options.map((e) => (
        <button
          type="button"
          key={e.value}
          onClick={() => onSelect(e)}
          css={{
            color: colors.primary,
            background: colors.black,
            padding: `${scale(1, true)}px ${scale(3, true)}px`,
            ':hover': {
              color: colors.primaryHover,
            },
            ...(e.isActive && {
              color: colors.black,
              background: colors.primary,
            }),
          }}
        >
          {e.text}
        </button>
      ))}
    </div>
  );
};

export default Droppanel;

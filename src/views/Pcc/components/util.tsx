import { ReactElement } from 'react';
import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { Connection, GridCellProps, IComponent } from '../types';

export const Arrow = ({ dir, top, totalWidth }: { dir: 'left' | 'right'; top: number; totalWidth: number }) => {
  const headWidth = CELL_SIZE * 0.75;
  const headHeight = CELL_SIZE * 0.75;
  const points =
    dir === 'left'
      ? [
          [headWidth, top - headHeight / 2],
          [headWidth, top + headHeight / 2],
          [0, top],
        ]
      : [
          [totalWidth - headWidth + 1, top - headHeight / 2],
          [totalWidth - headWidth + 1, top + headHeight / 2],
          [totalWidth + 1, top],
        ];

  const xOffset = dir === 'left' ? headWidth : 0;

  return (
    <>
      {/* <line
        x1={xOffset}
        y1={top}
        x2={xOffset + totalWidth - headWidth + (dir === 'left' ? 0 : 1)}
        y2={top}
        stroke={STROKE_COLOR}
        strokeWidth={1}
        shapeRendering="crispEdges"
      /> */}
      <polygon points={points.map(e => e.join(',')).join(' ')} fill={STROKE_COLOR} opacity={1} />
    </>
  );
};

export const ArrowBiDirectional = ({
  className,
  width = 96,
  height,
}: {
  className?: string;
  width?: number;
  height: number;
}) => {
  return (
    <svg
      data-type="bidirectional"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <Arrow dir="right" totalWidth={width} top={height / 2 - CELL_SIZE} />
      <Arrow dir="left" totalWidth={width} top={height / 2 + CELL_SIZE} />
    </svg>
  );
};

export const ArrowRight = ({ height, className, width }: { className?: string; width: number; height: number }) => {
  return (
    <svg data-type="right" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <Arrow dir="right" totalWidth={width} top={height / 2} />
    </svg>
  );
};

export const ArrowLeft = ({ height, className, width }: { className?: string; width: number; height: number }) => {
  return (
    <svg data-type="left" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <Arrow dir="left" totalWidth={width} top={height / 2} />
    </svg>
  );
};

export const ConnectionComponent = ({
  connection,
  ...props
}: {
  connection?: Connection;
  width: number;
  height: number;
  className?: string;
}) => {
  switch (connection) {
    case 'left':
      return <ArrowLeft {...props} />;
    case 'right':
      return <ArrowRight {...props} />;
    case 'bidirectional':
      return <ArrowBiDirectional {...props} />;
    default:
      return null;
  }
};

export function createComponent<TProps extends GridCellProps, TName extends string>(
  name: TName,
  {
    AtlasComponent,
    NativeComponent,
  }: {
    AtlasComponent?: (props: TProps) => ReactElement;
    NativeComponent?: (props: TProps) => ReactElement;
  }
) {
  return {
    name,
    AtlasComponent: AtlasComponent || (() => null),
    NativeComponent: NativeComponent || (() => null),
  } as never as IComponent<TProps, TName>;
}

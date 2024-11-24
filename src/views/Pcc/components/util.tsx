import { colors } from '@scripts/colors';

import { CELL_SIZE } from '../constants';
import { Connection } from '../types';

const STROKE_WIDTH = 2;

export const Line = ({ className, width = 96, height }: { className?: string; width?: number; height: number }) => {
  return (
    <svg data-type="line" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke={colors.black} strokeWidth={STROKE_WIDTH} />
    </svg>
  );
};

export const BiLine = ({ className, width = 96, height }: { className?: string; width?: number; height: number }) => {
  const half = height / 2;

  return (
    <svg data-type="biline" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
      <line
        x1={0}
        y1={half - CELL_SIZE}
        x2={width}
        y2={half - CELL_SIZE}
        stroke={colors.black}
        strokeWidth={STROKE_WIDTH}
      />
      <line
        x1={0}
        y1={half + CELL_SIZE}
        x2={width}
        y2={half + CELL_SIZE}
        stroke={colors.black}
        strokeWidth={STROKE_WIDTH}
      />
    </svg>
  );
};

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
  const yOffset = top;

  return (
    <>
      <line
        x1={xOffset}
        y1={yOffset}
        x2={xOffset + totalWidth - headWidth + (dir === 'left' ? 0 : 1)}
        y2={yOffset}
        stroke={colors.black}
        strokeWidth={STROKE_WIDTH}
      />
      <polygon points={points.map(e => e.join(',')).join(' ')} fill={colors.black} />
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
    case 'line':
      return <Line {...props} />;
    case 'right':
      return <ArrowRight {...props} />;
    case 'biline':
      return <BiLine {...props} />;
    case 'bidirectional':
      return <ArrowBiDirectional {...props} />;
    default:
      return null;
  }
};

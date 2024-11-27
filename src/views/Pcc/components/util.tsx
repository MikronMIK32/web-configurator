import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { Connection } from '../types';

export const Line = ({ className, width = 96, height }: { className?: string; width?: number; height: number }) => {
  return (
    <svg
      data-type="line"
      width={width}
      height={2}
      viewBox={`0 0 ${width} ${2}`}
      className={className}
      css={{
        marginTop: (height - 2) / 2,
      }}
    >
      <line
        x1={0}
        y1={1}
        x2={width}
        y2={1}
        stroke={STROKE_COLOR}
        strokeWidth={STROKE_WIDTH*2}
        shapeRendering="crispEdges"
      />
    </svg>
  );
};

export const BiLine = ({ className, width = 96, height }: { className?: string; width?: number; height: number }) => {
  // const half = height / 2;
  const selfHeight = 2 * CELL_SIZE + 2;

  return (
    <>
      <svg
        data-type="biline"
        width={width}
        height={selfHeight}
        viewBox={`0 0 ${width} ${selfHeight}`}
        className={className}
        css={{
          marginTop: (height - selfHeight) / 2,
        }}
      >
        <line
          x1={0}
          y1={1}
          x2={width}
          y2={1}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH * 2}
          shapeRendering="crispEdges"
        />
        <line
          x1={0}
          y1={selfHeight - 1}
          x2={width}
          y2={selfHeight - 1}
          stroke={STROKE_COLOR}
          strokeWidth={STROKE_WIDTH * 2}
          shapeRendering="crispEdges"
        />
      </svg>
    </>
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
        stroke={STROKE_COLOR}
        strokeWidth={1}
        shapeRendering="crispEdges"
      />
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
    case 'line':
      return <Line {...props} />;
    case 'left':
      return <ArrowLeft {...props} />;
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

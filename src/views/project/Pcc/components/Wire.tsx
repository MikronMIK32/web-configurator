import { useMemo } from 'react';

import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { GridCellProps } from '../types';
import { createComponent } from './util';

export interface WireProps extends GridCellProps {
  name?: string;
  color?: string;
  points: Array<{ col: number; row: number }>;
}

function WireSvg({ points: propsPoints, color, name, isDebug }: WireProps) {
  const points = useMemo(
    () =>
      propsPoints.map(point => ({
        x: point.col * CELL_SIZE - CELL_SIZE,
        y: point.row * CELL_SIZE - CELL_SIZE,
      })),
    [propsPoints]
  );

  const medianPoint = useMemo(() => {
    if (points.length === 0) return null; // Handle empty array

    const xCoordinates = points.map(point => point.x);
    const yCoordinates = points.map(point => point.y);

    xCoordinates.sort((a, b) => a - b);
    yCoordinates.sort((a, b) => a - b);

    const midXIndex = Math.floor(xCoordinates.length / 2);
    const midYIndex = Math.floor(yCoordinates.length / 2);

    const medianX =
      xCoordinates.length % 2 === 0
        ? (xCoordinates[midXIndex - 1] + xCoordinates[midXIndex]) / 2
        : xCoordinates[midXIndex];

    const medianY =
      yCoordinates.length % 2 === 0
        ? (yCoordinates[midYIndex - 1] + yCoordinates[midYIndex]) / 2
        : yCoordinates[midYIndex];

    return { x: medianX, y: medianY };
  }, [points]);

  return (
    <>
      {isDebug && name && (
        <text
          x={medianPoint?.x}
          y={medianPoint?.y}
          stroke="#999"
          css={{
            zIndex: 999,
            fontSize: '1rem',
            pointerEvents: 'all',
          }}
        >
          {name}
        </text>
      )}
      <polyline
        key={points.map(e => `${e.x},${e.y}`).join(' ')}
        name={name}
        fill="none"
        points={points.map(e => `${e.x},${e.y}`).join(' ')}
        stroke={color || STROKE_COLOR}
        strokeWidth={STROKE_WIDTH}
        shapeRendering="crispEdges"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

export default createComponent('wire', {
  AtlasComponent: WireSvg,
});

import { useMemo } from 'react';

import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { GridCellProps } from '../types';
import { createComponent } from './util';

export interface WireProps extends GridCellProps {
  name?: string;
  color?: string;
  points: Array<{ col: number; row: number }>;
}

function WireSvg({ col, row, height, points: propsPoints, width, color, name }: WireProps) {
  const points = useMemo(
    () =>
      propsPoints.map(point => ({
        x: point.col * CELL_SIZE - CELL_SIZE,
        y: point.row * CELL_SIZE - CELL_SIZE,
      })),
    [propsPoints]
  );

  return (
    <polyline
      key={points.map(e => `${e.x},${e.y}`).join(' ')}
      name={name}
      fill="none"
      points={points.map(e => `${e.x},${e.y}`).join(' ')}
      stroke={color || STROKE_COLOR}
      strokeWidth={STROKE_WIDTH}
      shapeRendering="crispEdges"
    />
  );
}

export default createComponent('wire', {
  AtlasComponent: WireSvg,
});

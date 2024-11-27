import { useMemo } from 'react';

import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { WireProps } from '../types';

interface Point {
  x: number;
  y: number;
}

export interface Polyline {
  points: Point[];
}

export interface WiresProps {
  wires: WireProps[];
  className?: string;
}

export default function Wires({ wires, className }: WiresProps) {
  const lines = useMemo(
    () =>
      wires.map(wire => {
        return {
          ...wire,
          points: wire.points.map(point => ({
            x: point.col * CELL_SIZE - CELL_SIZE,
            y: point.row * CELL_SIZE - CELL_SIZE,
          })),
        };
      }),
    [wires]
  );

  return (
    <svg width="100%" height="100%" className={className}>
      {lines.map(line => (
        <polyline
          key={line.points.map(e => `${e.x},${e.y}`).join(' ')}
          name={line.name}
          fill="none"
          points={line.points.map(e => `${e.x},${e.y}`).join(' ')}
          stroke={line.color || STROKE_COLOR}
          strokeWidth={STROKE_WIDTH}
          shapeRendering="crispEdges"
        />
      ))}
    </svg>
  );
}

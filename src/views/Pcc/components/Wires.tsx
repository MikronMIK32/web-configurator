import { useMemo } from 'react';

import { colors } from '@scripts/colors';

interface Point {
  x: number;
  y: number;
}

export interface Line {
  p0: Point;
  p1: Point;
}

export interface WiresProps {
  lines: Line[];
  className?: string;
}

interface Polyline {
  points: Point[];
}

function createPolylines(lineSegments: Line[]): Polyline[] {
  //If the input is empty, return an empty array
  if (!lineSegments || lineSegments.length === 0) return [];

  const polylines: Polyline[] = [];
  let currentPolyline: Point[] = [];

  //Helper function to check if two points are connected.  Allows for slight tolerance in case of rounding errors.
  const arePointsConnected = (point1: Point, point2: Point, tolerance = 0.001) => {
    return Math.abs(point1.x - point2.x) < tolerance && Math.abs(point1.y - point2.y) < tolerance;
  };

  for (const segment of lineSegments) {
    if (currentPolyline.length === 0) {
      currentPolyline.push(segment.p0, segment.p1);
    } else {
      //Check if the last point in the current polyline connects to the start point of the next segment
      if (arePointsConnected(currentPolyline[currentPolyline.length - 1], segment.p0)) {
        currentPolyline.push(segment.p1);
      } else {
        //If not connected, start a new polyline
        polylines.push({ points: currentPolyline });
        currentPolyline = [segment.p0, segment.p1];
      }
    }
  }
  //Add the last polyline to the result
  if (currentPolyline.length > 0) {
    polylines.push({ points: currentPolyline });
  }

  return polylines;
}

export default function Wires({ lines, className }: WiresProps) {
  console.log(lines);
  const polylines = useMemo(() => createPolylines(lines), [lines]);

  console.log(polylines);

  return (
    <svg width="100%" height="100%" className={className}>
      {polylines.map(line => (
        <polyline
          key={line.points.map(point => `${point.x},${point.y}`).join(' ')}
          points={line.points.map(point => `${point.x},${point.y}`).join(' ')}
          stroke={colors.black}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

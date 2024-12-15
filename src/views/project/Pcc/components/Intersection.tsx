import { CELL_SIZE, STROKE_COLOR } from '../constants';
import { GridCellProps } from '../types';
import { createComponent } from './util';

export interface IntersectionProps extends GridCellProps { }

function SvgIntersection({ col, row, isDebug, name }: IntersectionProps) {
  return (
    <>
      {isDebug && name && (
        <text
          x={col * CELL_SIZE - CELL_SIZE * 0.8}
          y={row * CELL_SIZE - CELL_SIZE * 1.2}
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
      <circle
        cx={col * CELL_SIZE - CELL_SIZE}
        cy={row * CELL_SIZE - CELL_SIZE}
        r={CELL_SIZE * 0.333}
        fill={STROKE_COLOR}
      />
    </>
  );
}

export default createComponent('intersection', {
  AtlasComponent: SvgIntersection,
});

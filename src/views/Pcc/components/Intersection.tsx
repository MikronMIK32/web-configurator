import { CELL_SIZE, STROKE_COLOR } from '../constants';
import { GridCellProps } from '../types';
import { createComponent } from './util';

export interface IntersectionProps extends GridCellProps {}

function SvgIntersection({ col, row }: IntersectionProps) {
  return (
    <circle
      cx={col * CELL_SIZE - CELL_SIZE}
      cy={row * CELL_SIZE - CELL_SIZE}
      r={CELL_SIZE * 0.333}
      fill={STROKE_COLOR}
    />
  );
}

export default createComponent('intersection', {
  AtlasComponent: SvgIntersection,
});

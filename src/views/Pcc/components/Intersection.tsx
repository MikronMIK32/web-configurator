import { colors } from '@scripts/colors';

import { CELL_SIZE } from '../constants';
import { IntersectionProps } from '../types';

const size = 0.75 * CELL_SIZE;

export default function Intersection(props: IntersectionProps) {
  return (
    <div
      {...props}
      css={{
        position: 'relative',
        '::after': {
          position: 'absolute',
          content: '""',
          width: size,
          height: size,
          borderRadius: '50%',
          background: colors.black,
          top: -size/2,
          left: -size/2,
        },
      }}
    />
  );
}

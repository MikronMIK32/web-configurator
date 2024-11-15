import { colors } from '@scripts/colors';

import { VerticalLineProps } from '../types';

export default function VerticalLine({ color, ...props }: VerticalLineProps) {
  return (
    <div
      {...props}
      css={{
        position: 'relative',
        '::before': {
          content: '""',
          background: color || colors.black,
          width: 2,
          height: '100%',
          position: 'absolute',
        },
      }}
    />
  );
}

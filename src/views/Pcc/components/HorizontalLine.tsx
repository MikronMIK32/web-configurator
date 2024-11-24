import { colors } from '@scripts/colors';

import { HorizontalLineProps } from '../types';

export default function HorizontalLine({ color, ...props }: HorizontalLineProps) {
  return (
    <div
      {...props}
      css={{
        position: 'relative',
        '::before': {
          content: '""',
          background: color ?? colors.black,
          height: 3,
          transform: 'translateY(calc(-50% + 0.5px))',
          width: '100%',
          position: 'absolute',
        },
      }}
    />
  );
}

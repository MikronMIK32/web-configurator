import { colors } from '@scripts/colors';

import { VerticalLineProps } from '../types';

export default function VerticalLine({ color, ...props }: VerticalLineProps) {
  return (
    <div
      {...props}
      css={{
        background: color || colors.black,
        width: 2,
      }}
    />
  );
}

import { colors } from '@scripts/colors';

import { HorizontalLineProps } from '../types';

export default function HorizontalLine({ color = colors.black, totalWidth, ...props }: HorizontalLineProps) {
  return (
    <div
      {...props}
      css={{
        position: 'relative',
      }}
    >
      <svg
        width={totalWidth}
        height="12"
        viewBox={`0 0 ${totalWidth} 12`}
        css={{
          position: 'absolute',
          top: -6,
        }}
      >
        <line x1="0" y1="6" x2={totalWidth} y2="6" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  );
}

import { colors } from '@scripts/colors';

import { HorizontalLineProps } from '../types';

export default function HorizontalLine({ color = colors.black, totalWidth, ...props }: HorizontalLineProps) {
  const height = 2; 

  return (
    <div
      {...props}
      css={{
        position: 'relative',
      }}
    >
      <svg
        width={totalWidth + 2}
        height={height} // Updated height
        viewBox={`0 0 ${totalWidth} ${height}`} // Updated viewBox
        css={{
          position: 'absolute',
          top: -height / 2, // Adjusted top shift
        }}
      >
        <line
          x1={-1}
          y1={height / 2} // Adjusted y1 for new height
          x2={totalWidth + 1}
          y2={height / 2} // Adjusted y2 for new height
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

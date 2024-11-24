import { colors } from '@scripts/colors';

import { VerticalLineProps } from '../types';

export default function VerticalLine({ color = colors.black, totalHeight, ...props }: VerticalLineProps) {
  const width = 2; // New width for the SVG

  return (
    <div
      {...props}
      css={{
        position: 'relative',
      }}
    >
      <svg
        width={width} // Updated width for vertical line
        height={totalHeight + 2} // Updated height
        viewBox={`0 0 ${width} ${totalHeight}`} // Updated viewBox
        css={{
          position: 'absolute',
          left: -width / 2, // Adjusted left shift for vertical alignment
        }}
      >
        <line
          x1={width / 2} // Adjusted x1 for new width
          y1={-1} // Start just above the top of the SVG
          x2={width / 2} // Same x position for vertical line
          y2={totalHeight + 1} // Extend just below the bottom of the SVG
          stroke={color}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

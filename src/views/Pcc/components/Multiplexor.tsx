import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

import { MultiplexorProps, Pin } from '../types';
import useCellDims from '../useCellDims';

interface TrapezoidProps {
  height: number;
  className?: string;
  width?: number;
}

const Trapezoid = ({ width = 30, height, className }: TrapezoidProps) => {
  const halfDiff = Math.tan(0.5) * width;

  return (
    <svg width={width} height={height} className={className}>
      <polygon
        points={`
              ${width - 1},${halfDiff} 
              ${width - 1},${height - halfDiff}
              1,${height}
              1,0
            `}
        fill={colors.grey200}
        strokeWidth="2"
        stroke={colors.black}
      />
    </svg>
  );
};

const activeColor = colors.backgroundPurple;

const ArrowRight = ({ className, width = 96 }: { className?: string; width?: number }) => {
  const headWidth = 12;
  const headHeight = 12;
  const points = [
    [width - headWidth, 6 - headHeight / 2],
    [width - headWidth, 6 + headHeight / 2],
    [width, 6],
  ];

  return (
    <svg width={width > 0 ? width : 32} height="12" viewBox={`0 0 ${width > 0 ? width : 30} 12`} className={className}>
      <line x1="0" y1="6" x2={width - headWidth} y2="6" stroke={colors.black} strokeWidth="2" />
      <polygon points={points.map(e => e.join(',')).join(' ')} fill={colors.black} />
    </svg>
  );
};

const PinComponent = ({ isActive, name, arrowWidth }: Pin & { index: number; arrowWidth: number }) => (
  <button
    type="button"
    css={{
      width: 16,
      height: 16,
      borderRadius: '100%',
      background: '#fff',
      border: '2px solid ' + colors.black,
      display: 'block',
      position: 'relative',

      '::after': {
        display: 'var(--after-display)',
        content: '""',
        background: activeColor,
        width: 8,
        height: 8,
        marginLeft: 1.5,
        borderRadius: '100%',
      },
    }}
    style={{
      ...(isActive && {
        border: '3px solid ' + activeColor,
      }),
      ...{
        '--after-display': isActive ? 'block' : 'none',
      },
    }}
  >
    <ArrowRight
      css={{
        position: 'absolute',
        left: -arrowWidth - 8,
        top: 0,
        pointerEvents: 'none',
      }}
      width={arrowWidth}
    />
    <span
      css={{
        pointerEvents: 'none',
        position: 'absolute',
        ...typography('paragraphSmall'),
        left: -arrowWidth - 8,
        top: -14,
        paddingRight: 16,
        textAlign: 'right',
      }}
      style={{ width: arrowWidth }}
    >
      {name}
    </span>
  </button>
);

const Multiplexor = ({ className, pins }: MultiplexorProps) => {
  const { dims, onMeasure } = useCellDims();

  return (
    <div
      css={{ position: 'relative', display: 'flex' }}
      className={className}
      ref={node => {
        onMeasure(node);
      }}
    >
      <Trapezoid
        height={dims.h}
        width={32}
        css={{
          marginLeft: 'auto',
        }}
      />
      <div
        css={{
          display: 'flex',
          gap: 12,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          position: 'absolute',
          right: 0,
          height: '100%',
          top: 0,
        }}
      >
        {pins.map((pin, index) => (
          <PinComponent key={pin.code} {...pin} index={index} arrowWidth={dims.w - 32} />
        ))}
      </div>
    </div>
  );
};

export default Multiplexor;

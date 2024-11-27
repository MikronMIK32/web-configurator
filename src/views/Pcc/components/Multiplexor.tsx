import { useEffect } from 'react';

import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

import useCellDims from '../useCellDims';
import { ArrowRight, createComponent } from './util';
import { GridCellProps } from '../types';
import { CELL_SIZE, STROKE_COLOR } from '../constants';
import getCellCss from '../getCellCss';

export interface Pin {
  name: string;
  code: string;
  isActive: boolean;
}

export interface MultiplexorProps extends GridCellProps {
  className?: string;
  pins: Pin[];
  prefix?: string;
  prefixAlign?: 'left' | 'right' | 'center';
}

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

const PinComponent = ({ isActive, name, arrowWidth, height }: Pin & { arrowWidth: number; height: number }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      height: '100%',
      width: '100%',
    }}
  >
    <label
      htmlFor={'radio_' + name}
      css={{
        width: 16,
        height: 16,
        borderRadius: '100%',
        background: '#fff',
        border: '2px solid ' + colors.black,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
      style={{
        ...(isActive && {
          border: '2px solid ' + activeColor,
        }),
      }}
      title="Переключить"
    >
      <span
        style={{
          display: isActive ? 'block' : 'none',
          background: activeColor,
          width: 8,
          height: 8,
          borderRadius: '100%',
        }}
      />

      <ArrowRight
        css={{
          position: 'absolute',
          left: -arrowWidth - 10.5,
          pointerEvents: 'none',
        }}
        width={arrowWidth}
        height={height}
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
      <input type="radio" name={name} id={'radio_' + name} css={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }} />
    </label>
  </div>
);

const Native = ({ className, pins, prefix, prefixAlign = 'left', col, row, height, width }: MultiplexorProps) => {
  const { dims, onMeasure, updateLast } = useCellDims();

  useEffect(() => {
    updateLast();
  }, [pins, col, row, width, height, updateLast]);

  return (
    <div
      css={{
        ...getCellCss(col, row, width, height),
        position: 'relative',
        display: 'flex',
      }}
      className={className}
      ref={node => {
        onMeasure(node);
      }}
    >
      {prefix && (
        <p
          css={{
            ...typography('labelSmall'),
            whiteSpace: 'nowrap',
            position: 'absolute',
            transform: 'translateY(-100%)',
            top: 0,
          }}
          style={{
            textAlign: prefixAlign,
          }}
        >
          {prefix}
        </p>
      )}
      {/* TODO: move it to atlas! */}
      <Trapezoid
        height={dims.h}
        width={32}
        css={{
          marginLeft: 'auto',
        }}
      />
      <div
        css={{
          display: 'grid',
          gridTemplateRows: pins.map(() => 2 * CELL_SIZE + 'px').join(' '),
          gap: 0,
          paddingTop: CELL_SIZE,
          paddingBottom: CELL_SIZE,
          width: 32,
          position: 'absolute',
          right: 0,
          height: '100%',
          top: 0,
        }}
      >
        {pins.map(pin => (
          <PinComponent key={pin.code} {...pin} height={dims.h} arrowWidth={dims.w - 32} />
        ))}
      </div>
    </div>
  );
};

function Atlas({ col, row, width, pins }: MultiplexorProps) {
  const paddingTop = 2 * CELL_SIZE;
  const gap = 2 * CELL_SIZE;

  const x = col * CELL_SIZE - CELL_SIZE;
  const y = row * CELL_SIZE - CELL_SIZE + paddingTop;

  return (
    <>
      {pins.map((_, index) => (
        <line
          x1={x}
          y1={y + gap * index}
          x2={x + width * CELL_SIZE}
          y2={y + gap * index}
          stroke={STROKE_COLOR}
          strokeWidth={1}
          shapeRendering="crispEdges"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

export default createComponent('multiplexor', {
  NativeComponent: Native,
  AtlasComponent: Atlas,
});

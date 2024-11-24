import { useEffect } from 'react';

import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

import { Connection, InputBlockProps } from '../types';
import useCellDims from '../useCellDims';

const Line = ({ className, width = 96 }: { className?: string; width?: number }) => {
  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} className={className}>
      <line x1="0" y1="6" x2={width} y2="6" stroke={colors.black} strokeWidth="2" />
    </svg>
  );
};

const BiLine = ({ className, width = 96 }: { className?: string; width?: number }) => {
  return (
    <svg width={width} height="36" viewBox={`0 0 ${width} 36`} className={className}>
      <line x1="0" y1="6" x2={width} y2="6" stroke={colors.black} strokeWidth="2" />
      <line x1="0" y1={6 + 24} x2={width} y2={6 + 24} stroke={colors.black} strokeWidth="2" />
    </svg>
  );
};

const ArrowBiDirectional = ({ className, width = 96 }: { className?: string; width?: number }) => {
  const renderSingle = (reverse = false, yOffset = 0) => {
    const headWidth = 12;
    const headHeight = 12;
    const points = reverse
      ? [
          [headWidth, yOffset + 6 - headHeight / 2],
          [headWidth, yOffset + 6 + headHeight / 2],
          [0, yOffset + 6],
        ]
      : [
          [width - headWidth, yOffset + 6 - headHeight / 2],
          [width - headWidth, yOffset + 6 + headHeight / 2],
          [width, yOffset + 6],
        ];

    const xOffset = reverse ? headWidth : 0;

    return (
      <>
        <line
          x1={xOffset}
          y1={6 + yOffset}
          x2={xOffset + width - headWidth}
          y2={6 + yOffset}
          stroke={colors.black}
          strokeWidth="2"
        />
        <polygon points={points.map(e => e.join(',')).join(' ')} fill={colors.black} />
      </>
    );
  };

  return (
    <svg data-type="bidir" width={width} height="36" viewBox={`0 0 ${width} 36`} className={className}>
      {renderSingle()}
      {renderSingle(true, 24)}
    </svg>
  );
};

const ArrowRight = (props: { className?: string; width?: number }) => {
  const { className, width = 96 } = props;
  const headWidth = 12;
  const headHeight = 12;
  const points = [
    [width - headWidth, 6 - headHeight / 2],
    [width - headWidth, 6 + headHeight / 2],
    [width, 6],
  ];

  return (
    <svg width={width} height="12" viewBox={`0 0 ${width} 12`} className={className}>
      <line x1="0" y1="6" x2={width - headWidth} y2="6" stroke={colors.black} strokeWidth="2" />
      <polygon points={points.map(e => e.join(',')).join(' ')} fill={colors.black} />
    </svg>
  );
};

const ConnectionComponent = ({
  connection,
  ...props
}: {
  connection?: Connection;
  width?: number;
  className?: string;
}) => {
  switch (connection) {
    case 'line':
      return (
        <Line
          {...props}
          css={{
            top: '26px',
          }}
        />
      );
    case 'right':
      return (
        <ArrowRight
          {...props}
          css={{
            top: 27,
          }}
        />
      );
    case 'biline':
      return (
        <BiLine
          {...props}
          css={{
            top: 13,
          }}
        />
      );
    case 'bidirectional':
      return (
        <ArrowBiDirectional
          {...props}
          css={{
            top: 13,
          }}
        />
      );
    default:
      return null;
  }
};

const InputBlock = ({
  width: cellWidth,
  onChange,
  prefix,
  prefixAlign = 'left',
  value,
  postfix,
  postfixAlign = 'left',
  connectionLeft,
  connectionRight,
  ...props
}: InputBlockProps) => {
  const { dims, onMeasure, updateLast } = useCellDims();

  useEffect(() => {
    updateLast();
  }, [updateLast, cellWidth, connectionLeft, connectionRight]);

  return (
    <div
      {...props}
      data-dims-w={dims.w}
      css={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
        gap: 0,
        justifyContent: 'center',
      }}
      ref={onMeasure}
    >
      {prefix && (
        <p
          css={{
            ...typography('labelSmall'),
            whiteSpace: 'nowrap',
            position: 'absolute',
            width: 80,
            top: -8,
          }}
          style={{
            textAlign: prefixAlign,
          }}
        >
          {prefix}
        </p>
      )}
      {onChange ? (
        <input
          type="text"
          value={value}
          onChange={e => {
            onChange(e.currentTarget.value);
          }}
          css={{
            outline: 'none!important',
            border: '2px solid ' + colors.black,
            height: 40,
            width: 80,
            display: 'flex',
            textAlign: 'center',
            background: colors.purpleLight,
            color: colors.white,
            ...typography('labelMedium'),
          }}
        />
      ) : (
        <p
          css={{
            outline: 'none!important',
            border: '2px solid ' + colors.black,
            height: 40,
            width: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: colors.black,
            color: colors.white,
            ...typography('labelMedium'),
          }}
        >
          {value}
        </p>
      )}
      <ConnectionComponent
        connection={connectionLeft}
        width={dims.w / cellWidth}
        css={{
          position: 'absolute',
          left: -dims.w / cellWidth,
        }}
      />
      <ConnectionComponent
        connection={connectionRight}
        width={dims.w - 80}
        css={{
          position: 'absolute',
          right: 0,
        }}
      />
      {postfix && (
        <p
          css={{
            ...typography('paragraphSmall'),
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: 40 + 16,
            width: 80,
          }}
          style={{
            textAlign: postfixAlign,
          }}
        >
          {postfix}
        </p>
      )}
    </div>
  );
};

export default InputBlock;

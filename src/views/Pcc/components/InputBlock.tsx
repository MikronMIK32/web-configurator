import { css } from '@emotion/react';
import { CSSProperties, useEffect } from 'react';

import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

import { CELL_SIZE, STROKE_COLOR, STROKE_WIDTH } from '../constants';
import { Connection, GridCellProps } from '../types';
import useCellDims from '../useCellDims';
import { createComponent } from './util';
import getCellCss from '../getCellCss';

export interface InputBlockProps extends GridCellProps {
  name?: string;
  value: string;
  onChange?: (value: string) => void;
  prefix?: string;
  prefixAlign?: 'left' | 'right' | 'center';
  postfix?: string;
  postfixAlign?: 'left' | 'right' | 'center';
  className?: string;

  editable?: boolean;

  color?: string;
  backgroundColor?: string;

  connectionRight?: Connection;
  connectionLeft?: Connection;
}

const blockCSS = css({
  outline: 'none!important',
  border: '2px solid ' + colors.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  ...typography('labelMedium'),
});

const INPUT_HEIGHT = CELL_SIZE * 4;
const INPUT_WIDTH = CELL_SIZE * 6;

function Atlas({ col, row, width, height, connectionLeft, connectionRight }: InputBlockProps) {
  const top = (row - 1) * CELL_SIZE;
  const left = (col - 1) * CELL_SIZE;

  let leftWidth = 0;
  let rightWidth = 0;
  if (connectionLeft !== 'none' && connectionRight !== 'none') {
    leftWidth = rightWidth = (width * CELL_SIZE - INPUT_WIDTH) / 2;
  } else if (connectionLeft !== 'none') {
    leftWidth = width * CELL_SIZE - INPUT_WIDTH;
  } else {
    rightWidth = width * CELL_SIZE - INPUT_WIDTH;
  }

  const cy = top + (height / 2) * CELL_SIZE;

  const renderLine = (isLeft: boolean, yOffset = 0) => {
    let x1 = isLeft ? left : left + leftWidth + INPUT_WIDTH;
    const lineWidth = isLeft ? leftWidth : rightWidth;

    return (
      <line
        x1={x1}
        x2={x1 + lineWidth}
        y1={cy + yOffset}
        y2={cy + yOffset}
        strokeWidth={STROKE_WIDTH}
        stroke={STROKE_COLOR}
        fill="none"
        shapeRendering="crispEdges"
      />
    );
  };

  const renderBiline = (isLeft: boolean) => {
    return (
      <>
        {renderLine(isLeft, -CELL_SIZE)}
        {renderLine(isLeft, +CELL_SIZE)}
      </>
    );
  };

  const headWidth = CELL_SIZE * 0.75;
  const headHeight = CELL_SIZE * 0.75;

  const renderArrow = (dir: 'left' | 'right' = 'left', isLeft: boolean, yOffset = 0) => {
    let x1 = isLeft ? left : left + leftWidth + INPUT_WIDTH;
    const lineWidth = isLeft ? leftWidth : rightWidth;

    const points =
      dir === 'left'
        ? [
            [x1 + headWidth, cy - headHeight / 2 + yOffset],
            [x1 + headWidth, cy + headHeight / 2 + yOffset],
            [x1, cy + yOffset],
          ]
        : [
            [x1 + lineWidth - headWidth + 1, cy - headHeight / 2 + yOffset],
            [x1 + lineWidth - headWidth + 1, cy + headHeight / 2 + yOffset],
            [x1 + lineWidth + 1, cy + yOffset],
          ];

    return (
      <>
        {renderLine(isLeft, yOffset)}
        <polygon points={points.map(e => e.join(',')).join(' ')} fill={STROKE_COLOR} stroke="none" />
      </>
    );
  };

  const renderBiDir = (isLeft: boolean) => {
    return (
      <>
        {renderArrow('right', isLeft, -CELL_SIZE)}
        {renderArrow('left', isLeft, +CELL_SIZE)}
      </>
    );
  };

  return (
    <>
      {connectionLeft === 'line' && renderLine(true)}
      {connectionRight === 'line' && renderLine(false)}

      {connectionLeft === 'biline' && renderBiline(true)}
      {connectionRight === 'biline' && renderBiline(true)}

      {connectionLeft === 'right' && renderArrow('right', true)}
      {connectionRight === 'right' && renderArrow('right', false)}

      {connectionLeft === 'left' && renderArrow('left', true)}
      {connectionRight === 'left' && renderArrow('left', false)}

      {connectionLeft === 'bidirectional' && renderBiDir(true)}
      {connectionRight === 'bidirectional' && renderBiDir(false)}
    </>
  );
}

const NativeInputBlock = ({
  col,
  row,
  width,
  height,
  onChange,
  prefix,
  prefixAlign = 'left',
  value,
  postfix,
  postfixAlign = 'left',
  connectionLeft = 'none',
  connectionRight = 'none',
  backgroundColor,
  color,
  name,
  ...props
}: InputBlockProps) => {
  delete props.editable;

  const { dims, onMeasure, updateLast } = useCellDims();

  useEffect(() => {
    updateLast();
  }, [updateLast, col, row, width, height, connectionLeft, connectionRight]);

  const blockStyle: CSSProperties = {
    height: INPUT_HEIGHT,
    width: INPUT_WIDTH,
    color: color || colors.white,
    backgroundColor: backgroundColor || (onChange ? colors.purpleLight : colors.black),
  };

  let alignItems: CSSProperties['alignItems'];

  if (connectionLeft !== 'none' && connectionRight !== 'none') {
    alignItems = 'center';
  } else if (connectionLeft !== 'none') {
    alignItems = 'flex-end';
  } else {
    alignItems = 'flex-start';
  }

  return (
    <div
      {...props}
      data-dims-w={dims.w}
      css={{
        ...getCellCss(col, row, width, height),
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        gap: 0,
      }}
      style={{
        alignItems,
      }}
      ref={onMeasure}
    >
      {prefix && (
        <p
          css={{
            ...typography('labelSmall'),
            whiteSpace: 'nowrap',
            position: 'absolute',
            transform: 'translateY(-100%)',
            top: -CELL_SIZE / 4,
          }}
          style={{
            textAlign: prefixAlign,
              width: INPUT_WIDTH,
          }}
        >
          {prefix}
        </p>
      )}

      {postfix && (
        <p
          css={{
            ...typography('paragraphSmall'),
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: INPUT_HEIGHT + CELL_SIZE / 4,
          }}
          style={{
            textAlign: postfixAlign,
              width: INPUT_WIDTH,
          }}
        >
          {postfix}
        </p>
      )}

      {onChange ? (
        <input
          type="text"
          value={value}
          name={name}
          onChange={e => {
            onChange(e.currentTarget.value);
          }}
          css={blockCSS}
          style={blockStyle}
        />
      ) : (
        <p style={blockStyle} css={blockCSS}>
          {value}
        </p>
      )}
    </div>
  );
};

export default createComponent('input-block', {
  NativeComponent: NativeInputBlock,
  AtlasComponent: Atlas,
});

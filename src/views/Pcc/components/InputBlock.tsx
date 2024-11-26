import { css } from '@emotion/react';
import { CSSProperties, useEffect } from 'react';

import { colors } from '@scripts/colors';
import typography from '@scripts/typography';

import { CELL_SIZE } from '../constants';
import { InputBlockProps } from '../types';
import useCellDims from '../useCellDims';
import { ConnectionComponent } from './util';

const blockCSS = css({
  outline: 'none!important',
  border: '2px solid ' + colors.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  ...typography('labelMedium'),
});

const InputBlock = ({
  totalWidth,
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
  }, [updateLast, totalWidth, connectionLeft, connectionRight]);

  const inputHeight = CELL_SIZE * 4;
  const inputWidth = CELL_SIZE * 6;
  const widthForBothConnections = dims.w - inputWidth;

  let connections = 0;

  if (connectionLeft !== 'none') connections += 1;
  if (connectionRight !== 'none') connections += 1;

  const connectionWidth = widthForBothConnections / connections;

  const blockStyle: CSSProperties = {
    height: inputHeight,
    width: inputWidth,
    color: color || colors.white,
    backgroundColor: backgroundColor || (onChange ? colors.purpleLight : colors.black),
  };

  return (
    <div
      {...props}
      data-dims-w={dims.w}
      css={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        position: 'relative',
        gap: 0,
      }}
      ref={onMeasure}
    >
      <ConnectionComponent connection={connectionLeft} width={connectionWidth} height={dims.h} />
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {prefix && (
          <p
            css={{
              ...typography('labelSmall'),
              whiteSpace: 'nowrap',
              position: 'absolute',
              width: inputWidth,
              transform: 'translateY(-100%)',
              top: -CELL_SIZE / 4,
            }}
            style={{
              textAlign: prefixAlign,
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
              top: inputHeight + CELL_SIZE / 4,
              width: inputWidth,
            }}
            style={{
              textAlign: postfixAlign,
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
      <ConnectionComponent connection={connectionRight} width={connectionWidth} height={dims.h} />
    </div>
  );
};

export default InputBlock;

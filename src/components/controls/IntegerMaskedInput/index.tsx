import { FocusEvent, forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Mask from '@controls/Mask';

import { Format as DefaultFormat } from './Format';
import { IntegerFormat, IntegerMaskedInputProps } from './types';
import { BIN_PREFIX, HEX_PREFIX, MASKS, formatNumber, useIntegerFormats } from './utils';

const IntegerMaskedInput = forwardRef<HTMLInputElement, IntegerMaskedInputProps>(
  (
    {
      Format = DefaultFormat,
      format: propsFormat,
      error,
      value,
      onChange,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      labelWrap,
      onChangeFormat,
      ...restProps
    },
    ref
  ) => {
    const { format, setFormat, setValue, maskValue, setMaskValue, safeMaskValue, decValue } = useIntegerFormats({
      initialFormat: propsFormat,
      initialValue: value,
      onChange,
      onChangeFormat,
    });

    if (value !== undefined && !onChange)
      console.warn('[IntegerMaskedInput] controlled value doesnt listen to onChange.');
    if (propsFormat !== undefined && !onChangeFormat)
      console.warn('[IntegerMaskedInput] controlled format doesnt listen to onChangeFormat.');

    const formatChangeRef = useRef(false);
    const maskRef = useRef<HTMLInputElement>(null);

    return (
      <div css={{ display: 'flex', width: '100%', alignItems: 'start' }}>
        <Mask
          {...restProps}
          mask={MASKS}
          value={maskValue}
          autoComplete="off"
          size="md"
          error={error}
          onBlur={(e: FocusEvent<HTMLInputElement>) => {
            restProps?.onBlur?.(e);
            setMaskValue(safeMaskValue);
          }}
          ref={mergeRefs([ref, maskRef])}
          rightAddons={
            <Format
              inputRef={maskRef}
              format={format}
              isFilled={!!maskValue.length}
              disabled={restProps.disabled}
              onChange={fmt => {
                formatChangeRef.current = true;
                setFormat(fmt);
                setMaskValue(formatNumber(decValue, fmt) || '');
              }}
            />
          }
          onAccept={newVal => {
            if (newVal === maskValue) return;

            if (formatChangeRef.current) {
              formatChangeRef.current = false;
              return;
            }

            setMaskValue(newVal);

            setTimeout(() => {
              if (newVal.startsWith(BIN_PREFIX) && newVal.length === BIN_PREFIX.length) return;
              if (newVal.startsWith(HEX_PREFIX) && newVal.length === HEX_PREFIX.length) return;

              setValue(newVal);
            }, 0);
          }}
          dispatch={(appended, dynamicMasked) => {
            const ignore = formatChangeRef.current;
            if (formatChangeRef.current) {
              formatChangeRef.current = false;
            }
            const { value } = dynamicMasked;
            const newVal = value + appended;

            if (newVal.substring(0, BIN_PREFIX.length) === BIN_PREFIX) {
              if (!ignore && newVal.length > BIN_PREFIX.length) setFormat(IntegerFormat.BIN);
              return dynamicMasked.compiledMasks[1];
            }

            if (newVal.substring(0, HEX_PREFIX.length) === HEX_PREFIX) {
              if (!ignore && newVal.length > HEX_PREFIX.length) setFormat(IntegerFormat.HEX);
              return dynamicMasked.compiledMasks[2];
            }

            if (!ignore && newVal.length) setFormat(IntegerFormat.DEC);
            return dynamicMasked.compiledMasks[0];
          }}
        />
      </div>
    );
  }
);

export default IntegerMaskedInput;

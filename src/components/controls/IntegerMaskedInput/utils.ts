import { useCallback, useEffect, useRef, useState } from 'react';

import { OptionShape } from '@controls/NewSelect';

import { IntegerFormat, useIntegerFormatsProps } from './types';

export const BIN_PREFIX = '0b';
export const HEX_PREFIX = '0x';

export const FORMAT_OPTIONS: OptionShape[] = [
  {
    key: 'Целое',
    value: IntegerFormat.DEC,
  },
  {
    key: '2-чный',
    value: IntegerFormat.BIN,
  },

  {
    key: '16-ричный',
    value: IntegerFormat.HEX,
  },
];

export const MASKS = [
  {
    mask: '### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### ###',
    definitions: { '#': /[0-9]/gi },
  },
  {
    mask: '{\\0b}#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### ####',
    definitions: { '#': /[0-1]/gi },
  },
  {
    mask: '{\\0x}#### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### #### ####',
    definitions: { '#': /[0-9a-f]/gi },
    prepare: (s: string) => s.toUpperCase(),
  },
];

const safeParseInt = (val: any, radix?: number): number | null => {
  const res = parseInt(val, radix);
  if (Number.isNaN(res)) return null;

  return res;
};

const parseStringNumber = (num?: string | number | null) => {
  if (typeof num === 'number') return num;
  if (typeof num !== 'string') return null;

  const strippedValue = num.replace(/\s/g, '').trim();

  if (strippedValue.startsWith(HEX_PREFIX)) {
    return safeParseInt(strippedValue.replace(HEX_PREFIX, ''), 16);
  }

  if (strippedValue.startsWith(BIN_PREFIX)) {
    return safeParseInt(strippedValue.replace(BIN_PREFIX, ''), 2);
  }

  return safeParseInt(strippedValue, 10);
};

export const formatNumber = (value: string | number | null, format: IntegerFormat) => {
  const parsedValue = parseStringNumber(value);

  if (parsedValue === null) {
    return null;
  }

  if (format === IntegerFormat.BIN) {
    return `${BIN_PREFIX}${parsedValue.toString(2)}`;
  }

  if (format === IntegerFormat.HEX) {
    return `${HEX_PREFIX}${parsedValue.toString(16).toUpperCase()}`;
  }

  return parsedValue.toString(10);
};

export const useIntegerFormats = ({
  initialValue,
  onChange,
  onChangeFormat,
  initialFormat = IntegerFormat.DEC,
}: useIntegerFormatsProps) => {
  const safeInitialValue = typeof initialValue === 'number' ? initialValue : null;
  const [decValue, setDecValue] = useState(safeInitialValue);
  const currentDecValue = useRef<number | null>(safeInitialValue);
  const [format, setFormat] = useState(initialFormat);

  currentDecValue.current = safeInitialValue;

  useEffect(() => {
    setFormat(initialFormat);
  }, [initialFormat]);

  const formattedValue = formatNumber(currentDecValue.current, format);
  const safeMaskValue = typeof formattedValue === 'string' ? formattedValue : '';
  const [maskValue, setMaskValue] = useState(safeMaskValue);

  useEffect(() => {
    setDecValue(safeInitialValue);
    setMaskValue(formatNumber(safeInitialValue, format) || '');
  }, [format, safeInitialValue]);

  const setValue = useCallback(
    (val?: string | number | null) => {
      const result = parseStringNumber(val);

      currentDecValue.current = result;

      setDecValue(old => {
        setTimeout(() => {
          if (old !== result) {
            onChange?.(result);
          }
        }, 0);

        return result;
      });

      // onChange?.(result);

      return result;
    },
    [onChange]
  );

  const proxySetFormat: typeof setFormat = useCallback(
    valOrFn =>
      setFormat(old => {
        const newVal = typeof valOrFn === 'function' ? valOrFn(old) : valOrFn;

        setTimeout(() => {
          if (old !== newVal) {
            onChangeFormat?.(newVal);
          }
        }, 0);

        return newVal;
      }),
    [onChangeFormat]
  );

  return {
    safeMaskValue,
    maskValue,
    setMaskValue,
    decValue,
    format,
    setValue,
    setFormat: proxySetFormat,
  };
};

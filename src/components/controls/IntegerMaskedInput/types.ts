import { FC, RefObject } from 'react';

import { MaskProps } from '../Mask';

export const enum IntegerFormat {
  /**
   * @example 2048
   */
  DEC = 'dec',
  /**
   * @example 0xFAD3
   */
  HEX = 'hex',
  /**
   * @example 0b10011
   */
  BIN = 'bin',
}

export interface useIntegerFormatsProps {
  initialValue?: number;
  initialFormat?: IntegerFormat;
  onChange?: (value: number | null) => void;
  onChangeFormat?: (format: IntegerFormat) => void;
}

export interface IntegerMaskedFormatProps {
  format: IntegerFormat;
  onChange: (format: IntegerFormat) => void;
  isFilled: boolean;
  inputRef: RefObject<HTMLInputElement>;
  disabled?: boolean;
}

export interface IntegerMaskedInputProps
  extends Omit<MaskProps, 'onChange' | 'value' | 'defaultValue' | 'mask' | 'type'> {
  /** Format selector controller */
  Format?: FC<IntegerMaskedFormatProps>;

  /**
   * Error from form controller
   */
  error?: string;

  /**
   * Controlled format
   */
  format?: IntegerFormat;

  /**
   * Controlled value
   */
  value?: number;

  onChange?: useIntegerFormatsProps['onChange'];
  onChangeFormat?: useIntegerFormatsProps['onChangeFormat'];
}

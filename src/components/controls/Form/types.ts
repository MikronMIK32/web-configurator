import { CSSObject } from '@emotion/react';
import { ReactNode } from 'react';
import { InputProps } from '../Input';

export interface FormFieldProps extends Omit<InputProps, 'size'> {
  size?: InputProps['size'];
  /** Name of field */
  name: string;
  /** Label for FormControl */
  label?: string | ReactNode;
  /** class name */
  className?: string;

  wrapperCSS?: CSSObject;
}

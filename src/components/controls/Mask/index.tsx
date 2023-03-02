import { FocusEvent, forwardRef, useCallback, useId, useRef, useState } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { mergeRefs } from 'react-merge-refs';

import { FormFieldProps } from '@controls/Form/types';
import FormControl from '@controls/FormControl';

import { useInputCSS } from '@scripts/hooks/useInputCSS';

export interface MaskProps extends Omit<FormFieldProps, 'name' | 'onChange'> {
  /** Input name */
  name?: string;
  /** Mask for input */
  mask: any;
  /** Placeholder for mask */
  placeholderChar?: string;
  /** Is show placholder */
  lazy?: boolean;

  error?: string | boolean;
  field?: ControllerRenderProps;
  fieldState?: ControllerFieldState;

  transformValue?: (val: string) => any;

  onChange?: (value: string) => void;
  onAccept?: (value: string) => void;
  dispatch?: (
    appended: string,
    dynamicMasked: {
      compiledMasks: {
        mask: string;
      }[];
      value: string;
    }
  ) => void;
}

const noopTransform = (val: string) => val;

const Mask = forwardRef<HTMLInputElement, MaskProps>(
  (
    {
      name,
      transformValue = noopTransform,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      field,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fieldState,
      mask,
      className,
      placeholderChar = '_',
      lazy = false,
      theme = 'basic',
      size = 'lg',
      label,
      placeholder,
      onAccept,
      onChange,
      onFocus,
      onBlur,
      rightAddons,
      readOnly,
      error,
      labelView,
      inputCSS,
      block = true,
      value: valueFromProps,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const htmlFor = props.id || id;
    const defaultCSS = useInputCSS();

    const filled = Boolean(valueFromProps);
    const value = `${valueFromProps}`;

    const inputRef = useRef<HTMLInputElement>(null);
    const [focused, setFocused] = useState(false);

    const handleInputFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        if (!readOnly) {
          setFocused(true);
        }

        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus, readOnly]
    );

    const handleInputBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        setFocused(false);

        setTimeout(() => {
          if (onBlur) {
            onBlur(event);
          }
        }, 0);
      },
      [onBlur]
    );

    return (
      <FormControl
        label={label}
        error={error}
        focused={focused}
        filled={filled || focused || !!placeholder?.length || !!mask}
        htmlFor={htmlFor}
        readOnly={readOnly}
        theme={theme}
        size={size}
        labelView={labelView}
        className={className}
        block={block}
        rightAddons={rightAddons}
      >
        <IMaskInput
          {...props}
          ref={mergeRefs([ref, inputRef])}
          name={name}
          mask={mask}
          value={value}
          placeholder={placeholder}
          {...({
            id: htmlFor,
            className: 'control',
          } as any)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          css={{ ...defaultCSS, ...inputCSS }}
          lazy={lazy}
          placeholderChar={placeholderChar}
          onAccept={(val: any) => {
            const transformed = transformValue(val);

            if (onChange) onChange(transformed);
            if (onAccept) onAccept(transformed);
          }}
          // unmask
          autofix={false}
          unmask
        />
      </FormControl>
    );
  }
);

Mask.displayName = 'Mask';

export default Mask;

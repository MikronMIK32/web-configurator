import { HTMLProps, useMemo, forwardRef, useRef, useEffect } from 'react';
import { ReactComponent as CheckIcon } from '@icons/small/check.svg';
import cn from 'classnames';
import { scale } from '@scripts/helpers';
import { colors } from '@scripts/colors';
import { CSSObject } from '@emotion/react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  /** Active state indeterminate */
  isIndeterminate?: boolean;
  /** Are all values selected for indeterminate state */
  all?: boolean;
  /** Checkbox text with indeterminate state */
  indeterminate?: string;
  /** Additional class for label */
  labelClass?: string;
  /** Additional class */
  className?: string;
  /** Additional classes from form (inner) */
  inputClasses?: string;
  /** Show error flag */
  showError?: boolean;

  field?: ControllerRenderProps;
  fieldState?: ControllerFieldState;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      field,
      fieldState,
      value,
      isIndeterminate = false,
      all = false,
      indeterminate,
      children,
      className,
      checked: checkedFromProps,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const actualRef = ref || innerRef;

    const id = `${name || field?.name}-${value}`;

    useEffect(() => {
      if (!isIndeterminate) return;
      if (typeof actualRef === 'function') return;
      if (actualRef.current) {
        actualRef.current.indeterminate = isIndeterminate;
        actualRef.current.checked = all;
      }
    }, [actualRef, all, indeterminate, isIndeterminate]);

    let checked: boolean | undefined = checkedFromProps;
    if (field) {
      if (typeof value === 'string' && Array.isArray(field?.value)) {
        checked = field?.value?.includes(value);
      } else if (typeof field?.value === 'boolean') {
        checked = field.value;
      }
    }

    const labelCSS = useMemo<CSSObject>(
      () => ({
        minHeight: scale(2),
        position: 'relative',
        display: 'inline-block',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'color ease 300ms',
        '.knob': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'background-color ease-out 60ms',
          borderStyle: 'solid',
          borderWidth: 0,
          borderRadius: scale(1, true),
          width: scale(3),
          height: scale(3),
          backgroundColor: colors.grey100,
          'input:focus + &': {
            outline: '2px solid',
            outlineOffset: 2,
          },
          ':active': {
            outline: 0,
          },
          'input:checked + &': {
            backgroundColor: colors.link,
          },
          'input:disabled + &': {
            borderWidth: 2,
            borderColor: colors.grey300,
            backgroundColor: 'transparent',
            cursor: 'not-allowed',
          },
          'input:checked:disabled + &': {
            backgroundColor: colors.grey300,
          },
        },
        paddingLeft: scale(4),
        '&.invalid': {
          '&:before': {
            background: colors?.error,
          },
        },

        'input:disabled + &': {
          color: colors.grey600,
        },
      }),
      [],
    );

    const iconCSS = useMemo<CSSObject>(
      () => ({
        transform: 'translate(-50%, -50%) scale(0)',
        position: 'absolute',
        top: `calc(${scale(3)}px / 2)`,
        left: `calc(${scale(3)}px / 2)`,
        transition: 'transform ease-out 300ms',

        fill: colors.white,
        'input:checked + label &': {
          transform: 'translate(-50%, -50%) scale(1)',
        },
        'input:disabled + label &': {
          fill: colors.grey600,
          opacity: 0.6,
          cursor: 'not-allowed',
        },
        'input:checked:disabled + label &': {
          transform: 'translate(-50%, -50%) scale(1)',
        },
      }),
      [],
    );

    return (
      <div className={className}>
        {/* <Legend meta={meta} showError={showError} errorCSS={errorMessageCSS}> */}
        <input
          {...props}
          ref={ref}
          name={name}
          id={id}
          type="checkbox"
          value={value}
          checked={checked}
          css={{ position: 'absolute', clip: 'rect(0, 0, 0, 0)' }}
        />
        <label
          htmlFor={id}
          css={labelCSS}
          className={cn({
            invalid: !!fieldState?.error?.message,
          })}
        >
          <span className="knob" />
          <CheckIcon css={iconCSS} />
          {children}
        </label>
        {/* </Legend> */}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

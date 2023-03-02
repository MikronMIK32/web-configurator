import { useCallback, useRef, useState } from 'react';

import FormControl, { FormControlSize, FormControlVariant } from '@components/controls/FormControl';

import { colors } from '@scripts/colors';
import { getSameEnumValue } from '@scripts/theme';

import { useSelectTheme } from '../../context';
import { FieldProps as BaseFieldProps } from '../../types';
import { joinOptions } from '../../utils';

export const Field = ({
  open,
  hint,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autocomplete,
  error,
  className,
  disabled,
  label,
  labelProps,
  labelView = 'outer',
  placeholder,
  selectedMultiple = [],
  wrap,
  selected,
  valueRenderer = joinOptions,
  Arrow,
  innerProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelectedItems,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleMenu,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multiple,
  rightAddons,
  ...restProps
}: BaseFieldProps) => {
  const [focused, setFocused] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const value = valueRenderer({ selected, selectedMultiple });

  const filled = Boolean(value);
  const showLabel = !!label && (filled || !placeholder || labelView === 'outer');

  const { size, variant, getCSS } = useSelectTheme();

  const controlSize = getSameEnumValue(size, FormControlSize);
  const controlVariant = getSameEnumValue(variant, FormControlVariant);

  return (
    <div
      ref={wrapperRef}
      css={{
        width: '100%',
        outline: 'none!important',
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <FormControl
        block
        className={className}
        size={controlSize}
        variant={controlVariant}
        focused={open || focused}
        disabled={disabled}
        filled={filled}
        label={showLabel && label}
        labelView={labelView}
        error={error}
        hint={hint}
        labelProps={labelProps}
        rightAddons={
          (Arrow || rightAddons) && (
            <>
              {rightAddons}
              {/* TODO: стоит переделать, но это будет мажорка */}
              {Arrow}
            </>
          )
        }
        {...restProps}
        {...innerProps}
      >
        <div className="control" css={getCSS('field')}>
          {placeholder && !filled && (
            <span
              css={{
                color: colors.grey400,
              }}
            >
              {placeholder}
            </span>
          )}
          {filled && (
            <div
              css={{
                ...(wrap && {
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }),
                textAlign: 'left',
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {value}
            </div>
          )}
        </div>
      </FormControl>
    </div>
  );
};

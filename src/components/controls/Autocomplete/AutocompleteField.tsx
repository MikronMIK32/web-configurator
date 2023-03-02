import { MouseEvent, Ref, useCallback, useMemo, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import DefaultInput from '@controls/Input';

import { AutocompleteFieldProps } from './types';

const EMPTY_OBJ = {};

const AutocompleteField = ({
  Arrow,
  name,
  error,
  label,
  size,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  labelProps,
  Input = DefaultInput,
  value,
  hint,
  disabled,
  readOnly,
  onInput,
  inputProps = EMPTY_OBJ,
  bottomAddons,
  innerProps,
  rightAddons,
  className,
}: AutocompleteFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { onClick, onFocus } = innerProps;

  const inputDisabled = disabled || readOnly;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(event);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [onClick]
  );

  const inputPropsMerged = useMemo(
    () => ({
      ...inputProps,
      ...innerProps,
    }),
    [innerProps, inputProps]
  );

  return (
    <Input
      {...inputPropsMerged}
      wrapperRef={mergeRefs([innerProps.ref as Ref<HTMLElement>, inputProps.wrapperRef as Ref<HTMLElement>])}
      ref={mergeRefs([inputRef, inputProps.ref as Ref<HTMLElement>])}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      block
      label={label}
      size={size}
      error={error}
      hint={hint}
      onChange={onInput}
      onClick={inputDisabled ? undefined : handleClick}
      onFocus={inputDisabled ? undefined : onFocus}
      autoComplete="off"
      value={value}
      className={`control ${className}`}
      bottomAddons={bottomAddons}
      rightAddons={
        (rightAddons || Arrow) && (
          <>
            {rightAddons}
            {Arrow}
          </>
        )
      }
    />
  );
};

AutocompleteField.displayName = 'AutocompleteField';

export default AutocompleteField;

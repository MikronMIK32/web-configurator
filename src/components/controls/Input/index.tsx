import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import {
  AnimationEvent,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

import FormControl from '@controls/FormControl';

import CloseIcon from '@icons/small/close.svg?react';

import { scale } from '@scripts/helpers';
import { useInputCSS } from '@scripts/hooks/useInputCSS';
import { formControlThemes } from '../FormControl/themes';
import { InputProps } from './types';

export * from './types';

const emptyStyle = {};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      block = false,
      size = 'md',
      variant = 'primary',
      theme: themeProp = 'basic',
      bottomAddons,
      clear = false,
      disabled,
      error,
      success,
      hint,
      className,
      inputCSS = emptyStyle,
      labelCSS = emptyStyle,
      leftAddonsCSS = emptyStyle,
      rightAddonsCSS = emptyStyle,
      label,
      labelView,
      leftAddons,
      onFocus,
      onBlur,
      onChange,
      onClear,
      onClick,
      onMouseDown,
      onMouseUp,
      onAnimationStart,
      rightAddons,
      value,
      defaultValue,
      wrapperRef,
      readOnly,
      placeholder,
      ...restProps
    },
    ref,
  ) => {
    const theme =
      typeof themeProp === 'string' ? formControlThemes[themeProp] : themeProp;
    const uncontrolled = value === undefined;
    const inputRef = useRef<HTMLInputElement>(null);

    const [focused, setFocused] = useState(restProps.autoFocus);
    const [stateValue, setStateValue] = useState(defaultValue || '');

    const filled = Boolean(uncontrolled ? stateValue : value);
    const [autofilled, setAutofilled] = useState(false);

    // отображаем крестик только для заполненного и активного инпута
    const clearButtonVisible = clear && filled && !disabled && !readOnly;

    const handleInputFocus = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        if (!readOnly) {
          setFocused(true);
        }

        if (onFocus) {
          onFocus(event);
        }
      },
      [onFocus, readOnly],
    );

    const handleInputBlur = useCallback(
      (event: FocusEvent<HTMLInputElement>) => {
        setFocused(false);

        if (onBlur) {
          onBlur(event);
        }
      },
      [onBlur],
    );

    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event, { value: event.target.value });
        }

        if (uncontrolled) {
          setStateValue(event.target.value);
        }
      },
      [onChange, uncontrolled],
    );

    const handleClear = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (!clearButtonVisible) return;

        if (uncontrolled) {
          setStateValue('');
        }

        if (onClear) {
          onClear(event);
        }

        if (inputRef.current && !focused) {
          inputRef.current.focus();
        }
      },
      [clearButtonVisible, focused, onClear, uncontrolled],
    );

    const handleAnimationStart = useCallback(
      (event: AnimationEvent<HTMLInputElement>) => {
        if (onAnimationStart) {
          onAnimationStart(event);
        }

        setAutofilled(event.animationName.includes('start'));
      },
      [onAnimationStart],
    );

    const renderRightAddons = () => {
      const addonsVisible =
        clearButtonVisible || rightAddons || error || success;

      return (
        addonsVisible && (
          <>
            {clearButtonVisible && (
              <div
                css={{
                  height: '100%',
                  marginRight: rightAddons ? scale(1) : 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <button
                  type="button"
                  disabled={disabled}
                  aria-label="Очистить"
                  css={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  onClick={handleClear}
                >
                  <CloseIcon />
                </button>
              </div>
            )}
            {rightAddons}
          </>
        )
      );
    };

    const baseInputCSS = useInputCSS();
    const css = useMemo(
      () => deepmerge.all<CSSObject>([baseInputCSS, inputCSS]),
      [baseInputCSS, inputCSS],
    );

    const id = useId();

    const htmlFor = restProps.id || id;

    return (
      <FormControl
        htmlFor={htmlFor}
        ref={wrapperRef}
        className={className}
        css={{ cursor: disabled ? 'not-allowed' : 'text' }}
        labelCSS={labelCSS}
        theme={theme}
        size={size}
        variant={variant}
        block={block}
        disabled={disabled}
        readOnly={readOnly}
        filled={filled || autofilled || focused || !!placeholder?.length}
        focused={focused}
        error={error}
        label={label}
        labelView={labelView}
        hint={hint}
        leftAddons={leftAddons}
        rightAddons={renderRightAddons()}
        bottomAddons={bottomAddons}
        leftAddonsCSS={leftAddonsCSS}
        rightAddonsCSS={rightAddonsCSS}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <input
          {...restProps}
          id={htmlFor}
          className="control"
          placeholder={placeholder}
          css={css}
          disabled={disabled}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onAnimationStart={handleAnimationStart}
          ref={mergeRefs([ref, inputRef])}
          type={type}
          value={uncontrolled ? stateValue : value}
          readOnly={readOnly}
          aria-label={typeof label === 'string' ? label : undefined}
        />
      </FormControl>
    );
  },
);

Input.displayName = 'Input';

export default Input;

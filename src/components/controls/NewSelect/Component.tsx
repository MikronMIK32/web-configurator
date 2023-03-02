import { forwardRef, useCallback, useMemo, useRef } from 'react';

import { Arrow as DefaultArrow } from './components/arrow';
import { BaseSelect } from './components/base-select';
import { Field as DefaultField } from './components/field';
import { Optgroup as DefaultOptgroup } from './components/optgroup';
import { Option as DefaultOption } from './components/option';
import { OptionsList as DefaultOptionsList } from './components/options-list';
import { BaseSelectChangePayload, BaseSelectProps, OptionShape } from './types';

export type SelectProps = BaseSelectProps & {};

export const SimpleSelect = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      Arrow = DefaultArrow,
      Field = DefaultField,
      OptionsList = DefaultOptionsList,
      Optgroup = DefaultOptgroup,
      Option = DefaultOption,
      ...restProps
    },
    ref
  ) => {
    const props = useMemo(
      () => ({
        Option,
        Field,
        Optgroup,
        OptionsList,
        Arrow,
        ...restProps,
      }),
      [Arrow, Field, Optgroup, Option, OptionsList, restProps]
    );

    return <BaseSelect ref={ref} {...props} />;
  }
);

SimpleSelect.displayName = 'SimpleSelect';

export const FormSelect = forwardRef<
  HTMLDivElement,
  Omit<SelectProps, 'onChange'> & {
    value?: any;
    onChange?: (valueOrValues: string | string[]) => void;
  }
>(({ name, multiple, options, onChange, onBlur, value, ...props }, ref) => {
  const selectedValues = useMemo(() => {
    if (multiple) return (Array.isArray(value) ? value : []) || [];

    return value === undefined ? [] : [value];
  }, [value, multiple]);

  const selectedOptions = useMemo(
    () =>
      options.filter(e => {
        if ('value' in e) return selectedValues.includes(e.value);
        return false;
      }) as OptionShape[],
    [options, selectedValues]
  );

  const onChangeRef = useRef<typeof onChange>();
  onChangeRef.current = onChange;

  const changeHandler = useCallback((payload: BaseSelectChangePayload) => {
    // TODO: возможно архитектурный косяк. то что Form.Field опускает onChange, не позволит в будущем внутри Form.Field на компонент накинуть onChange.
    // точнее, позволит, но мы туда только value запишем, а могли бы initiator и прочее
    onChangeRef.current?.(payload.selected?.value);
  }, []);

  return (
    <SimpleSelect
      ref={ref}
      name={name}
      options={options}
      {...props}
      multiple={multiple}
      selected={selectedOptions}
      onChange={changeHandler}
      onBlur={e => {
        // field?.onBlur(e);
        onBlur?.(e);
      }}
      fieldProps={
        {
          // meta,
        }
      }
    />
  );
});

FormSelect.displayName = 'FormSelect';

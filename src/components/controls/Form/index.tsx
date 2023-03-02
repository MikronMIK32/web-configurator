import { FC, HTMLProps, KeyboardEvent, ReactNode, useCallback } from 'react';
import { FormProvider, KeepStateOptions, UseFormReturn } from 'react-hook-form';

import FormField from './Field';
import FormReset, { FormResetProps } from './Reset';
import { FormFieldProps } from './types';

export interface FormCompositionProps<T> {
  Field: FC<FormFieldProps>;
  Reset: FC<FormResetProps<T>>;
}

export interface FormProps<T extends Record<string, any>>
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'onReset'> {
  children: ReactNode | ReactNode[];
  methods: UseFormReturn<T, any>;
  onSubmit: (values: T) => void;
  onReset?: (values: T, keepStateOptions?: KeepStateOptions) => void;
  isSubmitOnEnter?: boolean;
}

const checkKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
  if (e.code === 'Enter') e.preventDefault();
};

const Form = <T extends Record<string, any>>({
  children,
  methods,
  onSubmit,
  onReset,
  isSubmitOnEnter = false,
  ...props
}: FormProps<T> & Partial<FormCompositionProps<T>>) => {
  const reset: typeof methods.reset = useCallback(
    (newValues, keepStateOptions) => {
      methods.reset(newValues, keepStateOptions);
      const values = methods.getValues();
      if (onReset) onReset(values, keepStateOptions);
    },
    [methods, onReset]
  );

  return (
    <FormProvider {...methods} reset={reset}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={isSubmitOnEnter ? undefined : e => checkKeyDown(e)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.Field = FormField;
Form.Reset = FormReset;

export default Form;

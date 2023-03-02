import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import Input from '../Input';
import { FormFieldProps } from './types';

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, children, size = 'md', className, wrapperCSS, block = true, ...props }, ref) => {
    const { control, setValue } = useFormContext(); // retrieve all hook methods

    // const isCheckbox =
    //   isValidElement(children) && (children?.type as FC)?.name === 'Checkbox';
    // const isRadio =
    //   isValidElement(children) && (children?.type as FC)?.name === 'Radio';

    const { field, fieldState: fieldStateForm } = useController({
      name,
      control,
    });

    const fieldState = {
      ...fieldStateForm,
      error: Array.isArray(fieldStateForm.error) ? fieldStateForm.error[0] : fieldStateForm.error,
    };

    const inputProps = {
      name,
      size,
      error: fieldState.error?.message,
      value: field.value,
      onBlur: field.onBlur,
      ref,
      label: props.label,
      ...props,
    };

    return (
      <div css={{ width: '100%' }} className={className}>
        {children ? (
          <>
            {Children.map(children, child => {
              if (isValidElement(child)) {
                return cloneElement<any>(child, {
                  ...inputProps,
                  ...child.props,
                  field,
                  fieldState,
                  onChange(...args: any[]) {
                    if (typeof (child?.props as any)?.onChange === 'function') {
                      (child.props as any).onChange(...args);
                    }
                    field.onChange(...args);
                  },
                });
              }
            })}
          </>
        ) : (
          <Input
            {...inputProps}
            block={block}
            css={wrapperCSS}
            onChange={field.onChange}
            onClear={() => setValue(name, '')}
          />
        )}
      </div>
    );
  }
);

export default FormField;

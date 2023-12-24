import { ChangeEvent, Children, HTMLProps, cloneElement, isValidElement, useMemo, useRef } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';

import Layout from '@components/Layout';
import Legend from '@components/controls/Legend';

import { scale } from '@scripts/helpers';

export interface CheckboxGroupProps extends HTMLProps<HTMLInputElement> {
  /** Name of checkbox group (inner) */
  name?: string;
  /** Label for Legend group */
  label?: string;
  /** Hint for Legend hint */
  hint?: string;
  field?: ControllerRenderProps;
  fieldState?: ControllerFieldState;
  /** Text for indeterminate checkbox */
  indeterminate?: string;
}

export const CheckboxGroup = ({
  name,
  label,
  hint,
  required,
  field,
  indeterminate,
  children,
  ...props
}: CheckboxGroupProps) => {
  delete props.css;

  const ref = useRef<HTMLDivElement>(null);

  const inputProps = {
    type: 'checkbox',
    name,
    id: name,
    required,
    ...props,
  };

  const childrenCount = useMemo(() => Children.count(children), [children]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isIndeterminate = useMemo(() => {
    if (!indeterminate) return false;
    if (!field?.value) return true;

    const valueCount = field.value.length;
    if (valueCount < 1) return false;

    return valueCount < childrenCount;
  }, [childrenCount, field, indeterminate]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isAll = useMemo(() => {
    if (!field?.value) return false;

    const valueCount = field.value.length;
    return valueCount === childrenCount;
  }, [childrenCount, field]);

  return (
    <fieldset css={{ display: 'block', position: 'relative', padding: 0 }}>
      {label && <Legend as="legend" name={name as string} label={label as string} required={required} hint={hint} />}
      <div ref={ref}>
        <Layout cols={1} gap={scale(1)}>
          {children &&
            Children.map(children, child => {
              if (isValidElement(child)) {
                const totalProps = {
                  field,
                  ...inputProps,
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const v = child.props.value || e.target.value;
                    const valueArray = (field?.value || []) as string[];
                    const valueSet = new Set(valueArray);
                    if (valueSet.has(v)) {
                      valueSet.delete(v);
                    } else {
                      valueSet.add(v);
                    }

                    const newValue = [...valueSet.values()].sort((a, b) => {
                      if (a < b) return -1;
                      if (a > b) return 1;

                      return 0;
                    });

                    field?.onChange({
                      target: {
                        value: newValue,
                      },
                    });
                  },
                  ...child.props,
                };
                return cloneElement(child, totalProps);
              }
            })}
          {/* {indeterminate && (
            <Checkbox
              value="indeterminate"
              indeterminate={indeterminate}
              isIndeterminate={isIndeterminate}
              all={isAll}
              {...inputProps}
              onClick={clickInder}
              ref={undefined}
            >
              {indeterminate}
            </Checkbox>
          )} */}
        </Layout>
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;

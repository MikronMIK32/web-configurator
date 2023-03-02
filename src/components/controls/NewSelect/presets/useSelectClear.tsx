import { FC, useCallback, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';

import CloseIcon from '@icons/small/closed.svg';

import { Field as DefaultField } from '../components/field';
import { FieldProps } from '../types';

export interface useSelectClearProps {
  Field?: FC<FieldProps>;
  closeOnClear?: boolean;
}

export const useSelectClear = ({ Field = DefaultField, closeOnClear = false }: useSelectClearProps = {}) => {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const renderField = useCallback(
    (props: FieldProps) => (
      <Field
        {...props}
        innerProps={{
          ...props.innerProps,
          ref: mergeRefs([props.innerProps.ref!, fieldRef]),
        }}
        rightAddonsCSS={{
          ...props.rightAddonsCSS,
          gap: scale(1, true),
        }}
        rightAddons={
          <>
            {props.multiple && !!props.selectedMultiple?.length && (
              <>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    props.setSelectedItems([]);

                    setTimeout(() => {
                      fieldRef.current?.focus();
                    }, 0);

                    if (closeOnClear && props.open) {
                      setTimeout(() => {
                        props.toggleMenu();
                      }, 0);
                    }
                  }}
                  css={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ':hover': {
                      opacity: 0.5,
                    },
                  }}
                >
                  <CloseIcon />
                </button>
                <span
                  css={{
                    display: 'inline-block',
                    width: 1,
                    height: scale(2),
                    borderWidth: 0,
                    background: colors.grey600,
                  }}
                />
              </>
            )}
            {props.rightAddons}
          </>
        }
      />
    ),
    [Field, closeOnClear]
  );

  return {
    Field: renderField,
  };
};

export default useSelectClear;

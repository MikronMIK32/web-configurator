import { HTMLProps, Ref, forwardRef, useEffect, useRef } from 'react';

import Checkbox from '@components/controls/Checkbox';

export interface IndeterminateCheckboxProps
  extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  id: string;
  parentTableName?: string;
}

const useCombinedRefs = <T,>(...refs: any[]) => {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, parentTableName, ...rest }, ref: Ref<HTMLInputElement>) => {
  const defaultRef = useRef(null);
  const combinedRef = useCombinedRefs<HTMLInputElement>(ref, defaultRef);

  useEffect(() => {
    if (combinedRef?.current) {
      combinedRef.current.indeterminate = indeterminate ?? false;
    }
  }, [combinedRef, indeterminate]);

  return (
    <Checkbox
      name={`checkbox-${rest.id}${
        parentTableName ? `-${parentTableName}` : ''
      }`}
      ref={combinedRef as any}
      {...rest}
    />
  );
});

export default IndeterminateCheckbox;

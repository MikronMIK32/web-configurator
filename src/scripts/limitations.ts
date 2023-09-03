import { useCallback, useEffect, useRef, useState } from 'react';

type UnionKeysOrKeys<T> = T extends infer U ? keyof U : keyof T;

export type LimitationsRecord<T extends Record<string, any>> = Partial<
  Record<UnionKeysOrKeys<T>, Array<UnionKeysOrKeys<T>>>
>;

export function enrichLimitations<T extends Record<string, any>>(obj: LimitationsRecord<T>) {
  const enrichedObj = { ...obj };

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    const values = obj[key as UnionKeysOrKeys<T>];
    // eslint-disable-next-line no-continue
    if (!values) continue;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of values) {
      if (!enrichedObj[value]) {
        enrichedObj[value] = [];
      }

      enrichedObj[value]!.push(key as UnionKeysOrKeys<T>);
    }
  }

  return enrichedObj as Required<LimitationsRecord<T>>;
}

type useLimitationsProps<T extends Record<string, any>> = {
  limitations: LimitationsRecord<T>;
  getValues: () => Record<string, any>;
  dirtyFields: Record<string, any>;
  setValue: (name: string, value: any) => void;
};

function isEmpty(val: any) {
  if (val === null || val === undefined) return true;
  if (Number.isNaN(val)) return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === 'object' && Object.keys(val).length === 0) return true;
  if (typeof val === 'string' && !val.length) return true;

  return false;
}

type State = {
  isOpen: boolean;
  limitedFieldName: string;
  limitedFieldBy: string;
};

export const useLimitations = <T extends Record<string, any>>({
  limitations,
  getValues,
  dirtyFields,
  setValue,
}: useLimitationsProps<T>) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    limitedFieldBy: '',
    limitedFieldName: '',
  });

  const dirtyFieldsRef = useRef<Record<string, any>>();
  dirtyFieldsRef.current = dirtyFields;

  const lastValues = useRef<any>();

  useEffect(() => {
    if (lastValues.current !== undefined) return;

    lastValues.current = getValues();
  }, [getValues]);

  const onResetForm = useCallback(() => {
    lastValues.current = getValues();
  }, [getValues]);

  // When we change field that is a limited field, we wait for it to blur
  // then we open a popup where we ask a user to proceed or reset.

  // if reset is clicked, we replace the value back to lastValues.current[name]
  // if proceed is clicked, we replace lastValues.current[name] with getValues()[name]

  const onFieldBlur = useCallback(
    (name: string) => {
      const limitedFields = limitations[name as keyof LimitationsRecord<T>];

      if (!limitedFields) return;

      const currentValues = getValues();
      const limitedKeys = Object.keys(currentValues).filter(e => limitedFields.includes(e as UnionKeysOrKeys<T>));

      // eslint-disable-next-line no-restricted-syntax
      for (const key of limitedKeys) {
        if (!isEmpty(currentValues[key])) {
          setState({
            isOpen: true,
            limitedFieldBy: key,
            limitedFieldName: name,
          });
          return;
        }
      }
    },
    [getValues, limitations]
  );

  const onProceed = useCallback(() => {
    setState(old => {
      lastValues.current[old.limitedFieldName] = getValues()[old.limitedFieldName];

      return { ...old, isOpen: false };
    });
  }, [getValues]);

  const onDecline = useCallback(() => {
    setState(old => {
      setTimeout(() => {
        setValue(old.limitedFieldName, lastValues.current[old.limitedFieldName]);
      }, 0);

      return { ...old, isOpen: false };
    });
  }, [setValue]);

  return {
    isOpen: state.isOpen,
    limitedFieldBy: state.limitedFieldBy,
    limitedFieldName: state.limitedFieldName,
    onProceed,
    onDecline,
    onResetForm,
    onFieldBlur,
  };
};

// TODO: in form component implement field change interceptor

// it should work this way on page:

// const { getValues } = useForm({ ... });
// const { fieldChangeInterceptor } = useLimitations({ limitations, getValues });

// <Form fieldChangeInterceptor={event => {
//   const result = fieldChangeInterceptor(event);
//   if (!result) return false; // this means we should not accept this change
//   return true;
// }}

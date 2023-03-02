import { useMemo } from 'react';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import deepEqual from 'fast-deep-equal';

export const useIsDirty = (
  form: UseFormReturn<any, any>,
  defaultValues: any,
) => {
  const values = form.watch();

  const isDefaultDirty = useMemo(
    () => !deepEqual(values, defaultValues),
    [defaultValues, values],
  );

  return {  isDefaultDirty };
};

export const useIsDirtyInContext = (defaultValues: any) => {
  const form = useFormContext();

  return useIsDirty(form, defaultValues);
};

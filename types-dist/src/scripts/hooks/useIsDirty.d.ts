import { UseFormReturn } from 'react-hook-form';
export declare const useIsDirty: (form: UseFormReturn<any, any>, defaultValues: any) => {
    isDefaultDirty: boolean;
};
export declare const useIsDirtyInContext: (defaultValues: any) => {
    isDefaultDirty: boolean;
};

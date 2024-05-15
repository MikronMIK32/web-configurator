type UnionKeysOrKeys<T> = T extends infer U ? keyof U : keyof T;
export type LimitationsRecord<T extends Record<string, any>> = Partial<Record<UnionKeysOrKeys<T>, Array<UnionKeysOrKeys<T>>>>;
export declare function enrichLimitations<T extends Record<string, any>>(obj: LimitationsRecord<T>): Required<Partial<Record<UnionKeysOrKeys<T>, UnionKeysOrKeys<T>[]>>>;
type useLimitationsProps<T extends Record<string, any>> = {
    limitations: LimitationsRecord<T>;
    getValues: () => Record<string, any>;
    dirtyFields: Record<string, any>;
    setValue: (name: string, value: any) => void;
};
export declare const useLimitations: <T extends Record<string, any>>({ limitations, getValues, dirtyFields, setValue, }: useLimitationsProps<T>) => {
    isOpen: boolean;
    limitedFieldBy: string;
    limitedFieldName: string;
    onProceed: () => void;
    onDecline: () => void;
    onResetForm: () => void;
    onFieldBlur: (name: string) => void;
};
export {};

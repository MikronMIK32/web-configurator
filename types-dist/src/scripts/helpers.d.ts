import { ComponentPropsWithRef, ElementType, LegacyRef, MutableRefObject, RefCallback } from 'react';
import { FieldError } from 'react-hook-form';
import { Schema } from 'zod';
export type MergeElementProps<T extends ElementType, P extends object = {}> = Omit<ComponentPropsWithRef<T>, keyof P> & P;
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Optionalize<T> = {
    [K in keyof T]?: T[K];
};
export type UnionToOptionalIntersection<U> = Optionalize<UnionToIntersection<U>>;
export declare const scale: (n: number, isMinor?: boolean) => number;
/**
 * @param color #FFAAFF
 * @param alpha 0...1
 * @returns
 */
export declare const rgba: (color: string, alpha: number) => string;
export declare function mergeRefs<T = any>(refs: Array<MutableRefObject<T> | LegacyRef<T>>): RefCallback<T>;
export declare const isScrollable: (ele: HTMLElement | null) => boolean;
export declare const getScrollParent: (ele: HTMLElement | null) => HTMLElement | null;
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift';
export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>> & {
    readonly length: L;
    [I: number]: T;
    [Symbol.iterator]: () => IterableIterator<T>;
};
export declare const parseErrors: (error?: FieldError) => string | any[] | undefined;
export declare const formatRHFError: (error?: FieldError) => string | undefined;
export declare const getNextPowerOfTwo: (value: number) => number;
export declare const fastLog2: (V: number) => number;
export declare const withValidation: (schema: Schema) => {
    resolver: <TFieldValues extends import("react-hook-form").FieldValues, TContext>(values: TFieldValues, context: TContext | undefined, options: import("react-hook-form").ResolverOptions<TFieldValues>) => Promise<import("react-hook-form").ResolverResult<TFieldValues>>;
};
export declare const parseSafeInt: (value: any) => number | null;
type DotNotatedPath<T> = [string, T];
export declare const objectDotEntries: <T extends Record<string, any>>(root: T) => DotNotatedPath<T[keyof T]>[];
export {};

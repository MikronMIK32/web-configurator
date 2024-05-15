import { CSSObject } from '@emotion/react';
type EnumLike = Record<string, any>;
export type BaseThemeState<V extends EnumLike, S extends EnumLike, T extends EnumLike = never> = {
    variant?: V | keyof V;
    size?: S | keyof S;
    theme?: T;
};
export type Fn<T, Args extends any[] = any[]> = (...args: Args) => T;
export type ValueOrFunction<T, Args extends any[] = any[]> = T | Fn<T, Args>;
export type StyleDefinition<State extends BaseThemeState<any, any, any>> = ValueOrFunction<CSSObject, [state: Omit<State, 'theme'>]>;
export type OptionizedCSS<T> = Record<keyof T, CSSObject>;
export declare const extractCSSOption: <T>(optionized: OptionizedCSS<T>, option: T | keyof T) => CSSObject;
export type ThemeDefininitionLike<State extends BaseThemeState<any, any, any>> = Record<any, StyleDefinition<State>>;
export declare const useThemeCSSPart: <S extends Omit<BaseThemeState<any, any, any>, "theme">, T extends ValueOrFunction<Record<any, StyleDefinition<S>>, [S]>>(theme: T, state: S) => <K extends T extends Fn<infer t, any[]> ? keyof t : keyof T>(key: K, extraData?: ((T extends (...args: any[]) => infer R ? R[K] : T[K]) extends ValueOrFunction<CSSObject, [state: infer A]> ? Omit<A, keyof S> : never) | undefined) => CSSObject;
export declare const useThemeCSS: <T extends {
    [key: string]: any;
}, S>(theme: T, state: S) => Record<keyof T, CSSObject>;
export declare const getSameEnumValue: <Source extends EnumLike, Dest extends EnumLike>(sourceKey: Source | keyof Source, dest: Dest, fallback?: Dest | undefined) => Dest | Dest[keyof Dest] | undefined;
export {};

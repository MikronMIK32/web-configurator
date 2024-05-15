declare const breakpoints: {
    xxxl: number;
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
    xxxs: number;
};
export declare const Breakpoints: {
    xxxl: number;
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
    xxxs: number;
};
export type Breakpoint = keyof typeof breakpoints;
export declare const BREAKPOINTS_NAMES: ("xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs" | "xxs" | "xxxs")[];
type dataProps = Record<Breakpoint | `${Breakpoint}Min`, string>;
declare const MEDIA_QUERIES: dataProps;
export { MEDIA_QUERIES };

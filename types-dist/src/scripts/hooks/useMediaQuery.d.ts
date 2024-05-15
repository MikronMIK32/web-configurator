type Query<T> = [T, string];
type Params<T> = Array<Query<T>>;
export declare function useMediaQuery<T>(list: Params<T>, defaultValue: T): T[];
export {};

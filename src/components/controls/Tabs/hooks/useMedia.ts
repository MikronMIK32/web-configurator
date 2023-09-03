import { useEffect, useState } from 'react';

type Query<T> = [T, string];
type QueryTuple<T> = [T, MediaQueryList];
type QueryList<T> = Array<QueryTuple<T>>;

type Params<T> = Array<Query<T>>;

function getValue<T>(list: QueryList<T>): T[] {
    return list
        .map(
            // eslint-disable-next-line no-confusing-arrow
            ([value, query]) => (query.matches ? value : null)
        )
        .filter(Boolean) as any;
}

export function useMedia<T>(list: Params<T>, defaultValue: T): T[] {
    const [value, setValue] = useState<T[]>([defaultValue]);
    const [mediaQueryList, setMediaQueryList] = useState<QueryList<T>>([]);

    const isClient = typeof window !== 'undefined';

    useEffect(() => {
        if (isClient && window.matchMedia) {
            const queryList: QueryList<T> = list.map(([x, y]) => [x, window.matchMedia(y)]);

            setMediaQueryList(queryList);
            setValue(getValue(queryList));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient]);

    useEffect(() => {
        const handler = () => {
            setValue(getValue(mediaQueryList));
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        mediaQueryList.forEach(([_, mediaQuery]) => mediaQuery.addEventListener('change', handler));

        return () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            mediaQueryList.forEach(([_, mediaQuery]) => mediaQuery.removeEventListener('change', handler));
        };
    }, [value, mediaQueryList]);

    return value;
}

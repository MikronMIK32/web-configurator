import { CSSObject } from '@emotion/react';

import { BREAKPOINTS_NAMES, Breakpoint, Breakpoints } from '@scripts/media';

const setValue = <T extends Record<string, any>>(name: string, props: T, transform?: (props: T) => string | number) =>
  ({
    [name]: transform ? transform(props) : Object.values(props)[0],
  } as CSSObject);

export const isObject = (item: any) => typeof item === 'object' && !Array.isArray(item) && item !== null;

/**
 * Calculate CSS Object from component props with `AllowMedia` type (user can pass object with breakpoints through prop). CSS property can be calculated based on multiple props.
 */
export const useCSSProperty = <T extends Record<string, any>>({
  name,
  props,
  condition,
  transform,
}: {
  /** CSS property name. */
  name: string;
  /** Component prop or array of props. */
  props: T;
  /** Add property only if condition equals `true`. */
  condition?: boolean;
  /** Transform function. Applies before property value assignment. */
  transform?: (props: Record<keyof T, any>) => string | number;
}): CSSObject | undefined => {
  if (condition !== undefined && !condition) return;

  const propsValues = Object.values(props);
  const isUndefined = propsValues.every(value => value === undefined);
  if (isUndefined) return;

  const mediaProp: Partial<Record<Breakpoint, any>> | undefined = propsValues.find(value => isObject(value));
  if (!mediaProp) return setValue(name, props, transform);

  return (Object.keys(mediaProp) as Breakpoint[])
    .sort((a, b) => BREAKPOINTS_NAMES.indexOf(a) - BREAKPOINTS_NAMES.indexOf(b))
    .reduce((acc, bp) => {
      const nameIndex = BREAKPOINTS_NAMES.indexOf(bp);
      const nextBp = nameIndex !== -1 && BREAKPOINTS_NAMES[nameIndex - 1];
      const breakpointProps = Object.fromEntries(
        Object.entries(props).map(([key, value]) => [key, !isObject(value) ? value : value[bp]])
      ) as Record<keyof T, any>;
      const rule = setValue(name, breakpointProps, transform);
      return {
        ...acc,
        ...(nextBp ? { [`@media (max-width: ${Breakpoints[nextBp] - 1}px)`]: rule } : rule),
      };
    }, {});
};

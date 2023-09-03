import tokens from '../../public/tokens.json';

const { breakpoints } = tokens.layout;

export const Breakpoints = breakpoints;

export type Breakpoint = keyof typeof breakpoints;

export const BREAKPOINTS_NAMES = Object.keys(breakpoints) as Breakpoint[];

type dataProps = Record<Breakpoint, string>;

const MEDIA_QUERIES = Object.entries(breakpoints).reduce(
  (acc, [name, value]) => ({
    ...acc,
    [name]: `@media (max-width: ${value - 1}px)`,
    [`${name}Min`]: `@media (min-width: ${value}px)`,
  }),
  {}
) as dataProps;

export { MEDIA_QUERIES };

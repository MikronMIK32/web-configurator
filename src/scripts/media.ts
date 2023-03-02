import tokens from '../../public/tokens.json';

const { breakpoints } = tokens.layout;

type Breakpoint =
  | 'xxxl'
  | 'xxxlMin'
  | 'xxl'
  | 'xxlMin'
  | 'xl'
  | 'xlMin'
  | 'lg'
  | 'lgMin'
  | 'md'
  | 'mdMin'
  | 'sm'
  | 'smMin'
  | 'xs'
  | 'xsMin'
  | 'xxs'
  | 'xxsMin'
  | 'xxxs'
  | 'xxxsMin';

type dataProps = Record<Breakpoint, string>;

const MEDIA_QUERIES = Object.entries(breakpoints).reduce(
  (acc, [name, value]) => ({
    ...acc,
    [name]: `@media (max-width: ${value - 1}px)`,
    [`${name}Min`]: `@media (min-width: ${value}px)`,
  }),
  {},
) as dataProps;

export { MEDIA_QUERIES };

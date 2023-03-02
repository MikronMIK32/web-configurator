import {
  BaseThemeState,
  StyleDefinition,
  ValueOrFunction,
} from '@scripts/theme';

export enum AccordionVariants {
  primary = 'primary',
  dark = 'dark',
}

export enum AccordionSize {
  md = 'md',
}

export interface AccordionState {
  isIconVertical?: boolean;
  bordered: boolean;
  panelNoPadding?: boolean;
}

export type AccordionThemeState = BaseThemeState<
  typeof AccordionVariants,
  typeof AccordionSize
> &
  AccordionState;

type AccordionThemePart = StyleDefinition<AccordionThemeState>;

export type AccordionTheme = ValueOrFunction<
  {
    root: AccordionThemePart;
    item: AccordionThemePart;
    heading: AccordionThemePart;
    button: AccordionThemePart;
    panel: AccordionThemePart;
  },
  [AccordionThemeState]
>;

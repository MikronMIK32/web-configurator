import { BaseThemeState, StyleDefinition } from '@scripts/theme';
import { ReactNode } from 'react';
import { To } from 'react-router-dom';

export enum NavLinkVariants {
  primary = 'primary',
  dark = 'dark',
}

export enum NavLinkSize {
  md = 'md',
}

export interface NavLinkState {
  // TODO: useMatch
  // isActive: boolean;
  rounded: boolean;
}

export type NavLinkStateFull = BaseThemeState<
  typeof NavLinkVariants,
  typeof NavLinkSize
> &
  NavLinkState;

export interface NavLinkTheme {
  label: StyleDefinition<NavLinkStateFull>;
  icon: StyleDefinition<NavLinkStateFull>;
}

export interface NavLinkProps
  extends Partial<
      BaseThemeState<typeof NavLinkVariants, typeof NavLinkSize, NavLinkTheme>
    >,
    Partial<NavLinkState> {
  to: To;
  children: ReactNode | ReactNode[];
  className?: string;
}

export const NAV_LINK_ACTIVE = 'active';

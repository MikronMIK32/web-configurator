import { CSSObject } from '@emotion/react';
import { colors } from '@scripts/colors';
import { rgba, scale } from '@scripts/helpers';
import deepmerge from 'deepmerge';
import {
  NavLinkSize,
  NavLinkTheme,
  NavLinkVariants,
  NAV_LINK_ACTIVE,
} from './types';

export const themes: Record<string, NavLinkTheme> = {
  basic: {
    icon: {},
    label: (state) => {
      const base: CSSObject = {
        textDecoration: 'none',
        borderStyle: 'solid',

        [`&.${NAV_LINK_ACTIVE}`]: {
          cursor: 'default',
        },
      };

      let size: CSSObject = {};
      switch (state.size) {
        case NavLinkSize.md:
          size = {
            padding: `${scale(1)}px ${scale(2)}px`,

            ...(state?.rounded && {
              borderRadius: scale(3, true),
            }),
          };

          break;
        default:
          break;
      }

      let variant: CSSObject = {};
      switch (state.variant) {
        case NavLinkVariants.primary:
          variant = {
            color: colors.link,
            borderColor: colors.grey200,

            [`&.${NAV_LINK_ACTIVE}`]: {
              borderColor: colors.link,
              background: colors.link,
              color: colors.white,
            },
            [`&:not(.${NAV_LINK_ACTIVE})`]: {
              ':hover': {
                borderColor: colors.link,
              },
            },
          };
          break;
        case NavLinkVariants.dark:
          variant = {
            color: colors.grey400,
            borderWidth: 0,

            [`&.${NAV_LINK_ACTIVE}`]: {
              color: colors.white,
            },
            [`&:not(.${NAV_LINK_ACTIVE})`]: {
              ':hover': {
                color: colors.white,
                background: rgba(colors.white, 0.2),
              },
            },
          };
          break;
        default:
          break;
      }

      return deepmerge.all<CSSObject>([base, size, variant]);
    },
  },
};

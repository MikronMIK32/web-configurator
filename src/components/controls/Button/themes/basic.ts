import { CSSObject } from '@emotion/react';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography, { TypographyName } from '@scripts/typography';

import deepmerge from 'deepmerge';
import { ButtonTheme } from '../types';

export const basicTheme: ButtonTheme = {
  button: state => {
    let padding = `8px 12px`;
    let font: TypographyName = 'labelSmall';
    let height = scale(4);
    let borderRadius = 12;

    switch (state.size) {
      case 'lg':
        padding = `16px 20px`;
        font = 'labelLarge';
        height = scale(7);
        borderRadius = 18;
        break;
      case 'md':
        padding = `12px 18px`;
        font = 'labelMedium';
        height = scale(6);
        borderRadius = 16;
        break;
      case 'sm':
      default:
        break;
    }

    const base: CSSObject = {
      display: 'inline-flex',
      width: 'fit-content',
      justifyContent: 'center',
      alignItems: 'center',
      ...typography(font),
      padding,
      minHeight: height,
      ...(state.rounded && {
        borderRadius,
      }),
      border: '1px solid',

      ...(state.block && {
        display: 'block',
        width: '100%',
      }),

      ':disabled': {
        cursor: 'not-allowed',
      },

      ':focus': {
        outline: 'solid dotted',
      },
    };

    let variantCSS: CSSObject = {};

    switch (state.variant) {
      case 'inverse': {
        variantCSS = {
          borderColor: 'transparent',
          background: colors.grey200,
          color: colors.black,
          ':hover': {
            background: colors.grey300,
          },
          ':active': {
            background: colors.grey500,
          },
          ':disabled': {
            background: `${colors.grey400}!important`,
          },
        };
        break;
      }
      case 'secondary': {
        variantCSS = {
          borderColor: 'transparent',
          background: colors.grey600,
          color: colors.white,
          ':hover': {
            background: colors.grey500,
          },
          ':active': {
            background: colors.grey600,
          },
          ':disabled': {
            background: `${colors.grey400}!important`,
          },
        };
        break;
      }
      case 'primary': {
        variantCSS = {
          borderColor: 'transparent',
          background: colors.primary,
          color: colors.black,
          ':hover': {
            background: colors.primaryHover,
          },
          ':active': {
            background: colors.primaryPressed,
          },
          ':disabled': {
            background: `${colors.grey400}!important`,
          },
        };
        break;
      }
      case 'ghost': {
        variantCSS = {
          borderColor: colors.grey600,
          background: 'transparent',
          color: colors.black,
          ':hover': {
            background: colors.grey100,
          },
          ':active': {
            background: colors.grey200,
          },
          ':disabled': {
            borderColor: colors.grey400,
            background: colors.grey400,
          },
        };
        break;
      }
      case 'danger': {
        variantCSS = {
          borderColor: colors.errorDark,
          background: colors.negative,
          color: colors.white,
          ':hover': {
            background: colors.errorDark,
          },
        };
        break;
      }
      default:
        break;
    }

    return deepmerge.all([base, variantCSS]) as CSSObject;
  },
  icon: state => {
    const marginRule = `margin${!state.iconAfter ? 'Right' : 'Left'}`;
    const invMarginRule = `margin${state.iconAfter ? 'Right' : 'Left'}`;
    const iconCSS = {
      [invMarginRule]: !state.hidden ? -scale(1, true) : undefined,
      width: scale(3, true),
      height: scale(3, true),
    };

    let marginFromText = scale(1, true);

    switch (state.size) {
      case 'md':
        iconCSS.width = scale(4, true);
        iconCSS.height = scale(4, true);
        break;
      case 'lg':
        iconCSS.width = scale(5, true);
        iconCSS.height = scale(5, true);
        break;
      case 'sm':
        marginFromText = scale(1, true) + 1;
        break;
      default:
        break;
    }

    iconCSS[marginRule] = !state.hidden ? (state.hasChildren ? 1 : -1) * marginFromText : undefined;

    return { ...iconCSS, fill: 'currentcolor' };
  },
};

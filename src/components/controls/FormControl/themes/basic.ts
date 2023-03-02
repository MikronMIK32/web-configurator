import { CSSObject } from '@emotion/react';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { MEDIA_QUERIES } from '@scripts/media';
import { OptionizedCSS, extractCSSOption } from '@scripts/theme';
import typography from '@scripts/typography';

import { FormControlSize, FormControlTheme } from '../types';

const { md, xl } = MEDIA_QUERIES;

const flyingLabelBaseCSS: CSSObject = {
  position: 'absolute',
  transform: 'none',
};

const flyingLabelCenterCSS: CSSObject = {
  top: '50%',
  transform: 'translateY(-50%)',
  [xl]: {
    top: '50%',
  },
  [md]: {
    top: '50%',
  },
};

const flyingLabelSmCSS: CSSObject = {
  ...flyingLabelBaseCSS,
  left: 22,
  top: scale(1, true),
  [xl]: {
    top: scale(1, true),
  },
  [md]: {
    top: scale(1, true),
  },
};

const flyingLabelMdCSS: CSSObject = {
  ...flyingLabelBaseCSS,
  left: 22,
  top: scale(1, true),
  [xl]: {
    top: `${scale(2, true)}px !important`,
    left: scale(4, true),
  },
};

const flyingLabelLgCSS: CSSObject = {
  ...flyingLabelBaseCSS,
  left: 22,
  top: scale(1),
  [xl]: {
    top: scale(1),
  },
  [md]: {
    left: scale(3),
  },
};

export const basicTheme: FormControlTheme = {
  wrapper: ({ block }) => ({
    maxWidth: '100%',
    width: 'fit-content',
    ...(block && { width: '100%' }),
  }),
  inner: ({ size, focused, hasError, disabled }) => {
    const sized: OptionizedCSS<typeof FormControlSize> = {
      sm: {
        ...typography('paragraphSmall'),

        borderRadius: 14,
      },
      md: {
        ...typography('paragraphMedium'),

        lineHeight: 1,
        borderRadius: scale(2),
      },
      lg: {
        ...typography('paragraphLarge'),

        borderRadius: scale(2),
      },
    };
    return {
      display: 'flex',
      outline: 'none',
      position: 'relative',
      minHeight: '100%',
      background: colors.active,
      color: colors.black,
      transition: 'color,background-color .2s ease',
      border: `3px solid ${colors.active}`,

      ...extractCSSOption(sized, size),
      ...(focused && {
        borderColor: colors.borderFocus,
      }),
      ...(hasError && {
        background: colors?.error,
        borderColor: focused ? colors.negativeInput : colors?.error,
      }),
      ...(disabled && {
        color: colors?.grey400,
        background: colors?.grey300,
      }),
    };
  },
  controlWrapper: ({ size, labelView, hasRightAddons, hasLeftAddons }) => {
    const sized: OptionizedCSS<typeof FormControlSize> = {
      sm: {
        padding: `${scale(1)}px ${scale(3, true)}px`,
        minHeight: scale(5),

        ...(labelView === 'inner' && {
          padding: `${scale(2)}px ${scale(5, true)}px ${scale(1)}px`,
        }),

        ...(hasRightAddons && {
          paddingRight: scale(1, true),
        }),

        ...(hasLeftAddons && {
          paddingLeft: scale(1, true),
        }),
      },
      md: {
        padding: `10px ${scale(5, true)}px`,
        minHeight: scale(6) - 6,

        ...(labelView === 'inner' && {
          padding: `${scale(2)}px ${scale(5, true)}px ${scale(1, true)}px `,
          [xl]: {
            padding: `${scale(2)}px ${scale(2)}px ${scale(1, true)}px `,
          },
        }),

        ...(hasRightAddons && {
          paddingRight: scale(1, true),
        }),

        ...(hasLeftAddons && {
          paddingLeft: scale(1, true),
        }),
      },
      lg: {
        minHeight: scale(8),
        padding: `${scale(3, true)}px ${scale(5, true)}px`,
        ...(labelView === 'inner' && {
          padding: `${scale(3)}px ${scale(5, true)}px ${scale(3, true)}px `,
        }),

        [md]: {
          minHeight: scale(7),
          padding: `${scale(3, true)}px`,
          ...(labelView === 'inner' && {
            padding: `${scale(5, true)}px ${scale(6, true)}px ${scale(
              3,
              true,
            )}px`,
          }),
        },

        ...(hasRightAddons && {
          paddingRight: scale(1),
        }),
      },
    };
    return {
      position: 'relative',
      ...extractCSSOption(sized, size),
    };
  },
  label: ({ size = 'md', hasError }) => {
    const sized: OptionizedCSS<typeof FormControlSize> = {
      sm: typography('paragraphSmall')!,
      md: typography('paragraphSmall')!,
      lg: {},
    };

    return {
      color: colors.grey600,
      display: 'block',
      marginBottom: scale(1),
      ...extractCSSOption(sized, size),
      ...(hasError && {
        color: colors.negative,
      }),
    };
  },
  labelInner: ({ filled, hasError, size = 'md', labelWrap }) => {
    const isFlying = filled;
    const sized: OptionizedCSS<typeof FormControlSize> = {
      sm: {
        ...typography(isFlying ? 'paragraphExtraSmall' : 'paragraphSmall'),
        ...flyingLabelSmCSS,
      },
      md: {
        ...typography(isFlying ? 'paragraphSmall' : 'paragraphMedium'),
        ...flyingLabelMdCSS,
      },
      lg: {
        ...typography(isFlying ? 'paragraphSmall' : 'paragraphLarge'),
        ...flyingLabelLgCSS,
      },
    };
    return {
      transition: 'all .25s ease',
      display: 'flex',
      pointerEvents: 'none',
      ...(!labelWrap && {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
      color: colors.grey400,
      ...(isFlying && {
        color: colors.grey600,
      }),
      ...extractCSSOption(sized, size),
      ...(!isFlying && flyingLabelCenterCSS),
      ...(hasError && { color: colors.error }),
    };
  },
  addons: ({ isLeft, size = 'md', disabled }) => {
    const paddings: OptionizedCSS<typeof FormControlSize> = {
      sm: {
        [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(1, true),
      },
      md: {
        [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(3, true),
      },
      lg: {
        [!isLeft ? 'paddingRight' : 'paddingLeft']: scale(2),
      },
    };

    return {
      cursor: disabled ? 'not-allowed' : 'default',
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      ...extractCSSOption(paddings, size),
    };
  },
  sub: ({ hasError, size = 'md' }) => {
    const sized: OptionizedCSS<typeof FormControlSize> = {
      sm: {},
      md: {},
      lg: { ...typography('paragraphMedium'), marginTop: scale(3, true) },
    };
    return {
      whiteSpace: 'pre-line',
      marginTop: scale(1),
      ...typography('paragraphSmall'),
      display: 'block',
      ...extractCSSOption(sized, size),
      ...(hasError && { color: colors.errorDark }),
    };
  },
};

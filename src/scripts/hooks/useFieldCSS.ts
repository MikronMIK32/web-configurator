import { CSSObject } from '@emotion/react';
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import typography from '@scripts/typography';
import { useMemo } from 'react';

export const useFieldCSS = ({
  isError,
  // isLabel,
  isLabelBottom,
  focus,
}: {
  isError?: boolean;
  isLabel?: boolean;
  isLabelBottom?: boolean;
  focus?: boolean;
}) => {
  const basicFieldCSS = useMemo<CSSObject>(
    () => ({
      ':-webkit-autofill': {
        ...typography('paragraphMedium'),
      },

      width: '100%',
      WebkitAppearance: 'none',
      position: 'relative',
      ...typography('paragraphSmall'),
      padding: `${scale(1)}px ${scale(13, true)}px ${scale(1)}px ${scale(
        3,
        true,
      )}px`,
      minHeight: 40,
      borderRadius: scale(3, true),
      background: colors?.white,
      border: `2px solid ${colors?.grey300}`,
      color: colors?.black,

      '::placeholder': {
        color: colors?.grey400,
      },

      '.field-icon-right, & + .field-icon-right': {
        fill: colors?.link,
      },

      ':disabled': {
        color: colors?.grey400,
        background: colors?.grey300,
        cursor: 'not-allowed',
      },

      '.field-icon-right': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      },

      //   ...(isLabel && isLabelBottom && {}), TODO:
      ':focus-visible': {
        outline: 'none'
      },

      ':focus': {
        borderColor: colors?.borderFocus,

        '& ~ label': {
          ...typography('paragraphExtraSmall'),

          ...(isError && {
            color: colors.errorDark,
          }),
        },
      },

      ...(focus && {
        outline: 'none',
        borderColor: colors.borderFocus,

        '& ~ label': {
          color: colors.grey600,

          ...(isError && {
            color: colors.errorDark,
          }),
        },
      }),

      ...(isError && {
        background: colors?.error,
        borderColor: colors?.error,
      }),
      lineHeight: `1 !important`,
    }),
    [focus, isError],
  );

  const fieldWrapperCSS: CSSObject = {
    position: 'relative',
  };

  const fieldLabelCSS: CSSObject = {
    transition: 'all .25s ease',
    display: 'flex',
    ...typography('paragraphSmall'),
    marginBottom: scale(1),
    color: colors.grey600,

    ...(isLabelBottom && {
      padding: `${scale(2)}px ${scale(5, true)}px ${scale(1)}px `,
      color: colors.grey400,
    }),

    ...(isError && {
      color: colors.errorDark,
    }),
  };

  const fieldHintCSS: CSSObject = {
    ...typography('paragraphSmall'),
    marginTop: scale(1),
    color: colors.grey600,
  };

  const fieldErrorCSS: CSSObject = {
    ...typography('paragraphSmall'),
    marginTop: scale(1),
    color: colors.errorDark,
  };

  return {
    basicFieldCSS,
    fieldWrapperCSS,
    fieldLabelCSS,
    fieldHintCSS,
    fieldErrorCSS,
  };
};

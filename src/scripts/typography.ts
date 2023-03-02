import { CSSObject } from '@emotion/react';

const Typographies = {
  breakpoints: [1442, 768],
  styles: {
    h1: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '3.5rem',
        lineHeight: 1.14,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.14,
      },
    },
    special: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '7.875rem',
        lineHeight: 1.2,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
    },
    h2: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '3rem',
        lineHeight: 1.16,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.33,
      },
    },
    h3: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.14,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
    },
    h4: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.33,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
    h5: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: 1.33,
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 400,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
    },
    h6: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
        textTransform: 'uppercase',
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.71,
        textTransform: 'uppercase',
      },
    },
    labelLarge: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
    },
    labelMedium: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '0.9375rem',
        lineHeight: 1.06,
      },
    },
    labelSmall: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '1rem',
        lineHeight: 1,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '0.875rem',
        lineHeight: 1.14,
      },
    },
    labelExtraSmall: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '0.75625rem',
        lineHeight: 1.45,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 700,
        fontSize: '0.6875rem',
        lineHeight: 0.72,
      },
    },
    paragraphLarge: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
    },
    paragraphMedium: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '1.125rem',
        lineHeight: 1.33,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '0.9375rem',
        lineHeight: 1.06,
      },
    },
    paragraphSmall: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.14,
      },
    },
    paragraphExtraSmall: {
      desktop: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '0.6875rem',
        lineHeight: 1.45,
      },
      mobile: {
        fontFamily: 'Calibri',
        fontWeight: 400,
        fontSize: '0.6875rem',
        lineHeight: 0.72,
      },
    },
    upperText: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '0.5625rem',
        lineHeight: 0.88,
        textTransform: 'uppercase',
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 500,
        fontSize: '0.5625rem',
        lineHeight: 0.88,
        textTransform: 'uppercase',
      },
    },
    upperTextRegular: {
      desktop: {
        fontFamily: 'Stolzl',
        fontWeight: 400,
        fontSize: '0.5625rem',
        lineHeight: 0.88,
        textTransform: 'uppercase',
      },
      mobile: {
        fontFamily: 'Stolzl',
        fontWeight: 400,
        fontSize: '0.5625rem',
        lineHeight: 0.88,
        textTransform: 'uppercase',
      },
    },
  },
};

export type TypographyName = keyof typeof Typographies['styles'];

export default function typography(name: TypographyName) {
  if (!(name in Typographies.styles)) return {};

  const { breakpoints } = Typographies;
  const [sm, lgMin] = breakpoints;

  const fontSettings = Typographies.styles[name];
  const { fontFamily: desktopFamily, ...desktopStyles } = fontSettings.desktop;
  const { fontFamily: mobileFamily, ...mobileStyles } = fontSettings.desktop;

  const result: CSSObject = {
    ...(desktopStyles && {
      [`@media (min-width: ${lgMin}px)`]: {
        ...(desktopStyles as any),
        fontFamily: `${desktopFamily}, sans-serif`,
      },
    }),
    ...(mobileStyles && {
      [`@media (max-width: ${sm}px)`]: {
        ...(mobileStyles as any),
        fontFamily: `${mobileFamily}, sans-serif`,
      },
    }),
  };

  return result;
}

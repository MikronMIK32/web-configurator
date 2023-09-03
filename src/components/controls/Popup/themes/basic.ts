import { CSSObject } from '@emotion/react';

import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { OptionizedCSS, extractCSSOption } from '@scripts/theme';
import typography from '@scripts/typography';

// eslint-disable-next-line import/no-cycle
import { Align, PopupSize, PopupTheme } from '../types';

const ALIGN_CSS: Record<Align, CSSObject> = {
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  left: {
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  right: {
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
};

const WRAPPER_INSET = scale(4);

const COMPONENT_SIZES: OptionizedCSS<typeof PopupSize> = {
  fullscreen: {
    flex: 1,
    width: '100%',
  },
  screen_lg: {
    width: '75vw',
  },
  lg: {
    borderRadius: scale(1),
    maxWidth: scale(90),
  },
  md: {
    borderRadius: scale(1, true),
    maxWidth: scale(80),
  },
  sm: {
    borderRadius: scale(1, true),
    maxWidth: scale(50),
  },
  minLg: {
    borderRadius: scale(1),
    minWidth: scale(90),
  },
  minMd: {
    borderRadius: scale(1, true),
    minWidth: scale(80),
  },
  minSm: {
    borderRadius: scale(1, true),
    minWidth: scale(50),
  },
};

export const basicTheme: PopupTheme = {
  wrapper: ({ view, size }) => ({
    ...(view === 'desktop' &&
      size !== 'fullscreen' && {
        paddingTop: WRAPPER_INSET,
        paddingBottom: WRAPPER_INSET,
      }),
  }),
  component: ({ size, innerScroll }) => ({
    background: colors.white,
    ...(innerScroll && {
      maxHeight: '100%',
    }),
    ...extractCSSOption(COMPONENT_SIZES, size),
  }),
  header: ({ size, view, stickyHeader, hasContent, highlighted }) => ({
    top: view === 'desktop' ? -WRAPPER_INSET : 0,
    ...(highlighted &&
      view === 'desktop' &&
      size !== 'fullscreen' && {
        borderTopLeftRadius: scale(1, true),
        borderTopRightRadius: scale(1, true),
      }),
    padding: `${scale(2)}px ${scale(3)}px`,
    borderBottom: `1px solid ${colors.grey200}`,
    width: '100%',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    ...(!hasContent && {
      pointerEvents: 'none',
    }),
    ...(stickyHeader && {
      position: 'sticky',
      zIndex: 1,
    }),
    transition: 'box-shadow 0.2s ease-in, background 0.2 ease',
    boxShadow: '0px 6px 8px -2px rgba(0, 0, 0, 0.0)',
    ...(hasContent &&
      stickyHeader &&
      highlighted && {
        background: colors.white,
        boxShadow: '0px 6px 8px -2px rgba(0, 0, 0, 0.15)',
      }),
  }),
  headerCloser: () => ({
    ':hover': { opacity: 0.7 },
  }),
  headerContent: ({ align = 'left', trim }) => ({
    flexGrow: 1,
    paddingRight: scale(2),
    ...ALIGN_CSS[align],
    ...(trim && {
      overflow: 'hidden',
    }),
  }),
  headerTitle: ({ trim }) => ({
    ...typography('labelMedium'),
    wordBreak: 'break-word',
    ...(trim && {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
  }),
  content: ({ flex, innerScroll }) => ({
    width: '100%',
    padding: `${scale(2)}px ${scale(3)}px`,
    ...(flex && { flex: 1 }),
    ...(innerScroll && {
      overflowY: 'auto',
      flex: 1,
      '::-webkit-scrollbar-thumb': {
        backgroundColor: colors?.grey600,
        borderRadius: scale(4),
      },
      '::-webkit-scrollbar': {
        maxWidth: 8,
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: colors?.grey200,
      },
    }),
  }),
  footer: ({ view, highlighted, stickyFooter, size }) => ({
    borderTop: `1px solid ${colors.grey200}`,
    padding: `${scale(2)}px ${scale(3)}px`,
    transition: 'box-shadow 0.2s ease-in',
    boxShadow: `0px -6px 8px -4px rgba(0, 0, 0, 0.0)`,
    ...(stickyFooter &&
      highlighted && {
        background: colors.white,
        boxShadow: `0px -6px 8px -4px rgba(0, 0, 0, 0.15)`,
      }),
    ...(stickyFooter && {
      bottom: view === 'desktop' ? -WRAPPER_INSET : 0,
      position: 'sticky',
      zIndex: 1,
    }),
    ...(size === 'fullscreen' && {
      marginTop: 'auto',
    }),
  }),
};

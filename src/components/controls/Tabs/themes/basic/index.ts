// eslint-disable-next-line import/no-cycle
import { colors } from '@scripts/colors';
import { scale } from '@scripts/helpers';
import { OptionizedCSS, extractCSSOption } from '@scripts/theme';
import typography from '@scripts/typography';

import { TabsSize, TabsTheme } from '../../types';
// eslint-disable-next-line import/no-cycle
import { toggle } from './toggle';

export const basicTheme: TabsTheme = {
  container: () => ({
    position: 'relative',
    overflow: 'hidden',
  }),
  scrollableContainer: ({ fullWidthScroll = false, mobile = false }) => ({
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',

    ...(fullWidthScroll && {
      margin: `0 -${scale(2)}px`,
    }),

    ...(mobile
      ? {
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }
      : {
          '::-webkit-scrollbar-thumb': {
            backgroundColor: colors?.grey400,
          },
          '::-webkit-scrollbar': {
            maxHeight: 6,
          },

          '::-webkit-scrollbar-track': {
            backgroundColor: colors?.grey100,
          },
        }),

    '& > *': {
      flexShrink: 0,
    },
  }),
  line: {
    position: 'absolute',
    height: scale(1, true),
    top: 0,
    left: 0,
    background: colors.link,
    transition: 'transform 0.2s ease, with 0.2s ease',
  },
  tabList: state => ({
    position: 'relative',
    display: 'inline-flex',
    minWidth: '100%',
    ':before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 1,
      height: 1,
      width: '100%',
      backgroundColor: colors.grey200,
    },
    ...(state.fullWidthScroll && {
      minWidth: `calc(100% - ${scale(2)}px)`,
      margin: `0 ${scale(2)}px`,
    }),
  }),
  tab: ({ hidden }) => ({
    outline: 'none!important',
    ...(hidden && {
      display: 'none',
    }),
  }),
  toggle,
  toggleRightAddons: ({ size }) => {
    const sized: OptionizedCSS<typeof TabsSize> = {
      md: {
        marginLeft: scale(1, true),
      },
    };
    return {
      svg: {
        fill: 'currentColor',
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...extractCSSOption(sized, size),
    };
  },
  toggleLeftAddons: ({ size }) => {
    const sized: OptionizedCSS<typeof TabsSize> = {
      md: {
        marginRight: scale(1, true),
      },
    };
    return {
      svg: {
        fill: 'currentColor',
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...extractCSSOption(sized, size),
    };
  },
  showMoreButton(state) {
    return {
      ...(typeof toggle === 'function' ? toggle(state) : toggle),
    };
  },
  errorAddon: ({ size }) => {
    const sized: OptionizedCSS<typeof TabsSize> = {
      md: {
        marginLeft: scale(1, true),
      },
    };
    return {
      color: colors.error,
      backgroundColor: colors.errorDark,
      border: `1px solid ${colors.error}`,
      borderRadius: 2,
      padding: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...typography('labelMedium'),
      ...extractCSSOption(sized, size),
    };
  },
};

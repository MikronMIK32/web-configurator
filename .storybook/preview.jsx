import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withRouter } from 'storybook-addon-react-router-v6';
import GlobalStyles from '@components/GlobalStyles';
import i18n from './i18next.cjs';

export const parameters = {
  i18n,
  locale: 'ru',
  locales: {
    ru: 'Русский',
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      'Laptop 1440px': {
        name: 'Laptop 1440px',
        styles: {
          width: '1440px',
          height: '1000px',
        },
        type: 'desktop',
      },
      'Desktop 1600px': {
        name: 'Desktop 1600px',
        styles: {
          width: '1600px',
          height: '1000px',
        },
        type: 'desktop',
      },
      'Desktop 1920px': {
        name: 'Desktop 1920px',
        styles: {
          width: '1920px',
          height: '1080px',
        },
        type: 'desktop',
      },
    },
  },
  options: {
    storySort: {
      order: ['Intro', 'Autokits', 'Components'],
    },
  },
};

export const decorators = [
  withRouter,
  (Story) => {
    return (
      <>
        <GlobalStyles />
        <Story />
      </>
    );
  },
];

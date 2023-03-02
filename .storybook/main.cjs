const path = require('path');
const react = require('@vitejs/plugin-react');
const ViteRequireContext =
  require('@originjs/vite-plugin-require-context').default;
const tsconfigPaths = require('vite-tsconfig-paths').default;
const svgr = require('vite-plugin-svgr');
const { mergeConfig } = require('vite');

module.exports = {
  stories: [
    '../src/**/intro/welcome.stories.mdx',
    '../src/**/intro/*.stories.mdx',
    '../src/**/*.stories.mdx',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        // babelOptions: {},
        // sourceLoaderOptions: null,
        // transcludeMarkdown: true,
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    // TODO: causes error on any state change.
    // 'storybook-react-i18next',
    'storybook-addon-react-router-v6',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    reactDocgen: 'none',
  },
  features: {
    storyStoreV7: true,
    previewMdx2: true,
    emotionAlias: false,
  },
  async viteFinal(config) {
    config.plugins = config.plugins.filter(
      (plugin) =>
        !(Array.isArray(plugin) && plugin[0]?.name.includes('vite:react')),
    );

    config.plugins.push(svgr());

    config.plugins.push(
      react({
        exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    );

    config.plugins.push(ViteRequireContext());

    // const mdx = await import("@mdx-js/rollup");

    // config.plugins.push(mdx.default({ remarkPlugins: [] }));

    config.esbuild = {
      // Fixed: [vite] warning: Top-level "this" will be replaced with undefined since this file is an ECMAScript module
      // https://github.com/vitejs/vite/issues/8644
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    };

    config.plugins.push(
      /** @see https://github.com/aleclarson/vite-tsconfig-paths */
      tsconfigPaths({
        // My tsconfig.json isn't simply in viteConfig.root,
        // so I've passed an explicit path to it:
        projects: [path.resolve(__dirname, '../tsconfig.json')],
      }),
    );

    return mergeConfig(config, {
      resolve: {
        alias: {
          '@components': path.resolve(__dirname, '../src/components'),
          '@scripts': path.resolve(__dirname, '../src/scripts'),
          '@icons': path.resolve(__dirname, '../src/icons'),
          'next-i18next': 'react-i18next',
        },
      },
    });
  },
};

import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'plugin:jsx-a11y/recommended', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: ['react', '@typescript-eslint'],
  rules: {},
  overrides: [],
};

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 0,
      camelcase: 0,
      'no-bitwise': 0,
      'react/function-component-definition': 0,
      'react/jsx-filename-extension': 0,
      'react/jsx-props-no-spreading': 0,
      'import/no-unresolved': [2, { ignore: ['@'] }],
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': [2],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/no-unescaped-entities': 1,
      'import/extensions': 0,
      'react/destructuring-assignment': 1,
      'react/require-default-props': 0,
      'no-param-reassign': [2, { props: false }],
      'react/button-has-type': 1,
      'react/prop-types': 0,
      'no-nested-ternary': 1,
      'react/no-array-index-key': 1,
      'react/jsx-key': 1,
      'jsx-a11y/anchor-is-valid': 0,
      'no-console': [1, { allow: ['warn', 'error', 'info'] }],
      'consistent-return': 0,
      'no-shadow': 0,
      '@typescript-eslint/no-shadow': [1],
      'jsx-a11y/label-has-associated-control': 0,
      'jsx-a11y/anchor-has-content': 0,
      'react/no-danger': 0,
      'jsx-a11y/no-static-element-interactions': [
        2,
        {
          handlers: ['onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
        },
      ],
      'jsx-a11y/click-events-have-key-events': 0,
      'import/no-named-as-default': 0,
      'import/prefer-default-export': 0,
    },
  }
);

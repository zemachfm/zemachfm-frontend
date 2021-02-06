// eslint-disable-next-line import/no-unused-modules
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  plugins: ['prettier', 'react-hooks', 'react', 'import'],
  rules: {
    'prettier/prettier': [2, prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'no-console': 2,
    'prefer-const': 2,
    'no-unreachable': 2,
    'vars-on-top': 1,
    'no-undef': 2,
    'no-underscore-dangle': 2,
    'no-continue': 2,

    /**
     * react
     */
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-pascal-case': 2,
    'react/react-in-jsx-scope': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-sort-props': 2,
    'react/jsx-wrap-multilines': 2,
    'react/jsx-equals-spacing': 2,
    'react/jsx-boolean-value': 2,
    /**
     * hooks
     */
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    /**
     * import
     */
    'import/no-unresolved': 1,
    'import/named': 2,
    'import/export': 2,
    'import/no-unused-modules': 2,
    'import/exports-last': 2,
    'import/newline-after-import': 2,
    'import/no-default-export': 0,
    'import/group-exports': 2,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': [1, prettierOptions] },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

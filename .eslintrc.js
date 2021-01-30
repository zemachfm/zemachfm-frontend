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
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'react-app',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier', 'react-hooks', 'react', 'import'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    /**
     * react
     */
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-pascal-cas': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/jsx-equals-spacing': 'error',
    'react/jsx-boolean-value': 'error',
    /**
     * hooks
     */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    /**
     * import
     */
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/export': 'error',
    'import/no-unused-modules': 'error',
    'import/exports-last': 'error',
    'import/newline-after-import': 'error',
    'import/no-default-export': 'error',
    'import/group-exports': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
  settings: {
    'import/resolver': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
  },
};

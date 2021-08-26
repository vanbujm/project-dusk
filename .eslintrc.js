// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'func-style': ['error', 'expression'],
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', 'ts', 'tsx'],
  },
};

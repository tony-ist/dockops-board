// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  ignorePatterns: ['apps/backend/tmp/'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-var': 'error',
    'no-redeclare': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'no-console': 'error',
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/no-unused-vars': 'error',
    'semi': 'error',
    'object-curly-spacing': ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': ['error', {
      props: 'never',
      children: 'never',
    }],
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true
    }],
    'react-hooks/exhaustive-deps': 'error'
  },
};

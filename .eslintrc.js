module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off', //block warning type
    // 'eol-last': 'warn',
    // 'padding-line-between-statements': [
    //   'warn',
    //   { blankLine: 'always', prev: '*', next: 'block-like' },
    //   { blankLine: 'always', prev: 'block-like', next: '*' },
    //   { blankLine: 'always', prev: '*', next: 'multiline-const' },
    //   { blankLine: 'always', prev: 'multiline-const', next: '*' },
    //   { blankLine: 'always', prev: '*', next: 'class' },
    //   { blankLine: 'always', prev: 'class', next: '*' },
    // ],
    // 'lines-between-class-members': [
    //   'warn',
    //   'always',
    //   { exceptAfterSingleLine: true },
    // ],
  },
};

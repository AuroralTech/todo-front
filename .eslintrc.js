const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = 'eslint/rules';

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prefer-arrow', 'rulesdir'],
  rules: {
    'max-len': ['warn', { code: 120, ignorePattern: '^import\\s.+\\sfrom\\s.+;$' }],
    '@next/next/no-img-element': 'off',
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'react/prop-types': 'off', // TS で型を縛ってるので props の厳密な検証は不要
    'rulesdir/img-src-must-relative': 'error',
    'rulesdir/inner-href-use-link': 'error',
    'rulesdir/dont-use-url-properties': 'warn',
  },
  // ESLint の除外ファイル
  ignorePatterns: [
    '**/public/*',
    '**/node_modules/*',
    '**/.vscode/*',
    'next.config.js',
    '.eslintrc.js',
    '.prettierrc.js',
    'jest.config.js',
    'postcss.config.js',
    'tailwind.config.js',
    '.stylelintrc.js',
  ],
};

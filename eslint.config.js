import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    files: ['src/**/*.{js,ts}'],
    ignores: ['dist', '**/*.config.js', '!**/eslint.config.js'],
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  eslintConfigPrettier,
];

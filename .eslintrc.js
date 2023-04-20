module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
  },
  ignorePatterns: ['**/*.json', '**/*.md', 'node_modules', '.bin'],
};

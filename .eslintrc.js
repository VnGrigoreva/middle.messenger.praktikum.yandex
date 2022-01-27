module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [['@', './src']],
  //       extensions: ['.ts,', '.js'],
  //     },
  //   },
  // },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    "max-len": [2, 100],
  },
};

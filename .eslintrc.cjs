module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    curly: ['error', 'all'],
    'import/extensions': ['error', 'always', { js: 'always' }],
    'no-console': 'off',
    'no-alert': 'off',
  },
};

// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['react', 'react-native', 'prettier'],
  ignorePatterns: ['/dist/*', '/node_modules/*', '/android/*', '/ios/*'],
  rules: {
    'react/display-name': 'off',
    'prettier/prettier': 'error',
  },
};

module.exports = {
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('stylelint-config-rational-order'),
  ],
  plugins: [
    require.resolve('stylelint-order'),
    require.resolve('stylelint-less'),
  ],
  rules: {
    'import-notation': null,
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', 'docs/**/*'],
  overrides: [
    {
      files: ['**/*.less'],
      customSyntax: require('postcss-less'),
    },
  ],
};

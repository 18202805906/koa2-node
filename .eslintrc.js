module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', '@vue/prettier'],
  parserOptions: {
    // ecmaVersion: 2020,
    parser: 'babel-eslint'
  },
  rules: {
    'no-unused-vars': 1,
    // 'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    semi: 1,
    'prefer-const': 0,
    quotes: [1, 'single'],
    indent: 0,
    'object-shorthand': 1,
    // 'no-irregular-whitespace':0,
    camelcase: 1,
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        'key-spacing': false
      }
    ]
  }
};

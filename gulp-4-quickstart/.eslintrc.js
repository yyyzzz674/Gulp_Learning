module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  extends: ['eslint:recommended'],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

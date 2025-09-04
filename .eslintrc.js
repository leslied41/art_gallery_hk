/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: ['next/core-web-vitals'],
    rules: {
      // Allow styled-jsx attributes on <style> tags
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      // (optional) quiet the current warnings so you can ship, remove later:
      '@next/next/no-img-element': 'off',
      '@next/next/link-passhref': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
  
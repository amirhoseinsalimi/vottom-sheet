require('@rushstack/eslint-patch/modern-module-resolution');

const path = require('node:path');
const createAliasSetting = require('@vue/eslint-config-airbnb/createAliasSetting');

module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  extends: [
    '@vue/eslint-config-airbnb',
    'eslint:recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'vue/attribute-hyphenation': [
      'error',
      'never',
      {
        ignore: [],
      },
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: [['template', 'script'], 'style'],
      },
    ],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+$/u'],
      },
    ],
    'no-return-assign': 0,
    'import/no-extraneous-dependencies': 0,
  },
  settings: {
    ...createAliasSetting({
      '@': `${path.resolve(__dirname, './src')}`,
    }),
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineOptions: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
};

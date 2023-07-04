module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    '@antfu',
    'standard',
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    '@vue/eslint-config-typescript',
    'plugin:storybook/recommended',
    'prettier',
  ],
  rules: {
    'vue/attribute-hyphenation': [
      'error',
      'never',
      {
        ignore: []
      }
    ],
    'vue/component-tags-order': [
      'error',
      {
        order: [['template', 'script'], 'style']
      }
    ],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+$/u']
      }
    ]
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}

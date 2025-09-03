import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin-js'
export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'],
    plugins: { js , '@stylistic/js':stylistic },
    ignores:['dist/**'],
    rules:{
      '@stylistic/js/indent':['error',2],
      '@stylistic/js/linebreak-style':['error','unix'],
      '@stylistic/js/quotes':['error','single'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      '@stylistic/js/semi': ['error', 'never'],
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node }
  },
])

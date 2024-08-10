// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
)

export default [
  {
    ignores: ['build/**'],
  },
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },
]

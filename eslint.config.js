import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  { languageOptions: { globals: globals.node } },
  { ignores: ['dist/'] },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  eslintPluginPrettierRecommended,
);

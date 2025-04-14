import {defineConfig} from 'eslint/config';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import js from '@eslint/js';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: [
      'plugin:react/recommended',
      'plugin:prettier/recommended',
    ],

    rules: {
      'react/jsx-no-bind': 'warn',
      'import/no-cycle': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    },
  },
]);

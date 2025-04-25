import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import React from 'react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Apply Next.js recommended configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Configure TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      globals : {
        React: 'readonly',
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // Spread recommended JavaScript and TypeScript rules
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      // Disable no-explicit-any to allow 'any'
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
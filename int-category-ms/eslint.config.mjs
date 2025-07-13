import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    files: ["*/.ts"],
  },
  {
    ignores: [
      "*/__tests__",
      "/.test.ts",
      "tests/",
      "/node_modules",
      "/swagger",
      "src/types",
      "*/dist",
    ],
  },
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",
    },

    rules: {
      "no-use-before-define": "off",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "next",
        },
      ],

      "no-unused-vars": [
        "off",
        {
          argsIgnorePattern: "next",
        },
      ],

      "prefer-const": "error",
      "no-const-assign": "error",
      "no-console": "error",
      "no-alert": "error",
      "no-multi-spaces": "error",
      "@typescript-eslint/no-var-requires": "off",
      eqeqeq: "error",

      quotes: "off",
    },
  },
];

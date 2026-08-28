import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Artefatos e o próprio config não entram no lint.
  { ignores: ["dist", "node_modules", "vite.config.ts"] },

  // Aplicação React + TypeScript (browser).
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Fast Refresh só se aplica a componentes .tsx — arquivos de dados/hooks
      // .ts exportam outras coisas de propósito, então a regra fica só em tsx.
      "react-refresh/only-export-components": "off",
    },
  },
  // A regra de Fast Refresh vale apenas para os componentes .tsx.
  {
    files: ["src/**/*.tsx"],
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Funções serverless da Vercel e scripts Node (ambiente Node, não browser).
  {
    files: ["api/**/*.ts", "*.js", "*.mjs", ".github/**/*.js"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: globals.node,
    },
  },
);

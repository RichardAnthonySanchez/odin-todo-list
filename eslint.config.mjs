import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";


export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals
        ...globals.node, // Node.js globals
      },
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];

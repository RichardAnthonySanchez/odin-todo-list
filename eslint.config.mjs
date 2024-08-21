import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals
        ...globals.node     // Node.js globals
      }
    }
  },
  pluginJs.configs.recommended,
];
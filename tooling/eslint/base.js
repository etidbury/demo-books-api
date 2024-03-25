/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  env: {
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  rules: {
    // "max-len": ["error", { code: 200 }],
    "turbo/no-undeclared-env-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { prefer: "type-imports", fixStyle: "separate-type-imports" },
    ],
    "@typescript-eslint/no-misused-promises": [
      2,
      { checksVoidReturn: { attributes: false } },
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    // "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-imports": "error",
    "no-console": "error",
    //"@typescript-eslint/member-ordering": "error",
  },
  ignorePatterns: [
    "**/.eslintrc.cjs",
    "**/postcss.js",
    "**/*.config.js",
    "**/*.config.cjs",
    ".next",
    "dist",
    "pnpm-lock.yaml",
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;

// /** @type {import("eslint").Linter.Config} */
// const config = {
//   extends: [
//     "turbo",
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended-type-checked",
//     "plugin:@typescript-eslint/stylistic-type-checked",
//     "prettier",
//   ],
//   env: {
//     es2022: true,
//     node: true,
//   },
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     project: true,
//   },
//   plugins: [
//     "@typescript-eslint",
//     "import",
//     "unused-imports",
//     "consistent-default-export-name",
//   ],
//   rules: {
//     "turbo/no-undeclared-env-vars": "off",
//     "@typescript-eslint/no-unused-vars": [
//       "error",
//       { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
//     ],
//     "@typescript-eslint/consistent-type-imports": [
//       "error",
//       { prefer: "type-imports", fixStyle: "separate-type-imports" },
//     ],
//     "@typescript-eslint/no-misused-promises": [
//       2,
//       { checksVoidReturn: { attributes: false } },
//     ],
//     //"import/consistent-type-specifier-style": ["error", "prefer-top-level"],//todo: readd!
//     "import/consistent-type-specifier-style": ["off"],
//     /***custom */
//     "@typescript-eslint/prefer-nullish-coalescing": "off", //custom
//     "@typescript-eslint/no-unsafe-assignment": ["off"], //todo: check
//     "@typescript-eslint/no-unsafe-call": ["off"], //todo: check
//     // "@typescript-eslint/no-unused-vars": ["warn"],
//     "@typescript-eslint/no-empty-function": ["warn"],
//     //"react/no-unescaped-entities": ["warn"],
//     "no-warning-comments": ["error", { terms: ["fixme"] }],
//     "@typescript-eslint/unbound-method": ["off"],
//     "@typescript-eslint/no-unsafe-member-access": ["off"], //todo: check
//     "@typescript-eslint/no-explicit-any": ["off"], //todo: check
//     "@typescript-eslint/ban-ts-comment": ["warn"],
//     "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
//     "@typescript-eslint/no-non-null-asserted-optional-chain": ["warn"],
//     "@typescript-eslint/require-await": ["off"],//can toggle
//     "unused-imports/no-unused-imports": ["error"],
//     "@typescript-eslint/no-floating-promises": ["warn"],
//     "@typescript-eslint/restrict-template-expressions": ["off"],
//     "@typescript-eslint/no-unsafe-return": ["off"], //todo: check
//     "consistent-default-export-name/default-import-match-filename": "error",
//     "@typescript-eslint/no-unsafe-argument": ["off"],
//     "@typescript-eslint/no-unsafe-enum-comparison": ["warn"],
//     "no-constant-condition": ["warn"],
//     "@typescript-eslint/consistent-indexed-object-style": ["warn"],
//     "@typescript-eslint/no-redundant-type-constituents":["warn"],
//     "@typescript-eslint/array-type":["warn"]
//   },
//   ignorePatterns: [
//     "**/.eslintrc.cjs",
//     "**/*.config.js",
//     "**/*.config.cjs",
//     ".next",
//     "dist",
//     "pnpm-lock.yaml",
//   ],
//   reportUnusedDisableDirectives: true,
// };

// module.exports = config;

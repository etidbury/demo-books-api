/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    //"plugin:jsx-a11y/recommended",
  ],
  rules: {
    "react/prop-types": "off",
    "react/no-unescaped-entities": ["warn"],
  },
  globals: {
    React: "writable",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
  },
};

module.exports = config;

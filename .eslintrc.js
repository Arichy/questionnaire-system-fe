module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
    semi: ["error", "always"],
    "prettier/prettier": "error",
  },
  plugins: ["prettier"],

  // parserOptions: {
  //   ecmaFeatures: {
  //     legacyDecorators: true,
  //   },
  // },
};

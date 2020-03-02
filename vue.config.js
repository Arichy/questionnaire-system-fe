const webpack = require("webpack");

const myPlugin = ctx => {
  console.log("my plugin");
  return ctx;
};

module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      myPlugin,
    ],
  },
  chainWebpack(config) {
    config.plugin("html").tap(args => {
      args[0].title = "调查问卷系统";

      return args;
    });
  },
};

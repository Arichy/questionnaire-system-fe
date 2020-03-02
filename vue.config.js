const webpack = require("webpack");

const isProduction = process.env.NODE_ENV.toLowerCase() === "production";

module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },

  configureWebpack: config => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    );

    if (isProduction) {
      config.externals = {
        echarts: "echarts",
        vue: "Vue",
      };
    }
  },
  chainWebpack(config) {
    config.plugin("html").tap(args => {
      args[0].title = "调查问卷系统";

      return args;
    });
  },
};

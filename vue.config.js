module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  chainWebpack(config) {
    config.plugin("html").tap(args => {
      args[0].title = "调查问卷系统";

      return args;
    });
  },
};

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  chainWebpack: config => {
    config.resolve.symlinks(false);

    config.devtool("inline-source-map");

    config.module
      .rule("lua")
      .test(/\.lua$/)
      .use("babel")
      .loader("babel-loader")
      .options({
        presets: ["@babel/preset-env"]
      })
      .end()
      .use("lua")
      .loader("jlua/lib/js/loader")
      .end();

    config.plugin("monaco").use(MonacoWebpackPlugin);
  }
};

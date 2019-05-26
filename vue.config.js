const path = require("path");

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

    config.plugin("html").tap(args => {
      args[0].template = path.resolve(__dirname, "index.html");
      return args;
    });

    config.externals([
      {
        "monaco-editor": "monaco"
      }
    ]);
  }
};

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) =>
    config.plugin("html").tap((args) => {
      args[0].title = "TG:Online Statuspage v3";
      return args;
    }),
});

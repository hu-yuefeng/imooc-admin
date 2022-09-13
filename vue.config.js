const { defineConfig } = require("@vue/cli-service");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  // webpack devServer提供了代理的功能
  devServer: {
    proxy: {
      // 当地址中包含API时触发此代理
      "/api": {
        target: "https://api.imooc-admin.lgdsunday.club/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  transpileDependencies: true,
  // lintOnSave: false,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule("svg")
      // 忽略
      .exclude.add(resolve("src/icons"))
      // 结束
      .end();
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule("icons")
      // 正则，解析 .svg 格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve("src/icons"))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use("svg-sprite-loader")
      // 具体的loader
      .loader("svg-sprite-loader")
      // loader 的配置
      .options({
        symbolId: "icon-[name]",
      })
      // 结束
      .end();
    // 创建一个新的规则，用于处理 element-plus 2 的错误
    config.module
      .rule("element-plus-2")
      .test(/\.mjs$/)
      // https://webpack.docschina.org/configuration/module/#ruletype
      .type("javascript/auto")
      .include.add(/node_modules/)
      .end();
  },
});

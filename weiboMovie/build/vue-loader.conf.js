const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  /**
   * TODO Vue 2.4 发布之后可以打开这个开关。
   * 和 webpack 3 的 Scope Hoisting 结合能减少包的大小
   */
  esModule: false
};

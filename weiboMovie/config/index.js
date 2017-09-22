// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const PROJECT_NAME = require('../package.json').name;

const version = require('../package.json').version;

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../../../release_h5/'+PROJECT_NAME+version.split(".")[2]+'/index.html'),
    assetsRoot: path.resolve(__dirname, '../../../release_h5/'),
    assetsSubDirectory: PROJECT_NAME+version.split(".")[2],
    assetsPublicPath: process.env.assetsPublicPath || '/',
    productionSourceMap: +process.env.productionSourceMap === 1,
    md5: +process.env.md5 === 1,
    minify: +process.env.minify === 1,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8081,
    autoOpenBrowser: true,
    assetsSubDirectory: '',//项目url路径
    assetsPublicPath: '/',//域名的根目录
    proxyTable: {
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};

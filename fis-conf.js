console.log('构建指令指南:');

console.log('   1.fis3 server               开启服务');

console.log('   2.fis3 release -wc     发布测试');

console.log('   3.fis3 release build -d ../release_h5     生产完全编译代码');


var fs=require("fs");
var path=require("path");
var glob=require("glob")

var doman="https://conchfairy.sinajs.cn";


fis.match('*.{less,sass}', {
  parser: fis.plugin('less'),   // fis-parser-less 插件进行解析
  rExt: '.css',  // .less 文件后缀构建后被改成 .css 文件
  isCssLike: true
});
fis.media('build').match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js'),
  domain: doman
});

fis.media('build').match('*.css', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css'),
  domain: doman
});

fis.media('build').match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor'),
  domain: doman
});
fis.media('build').match('*', {
  release:false
});
fis.media('build').match('/marvel/**', {
  release:true
});
fis.media('build').match('/static/**', {
  release:true
});

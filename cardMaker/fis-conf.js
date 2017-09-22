console.log('构建指令指南:');

console.log('   1.fis3 server               开启服务');

console.log('   2.fis3 release -wc     发布测试');

console.log('   3.fis3 release build -d ../../release_h5     生产完全编译代码');


var fs=require("fs");
var path=require("path");
var glob=require("glob")
var htmlToJs=function (html,cardName) {

  //获取样式href
  var linkArr=[]
  html=html.replace(/<link[^>]+?href *= *"([\d\D]+?)"[\d\D]*?>/ig,function (m,p1) {
    if(linkArr.indexOf(p1)==-1){
      linkArr.push(p1);
    }
    return "";
  });

  var srcArr=[]
  html=html.replace(/<script[^>]+?src *= *"([\d\D]+?)"[^>]*> *?<\/script>/ig,function (m,p1) {
    if(srcArr.indexOf(p1)==-1){
      srcArr.push(p1);
    }
    return "";
  });

  // console.log(html)
  //获取样式style
  var styleArr=[]
  html=html.replace(/<style[^>]*>([\d\D]+?)<\/style>/ig,function (m,p1) {
    if(/\{/.test(m)){
      if(styleArr.indexOf(p1)==-1){
        styleArr.push(p1);
      }
    }
    return "";
  });


  //获取脚本script
  var scriptArr=[]
  html=html.replace(/<script[^>]*>([\d\D]+?)<\/script>/ig,function (m,p1) {
    if(scriptArr.indexOf(p1)==-1){
      scriptArr.push(p1);
    }
    return "";
  });

  //css
  var styleStr=styleArr.join("\n").replace(/[\S][\w\.\- ]+{[\d\D]+?}/g,function (m2) {
    return ".__cardName "+m2
  }).replace(/\.__cardName \.__cardName/g,".__cardName")
  styleStr=styleStr.replace(/__cardName/g,cardName)

  //js
  var scriptStr=scriptArr.join("\n").replace(/([\n|;][^+]+['"])([#.])/g,"$1#__cardId $2")
  scriptStr=scriptStr.replace(/(\$|querySelector)\((['"])([a-zA-z][. ]*?)\2\)/g,"$1($2#__cardId $3$2)")
  //过滤掉非div
  html=html.replace(/<meta [^>]+>/gi,'')
  //html
  // html='<div class="'+cardName+'" id="__cardId">\n'+html+'\n</div>';//组件隔离后div结构
  var cardData={};
  var index=0;
  scriptStr=scriptStr.replace(/[\{\}\[\]]/g,function (m) {
    if(m=="{"||m=="["){
      index++
      m="<"+index+">"+m
    }else if(m=="}"||m=="]"){
      m=m+"<"+index+">"
      index--
    }
    return m;
  })
  scriptStr=scriptStr.replace(/var +(.+?) *= *(<(\d+)>[\d\D]+?<\3>)/,function (m,p1,p2) {
    try{
      cardData=(new Function("return "+p2.replace(/<\d+>/g,"")))()
      return m.replace(p2,"__cardData");
    }catch(e){
      cardData={}
      return m
    }
  })
  scriptStr=scriptStr.replace(/<\d+>/g,"")

  return 'define("'+cardName+'",'+JSON.stringify({
    linkArr:linkArr,
    srcArr:srcArr,
    styleStr:styleStr,
    scriptStr:scriptStr,
    cardData:cardData,
    html:html.replace(/\n+/g,"\n"),
  })+");"
};

var doman="https://conchfairy.sinajs.cn";
var cardMakerVersion="cardMaker"

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
//运营页面配置
fis.match('**', {
  release:cardMakerVersion+"/$0"
});
fis.match('cardsPro/*', {
  release:false
});
glob.sync("cards/*.html").forEach(function (file) {
  var dirname=path.dirname(file)
  var base=path.basename(file,".html")
  var ndirname=path.join(dirname,"../cardsPro/")
  if(!fs.existsSync(ndirname)){
    fs.mkdirSync(ndirname)
  }
  var nfile=path.join(ndirname,base+".js")
  fs.writeFileSync(nfile,htmlToJs(fs.readFileSync(file).toString(),base))
})
var argv = require('minimist')(process.argv.slice(2));
var releaseDir=fis.project.getTempPath()+"/www"
if(argv["d"]){
  releaseDir=argv["d"]
}
console.log(releaseDir)

// fis.media('build').match('**', {
//   release:cardMakerVersion+"/$0"
// });
// fis.media('build').match('cardsPro/*', {
//   release:false
// });
//发布结束
fis.on('release:end',function (ret) {
  setTimeout(function () {
    var ndirname=path.join(releaseDir,cardMakerVersion+"/cardsPro")
    if(!fs.existsSync(ndirname)){
      fs.mkdirSync(ndirname)
    }
    //对cards转化
    glob.sync(path.join(releaseDir,cardMakerVersion+"/cards/*.html")).forEach(function (file) {
      var base=path.basename(file,".html");
      var dirname=path.dirname(file);
      var nfile=path.join(ndirname,base+".js");
      fs.writeFileSync(nfile,htmlToJs(fs.readFileSync(file).toString(),base))
      // fs.renameSync(file,nfile)
    })
    // fs.renameSync(path.join(releaseDir,cardMakerVersion+"/cards"),path.join(releaseDir,cardMakerVersion+"/cardsPro"))
  },4000)

})

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
const fs=require('fs')
const child=require('child_process')
const exec = child.execSync;
const request = require('request');
process.chdir(__dirname+'/../');
const dir=process.cwd()
exec("git pull")
const package=fs.readFileSync("package.json").toString()
const packageJSON=JSON.parse(package)
const arr=packageJSON.version.split(".")
arr[1]=arr[2]
packageJSON.version=arr.join(".");
process.chdir('../../release_h5');
exec("git pull")
if(fs.existsSync(packageJSON.name+arr[2])){
  exec("publishs3 upload -msg '上线版本："+packageJSON.version+"' "+packageJSON.name+arr[1]+"")


  setTimeout(function () {
    request("http://ting.weibo.com/test/testzc/homepagev?v="+arr[2],function (error, response, body) {
      if(!error&&body=="true"){
        process.chdir(dir);
        packageJSON.description="上线记录："+packageJSON.version+","+new Date().Format("yyyy-MM-dd hh:mm:ss")
        fs.writeFileSync("package.json",JSON.stringify(packageJSON,null,2));
        exec("git add package.json");
        exec("git commit -m '上线版本："+packageJSON.version+"' ");
        exec("git push")
      }
    })


  },10000)
}else{
  console.log("文件夹不存在，上线失败")
}


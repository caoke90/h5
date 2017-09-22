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

/*init*/
//进入电影项目
// process.chdir('h5/weiboMovie');
process.chdir(__dirname+'/../');
const dir=process.cwd()

//读取版本号
const package=fs.readFileSync("package.json").toString()
const packageJSON=JSON.parse(package)
const arr=packageJSON.version.split(".")
arr[2]=parseInt(arr[1])+1;
//更新版本号

packageJSON.version=arr.join(".");
packageJSON.description="打包记录："+packageJSON.version+","+new Date().Format("yyyy-MM-dd hh:mm:ss")
fs.writeFileSync("package.json",JSON.stringify(packageJSON,null,2))

process.chdir('../../release_h5');
exec("git reset --hard")
exec("git clean -df")
exec("git pull")
process.chdir(dir);
//执行打包命令
console.log("正在打包……")
var d=exec("npm run build")

console.log(d.toString())


process.chdir('../../release_h5');

var tempArr=fs.readdirSync("./")
var delArr=[]
tempArr.forEach(function (item) {
    if(item.indexOf(packageJSON.name)==0){
      if(item!=packageJSON.name+arr[1]&&item!=packageJSON.name+arr[2]){
        delArr.push(item)
      }
    }
})
delArr.forEach(function (path) {
  exec("rm -rf "+path)
})
exec("git add .")
try {
  exec("git commit -m '"+packageJSON.description+"'")
  exec("git push")
}catch (e){
  console.log("打包没有更新")
}


console.log("完成"+packageJSON.version)

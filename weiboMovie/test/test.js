var fs=require("fs")
var glob=require("glob")
var arr=glob.sync("*/**",{nodir:true})
arr.forEach(function (file) {
  try{
    var str=fs.readFileSync(file).toString()

    fs.writeFileSync(file,JSON.stringify(JSON.parse(str),null,2))
  }catch (e){

  }
})


+function (w) {
  //获取自身路径
  var js=document.scripts;
  js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1);
  var doman=js.replace(/^(.+?[^\/])\/[^\/].+$/g,"$1")

  var cc={
    cards:{},
    cardArr:[],
    cardDir:function (url) {
      if(/^\//.test(url)){
        return doman+url;
      }else if(/\/\//.test(url)){
        return url;
      }else{
        return (js+"cardsPro/"+url).replace(/[^\/]+\/\.\.\//g,"")
      }
    }
  }
  //资源加载器
  cc.loadRes=function(func){
    var funcObj={}
    var res={}
    var queue=[]
    var index=0;
    var state=0;
    return function(url,callback){
      if(res[url]){
        callback(res[url])
        return;
      }
      //整理需要下载的资源
      if(queue.indexOf(url)==-1){
        queue.push(url);
        funcObj[url]=[];
      }
      funcObj[url].push(callback)
      if(state==0){
        function sync(){
          if(index<queue.length){
            var url=queue[index++];
            state=1;
            func(url,function(data){
              sync()
              res[url]=data||"loaded";
              while(funcObj[url].length>0){
                funcObj[url].shift()(res[url],url)
              }
            })
          }else{
            state=0;
          }
        }
        sync()
      }
    }
  }
  /*
   * 加载js*/
  cc.loadJsFile=cc.loadRes(function (src,callback) {
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
        script.onload = script.onreadystatechange = null;
        callback();
      } };
    script.src= src;
    head.appendChild(script);
  })
  /*
  * 加载css*/
  cc.loadCssFile=cc.loadRes(function (src,callback) {
    var style = document.createElement('link');
    style.href =src;
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.onload = style.onreadystatechange = function() {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
        style.onload = style.onreadystatechange = null;
        callback();
      } };
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
  });

  /*
  * 加载css*/
  cc.loadStyle=function (src) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML=src;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
  }
  function define(name,data) {
    if(arguments.length==2){
      cc.cards[name]=data;
    }
    if(arguments.length==1){
      return cc.cards[name];
    }
  }
  function renderOne(item,k,callback){
    var cardName=item.cardName;

    var html="";
    var index=0;
    if(!cc.cards[cardName]){
      cc.loadJsFile(cc.cardDir(cardName)+".js",function () {

        var styleStr=cc.cards[cardName].styleStr;
        if(styleStr){
          cc.loadStyle(styleStr)
        }
        next2()
      })
    }else{
      next2()
    }

    function next2() {
      var card=cc.cards[cardName]
      html=card.html.replace(/__cardId/g,item.cardId);
      index+=card.linkArr.length;
      index+=card.srcArr.length;
      if(index==0){
        next3()
      }else{
//加载css
        card.linkArr.forEach(function (url) {
          cc.loadCssFile(cc.cardDir(url), function (data, url) {
            index--
            if (index == 0) {
              next3()
            }
          })
        })
        //卡片js资源
        card.srcArr.forEach(function (url) {
          cc.loadJsFile(cc.cardDir(url), function (data, url) {
            index--
            if (index == 0) {
              next3()
            }
          })
        })
      }
    }
    function next3(){
      var div =document.createElement("div");
      div.id=item.cardId;
      div.className=cardName;
      div.innerHTML=html;
      if(item.cssText){
        div.style.cssText=item.cssText
      }

      callback&&callback({
        div:div,
        k:k
      })

    }
  }

  function render(data,dom,callback){
    var index=0;
    var domArr=[]
    data.forEach(function (item,k) {
      index++
      renderOne(item,k,function (obj) {
        index--
        domArr[obj.k]=obj
        if(index==0){
          next()
        }
      })
    })
    function next() {

      domArr.forEach(function (obj) {
        dom.appendChild(obj.div);
      })
      data.forEach(function (item) {
        var card=cc.cards[item.cardName]
        var scriptStr=card.scriptStr.replace(/__cardId/g,item.cardId)
        var func=new Function("__cardData",scriptStr)
        func(item.cardData||card.cardData)
      })
      callback&&callback()
    }
  }

  w.define=define
  w.render=render

}(window)

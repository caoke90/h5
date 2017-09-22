<template>
  <img :src="lazysrc" />
</template>
<script>
  import Bus from '../bus';
  var config={
    loaded:false
  };


  var list=[]
  var running=false;
  var lazyFuc=function (e) {
    if(!config.loaded){return;}
    var windowHeight=document.documentElement.clientHeight || window.innerHeight;
    var windowWidth=document.documentElement.clientWidth || window.innerWidth;
    if(running){
      return;
    }
    running=true;
    var temp=[]
    for(var i=0;i<list.length;i++){
      var obj=list[i].$el.getBoundingClientRect()
      if((obj.top + 10 < windowHeight) && (obj.right-100 < windowWidth)){
        list[i].isShow=true
      }
      if(!list[i].isShow){
        temp.push(list[i])
      }
    }
    list=temp;
    running=false;
  }
  window.addEventListener('scroll', lazyFuc);
  window.addEventListener('touchend', lazyFuc);
  //首屏加载图片优化
  window.onload = function () {
    config.loaded=true;
    Bus.loaded=true;
    lazyFuc();
  };
  export default{
    name: 'img',
    data:function () {
      return {
        isShow:false,
        config:config
      }
    },
    mounted:function(){
      if(this.needlazy&&!this.isShow){
        list.push(this);
      }
    },
    computed:{
      lazysrc() {
        if(!this.needlazy||this.isShow){
          this.isShow=true;
          return this.src;
        }else{
          return "https://conchfairy.sinajs.cn/static/none.png";
        }
      }
    },

    props: {
      needlazy: {
        type: Boolean,
        default: false,
      },
      src: {
        type: String,
        default: '',
      },
    }
  };
</script>

<template>
  <article @click="jump_url" class="m-auto-list">
    <div class="top-article">
      <div class="m-img-box">
        <div class="ar-img-box">
          <div class="article-top">
            <mv-img :needlazy="true" :src="item.object.author.avatar_large"></mv-img>
            <div class="top1">{{item.object.author.display_name}}</div>
            <div class="top2">
              <img :src="img"/>
              <div>️文章</div>
            </div>
          </div>
          <mv-img :needlazy="true" class="imgcon" :src="item.object.image.url"></mv-img>
          <div class="article-bottom">
            <div class="article-des m-box-dir m-box-center">
              <h3 class="m-text-cut-2" v-html="item.object.summary"></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<style scoped lang="scss">
  .m-auto-list {
    position: relative;
    top: 0px;
    left: 0px;
    .article-top {
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.30) 1%, rgba(0,0,0,0) 97%);
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      padding: 7px 10px;

      display: -webkit-box;
      display: -webkit-flex;
      display: flex;

      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      justify-content: flex-start;

      -webkit-box-align: center;
      vertical-align: middle;
      -webkit-align-items: center;
      align-items: center;


      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
      }
      .top1 {
        flex: 1;-webkit-flex: 1;
        -webkit-box-flex: 1;

        margin-left: 5px;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.50);
        color: rgba(255, 255, 255, 0.90);
        font-size: 12px;
      }
      .top2 {
        margin-left: 5px;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.50);
        color: rgba(255, 255, 255, 0.90);
        font-size: 12px;
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

        -webkit-box-pack: center;
        -webkit-justify-content: center;
        justify-content: center;

        -webkit-box-align: center;
        vertical-align: middle;
        -webkit-align-items: center;
        align-items: center;
        img{
          width: 12px;
          -webkit-transform: scale(0.8);
          transform: scale(0.8);
          display: block;
        }
      }
    }
    .article-bottom {
      background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.50) 98%);
      position: absolute;
      padding-top: 22px;
      bottom: 0px;
      left: 0px;
      font-size: 16px;
      color: #FFFFFF;
      letter-spacing: -0.05px;
      line-height: 20px;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.75);
    }
  }
</style>
<script>
  import imgs from "@/assets/img/icon_article.png"
  export default {
    props: ['item', 'hidImg'],
    data() {
      return {
        img:imgs
      };
    },
    computed: {
      type_icon: function() {
        // 根据item.type值判断显示图标
        if(this.item.type === 'article') {
          return 'a-art';
        }
        if(this.item.type === 'wenda') {
          return 'a-ask';
        }
        return null;
      },
    },
    methods: {
      jump_url() {
        if(this.item && this.item.url) {
          window.location.href = this.item.url;
        }
      },
    }
  };
</script>


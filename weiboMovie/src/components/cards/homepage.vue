<template>
    <component :is="'homepage_' + page_type" :item="item" :showTriangle="showTriangle"></component>
</template>
<script>
  /**
   * HTML5 微博支持的小 Page 类型
   * @type {[]}
   */
  export default {
    props: ['item', 'showTriangle'],
    components: {
      "homepage_banner":require("./banner.vue"),
      "homepage_hot":require("./hot2.vue"),
      "homepage_video":require("./video.vue"),
      "homepage_weibo":require("../common/weibo.vue"),
      "homepage_bar":require('./TitleBar.vue')
    },
    created() {
    },
    computed: {
      page_type: function () {
        let type = 'weibo';
        if (this.item && this.item.card_type) {
          switch (this.item.card_type) {
            case 'homepage_banner':
              type = 'banner';
              break;
            case 'homepage_hot':
              type = 'hot';
              break;
            case 'homepage_video':
              type = 'video';
              break;
            case 'homepage_weibo':
              type = 'weibo';
              break;
            case 'homepage_title':
              type = 'bar';
              break;
            default:
              type = 'weibo';
              break;
          }
        }
        return type;
      }
    }
  };
</script>

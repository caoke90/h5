<template>
  <div class="weibo-media-wraps">
    <component :is="'page-' + page_type" :item="item" :hidImg="hidImg"></component>
  </div>
</template>
<script>
  /**
   * HTML5 微博支持的小 Page 类型
   * @type {[]}
   */
  const HTML5_SUPPORT_SMALLPAGES = [
    'article', 'video'
  ];
  const pages = {};
  HTML5_SUPPORT_SMALLPAGES.forEach(function (type) {
    const key = `page-${type}`;
    pages[key] = require(`./${key}`);
  });
  export default {
    props: ['item', 'hidImg'],
    components: pages,
    created() {
    },
    computed: {
      page_type: function () {
        let type = 'article';

        if (this.item && this.item.type) {
          switch (this.item.type) {
            case 'article':
            case 'wenda':
            case 'fangle':
              type = 'article';
              break;
            case 'video':
              type = 'video';
              break;
          }
        }
        return type;
      },
    },
  };
</script>

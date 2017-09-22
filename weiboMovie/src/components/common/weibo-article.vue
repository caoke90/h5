<template>
  <article class="weibo-main">
    <div class="weibo-og">
      <div class="weibo-text" @click="getBlogLink($event, item)" v-html="item.card_info.html"></div>
      <weibo-media :item="item"></weibo-media>
    </div>


    <!--<div class="weibo-rp" v-if="item.retweeted_status" @click="getBlogLink($event, item.retweeted_status)">
      <div class="weibo-text">
        <span v-if="!item.retweeted_status.deleted && item.retweeted_status.user">
          <a :href="item.retweeted_status.user.profile_url">
            @{{item.retweeted_status.user.screen_name}}</a>:
        </span>
        <span v-html="item.retweeted_status.text"></span>
      </div>
      <weibo-media :item="item.retweeted_status"></weibo-media>
    </div>-->


  </article>
</template>
<style lang="scss">
  @import "../../scss/_sassCore";
  @import "../../scss/_var";
  .card9 .weibo-main .weibo-og{
  	  padding: P2R(12px)  P2R(13px);
  }
</style>
<script>
//  import { mapActions, mapGetters } from 'vuex';
//  import ua from '../../utils/ua';
  export default{
    props: ['item'],
    components: {
      weiboMedia: require('./weibo-media.vue')
    },
//    computed: mapGetters([
//      'curWeiboData',
//    ]),
    methods: {
//      ...mapActions([
//        'setCurWeiboData',
//      ]),
      getBlogLink(e, item) {
	        const schemeClient = 'sinaweibo://detail?mblogid=' + item.strid;
	        window.location.href = schemeClient;

      }
    }
  };
</script>

<!--微博内视频-->
<template>
    <div class="f-video m-auto-list m-auto-box1">
      <div class="m-img-box m-imghold-16-9" v-on:click.stop.prevent="showVideo">
        <div class="m-btn-round m-btn-mblack m-btn-media">
          <i class="m-font m-font-play"></i>
        </div>
        <div v-if="!hidImg" class="f-bg-img" :style="'background-image: url('+item.page_pic.url+')'"></div>
        <div v-else class="f-bg-img"></div>
        <!--<img :src="item.pic_info.pic_small.url">-->
      </div>
    </div>
</template>
<style rel="stylesheet/scss" type="text/css" lang="scss" scoped>
  .m-auto-list .m-auto-box1 {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0rem 0rem 0;
  }
  .m-imghold-16-9 {
    padding-bottom: 56.25%;
    border: 1px solid rgba(0,0,0,.05);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .f-bg-img{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .m-btn-round {
    position: absolute;
    z-index: 9;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-size: 4.2rem;
  }
</style>
<script>
  import Bus from '../../marvel/bus';
  export default{
    mixins: [require('../../mixin/actionLogMixin')],
    data() {
      return {};
    },
    props: ['item', 'hidImg'],
    methods: {
      showVideo: function () {
        const ua = navigator.userAgent.toLowerCase();
        if ((/micromessenger/.test(ua)) && (ua.indexOf('android') > -1)) {
          this.addLog('act_code=1776');
        }
        if (this.item.media_info.goto || !this.item.media_info.stream_url) {
          window.location.href = this.item.media_info.stream_url || this.item.page_url;
        } else {
          Bus.$emit('playVideo', {
            src: this.item.media_info.stream_url,
            poster: this.item.page_pic.url
          });
        }
      }
    }
  };
</script>

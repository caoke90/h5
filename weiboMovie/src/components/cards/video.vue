<template>
  <div>
    <div class="card m-panel card10">
      <div class="card-wrap">
        <div class="card-main">
          <article v-if="item.card_info.big_card.object">
            <section class="media-box">
              <div class="m-img-box m-imghold-wide clf2" @click.stop="gotoUrl($event,item.card_info.big_card.player_url)">
                <mv-img v-if="item.card_info.big_card.object.image.url" :needlazy="item.curIndex>3" :src="item.card_info.big_card.object.image.url"></mv-img>
                <div class="m-btn-round m-btn-media">
                  <img src="../../assets/img/common_icon_play.png"/>
                </div>
                <div class="media-msg">
                  <div class="left">{{item.card_info.big_card.play_count}}</div>
                  <div class="right">{{item.card_info.big_card.object.stream.duration | capitalize}}</div>
                </div>
              </div>
            </section>
            <section class="text" v-html="item.card_info.html" @click.stop="getBlogLink($event, item)">

            </section>
          </article>
        </div>
        <video-share :item="item"></video-share>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '../../marvel/bus';

  export default {
    props: ["item"],

    data() {
      return {};
    },
    components: {
      'video-share': require('./video-share.vue')
    },
    filters: {
      capitalize: function (value) {
        if(value=="..."){return value;}
        let minute = parseInt(value / 60);
        let second = parseInt(value % 60);
        second = second <= 9 ? "0" + second : second;
        return minute + ":" + second
      }
    },
    methods: {
      gotoUrl(e,url) {
        if(e.target.nodeName!=="A"){
        	  console.log(url)
          window.location.href=url;
        }
      },
      getBlogLink(e, item) {
        const schemeClient = 'sinaweibo://detail?mblogid=' + item.strid;
        window.location.href = schemeClient;

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/sassCore";
  @import "../../scss/var";
  .m-btn-round.m-btn-media{
  	  width: P2R(64px);
  	  height: P2R(64px);box-shadow:none;
  }
  .card .card-wrap{
  	  margin-left: P2R(13px);
    margin-right: P2R(13px);
    height: 100%;
  }
  .card10 {
    .card-wrap {
      .card-main {
        margin: 0;
      }
    }
    a {
      color: $cl-l;
    }
    article {
      font-size: $f16;
      line-height: 1.5;
      @include col(0, 0, P2R(7px), 0);
      section {
      	  padding: 0px;
        margin: P2R(12px) 0px P2R(1px);
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        &.text{
        	  margin: 0px;
        }
      }
    }
    .media-box {
      .clf2 {
        background-color: #F2F2F2;
      }
      .#{$button}-media {
        position: absolute;
        z-index: 9;
        font-size: (42/10)*1rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .media-msg {
        z-index: 100;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        left: P2R(0px);
        bottom: P2R(0px);
        color: #FFF;


        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

        padding: P2R(10px) P2R(13px);
        font-size: $f13;


        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;

        background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.50) 100%);
      }
    }
  }

  div.wb-item-wrap:nth-of-type(6) .card10 {
    margin-bottom: 0px;
  }
  .m-btn-round .m-font{
  	   -webkit-transform: translate(-50%, -50%);
  }
</style>

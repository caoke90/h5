<template>
  <div>
    <div class="card m-panel card10">
      <div class="card-wrap">
        <div class="card-main">
          <article>
            	<!--<section v-html="item.card_info.html">

              </section>-->
            <section class="media-box">
              <div class="m-img-box m-imghold-wide clf2" @click.stop.prevent="gotoUrl(item.card_info.big_card.player_url)">
                <mv-img :needlazy="true" :src="item.card_info.big_card.object.image.url"></mv-img>
                <div class="m-btn-round m-btn-media">
                  <img src="../../assets/img/common_icon_play.png"/>
                </div>
                <div class="media-msg">
                  <div class="left" v-if="item.card_info.big_card.play_count">{{item.card_info.big_card.play_count}}</div>
                  <div class="right" v-if="item.card_info.big_card.object.stream.duration">{{item.card_info.big_card.object.stream.duration | capitalize}}</div>
                </div>
              </div>
            </section>
          </article>
        </div>
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

    },
    filters: {
      capitalize: function (value) {
        let minute = parseInt(value / 60);
        let second = parseInt(value % 60);
        second = second <= 9 ? "0" + second : second;
        return minute + ":" + second
      }
    },
    methods: {
      gotoUrl: function (url) {
        console.log(url)
        window.location.href=url;
//        const ua = navigator.userAgent.toLowerCase();
//        if ((/micromessenger/.test(ua)) && (ua.indexOf('android') > -1)) {
//          this.addLog('act_code=1776');
//        } else {
//          Bus.$emit("playVideo",{
//            src: this.item.media_info,
//            poster: this.item.page_pic
//          });
//        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../scss/sassCore";
  @import "../../scss/var";
   .m-btn-round.m-btn-media{
  	  width: P2R(64px);
  	  height: P2R(64px);
  	  box-shadow:none;
  }
  section{
  	  a{
  	  	  border:1px solid red;
  	  }
  }
  .card-wrap{
  	   margin: 0px;
  }
  .card9 .card.m-panel{
  	   background: white;
  	   border: 0px solid white;
  }
  .card9 .card .m-img-box{
  	  width: 100%;
  	  height: auto;
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
        margin-top: P2R(12px);
        margin-bottom: 0;
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
        -webkit-transform: translate(-50%,-50%);
        .m-font{
        	 -webkit-transform: translate(-50%,-50%);
        }
      }
      .media-msg {
        z-index: 100;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        left: P2R(0px);
        bottom: P2R(0px);
        color: #FFF;

        padding: P2R(10px) P2R(13px);
        font-size: $f13;

        display: -webkit-box;
        display: -webkit-flex;
        display: flex;

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
</style>

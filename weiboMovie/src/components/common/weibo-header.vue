<template>
  <header class="weibo-top m-box m-avatar-box">
    <a @click="jump_url" class="m-img-box">
      <mv-img :needlazy="true" :src="item.user.profile_image_url"></mv-img>
      <i class="m-icon" :class='"m-icon-"+item.user.verified_color+"v"' v-if="item.user.verified_color"></i>
    </a>
    <div class="m-box-col m-box-dir m-box-center">
      <div class="m-text-box">
        <a @click="toProfileUrl">
          <h3 class="m-text-cut">
            {{item.user.name}}
            <weibo-icon :user="item.user"></weibo-icon>
          </h3>
        </a>
        <h4 class="m-text-cut">
          <span class="time">{{item.created_at*1000 | fromNow}}</span>
          <span class="from" v-if="item.source" v-html="' 来自 ' + item.source"></span>
        </h4>
      </div>
    </div>
    <aside v-if="!item.title && showTriangle" @click="gomore()">
      <i class="m-font m-font-arrow-down"></i>
    </aside>
  </header>
</template>
<style lang="scss">
	@import "../../scss/_sassCore";
  @import "../../scss/_var";
  .weibo-top{
  	   &.m-box{
  	   display: -webkit-box;
	   display: -webkit-flex;
	   display: flex;
	  }
	  .m-box-col{
  	    -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  }
  }
  
	.card9 .weibo-top .m-img-box{
		width: P2R(40px);
    height: P2R(40px);
	}
	.card9 .weibo-top .m-text-box{
		margin-left: P2R(13px);
	}
	.card9 .weibo-top .m-text-box h3{
		font-size: 16px;
	}
	.card9 .weibo-top .m-text-box h4{
		font-size: 12px;
	}
</style>
<script>
  export default{
    props: ['item', 'showTriangle', 'gomore'],
    data() {
      return {
      };
    },
    computed: {
      profileUrl() {
        return this.item.user.profile_url.replace(/^http(|s):\/\/m.weibo.cn/, '');
      },
    },
    methods: {
      jump_url:function () {
        window.location.href ='sinaweibo://userinfo?uid='+this.item.user.id;
      },
      toProfileUrl() {
        const isScheme = this.profileUrl.indexOf('://') > -1;
        if (isScheme) {
          window.location.href = this.profileUrl;
        } else {
          this.$router.push(this.profileUrl);
        }
      },
    },
    components: {
      weiboVerified: require('./weibo-verified.vue'),
      weiboIcon: require('./weibo-icon.vue')
    }
  };
</script>

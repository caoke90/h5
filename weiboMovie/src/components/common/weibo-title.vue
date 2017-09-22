<template>
	<header class="weibo-top m-box m-avatar-box">
		<div @click="jump_url" class="m-img-box">
      <mv-img :needlazy="true" :src="item.user.avatar_large"></mv-img>
			<i class="m-icon" :class='"m-icon-"+item.user.verified_color+"v"' v-if="item.user.verified_color"></i>
		</div>
		<div class="m-box-col m-box-dir">
			<div class="m-text-box" ref="msgbox">
				<a :href="'sinaweibo://userinfo?uid='+item.user.id" class="bouser">{{item.user.name}}</a>
				<span>点评了</span>
				<a :href="'sinaweibo://pageinfo?containerid=100120'+item.film_id" class="filmName">
					<!--item.film_name-->
					{{nameSplit(item.film_name)}}
					<p class="score">
						<span>{{(item.score/2).toFixed(1)}}</span>
						<i class="m-font m-font-star"></i>
					</p>
				</a>
			</div>
		</div>
	</header>
</template>
<style lang="less" scoped="scoped">
     .m-text-box>span{
     	font-size: 0.9375rem;
        color: #151515;
     }
	.bouser {
		font-size: 0.9375rem;
		display: inline-block;
		color: #FF8200;
	}

	.filmName {
		font-size: 0.9375rem;
		display: inline-block;
	}

	.score {
		display: inline-block;
		height: 17px;
		width: 46px;
		line-height: 17px;
		font-size: 12px;
		text-align: center;
		background: #FCCE17;
		border-radius: 9px;
		color: white;
		vertical-align: text-top;
		span{
			line-height: 100%;
			vertical-align: middle;
		}
		i{
			vertical-align: top;
			padding-top: 0px;
		}
	}
</style>
<script>
	export default {
		props: ['item', 'showTriangle', 'gomore'],
		data() {
			return {
				conW:0
			};
		},
		computed: {
			profileUrl() {
				return this.item.user.profile_url.replace(/^http(|s):\/\/m.weibo.cn/, '');
			}
		},
		methods: {
      jump_url:function () {
        window.location.href ='sinaweibo://userinfo?uid='+this.item.user.id;
      },
			toProfileUrl() {
				const isScheme = this.profileUrl.indexOf('://') > -1;
				if(isScheme) {
					window.location.href = this.profileUrl;
				} else {
					this.$router.push(this.profileUrl);
				}
			},
			nameSplit(val){
			  let L=(val+"").trim().length;
			  let W=16;
			  let H=0;
			  let clientW=document.documentElement.offsetWidth;
			  if(clientW>=320&&clientW<375){
			    H=12;
        }else if(clientW>=375&&clientW<414){
          H=16;
        }else if(clientW>=414&&clientW<768){
          H=17;
        }

			  if((L*W)>this.conW){
			  	 return val.trim().substr(0,H)+"..."
			  }
			  return val.trim()
			}
		},
		components: {
			weiboVerified: require('./weibo-verified.vue'),
			weiboIcon: require('./weibo-icon.vue')},
		mounted(){
			 let conW=this.$refs.msgbox.offsetWidth;
			 this.conW=conW;
		}
	};
</script>

<template>
	<div class="video-share m-avatar-box">
		<div class="left" @click="jump_url">
			<div class="m-img-box">
				<mv-img :needlazy="item.curIndex>3" :src="item.user.profile_image_url"></mv-img>
				<i class="m-icon" :class="'m-icon-'+item.user.verified_color+'v'"></i>
			</div>
			<span>{{item.user.name}}</span>
		</div>
		<div class="right">
			<div class="list hvhd" @click.stop.prevent="comment">
				<i class="m-icon m-font m-font-comment"></i>
				<span class="msg-num" v-if="item.comments_count">{{item.comments_count}}</span>
			</div>
			<div class="list hvhd" @click.stop.prevent="repost($event, item)">
				<i class="m-icon m-icon-share"></i>
			</div>
			<div class="list hvhd" @click.stop.prevent="like">
				<i class="m-icon hand" :class="{'m-icon-liked':liked,'m-icon-like':!liked}"></i>
				<span class="znum" v-text="like_counts === 0 ? '赞': like_counts"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		props: ["item"],
		data() {
			return {
				liked: false,
				like_counts: 0,
			};
		},
		created() {
			this.liked = this.item.liked;
			this.like_counts = this.item.attitudes_count;
		},

		watch: {
			'item' () {
				this.liked = this.item.liked;
				this.like_counts = this.item.attitudes_count;
			}
		},
		methods: {
			jump_url: function() {
				window.location.href = 'sinaweibo://userinfo?uid=' + this.item.user.id;
			},
			like: function() {
				const url = this.liked ? 'movieapp/action/like?operator=destroy' : 'movieapp/action/like?operator=add';
				this.$http.post(url, {
					mid: this.item.id
				}).then((response) => {
					if(response.data && response.data.status == 1) {
						if(this.liked) {
							this.like_counts -= 1;
							this.liked = false;
						} else {
							this.like_counts += 1;
							this.liked = true;
						}
						this.item.attitudes_count = this.like_counts;
					}
				}, (response) => {
					console.log(response);
				});
			},
			repost($event, item) {
				const schemeH5 = 'sinaweibo://repost?' + qs.stringify({
					srcuid: item.user.id, //原博作者的uid
					srcid: item.mid, //原博的mid
					srcnickname: item.user.name, //原博作者的昵称。
					srctext: item.card_info.text, //原博内容
					srcprofileurl: item.user.avatar_large, //如果原博没图，这是原博主的头像url
				});
				window.location.href = schemeH5;

			},
			comment($event, item) {
				const schemeH5 = 'sinaweibo://comment?srcuid=' + this.item.user.id + '&srcid=' + this.item.mid;
				window.location.href = schemeH5;
			}
		}
	};
</script>

<style lang="scss" scoped="scoped">
	@import "../../scss/sassCore";
	@import "../../scss/var";
	.m-img-box {
		width: 30px;
		height: 30px;
	}
	
	.right .m-icon {
		font-size: 16px;
		&.hand{
			font-size: 15px;
		}
	}
	
	.video-share {
		height: P2R(44px);
		display: flex;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		margin-bottom: P2R(5px);
		color: #939393;
	}
	
	.video-share div {
		display: inline-block;
		position: relative;
	}
	
	.video-share .left {
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
		span {
			display: block;
			font-size: P2R(13px);
			vertical-align: middle;
			line-height: P2R(30px);
			margin-left: P2R(10px);
		}
	}
	
	.video-share .right {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.list {
			min-width: P2R(43px);
		}
		color: #939393;
		.znum {
			font-size: P2R(12px);
			position: relative;
			top: -P2R(2px);
		}
		.msg-num {
			position: absolute;
			color: #fff;
			border-radius: 8px;
			top: P2R(-4px);
			left: P2R(12px);
			font-size: P2R(12px);
			padding: P2R(1px) P2R(5px);
			background: red;
			line-height: P2R(16px);
			text-align: center;
			transform-origin: left top;
			transform: scale(0.6);
		}
	}
</style>
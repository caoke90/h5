<template>
	<footer class="m-ctrl-box m-box-center-a">
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" v-if="showRt" @click="repost($event, item)">
			<i class="m-font m-font-forward" v-if="showRt"></i>
			<em v-text="item.reposts_count?item.reposts_count:'转发'">转发</em>
		</div>
		<span class="m-line-gradient"></span>
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" @click="comment($event, item)">
			<i class="m-font m-font-comment"></i>
			<em v-text="item.comments_count?item.comments_count:'评论'">评论</em>
		</div>
		<span class="m-line-gradient"></span>
		<div class="m-diy-btn m-box-col m-box-center m-box-center-a" @click.stop.prevent="like">
			<i class="m-icon" :class="{'m-icon-liked':liked,'m-icon-like':!liked}"></i>
			<em v-text="like_counts === 0 ? '赞': like_counts"></em>
		</div>
	</footer>
</template>
<style lang="scss">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	 .m-box-center-a,.m-box-center{
	 	 display: -webkit-box;
  display: -webkit-flex;
  display: flex;
	 }
	 .m-box-center-a{
	 	-webkit-justify-content: center;
	 	-webkit-box-pack: center;
	 	-webkit-box-align: center;
	 	-webkit-align-items: center;
	 }
	 .m-box-col{
	 	-webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
	 }
	.m-ctrl-box .m-font {
		width: P2R(18px);
		height: P2R(18px);
	}

	.m-ctrl-box .m-diy-btn em {
		font-size: P2R(14px);
		margin-left: P2R(6px);
		margin-top: P2R(-1px);
	}
</style>
<script>
	import Bus from '../../marvel/bus';
	import qs from 'qs';
	export default {
		props: ['item'],
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
		components: {
			weiboMedia: require('./weibo-media.vue')
		},
		computed: {
			/**
			 * 是否显示转发按钮
			 * @returns {boolean}
			 */
			showRt() {
				return !(this.item.visible && this.item.visible.type > 0);
			}
		},
		methods: {
			repost($event, item) { //分享
				const schemeH5 = 'sinaweibo://repost?' + qs.stringify({
					srcuid: item.user.id, //原博作者的uid
					srcid: item.mid, //原博的mid
					srcnickname: item.user.name, //原博作者的昵称。
					srctext: item.card_info.text, //原博内容
					srcprofileurl: item.user.avatar_large, //如果原博没图，这是原博主的头像url
				});
				window.location.href = schemeH5;

			},
			comment($event, item) { //评论
				if(item.user.allow_all_comment == false) {
					Bus.$emit('mvToast', {
						type: 'warning',
						text: '由于对方的设置，你不能评论哦！'
					});
				} else {
					const schemeH5 = 'sinaweibo://comment?srcuid=' + item.user.id + '&srcid=' + item.mid;
					window.location.href = schemeH5;
				}

			},
			like: function() { //点赞
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
			}
		}
	};
</script>

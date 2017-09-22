<template>
	<div class="card m-panel card9" v-if="item" :class="{'weibo-member':item.user.mbtype != 0,'card-vip':item.cardid}" :style="cover">

		<div class="card-wrap">
			<div class="card-main">
				<card-title :item=item :showTriangle="showTriangle" :gomore="gomore"></card-title>
				<weibo-title v-if="item.card_type=='homepage_review'" :item=item :showTriangle="showTriangle" :gomore="gomore"></weibo-title>
				<weibo-header v-else :item=item :showTriangle="showTriangle" :gomore="gomore"></weibo-header>

				<weibo-article :item=item></weibo-article>

				<weibo-footer :item=item></weibo-footer>
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {};
		},
		computed: {
			/**
			 * 拼接 Cover 样式
			 */
			cover() {
				const cardid = this.item.cardid;
				if(cardid) {
					return {
						'background-image': `url(//imgs.t.sinajs.cn/t6/skin/public/feed_cover/${cardid}_os7_d6p.png)`
					};
				}
				return '';
			}
		},
		props: ['item', 'showTriangle', 'gomore'],
		components: {
			cardTitle: require('./card-title.vue'),
			weiboHeader: require('./weibo-header.vue'),
			weiboArticle: require('./weibo-article.vue'),
			weiboFooter: require('./weibo-footer.vue'),
			weiboTitle: require('./weibo-title.vue')
		}
	};
</script>
<style>

</style>
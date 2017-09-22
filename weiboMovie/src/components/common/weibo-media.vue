<template>
	<div>
		<div class="weibo-media-wraps weibo-media paddingTop" :class="'media-' + type" v-if="item.card_info.big_card.object_type=='picture'">
			<ul class="m-auto-list" v-if="item.card_info.big_card.object.small_pics.length > 1" :class="{'m-auto-ul':type=='b'}">
				<li :class="{'m-auto-box':type=='b'}" v-for="(pic, index) in item.card_info.big_card.object.small_pics">
					<div class="m-img-box" :class="{'m-imghold-square':type=='b'}" @click="thumbnails($event, index, item.card_info.big_card.object.large_pics)">
						<mv-img :needlazy="true" :src="pic.url"></mv-img>
						<span class="feed-mark" v-if="pic.pic_type=='gif'">GIF</span>
						<span class="feed-mark" v-else-if="pic.pic_type=='long'">长图</span>
						<span class="feed-mark" v-else-if="pic.pic_type=='live'">LIVE</span>
					</div>
				</li>
			</ul>
			<div v-else-if="item.card_info.big_card.object.small_pics.length == 1" @click="thumbnails($event, 0, item.card_info.big_card.object.large_pics)">
				<div class="single-img gif" v-if="item.card_info.big_card.object.small_pics[0].pic_type=='gif'">
					<mv-img :needlazy="true" :src="item.card_info.big_card.object.small_pics[0].url"></mv-img>
					<span class="feed-mark">GIF</span>
				</div>
				<div class="single-img long" v-else-if="item.card_info.big_card.object.small_pics[0].pic_type=='long'">
					<mv-img :needlazy="true" :src="item.card_info.big_card.object.small_pics[0].url"></mv-img>
					<span class="feed-mark">长图</span>
				</div>
				<div class="single-img live" v-else-if="item.card_info.big_card.object.small_pics[0].pic_type=='live'">
					<mv-img :needlazy="true" :src="item.card_info.big_card.object.small_pics[0].url"></mv-img>
					<span class="feed-mark">LIVE</span>
				</div>
				<div class="single-img" v-else>
					<mv-img :needlazy="true" :src="item.card_info.big_card.object.small_pics[0].url"></mv-img>
				</div>
			</div>
		</div>

		<div class="weibo-media-wraps weibo-media" :class="'media-' + type" v-else-if="item.card_info.big_card.object_type=='video'">
			<weibo-video :item='item'></weibo-video>
		</div>
		<div class="weibo-media" v-else-if="item.card_info.big_card.object_type=='article'">
			<page-article :item="item.card_info.big_card"></page-article>
		</div>
	</div>
</template>
<style lang="scss">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	.weibo-media.paddingTop {
		padding-top: 10px;
	}
	.card9 .weibo-main .weibo-og{
		padding: 0.75rem 0.8125rem P2R(10px);
	}
	.card9 .weibo-main .weibo-media .single-img {
		position: relative;
		width: 46%;
		height: 0px;
		padding-bottom: 46%;
		overflow: hidden;
	}
	
	.card9 .weibo-main .weibo-media .single-img.gif {
		width: 61%;
		padding-bottom: 61%;
	}
	
	.card9 .weibo-main .weibo-media .single-img.long {
		width: 46%;
		padding-bottom: 60%;
	}
	
	.card9 .weibo-main .weibo-media .single-img.live {
		width: 61%;
		padding-bottom: 45.6%;
	}
	
	.card9 .weibo-main .weibo-media .single-img>img {
		width: 100%;
		display: block;
	}
	
	.card9 .weibo-main .weibo-media .single-img>span {
		position: absolute;
		background-color: rgba(80, 125, 175, 0.75);
		right: 0;
		bottom: 0;
		border-radius: 0.125rem;
		padding: 0.125rem;
		color: #fff;
		font-size: 0.625rem;
	}
	.card9 .weibo-main .media-b .m-auto-list.m-auto-ul{
		padding-bottom: P2R(5px);
	}
	.card9 .weibo-main .media-b .m-auto-list {
		max-width: 100%;
		margin-left: 0px;
	}
	
	.m-img-box {
		position: relative;
	}
	
	.m-img-box span.feed-mark {
		position: absolute;
		background-color: rgba(80, 125, 175, 0.75);
		right: 0;
		bottom: 0;
		border-radius: 0.125rem;
		padding: 0.125rem;
		color: #fff;
		font-size: 0.625rem;
	}
	
	@media screen and (min-width: 750px) {
		.card9 .weibo-main .media-b .m-auto-list {
			max-width: 400px;
		}
		.card9 .weibo-main .m-auto-list {
			max-width: 400px;
		}
	}
	
	.card9 .weibo-main .weibo-media {
		margin-top: P2R(10px);
		margin-bottom: P2R(12px);
		box-sizing: border-box;
		overflow: hidden;
	}
	
	.card9 .weibo-main .media-a .m-auto-list {
		max-width: 20.75rem;
	}
	
	.card9 .weibo-main .media-a .m-auto-list .m-img-box {
		width: P2R(113px);
		height: P2R(113px);
	}
	
	.card9 .weibo-main .media-b {
		margin: auto;
	}
	
	.card9 .top-article .m-img-box {
		height: auto;
	}
	
	.card9 .weibo-main .weibo-media {
		margin-bottom: 0px;
	}
	
	.card9 .weibo-main .weibo-media .single-img>span {
		border-radius: 0.125rem 0px 0px 0px;
	}
</style>
<script>
	import Bus from '../../marvel/bus';
	export default {
		data() {
			return {
				showMark: false,
			};
		},
		props: ['item'],
		computed: {
			// 多图情况下的布局模式。4张图为四宫格(type=a),其他为九宫格(type=b)。
			type() {
				if(this.item.card_info.big_card.object.small_pics && this.item.card_info.big_card.object.small_pics.length === 4) {
					return 'a';
				}
				return 'b';
			},
			styles: function() {
				const W = 150;
				const w = this.item.pics[0].geo.width;
				const h = this.item.pics[0].geo.height;
				if(h / w > 16 / 9) {
					this.showMark = true;
				}
				return {
					singleImg: {
						width: w > W ? W / 16 + 'rem' : w / 16 + 'rem',
						height: w > W ? ((W * h / w) / 16) + 'rem' : h / 16 + 'rem',
					}
				};
			}
		},
		components: {
			'weibo-video': require('./weibo-video.vue'),
			'page-article': require('../small-pages/page-article.vue'),
		},
		methods: {
			thumbnails(e, index, itemList) {
				const eTarget = e.target || e.srcElement;
				const list = this.formatThumbItem(eTarget, itemList, index);
				Bus.$emit('mvGallery', index, list);
			},
			// 拼出pswp需要的数据格式
			formatThumbItem(target, itemList, index) {
				// 找出父结点
				const clickedListItem = this.closest(target, (el) => {
					return el.classList.contains('weibo-media');
				});
				console.log(target)

				const items = itemList.map((item, i) => {
					if(!item.width) {
						const style = window.getComputedStyle ? window.getComputedStyle(target, null) : null || target.currentStyle;
						const windowWidth = document.documentElement.clientWidth || window.innerWidth;
						item.width = windowWidth;
						item.height = parseFloat(style.height) / parseFloat(style.width) * windowWidth;
					}
					return {
						src: item.url, // 大图
						w: item.width, // 大图宽度
						h: item.height, // 大图高度
						msrc: item.url, // 缩略图
						el: clickedListItem.getElementsByTagName('img')[i], // 缩略图对应的img DOM
					};
				});
				return items;
			},
			closest(el, fn) {
				return el && (fn(el) ? el : this.closest(el.parentNode, fn));
			}
		},
	};
</script>
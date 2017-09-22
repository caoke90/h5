<template>
	<div class="card-main">
		<div class="m-img-box">
			<ul v-touch:pan="onPan" v-touch:panend="onPanEnd" ref="piclist" :style="{width:pageWidth+'px', height:pageHeight+'px'}">
				<li v-for="item in picsArr" :style="{transform:translateX(item), transitionDuration:transitionDuration(item)}" :class="{'cur':item.cur}" @transitionend="initPic" @click="onClickPic($event, item)">
					<mv-img :needlazy="!item.cur" :src="item[imgUrlKey]"></mv-img>
					<div class="text-bar" v-if="titleKey && item[titleKey]">
						<span class="m-text-cut" :style="{ paddingRight: dotPadding + 'px' }" v-text="item[titleKey]"></span>
					</div>
				</li>
			</ul>
		</div>
		<ul ref="dot" class="m-sld-dot" v-if="picsArr.length > 1 && dotVal">
			<li :class="{'cur':index === pageIndex}" v-for="(item, index) in picsArr"></li>
		</ul>
	</div>
</template>
<style lang="scss" scoped>
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	.card-main {
		position: relative;
	}

	.m-img-box {
		overflow: hidden;
		vertical-align: top;
		img {
			height: auto;
		}
		ul {
			white-space: nowrap;
			font-size: 0;
			overflow: hidden;
			position: relative;
		}
		li {
			width: 100%;
			position: absolute;
			bottom: 0px;
			left: 0;
			display: none;
			&.cur {
				display: block;
			}
		}
		.text-bar {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 1.875rem;
			line-height: 1.875rem;
			background: rgba(0, 0, 0, 0.5);
			span {
				display: block;
				color: #FFF;
				font-size: 1.125rem;
				padding: 0 0.625rem;
			}
		}
	}

	.m-sld-dot {
		position: absolute;
		right: P2R(13px);
		bottom: P2R(5px);
	}
</style>
<script>
	import Vue from 'vue';
	import Bus from '../bus';
	export default {
		name: 'slider',
		data() {
			return {
				pageWidth: 0, // 当前轮播图的高度
				firstPicHeight: 0, // 第一张图片的高度。当没有传height参数的时候这个数作为整个轮播图的高度。
				pageIndex: 0, // 当前显示第几张
				dragging: false, // 是否正在拖拽
				timer: null, // 记录翻页的定时器
				quickTurnPage: false, // 是否为点击翻页
				dotPadding: 0, // 当显示圆点的时候，文字标题栏右侧空出来的距离
				picsArr: this.pics,
			};
		},
		computed: {
			dotVal() {
				if(this.dot === 'true') {
					return true;
				}
				return !!+this.dot;
			},
			widthVal() {
				return +this.width;
			},
			heightVal() {
				return +this.height;
			},
			autoPlayVal() {
				return +this.autoPlay;
			},
			speedVal() {
				return +this.speed;
			},
			pageHeight() {
				if(this.heightVal) {
					if(this.widthVal) {
						return this.heightVal / this.widthVal * this.pageWidth;
					}
					return this.heightVal;
				}
				return this.firstPicHeight;
			},
			nextIndex() {
				return(this.pageIndex + 1) % this.picsArr.length;
			},
			prevIndex() {
				return(this.pageIndex - 1 + this.picsArr.length) % this.picsArr.length;
			},
		},
		methods: {
			translateX(item) {
				return `translateX(${item.deltaX}px)`;
			},
			transitionDuration(item) {
				let value = '0s';
				if(this.autoPlayVal && item.cur) {
					value = `${this.speedVal}ms`;
					if(this.dragging) {
						value = '0s';
					} else if(this.quickTurnPage) {
						value = '200ms';
					}
				}
				return value;
			},
			next() {
				const pics = this.picsArr;
				pics[this.nextIndex].cur = true;
				pics[this.nextIndex].deltaX = 0;
				pics[this.pageIndex].deltaX = -this.pageWidth;
				this.pageIndex = this.nextIndex;
			},
			prev() {
				const pics = this.picsArr;
				pics[this.prevIndex].cur = true;
				pics[this.pageIndex].deltaX = this.pageWidth;
				pics[this.prevIndex].deltaX = 0;
				this.pageIndex = this.prevIndex;
			},
			initPic() {
				/* eslint no-param-reassign: 0 */
				this.picsArr.forEach((pic) => {
					pic.cur = false;
					pic.deltaX = 0;
				});
				this.quickTurnPage = false;
				this.picsArr[this.pageIndex].cur = true;
			},
			initTimer() {
				if(this.autoPlayVal <= this.speedVal) {
					throw new Error('auto-play must more than speed');
				} else if(this.autoPlayVal > 0 && this.picsArr.length > 1) {
					const self = this;
					clearInterval(self.timer);
					self.timer = setInterval(() => {
						self.picsArr[self.nextIndex].cur = true;
						self.picsArr[self.nextIndex].deltaX = self.pageWidth;
						// self.$nextTick(() => {
						//   self.next();
						// });
						setTimeout(() => {
							self.next();
						}, 10);
					}, self.autoPlayVal);
				}
			},
			onPan(e) {
				if(!this.noDrag && this.picsArr.length > 1) {
					this.dragging = true;
					const pics = this.picsArr;
					pics[this.pageIndex].deltaX = e.deltaX;
					if(e.deltaX < 0) { // next
						pics[this.nextIndex].cur = true;
						pics[this.nextIndex].deltaX = e.deltaX + this.pageWidth;
					} else { // prev
						pics[this.prevIndex].cur = true;
						pics[this.prevIndex].deltaX = e.deltaX - this.pageWidth;
					}
					this.initTimer();
				}
			},
			onPanEnd(e) {
				if(!this.noDrag && this.picsArr.length > 1) {
					this.dragging = false;
					if(e.distance > this.pageWidth * 0.5 || e.distance > 150) { // 松开后触发翻页
						if(e.deltaX < 0) {
							this.next();
						} else {
							this.prev();
						}
					} else { // 松开后没达到翻页的要求
						this.picsArr[this.pageIndex].deltaX = 0;
						if(e.deltaX < 0) {
							this.picsArr[this.nextIndex].deltaX = this.pageWidth;
						} else {
							this.picsArr[this.prevIndex].deltaX = -this.pageWidth;
						}
					}
				}
			},
			onClickPic(e, item) {
				if(!this.noDrag && this.picsArr.length > 1) {
					if(item[this.imgLinkKey]) {
						Bus.$emit("movieActionLog",{
							"act_code":1383,
							"luicode": 10000010,
              "lfid": 230191,
              "uicode":40000078,
              "fid":'10100310001_-_homepage',
              "ext":'type:movie_banner|url:'+item[this.imgLinkKey]
						})
						window.location.href = item[this.imgLinkKey];
					} else {
						const self = this;
						const pics = this.picsArr;
						self.initTimer();
						this.quickTurnPage = true;
						if(e.clientX < window.innerWidth / 2) {
							pics[self.prevIndex].cur = true;
							pics[self.prevIndex].deltaX = -self.pageWidth;
							setTimeout(() => {
								self.prev();
							}, 50); // DOM的渲染需要一定时间
						} else {
							pics[self.nextIndex].cur = true;
							pics[self.nextIndex].deltaX = self.pageWidth;
							setTimeout(() => {
								self.next();
							}, 50);
						}
					}
				}
			},
			resize() {
				if(!this.heightVal) {
					const timer = setInterval(() => { // 获取第一张图片的高为整个轮播图的高
						if(this.$refs.piclist) {
							const height = this.$refs.piclist.children[0].firstElementChild.offsetHeight;
							if(height > 0) {
								this.firstPicHeight = height;
								clearInterval(timer);
							}
						} else {
							clearInterval(timer);
						}
					}, 50);
				}
				this.pageWidth = (this.$el) ? this.$el.offsetWidth : this.pageWidth;
				if(this.dotVal) {
					this.dotPadding = this.pageWidth - this.$refs.dot.offsetLeft;
				}
			},
			create() {
				for(const list of this.picsArr) {
					Vue.set(list, 'deltaX', 0);
					Vue.set(list, 'cur', false);
				}
				this.initPic();
			}
		},
		created() {
			this.$watch('pics', (newPic) => {
				this.picsArr = newPic.map((item) => {
					return Object.assign({}, item);
				});
				this.create();
			}, {
				deep: true
			});
			this.create();
		},
		mounted() {
			const self = this;
			Vue.nextTick(() => {
				self.resize();
				window.addEventListener('resize', self.resize);
			self.initTimer();

			});
		},
		destroyed() {
			const self = this;
			window.removeEventListener('resize', self.resize);
			clearInterval(self.timer);
		},
		props: {
			pics: {
				type: Array,
				required: true,
			},
			width: {
				type: [String, Number],
				default: 0,
			},
			height: {
				type: [String, Number],
				default: 0,
			},
			dot: {
				default: true
			},
			autoPlay: {
				type: [String, Number],
				default: 0,
			},
			noDrag: {
				type: Boolean,
				default: false
			},
			speed: {
				type: [String, Number],
				default: 300,
				validator(val) {
					return val >= 0;
				},
			},
			imgUrlKey: {
				type: String,
				required: true,
			},
			imgLinkKey: {
				type: String,
			},
			titleKey: {
				type: String,
			},
		},
	};
</script>

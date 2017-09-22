<template>

	<mv-slider class="banners" v-if="item.list&&item.list.length>0" :pics="item.list" img-url-key="pic_url" img-link-key="link" auto-play="3000"></mv-slider>
	<div class="banners" v-else></div>

</template>
<style lang="scss">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	.banners {
		background: #d2d2d2;
		overflow: hidden;
	}
	
	.banners .m-sld-dot li {
		width: 7px;
		height: 7px;
		background: rgba(255, 255, 255, 0.20);
		&.cur {
			background: #FFFFFF;
		}
	}
	
	@media only screen and (min-device-width: 320px) {
		.banners {
			height: 140.8px;
			img {
				position: relative;
				bottom: P2R(45px);
			}
		}
	}
	
	
	@media only screen and (min-device-width: 375px) {
		.banners {
			height: 165px;
			img {
				position: relative;
				bottom: P2R(50px);
			}
		}
	}
	
	@media only screen and (min-device-width: 414px) {
		.banners {
			height: 182.16px;
			img {
				position: relative;
				bottom: P2R(50px);
			}
		}
	}

	
	@media only screen and (min-device-width: 768px) {
		.banners {
			height: 337.92px;
			img {
				position: relative;
				bottom: P2R(80px);
			}
		}
	}
</style>
<script>
	export default {
		props: ['item', 'hidImg'],
		computed: {
			height() {
				//return document.documentElement.offsetWidth*101/375
			}
		}
	};
</script>
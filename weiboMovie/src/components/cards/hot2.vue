<template>
	<div v-if="item.list&&item.list.length>0">
		<title-bar :item="item"></title-bar>
		<div class="banner-list" ref="movie">
			<div class="list" ref="list">
				<div class="slide-list" v-for="(item2,index) in item.list" :key="index">
					<div class="img-grop" @click="gotoUrl(item2.url)">
						<mv-img v-if="item2.poster_url" class="img" :needlazy="index>3" :src="item2.poster_url"></mv-img>
						<div class="img" v-else></div>
						<p>{{item2.text}}</p>
					</div>
					<div class="text">{{item2.name}}</div>
					<a :href="item2.button.url">
						<span class="collect_count" v-if="item2.button_type=='buy'">{{item2.button.title}}</span>
						<span class="collect_count yu" v-else>{{item2.button.title}}</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style>

</style>
<script>
	export default {
		props: ['item', 'hidImg'],
		data() {
			return {
				scrollEl: null,
				scrolltime: 0,
				diff: 0,
				startX: 0,
				moveX: 0
			}
		},
		components: {
			"title-bar": require('./TitleBar.vue')
		},
		methods: {
			gotoUrl(url) {
				console.log(url)
				window.location.href = url;
			} 
		}
	};
</script>
<style lang="scss" scoped="scoped">
	@import "../../scss/_sassCore";
	@import "../../scss/_var";
	 ::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}
	
	.banner-list {
		width: 100%;
		text-align: left;
		padding: P2R(11px) 0px;
		margin-top: P2R(10px);
		background: #fff;
		.list {
			overflow: scroll;
			overflow-y: hidden;
			-webkit-overflow-scrolling: touch;
			white-space: nowrap;
			min-height: P2R(168px);
			.slide-list {
				width: P2R(90px);
				max-width: 24vw;
				display: inline-block;
				&:nth-of-type(1) {
					margin-left: P2R(13px);
				}
				+.slide-list {
					margin-left: P2R(10px);
				}
				.img-grop {
					position: relative;
					.img {
						width: 100%;
						background: #d2d2d2;
						display: block;
						max-height: 32vw;
						height: P2R(120px);
					}
					p {
						position: absolute;
						bottom: 0px;
						left: 0px;
						text-align: left;
						line-height: 1.5;
						margin-left: P2R(3px);
						font-family: PingFangSC-Regular;
						font-size: P2R(12px);
						color: #FCCE17;
						transform-origin: left center;
						transform: scale(0.9);
						z-index: 2;
					}
					&::after {
						content: "";
						position: absolute;
						bottom: 0px;
						left: 0px;
						width: 100%;
						height: 18px;
						z-index: 0;
						background-image: linear-gradient(-180deg, rgba(0, 0, 0, 0.00) 0%, #000000 100%);
					}
				}
				.text {
					display: block;
					width: 100%;
					margin: P2R(8px) P2R(0px);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: P2R(14px);
					color: #333333;
				}
				.collect_count {
					display: block;
					width: P2R(50px);
					height: 1.5rem;
					line-height: P2R(24px);
					background: #FCCE17;
					border-radius: P2R(2px);
					font-size: 0.75rem;
					text-align: center;
					color: #333;
					margin-top: P2R(-2px);
					&.yu {
						color: #FFF;
						background: #459CDE;
					}
				}
				.more {
					display: block;
					border: P2R(1px) solid red;
					position: relative;
					div {
						position: absolute;
						left: 0px;
						top: 0px;
						width: 100%;
						height: 100%;
						line-height: P2R(120px);
						text-align: center;
						font-size: P2R(14px);
						color: red;
					}
				}
			}
		}
	}
</style>
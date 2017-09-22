<template>
	<div class="title">{{item.title}}</div>
</template>

<script>
	export default {
		name: 'TitleBar',
		props:["item"]
	}
</script>

<style lang="scss" scoped="scoped">
  @import"../../scss/sassCore";
  @import"../../scss/var";
	.title {
		box-sizing: border-box;
		padding-left: P2R(12px);
		padding-top: P2R(12px);
	    line-height: P2R(17px);
		padding-bottom: P2R(7px);
		color: #939393;
		width: 100%;
		background: #F2F2F2;
		text-align: left;
		font-size: P2R(12px);
        margin: -0.5625rem 0rem;
	}
</style>

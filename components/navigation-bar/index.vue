<template>
	<!-- 适配小程序bar高度 -->
	<view class="navigation-bar">
		<view class="navigation" :style="{'padding-top': `${barHeight + 10}px`, background: background}">
			{{ title }}
		</view>
		<view class="empty-height" style="height: 70px;"></view>
	</view>
</template>

<script>
export default {
	name: 'NavigationBar',
	props: {
		title: {
			type: String,
			default: '标题'
		},
		background: {
			type: String,
			default: 'linear-gradient(to right bottom, #22dcfd, #1c7fff)'
		}
	},
	data() {
		return {
			barHeight: uni.getSystemInfoSync().statusBarHeight
		}
	}
}
</script>

<style lang="scss" scoped>
.navigation {
	width: 100%;
	z-index: 99999;
	position: fixed;
	display: flex;
	justify-content: center;
	height: 70px;
	color: #FFFFFF;
	font-size: 16px;
	box-sizing: border-box;
}
</style>

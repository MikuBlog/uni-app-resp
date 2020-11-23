<template>
	<!-- 适配小程序bar高度 -->
	<view class="navigation-bar">
		<view class="navigation" :style="{ height: barHeight > 30 ? '90px' : '65px','padding-top': `${barHeight + 13}px`, background: background}">
			<image @click="$navigateBack" style="height: auto;" class="back" src="@/static/images/home/back.png" v-if="isBack" mode="widthFix">{{ title }}
		</view>
		<view class="empty-height" :style="{ height: barHeight > 30 ? '90px' : '65px' }"></view>
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
			},
			isBack: {
				type: Boolean,
				default: false
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
		text-align: center;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: bold;
		box-sizing: border-box;
	}

	.back {
		position: absolute;
		left: 40rpx;
		width: 24rpx;
	}
</style>

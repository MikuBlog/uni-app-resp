<template>
	<view class="tabBar">
		<view v-for="(item, index) in tabBar" :key="index" class="tabbar_item" :class="{'active':item.url == currentPage}"
		 @click="navTo(item, index)">
			<image v-if="item.url == currentPage" :src="item.imgClick" mode="scaleToFill"></image>
			<image v-else :src="item.imgNormal" mode="scaleToFill"></image>
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: String,
				default: '/pages/orderer/buy/index'
			}
		},
		data() {
			return {
				tabBar: [{
						url: '/pages/orderer/buy/index',
						text: '食材',
						imgNormal: require('@/static/navbar_goods_gray.png'),
						imgClick: require('@/static/navbar_goods_blue.png')
					},
					{
						url: '/pages/orderer/cart/index',
						text: '购物车',
						imgNormal: require('@/static/navbar_cart_gray.png'),
						imgClick: require('@/static/navbar_cart_blue.png'),
					},
					{
						url: '/pages/orderer/order_list/index',
						text: '订单',
						imgNormal: require('@/static/navbar_order_gray.png'),
						imgClick: require('@/static/navbar_order_blue.png')
					}, {
						url: '/pages/quartermaster/monitor/index',
						text: '监控',
						imgNormal: require('@/static/navbar_monitor_gray.png'),
						imgClick: require('@/static/navbar_monitor_blue.png')
					}, {
						url: '/pages/mine/index',
						text: '我的',
						imgNormal: require('@/static/navbar_my_gray.png'),
						imgClick: require('@/static/navbar_my_blue.png')
					}
				],
				level: ''
			};
		},
		mounted() {
			let roles = this.$getMemoryPmt('roles');
			/* console.log(userlevel); */
			let _this = this;
			if (roles == 1) {
				_this.tabBar.splice(3, 1);
			} else {
				_this.tabBar.splice(0, 3);
			}
		},
		created() {
			uni.hideTabBar({})
		},
		computed: {

		},
		methods: {
			navTo(item, index) {
				let _this = this;
				if (item.url !== _this.currentPage) {
					var isUrl = item.url
					const that = this
					uni.reLaunch({
						url: isUrl
					})
				} else {
					/* this.$parent.toTop() */
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	//导航栏设置
	$isRadius:0; //左上右上圆角
	$isWidth:100vw; //导航栏宽度
	$isBorder:1px solid #eeeeee; //边框 不需要则设为0px
	$isBg:white; //背景

	// 选中设置
	$chooseTextColor:#247bff; //选中时字体颜色
	$chooseBgColor:white; //选中时背景颜色 transparent为透明

	//未选中设置
	$normalTextColor:#999; //未选中颜色

	.tabBar {
		width: $isWidth;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 998;
		background-color: $isBg;
		color: $normalTextColor;
		border-left: $isBorder;
		border-top: $isBorder;
		border-right: $isBorder;
		display: flex;
		justify-content: space-around;
		border-top-right-radius: $isRadius;
		border-top-left-radius: $isRadius;
		box-sizing: border-box;
		overflow: hidden;

		.tabbar_item {
			width: 25%;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			&.active {
				/* border-left: $isBorder;
                border-top: $isBorder; */
				background: $chooseBgColor;
				color: $chooseTextColor;
			}
		}

		image {
			width: 36upx;
			height: 36upx;
			margin-left: 5upx;
		}
	}
</style>

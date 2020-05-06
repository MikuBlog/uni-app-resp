<script>
	export default {
		globalData: {
			nowPage: "login"
		},	
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
page {
	background-color: #efefef;
	overflow: auto;
}
.uni-list-item {
	padding: 0 20upx !important;
}
.uni-list-item__container {
	padding: 32upx 10upx!important;
}
</style>
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			console.log('App created')
		},
		mounted() {
			// h5适用（软键盘不顶起）
			// var hrt = document.body.clientHeight
			// window.onload = function() {
			// 	document.body.style.height = `${hrt}px`
			// }
			// window.onresize = () => {
			// 	document.body.style.height = `${hrt}px`
			// }
		}
	}
</script>

<style>
	page {
		font-size: 30rpx;
	}
</style>
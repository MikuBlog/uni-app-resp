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
	height: 100%;
	overflow: auto;
}
.uni-list-item {
	padding: 0 20upx !important;
}
.uni-list-item__container {
	padding: 26upx 10upx!important;
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
		}
	}
</script>

<style>
	page {
		font-size: 30rpx;
	}
</style>
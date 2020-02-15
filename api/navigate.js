// 页面跳转
function navigateTo({ url, animationDuration }) {
	uni.navigateTo({
		url,
		animationType: 'pop-in',
		animationDuration: animationDuration || 200
	})
}
// 页面回退
function navigateBack() {
	uni.navigateBack({
		delta: 1
	})
}
// 返回tabbar页面时调用
function switchTab({ url, success, fail, complete }) {
	uni.switchTab({
	    url,
			success: success || (() => {}),
			fail: fail || (() => {}),
			complete: complete || (() => {})
	});
}

export default {
	navigateTo,
	navigateBack,
	switchTab
}
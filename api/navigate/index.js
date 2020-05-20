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

// 关闭当前页面,跳转到对应页面
function redirectTo({ url, success, fail, complete }) {
	uni.redirectTo({
	    url,
			success: success || (() => {}),
			fail: fail || (() => {}),
			complete: complete || (() => {})
	});
}

// 关闭所有页面再跳转
function reLaunch({ url, success, fail, complete }) {
	uni.reLaunch({
	    url,
			success: success || (() => {}),
			fail: fail || (() => {}),
			complete: complete || (() => {})
	});
}

export default {
	navigateTo,
	navigateBack,
	switchTab,
	redirectTo,
	reLaunch
}
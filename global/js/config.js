export default {
	// 是否默认H5微信登录
	isH5WxLogin: false,
	// 是否打开H5调试模式
	isDebug: true,
	// #ifdef APP-PLUS
	// App更新弹窗配置
	appUpdate: {
		// 主颜色
		mainColor: '#077ff9',
		// 弹窗图片url
		iconUrl: require('@/static/update.png'),
		// 是否点击遮罩关闭
		dialogClose: false,
		// 点击关闭后再次提醒时间(天)
		closeDay: 7,
		// 后台请求接口获取版本号
		requestUrl: '/api/user/get/version',
		// 是否进入App就检查并弹窗更新
		isUpdateImmediate: true
	}
	// #endif
}
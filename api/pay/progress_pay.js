export default function pay(options) {
	let { provider, orderInfo, timeStamp, nonceStr, packageValue, paySign, service, getOrderStatus, success, fail, complete } = options
	let obj = {
		provider,
		orderInfo
	}
	// #ifdef MP-WEIXIN
	obj.timeStamp = timeStamp
	obj.nonceStr = nonceStr
	obj.package = packageValue
	obj.signType = "MD5"
	obj.paySign = paySign
	// #endif
	
	// #ifdef MP-TOUTIAO
	obj.service = service
	obj.service > 2 && obj.getOrderStatus = getOrderStatus
	// #endif
	
	uni.requestPayment({
		...obj,
		success: success || () => {},
		fail: fail || () => {},
		complete: complete || () => {}
	})
}
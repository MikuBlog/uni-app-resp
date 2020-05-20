import {
	appId
} from '@/global/js/baseUrl'
/**
 * @author xuanzai
 * @description 微信分享
 */
import wx from 'jweixin-module'
const wexinPay = (data, cb = () => {}, errorCb = () => {}, complete = () => {}) => {
	let [timestamp, 
	nonceStr, 
	signature, 
	title, 
	desc,
	link,
	imgUrl] = 
	[data.timeStamp,
	 data.nonceStr, 
	 data.signature,
	 data.title,
	 data.desc,
	 data.link,
	 data.imgUrl];
	wx.config({
		debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId, // 必填，公众号的唯一标识
		timestamp, // 必填，生成签名的时间戳
		nonceStr, // 必填，生成签名的随机串
		signature, // 必填，签名，见附录1
		jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	})
	wx.ready(() => {
		wx.updateAppMessageShareData({
			title, // 分享标题
			desc, // 分享描述
			link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl, // 分享图标
			success: e => {
				cb(e)
			},
			fail: e => {
				errorCb(e)
			},
			complete: e => {
				complete(e)
			}
		})
		wx.updateTimelineShareData({
			title, // 分享标题
			link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl, // 分享图标
			success: e => {
				cb(e)
			},
			fail: e => {
				errorCb(e)
			},
			complete: e => {
				complete(e)
			}
		})
	});
	wx.error(function(res) {
		// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		/*alert("config信息验证失败");*/
		console.log(res)
	});
}

export default wexinPay;

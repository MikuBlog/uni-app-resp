/**
 * @author xuanzai
 * @description 图片转base64只适用于微信小程序和APP
 * @param {String} url
 * @param {Function} cb
 */
export function urlTobase64(url, cb) {
	uni.request({
		url: url,
		method: 'GET',
		responseType: 'arraybuffer',
		success: ress => {
			cb(uni.arrayBufferToBase64(ress.data))
		}
	})
}
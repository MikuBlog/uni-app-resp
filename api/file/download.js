import {
	isWeixin
} from '@/utils/system.js'
/**
 * @author xuanzai
 * @description 下载文件
 * @param {Object} options 下载配置
 * @return {Object} downloadTask 下载实例
 */
function download(options) {
	let {
		url,
		fileName,
		isLoading
	} = options
	isLoading && uni.showLoading({
		title: "下载中"
	})
	// #ifdef H5
	if (isWeixin()) {
		uni.showModal({
			title: "温馨提示",
			content: "请点击右上角使用其他浏览器打开当前网页并下载App"
		})
	} else {
		const
			a = document.createElement('a'),
			arr = url.split('/')
		a.download = fileName || arr[arr.length - 1]
		a.href = url
		a.click()
	}
	// #endif
	// #ifndef H5
	return uni.downloadFile({
		url,
		success: res => {
			if (res.statusCode === 200) {
				uni.saveFile({
					tempFilePath: res.tempFilePath
				});
			}
		},
		fail: e => {
			uni.showToast({
				icon: "none",
				title: e.errMsg
			})
		},
		complete: e => {
			uni.hideLoading()
		}
	});
	// #endif
}

export default download

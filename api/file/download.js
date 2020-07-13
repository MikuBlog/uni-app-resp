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
	return uni.downloadFile({
		url,
		success: (res) => {
			if (res.statusCode === 200) {
				// #ifndef H5
				uni.saveFile({
					tempFilePath: res.tempFilePath
				});
				// #endif
				// #ifdef H5
				const
					a = document.createElement('a'),
					arr = url.split('/')
				a.download = fileName || arr[arr.length - 1]
				a.href = res.tempFilePath
				a.click()
				// #endif
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
}

export default download

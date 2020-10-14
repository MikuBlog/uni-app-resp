/**
 * @author xuanzai
 * @description 复制文本
 * @param {String} obj 
 * @returns {Promise}
 */
function copyText(obj) {
	//#ifdef H5
	return new Promise((resolve, reject) => {
		// 动态创建 textarea 元素
		var aux = document.createElement("textarea");
		// 获得需要复制的内容
		aux.value = obj
		// 添加到 DOM 元素中
		document.body.appendChild(aux);
		// 执行选中
		// 注意: 只有 input 和 textarea 可以执行 select() 方法.
		aux.select();
		// 获得选中的内容
		var content = window.getSelection().toString();
		// 执行复制命令
		document.execCommand("copy");
		// 将 input 元素移除
		document.body.removeChild(aux);
		resolve()
	})
	//#endif
	//#ifndef H5
	return new Promise((resolve, reject) => {
		uni.setClipboardData({
			data: obj,
			success: e => {
				resolve(e)
			},
			fail: e => {
				reject(e)
			}
		});;
	})
	//#endif
}

export default copyText

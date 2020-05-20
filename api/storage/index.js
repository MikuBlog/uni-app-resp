/**
 * @author xuanzai
 * @description 长久缓存
 * @param {String} key
 * @param {Any} data 
 */
function setMemoryPmt(key, data) {
	uni.setStorageSync(key, data)
}

function getMemoryPmt(key) {
	return uni.getStorageSync(key)
}

function clearMemoryPmt() {
	uni.clearStorageSync()
}

export default {
	setMemoryPmt,
	getMemoryPmt,
	clearMemoryPmt
}

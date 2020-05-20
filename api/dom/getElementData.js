/**
 * @author xuanzai
 * @description 获取元素信息
 */
export default function(selector) {
	let eleData = ""
	uni.createSelectorQuery(selector).boundingClientRect(data => {
		eleData = data
	}).exec()
	return eleData
}
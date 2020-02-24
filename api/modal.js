// 弹窗显示
const showModal = function({ title, content, showCancel, mask, cancelText, confirmText, cancelColor, confirmColor, success, fail, complete }) {
	uni.showModal({
		title: title || "",
		content: content || "",
		mask: mask === false ? false : true,
		showCancel: showCancel === false ? false : true,
		cancelText: cancelText || "取消",
		confirmText: confirmText || "确定",
		cancelColor: cancelColor || "#a6a6a6",
		confirmColor: confirmColor || "#2196f3",
		success: success || (() => {}),
		fail: fail || (() => {}),
		complete: complete || (() => {})
	})
}

const showToast = function({
	title,
	icon,
	mask,
	duration,
	success,
	fail,
	complete
}) {
	uni.showToast({
		title: title || "",
		icon: icon || "success",
		mask: mask || true,
		duration: duration || 1500,
		success: success || (() => {}),
		fail: fail || (() => {}),
		complete: complete || (() => {})
	})
}

const showLoading = function({
	title,
	mask,
	success,
	fail,
	complete
}) {
	uni.showLoading({
		title: title || "",
		mask: mask || true,
		success: success || (() => {}),
		fail: fail || (() => {}),
		complete: complete || (() => {})
	})
}

const hideLoading = function() {
	uni.hideLoading()
}

export default {
	showModal,
	showToast,
	showLoading,
	hideLoading
}
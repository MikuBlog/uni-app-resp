function jumpToOfficial(base64) {
	window.location.href = `https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=${base64}#wechat_redirect`
}

export default jumpToOfficial
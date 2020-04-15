import urlQuery from '@/utils/url_query'
function wxLogin(options) {
	let { appid, url, scope, isMustLogin } = options
	if(!urlQuery().code || isMustLogin) {
		window.location.href = (
		  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=${scope || 'snsapi_userinfo'}&state=ok#wechat_redirect`
		)
	}else {
		return urlQuery().code
	}
}

export default wxLogin
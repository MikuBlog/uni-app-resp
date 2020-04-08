/**
 * @author xuanzai
 * @description 获取地理位置信息
 * @param {Boolean} isBackgroundFollow 是否运行后台持续定位，默认为true
 * @returns {Promise}
 */
let 
	userLocation = false,
	locationBackground = false
function getLocationAuth(isBackgroundFollow = true) {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: e => {
				if(e.authSetting['scope.userLocation']) {
					userLocation = true
					isBackgroundFollow
					? getLocationBackgroundAuth(resolve, reject)
					: resolve({
							userLocation
						})
				}else {
					uni.authorize({
						scope: 'scope.userLocation',
						success: e => {
							userLocation = true
						},
						fail: e => {
							userLocation = false
						},
						complete: e => {
							isBackgroundFollow
							? getLocationBackgroundAuth(resolve, reject)
							: resolve({
									userLocation
								})
						}
					})
				}
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

function getLocationBackgroundAuth(resolve, reject) {
	wx.startLocationUpdateBackground({
		success: e => {
			locationBackground = true
		},
		fail: e => {
			locationBackground = false
		},
		complete: e => {
			resolve({
				userLocation, 
				locationBackground
			})
		}
	})
}

export default {
	getLocationAuth
}
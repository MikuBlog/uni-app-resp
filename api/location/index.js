import QQMapWX from "@/utils/qqmap-wx-jssdk.min"

function getLocation() {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			success: res => {
				resolve({
					latitude: res.latitude, 
					longitude: res.longitude
				})
			},
			fail: e => {
				uni.showModal({
					title: "提示",
					content: "需要您授权开启定位",
					success: e => {
						if(e.confirm) {
							uni.openSetting()
						}
					}
				})
				reject(e)
			}
		});
	})
}

function getAddress(latitude, longitude) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://apis.map.qq.com/ws/geocoder/v1/',
			data: {
				key: "WASBZ-RFV3D-BQI44-HWJRZ-ZVGY6-3OFRK",
				location: `${latitude},${longitude}`
			},
			method: "get",
			success: res => {
				resolve(res.data.result)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

export default {
	getLocation,
	getAddress
}
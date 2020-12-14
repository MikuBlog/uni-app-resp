import QQMapWX from "@/utils/qqmap-wx-jssdk.min"
import { qqKey } from '@/global/js/baseUrl'

function getLocation(address) {
	return new Promise((resolve, reject) => {
		if(!address) {
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
		}	else {
			let qqMap = new QQMapWX({
			  key: qqKey // 必填
			})
			qqMap.geocoder({
			  address,
			  complete: res => {
			    if (res.status === 0) {
						const data = res.result.location
						resolve({
							latitude: data.lat,
							longitude: data.lng
						})
			    } else {
						reject(res.message)
			    }
			  }
			})
		}
	})
}

function getAddress(latitude, longitude) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://apis.map.qq.com/ws/geocoder/v1/',
			data: {
				key: qqKey,
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
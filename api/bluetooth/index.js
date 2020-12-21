/*--------------------蓝牙初始化层-------------------------*/
// 打开蓝牙适配器
function openBluetoothAdapter() {
	return new Promise((resolve, reject) => {
		uni.openBluetoothAdapter({
			success: e => {
				resolve(e)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

// 开始检索设备（用于苹果手机检索设备）
function startBluetoothDeviceDiscovery(name) {
	return new Promise((resolve, reject) => {
		uni.startBluetoothDevicesDiscovery({
			success: e => {
				let clock = setTimeout(_ => {
					reject('请求超时')
				}, 5000)
				// 发现外围设备
				uni.onBluetoothDeviceFound(devices => {
					uni.getBluetoothDevices({
						success: e => {
							for(let i = 0, len = e.devices.length; i < len; i ++) {
								if(e.devices[i].name.indexOf(name) !== -1) {
									clearTimeout(clock)
									resolve(e.devices[i].deviceId)
									uni.stopBluetoothDevicesDiscovery({
										success: e => {
											console.log("停止检索蓝牙设备成功")
										},
										fail: e => {
											console.log("停止检索蓝牙设备失败")
										}
									})
								}
							}
						},
						fail: e => {
							reject(e)
						}
					})
				});
			},
			fail: e => {
				uni.showToast({
					icon: "none",
					title: "查找设备失败"
				})
				reject(e)
			}
		})
	})
}
/*--------------------蓝牙初始化层-------------------------*/

/*--------------------蓝牙设备连接层-------------------------*/
// 连接蓝牙设备
function connectBle(deviceId) {
	return new Promise((resolve, reject) => {
		uni.createBLEConnection({
			deviceId: deviceId,
			timeout: 5000,
			success: e => {
				resolve(e)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

/*--------------------蓝牙设备连接层-------------------------*/


/*--------------------蓝牙服务获取层-------------------------*/
// 获取服务列表
function getBluetoothServices(deviceId) {
	return new Promise((resolve, reject) => {
		uni.getBLEDeviceServices({
			deviceId: deviceId,
			success: e => {
				resolve(e.services)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}
// 获取特征值
function getBluetoothCharacteristics(deviceId, serviceId) {
	return new Promise((resolve, reject) => {
		uni.getBLEDeviceCharacteristics({
			deviceId: deviceId,
			serviceId: serviceId,
			success: e => {
				resolve(e.characteristics)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

/*--------------------蓝牙服务获取层-------------------------*/

/*--------------------蓝牙信息交互层-------------------------*/

// 向蓝牙设备发送信息
function sendServiceMsg(deviceId, serviceId, characteristicId, buffer) {
	return new Promise((resolve, reject) => {
		uni.writeBLECharacteristicValue({
			deviceId: deviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			value: buffer,
			success: e => {
				resolve(e)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}
// 向蓝牙设备收集信息
function getServiceMsg(deviceId, serviceId, characteristicId) {
	return new Promise((resolve, reject) => {
		uni.readBLECharacteristicValue({
			deviceId: deviceId,
			serviceId: serviceId,
			characteristicId: characteristicId,
			success: e => {
				resolve(e)
			},
			fail: e => {
				reject(e)
			}
		})
	})
}

/*--------------------蓝牙信息交互层-------------------------*/

// 断开蓝牙设备
function stopService(deviceId) {
	return new Promise((resolve, reject) => {
		uni.closeBLEConnection({
			deviceId: deviceId,
			success: e => {
				console.log(e)
			},
			fail: e => {
				console.log(e)
			},
			complete: e => {
				uni.closeBluetoothAdapter({
					success: e => {
						console.log(e)
					},
					fail: e => {
						console.log(e)
					},
					complete: e => {
						resolve()
					}
				})
			}
		})
	})
}

// 将n进制值存入ArrayBuffer数组中
function strToBuffer(arr) {
	const buffer = new ArrayBuffer(arr.length)
	const dataView = new DataView(buffer)
	for(let i = 0, len = arr.length; i < len; i ++) {
		dataView.setUint8(i, arr[i])
	}
	return buffer
}


export default {
	connectBle,
	startBluetoothDeviceDiscovery,
	openBluetoothAdapter,
	getBluetoothServices,
	getBluetoothCharacteristics,
	strToBuffer,
	sendServiceMsg,
	getServiceMsg,
	stopService
}

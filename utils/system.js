export function isios() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('ios') !== -1 || system.indexOf('ipados') !== -1) {
		return true
	}else {
		return false
	}
}

export function isAndroid() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('android') !== -1) {
		return true
	}else {
		return false
	}
}

export function isWindow() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('window') !== -1) {
		return true
	}else {
		return false
	}
}
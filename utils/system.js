// 判断是否为ios系统
export function isios() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('ios') !== -1 || system.indexOf('ipados') !== -1) {
		return true
	}else {
		return false
	}
}

// 判断是否为安卓系统
export function isAndroid() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('android') !== -1) {
		return true
	}else {
		return false
	}
}

// 判断是否为window系统
export function isWindow() {
	let system = uni.getSystemInfoSync().system.toLowerCase()
	if(system.indexOf('window') !== -1) {
		return true
	}else {
		return false
	}
}

// #ifdef H5
// 判断是否为微信浏览器
export function isWeixin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger' || ua.match(/_SQ_/i) == '_sq_'){
      return true;
  } else{
      return false;
  }
}
// #endif
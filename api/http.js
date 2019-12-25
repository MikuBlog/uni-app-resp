import axios from '../js_sdk/gangdiedao-uni-axios'

// 给所有axios实例配置请求根路径
// axios.defaults.baseURL = "xxx"
 
// // 给所有axios实例配置跨域携带cookie
// axios.defaults.withCredentials = true

// 给所有axios实例配置统一的数据返回格式
axios.defaults.transformResponse = [(data) => {
	try {
		return JSON.parse(data).data
	}catch(e) {
		return data
	}
}]

// 请求拦截
function addInterceptors(obj) {
	obj
		.interceptors
		.request
		.use(config => {
			// 统一对中文字符编码
			config.url = encodeURI(config.url)
			// todo(如:对token统一进行处理, config.headers.Authorization)
		}, err => {
			// todo(发送请求失败)
		})
		
	obj
		.interceptors
		.response
		.use(config => {
			return response
		}, err => {
			// todo(如:对后台报错统一处理)
		})
}

const http_normal = axios.create({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	transformRequest: [(data) => {
		let str = ""
		for(let key in data) {
			str += `${key}=${data[key]}&`
		}
		return str.replace(/&$/, '')
	}]
})

const http_json = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

const http_file = axios.create({
	headers: {
		"Content-Type": "multipart/form-data"
	},
	transformRequest: [(data) => {
		const formData = new FormData()
		for(let key in data) {
			formData.append(key, data[key])
		}
		return formData
	}]
})

export default {
	http_normal,
	http_json,
	http_file
}

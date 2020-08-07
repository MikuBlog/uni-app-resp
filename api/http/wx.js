/**
 * @author xuanzai
 * @description 微信小程序专用axios封装模块
 */
import {
	baseUrl
} from '@/global/js/baseUrl.js'
import store from '@/store/index.js'
import axios from '@/js_sdk/gangdiedao-uni-axios'

// 给所有axios实例配置请求根路径
axios.defaults.baseURL = baseUrl
// 配置请求时限（15s） 
axios.defaults.timeout = 15000

// 给所有axios实例配置统一的数据返回格式
axios.defaults.transformResponse = [(data) => {
	try {
		return JSON.parse(data).data
	} catch (e) {
		return data.data
	}
}]

// 请求拦截
function addInterceptors(obj, isLoading = true) {
	obj
		.interceptors
		.request
		.use(config => {
			// 统一对中文字符编码
			config.url = encodeURI(config.url)
			// uni.setStorageSync('token', token)
			uni.getStorageSync('token') &&
				(config.headers.Authorization = `Bearer ${uni.getStorageSync('token')}`) &&
				(new RegExp(/\/auth\/login/g).test(config.url) || new RegExp(/\/auth\/loginWx/g).test(config.url) || new RegExp(
					/\/auth\/loginPh/g).test(config.url)) &&
				(config.headers.Authorization = "")
			// 为h5准备的测试token
			// config.headers.Authorization = `Bearer `
			isLoading && uni.showLoading({
				title: '加载中',
				mask: true
			})
			return config
		}, err => {
			uni.showToast({
				icon: 'none',
				title: '服务器出错，请联系客服进行处理'
			})
		})

	obj
		.interceptors
		.response
		.use(response => {
			isLoading && uni.hideLoading()
			return response
		}, err => {
			const regexp = new RegExp(/timeout/g)
			typeof err.response === "object" ?
				((err.response.status === 400) ?
					uni.showToast({
						icon: 'none',
						title: err.response.request.data.message.split(" ")[0]
					}) :
					(err.response.status === 401) ?
					(uni.showToast({
							icon: 'none',
							title: '请登录'
						}), uni.setStorageSync('token', ""), uni.setStorageSync('token', ''), !store.state.login.isLoginPage &&
						(
							uni.navigateTo({
								url: "/pages/login/index"
							}),
							store.commit("SET_LOGIN_STATUS", true)
						)) :
					(err.response.status === 403) ?
					uni.showToast({
						icon: 'none',
						title: '无权限,请联系客服开发权限'
					}) :
					(err.response.status === 404) ?
					uni.showToast({
						icon: 'none',
						title: '访问的接口不存在,请访问正确的接口'
					}) :
					(err.response.status === 500) ?
					uni.showToast({
						icon: 'none',
						title: '服务器出错,请联系客服进行处理'
					}) :
					(err.response.status === 502) ?
					uni.showToast({
						icon: 'none',
						title: '服务器已停止,请联系运维工程师重启服务器'
					}) :
					"") :
				(regexp.test(err) ?
					uni.showToast({
						icon: 'none',
						title: '请求超时,请联系客服进行处理'
					}) :
					uni.showToast({
						icon: 'none',
						title: '服务器出错,请联系客服进行处理'
					}))
			return Promise.reject(err)
		})
}

const http_normal = axios.create({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	transformRequest: [(data) => {
		let str = ""
		for (let key in data) {
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

const http_file = ({
	url,
	method,
	data
}) => {
	return new Promise((resolve, reject) => {
		let file = data.file
		delete data.file
		uni.showLoading({
			title: '加载中',
			mask: true
		})
		uni.uploadFile({
			url: `${baseUrl}${url}`,
			header: {
				Authorization: `Bearer ${uni.getStorageSync('token')}`
			},
			name: "file",
			filePath: file,
			formData: data,
			success: e => {
				resolve(JSON.parse(e.data))
			},
			fail: e => {
				reject(e)
			},
			complete: e => {
				uni.hideLoading()
			}
		})
	})
}

const http = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

addInterceptors(http_normal)
addInterceptors(http_json)
addInterceptors(http, false)

export default {
	http_normal,
	http_json,
	http_file,
	http
}

import Vue from 'vue'
// #ifdef H5
// 引入二次封装的axios模块
import Http from '@/api/http/h5'
// #endif
// #ifndef H5
// 引入二次封装的axios模块
import Http from '@/api/http/wx'
// #endif

Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file
Vue.prototype.$http = Http.http

// 引入存储模块（localStorage）
import Storage from '@/api/storage/index'

Vue.prototype.$setMemoryPmt = Storage.setMemoryPmt
Vue.prototype.$getMemoryPmt = Storage.getMemoryPmt
Vue.prototype.$clearMemoryPmt = Storage.clearMemoryPmt

// 引入modal
import Modal from '@/api/message/index'

Vue.prototype.$showModal = Modal.showModal
Vue.prototype.$showToast = Modal.showToast
Vue.prototype.$showLoading = Modal.showLoading
Vue.prototype.$hideLoading = Modal.hideLoading

// 引入navigate
import Navigate from '@/api/navigate/index'

Vue.prototype.$navigateTo = Navigate.navigateTo
Vue.prototype.$navigateBack = Navigate.navigateBack
Vue.prototype.$switchTab = Navigate.switchTab
Vue.prototype.$redirectTo = Navigate.redirectTo
Vue.prototype.$reLaunch = Navigate.reLaunch

// 引入date
import date from '@/api/date/index'

Vue.prototype.$formatDate = date.formatDate
Vue.prototype.$dateDiff = date.dateDiff
Vue.prototype.$setDay = date.setDay
Vue.prototype.$setMonth = date.setMonth
Vue.prototype.$setYear = date.setYear
Vue.prototype.$setDate = date.setDate
Vue.prototype.$fromNow = date.fromNow

// #ifdef MP-WEIXIN
// 获取授权信息
import Auth from '@/api/wx_progress/auth'
// 仅适用于微信小程序
Vue.prototype.$getLocationAuth = Auth.getLocationAuth
// #endif

// #ifdef H5
// 微信登录、微信支付、微信分享
import wxLogin from '@/api/h5/wx_login'
import wxPay from '@/api/pay/h5_wx_pay'
import wxShare from '@/api/h5/wx_share'
import jumpToOfficial from '@/api/h5/wx_official'
Vue.prototype.$wxLogin = wxLogin
Vue.prototype.$wxPay = wxPay
Vue.prototype.$wxShare = wxShare
Vue.prototype.$jumpToOfficial = jumpToOfficial
// base64转blob
import dataUrlToBlob from '@/api/file/get_file_image'
Vue.prototype.$dataUrlToBlob = dataUrlToBlob.dataUrlToBlob
// 选择文件
import getFile from '@/api/file/get_file'
Vue.prototype.$getFile = getFile
// 下载base64图片
import downloadBase64Image from '@/api/file/get_file_image'
Vue.prototype.$downloadBase64Image = downloadBase64Image.downloadBase64Image
// #endif

// #ifndef H5
// 微信支付
// import wxPay from '@/api/pay/auth.js'
// Vue.prototype.$wxPay = wxPay
// #endif

// #ifndef H5
// 解决图片翻转
import rotateImage from '@/api/file/rotate_image'
Vue.prototype.$rotateImage = rotateImage
// #endif

// #ifndef H5
// 获取位置信息与当前位置
import Location from '@/api/location/index'
Vue.prototype.$getLocation = Location.getLocation
Vue.prototype.$getAddress = Location.getAddress
// #endif

// 复制内容
import copy from '@/api/other/copy'
Vue.prototype.$copyText = copy

// 获取图片信息
import imageFile from '@/api/file/get_file_image'
Vue.prototype.$getImgFile = imageFile.getImgFile

// 下载文件
import download from '@/api/file/download'
Vue.prototype.$download = download
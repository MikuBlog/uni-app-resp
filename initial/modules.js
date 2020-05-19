import Vue from 'vue'
// #ifndef H5
// 引入二次封装的axios模块
import Http from '@/api/http_wx.js'
// #endif
// #ifdef H5
// 引入二次封装的axios模块
import Http from '@/api/http_h5.js'
// #endif

Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file
Vue.prototype.$http = Http.http

// 引入存储模块（localStorage）
import Storage from '@/api/storage'

Vue.prototype.$setMemoryPmt = Storage.setMemoryPmt
Vue.prototype.$getMemoryPmt = Storage.getMemoryPmt
Vue.prototype.$clearMemoryPmt = Storage.clearMemoryPmt

// 引入modal
import Modal from '@/api/modal'

Vue.prototype.$showModal = Modal.showModal
Vue.prototype.$showToast = Modal.showToast
Vue.prototype.$showLoading = Modal.showLoading
Vue.prototype.$hideLoading = Modal.hideLoading

// 引入navigate
import Navigate from '@/api/navigate'

Vue.prototype.$navigateTo = Navigate.navigateTo
Vue.prototype.$navigateBack = Navigate.navigateBack
Vue.prototype.$switchTab = Navigate.switchTab
Vue.prototype.$redirectTo = Navigate.redirectTo
Vue.prototype.$reLaunch = Navigate.reLaunch

// 引入date
import date from '@/api/date'

Vue.prototype.$formatDate = date.formatDate
Vue.prototype.$dateDiff = date.dateDiff
Vue.prototype.$setDay = date.setDay
Vue.prototype.$setMonth = date.setMonth
Vue.prototype.$setYear = date.setYear
Vue.prototype.$setDate = date.setDate
Vue.prototype.$fromNow = date.fromNow

// #ifdef MP-WEIXIN
// 获取授权信息
import Auth from '@/api/auth'
// 仅适用于微信小程序
Vue.prototype.$getLocationAuth = Auth.getLocationAuth
// #endif

// #ifdef H5
// 微信登录、微信支付、微信分享
import wxLogin from '@/api/h5_wx_login'
import wxPay from '@/api/h5_wx_pay'
import wxShare from '@/api/h5_wx_share'
Vue.prototype.$wxLogin = wxLogin
Vue.prototype.$wxPay = wxPay
Vue.prototype.$wxShare = wxShare
// #endif
// #ifndef H5
// 解决图片翻转
import rotateImage from '@/api/rotate_image'
Vue.prototype.$rotateImage = rotateImage
// #endif

// 复制内容
import copy from '@/api/copy'
Vue.prototype.$copyText = copy

// 获取图片信息
import imageFile from '@/api/get_file_image'
Vue.prototype.$getImgFile = imageFile.getImgFile

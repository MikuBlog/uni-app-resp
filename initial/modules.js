import Vue from 'vue'
// 引入二次封装的axios模块
import Http from '@/api/http'

Vue.prototype.$http_normal = Http.http_normal
Vue.prototype.$http_json = Http.http_json
Vue.prototype.$http_file = Http.http_file

// 引入存储模块
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
Vue.prototype.$timeDiff = date.timeDiff
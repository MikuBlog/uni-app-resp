import Vue from 'vue'
import App from './App'
// 引入vuex
import store from './store/index.js'
import { baseUrl } from '@/global/js/baseUrl.js'

/**
 * 引入模块
 */
import '@/initial/modules'
/**
 * 引入样式及组件
 */
import '@/initial/UI'

Vue.config.productionTip = false

Vue.prototype.baseUrl = baseUrl

//把vuex定义成全局组件
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()

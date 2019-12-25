import Vue from 'vue'
import App from './App'

/**
 * 引入模块
 */
import './initial/modules'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

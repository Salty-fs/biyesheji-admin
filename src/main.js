import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/elementConfig'
import './plugins/echartsConfig'
import {i18n} from './plugins/i18n.js'
import ElementUI from 'element-ui'


import {parseTime} from '@/views/excel/utils'

import axios from 'axios' 

// 全局配置 axios 请求的根路径, 可以不写.
axios.defaults.baseURL = 'http://localhost:3000' 
// 把 axios 挂载到 Vue 原型上. 今后,在每个 .vue 组件中发起请求,直接调用 this.$http 即可.
Vue.prototype.$http = axios 

Vue.use(ElementUI)

Vue.filter("parseTime",parseTime)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

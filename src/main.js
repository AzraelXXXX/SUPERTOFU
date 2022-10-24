import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1'
// 把axios挂载到Vue.prototype上，供每个.vue组件的实例直接使用
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

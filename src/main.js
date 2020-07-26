import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/base.scss'
import Http from './api/http'


Vue.config.productionTip = false

Vue.prototype.$Http = Http // 把Http挂载到Vue实例上 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

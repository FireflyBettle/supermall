import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './network/mock'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

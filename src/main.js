import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false

window.Event = new Vue({
  render: h => h(App),
  store
}).$mount('#app')

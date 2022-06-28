import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
// 引入全部样式
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
import ToutiaoIcon from './components/ToutiaoIcon'
Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  ToutiaoIcon,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
// import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/flexible/flexible.js'
import '@/style/reset.less'
import '@/style/common-active.css'
import '../theme/index.css'
import '@/style/base.less'
import '@/style/index.css'
import { baseFn } from './components/BaseFn/BaseFn'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(baseFn)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

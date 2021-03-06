import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store'
import './registerServiceWorker'
// 引入ant样式
import 'ant-design-vue/dist/antd.css'
// 引入公共样式
import "@/assets/css/common.css"
// 引入阿里图标
import "@/assets/css/iconfont.css"
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// editor
import mavonEditor from 'mavon-editor'
// use
Vue.use(mavonEditor)
import "@/assets/js/iconfont.js"

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

router.afterEach(route => {
  NProgress.done();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

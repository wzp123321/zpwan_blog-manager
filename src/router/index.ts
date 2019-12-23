import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入模块
const Home = () => import('@/views/Home.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router

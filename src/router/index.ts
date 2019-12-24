import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入模块
const Home = () => import('@/views/Home.vue')
const NotFound = () => import('@/components/404.vue')
const AdminModule = () => import("@/components/pages/admin/index.vue")
const ArticleModule = () => import("@/components/pages/article/index.vue")
const CatalogModule = ()=>import("@/components/pages/catalog/index.vue")
const TagModule = ()=>import("@/components/pages/tags/index.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/app"
  },
  {
    path: '/app',
    component: Home,
    redirect: "/app/admin",
    children: [
      {
        path: "/app/admin",
        component: AdminModule,
      },
      {
        path: "/app/article",
        component: ArticleModule
      },
      {
        path: "/app/catalog",
        component: CatalogModule,
      },
      {
        path: "/app/tags",
        component: TagModule
      }
    ]
  },
  {
    path: "/notfound",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/notfound"
  },
]

const router = new VueRouter({
  routes
})

export default router

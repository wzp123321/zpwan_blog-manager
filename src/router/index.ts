import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入模块
const Home = () => import('@/views/Home.vue')
const NotFound = () => import('@/components/404.vue')
// 管理员模块
const AdminModule = () => import("@/components/pages/admin/index.vue")
// 字典模块
const DictionaryModule = () => import("@/components/pages/dictionary/index.vue")
//文章模块
const ArticleModule = () => import("@/components/pages/article/index.vue")
const ArticleList = () => import("@/components/pages/article/article_list.vue")
const ArticleCreate = () => import("@/components/pages/article/article_add.vue")
const ArticleDetail = () => import("@/components/pages/article/article_detail.vue")
const ArticleEdit = () => import("@/components/pages/article/article_add.vue")
//banner模块
const BannerModule = () => import("@/components/pages/banners/index.vue")
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/app"
  },
  {
    path: '/app',
    component: Home,
    meta: {
      name: "首页"
    },
    redirect: "/app/admin",
    children: [
      {
        path: "/app/admin",
        meta: {
          name: "个人中心"
        },
        component: AdminModule,
      },
      {
        path: "/app/article",
        component: ArticleModule,
        meta: {
          name: "文章管理"
        },
        redirect: "/app/article/list",
        children: [
          {
            path: "/app/article/list",
            meta: {
              name: "文章列表"
            },
            component: ArticleList
          },
          {
            path: "/app/article/detail/:id",
            meta: {
              name: "文章详情"
            },
            component: ArticleDetail
          },
          {
            path: "/app/article/add",
            meta: {
              name: "文章新增"
            },
            component: ArticleCreate
          },
          {
            path: "/app/article/edit/:id",
            meta: {
              name: "文章编辑"
            },
            component: ArticleEdit
          },
        ]
      },
      {
        path: "/app/dictionary",
        meta: {
          name: "字典管理"
        },
        component: DictionaryModule
      },
      {
        path: "/app/banner",
        meta: {
          name: "banner管理"
        },
        component: BannerModule
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

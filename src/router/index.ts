import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { articleRouter } from './modules/article'
import { webManageRouter } from './modules/webmanager/index'
import { dictionaryRouter } from './modules/dictionary'
import { commentRouter } from './modules/comment'
import { utilRouter } from './modules/util'
const Home = () => import('@/views/Home.vue')
const Dashboard = () => import('@/components/pages/dashboard/index.vue')
const NotFound = () => import('@/components/404.vue')
const SigninModule = () => import("@/components/Signin.vue")
const GIthub_LoginModule = () => import("@/components/Github_Login.vue")
//前台管理模块 用户信息&&banner
const WebManagerModule = () => import("@/components/pages/web_manager/index.vue")
// 字典模块
const DictionaryModule = () => import("@/components/pages/dictionary/index.vue")
//文章模块
const ArticleModule = () => import("@/components/pages/article_manager/index.vue")
// 工具模块
const UtilModule = () => import("@/components/pages/common-manage/index.vue")
// 评论模块
const CommentModule = () => import("@/components/pages/comment_manager/index.vue")

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: "/app"
  },
  {
    path: '/app',
    component: Home,
    meta: {
      isAside: true,
      name: "首页"
    },
    redirect: "/app/dashboard",
    children: [
      {
        path: '/app/dashboard',
        component: Dashboard,
      },
      {
        path: "/app/webmanager",
        meta: {
          name: "前台管理",
          icon: 'user',
          isAside: true,
        },
        redirect: "/app/webmanager/admin",
        component: WebManagerModule,
        children: webManageRouter
      },
      {
        path: "/app/dictionary",
        meta: {
          name: "字典管理",
          icon: 'database',
          isAside: true,
        },
        redirect: "/app/catalog/list",
        component: DictionaryModule,
        children: dictionaryRouter
      },
      {
        path: "/app/comment",
        meta: {
          name: "评论管理",
          icon: 'edit',
          isAside: true,
        },
        redirect: "/app/comment/list",
        component: CommentModule,
        children: commentRouter
      },
      {
        path: "/app/manage",
        meta: {
          name: "工具管理",
          icon: 'setting',
          isAside: true,
        },
        component: UtilModule,
        redirect: "/app/manage/util",
        children: utilRouter
      },
      {
        path: "/app/article",
        component: ArticleModule,
        meta: {
          name: "文章管理",
          icon: 'file',
          isAside: true,
        },
        redirect: "/app/article/list",
        children: articleRouter
      }
    ]
  },
  {
    path: "/signin",
    component: SigninModule
  },
  {
    path: "/signin_github",
    component: GIthub_LoginModule
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
  base: '/blogManageWeb',
  mode: "history",
  routes
})

export { router, routes }

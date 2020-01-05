import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home.vue')
const NotFound = () => import('@/components/404.vue')
const SigninModule = () => import("@/components/Signin.vue")
const QQ_LoginModule = () => import("@/components/QQ_Login.vue")
//前台管理模块 用户信息&&banner
const WebManagerModule = () => import("@/components/pages/web_manager/index.vue")
const BannerModule = () => import("@/components/pages/web_manager/banners/index.vue")
const BannerCreate = () => import("@/components/pages/web_manager/banners/banner_create.vue")
const BannerList = () => import("@/components/pages/web_manager/banners/banner_list.vue")
const AdminModule = () => import("@/components/pages/web_manager/admin/index.vue")
// 字典模块
const DictionaryModule = () => import("@/components/pages/dictionary/index.vue")
//文章模块
const ArticleModule = () => import("@/components/pages/article_manager/index.vue")
const ArticleList = () => import("@/components/pages/article_manager/article_list.vue")
const ArticleCreate = () => import("@/components/pages/article_manager/article_add.vue")
const ArticleDetail = () => import("@/components/pages/article_manager/article_detail.vue")
const ArticleEdit = () => import("@/components/pages/article_manager/article_add.vue")

// 工具模块
const UtilModule = () => import("@/components/pages/util/index.vue")
// 评论模块
const CommentModule = () => import("@/components/pages/comment_manager/index.vue")
const CommentList = () => import("@/components/pages/comment_manager/comment_list/index.vue")
const WhiteList = () => import("@/components/pages/comment_manager/whitelist_manager/index.vue")
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
    redirect: "/app/webmanager",
    children: [
      {
        path: "/app/webmanager",
        meta: {
          name: "前台管理"
        },
        redirect: "/app/webmanager/admin",
        component: WebManagerModule,
        children: [
          {
            path: "/app/webmanager/admin",
            meta: {
              name: "用户信息管理"
            },
            component: AdminModule,
          },
          {
            path: "/app/webmanager/banner",
            meta: {
              name: "banner管理"
            },
            redirect: "/app/webmanager/banner/list",
            component: BannerModule,
            children: [
              {
                path: "/app/webmanager/banner/list",
                meta: {
                  name: "banner列表"
                },
                component: BannerList
              },
              {
                path: "/app/webmanager/banner/add",
                meta: {
                  name: "banner新增"
                },
                component: BannerCreate
              },
              {
                path: "/app/webmanager/banner/edit/:id",
                meta: {
                  name: "banner编辑"
                },
                component: BannerCreate
              },
            ]
          },
        ]
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
        path: "/app/comment",
        meta: {
          name: "评论管理"
        },
        redirect: "/app/comment/list",
        component: CommentModule,
        children: [
          {
            path: "/app/comment/list",
            meta: {
              name: "评论列表"
            },
            component: CommentList
          },
          {
            path: "/app/comment/whitelist",
            meta: {
              name: "评论白名单管理"
            },
            component: WhiteList
          },
        ]
      },
      {
        path: "/app/util",
        component: UtilModule
      }
    ]
  },
  {
    path: "/signin",
    component: SigninModule
  },
  {
    path: "/signin_qq",
    component: QQ_LoginModule
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
  mode: "hash",
  routes
})

export default router

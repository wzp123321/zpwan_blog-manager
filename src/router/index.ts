import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Dashboard = () => import('@/components/pages/dashboard/index.vue')
const NotFound = () => import('@/components/404.vue')
const SigninModule = () => import("@/components/Signin.vue")
const GIthub_LoginModule = () => import("@/components/Github_Login.vue")
//前台管理模块 用户信息&&banner
const WebManagerModule = () => import("@/components/pages/web_manager/index.vue")
const BannerModule = () => import("@/components/pages/web_manager/banners/index.vue")
const BannerCreate = () => import("@/components/pages/web_manager/banners/banner_create.vue")
const BannerList = () => import("@/components/pages/web_manager/banners/banner_list.vue")
const NoticeManage = () => import("@/components/pages/web_manager/notice-manage/index.vue")
const AdminListManage = () => import("@/components/pages/web_manager/admin-manage/index.vue")
const FriendlyModule = () => import("@/components/pages/web_manager/friendly_link/index.vue")
const FriendlyLinkList = () => import("@/components/pages/web_manager/friendly_link/friendly_link_list.vue")
const FriendlyLinkEditAdd = () => import("@/components/pages/web_manager/friendly_link/friendly_link_edit_add.vue")
// 字典模块
const DictionaryModule = () => import("@/components/pages/dictionary/index.vue")
const CatalogModule = () => import("@/components/pages/dictionary/catalog-manager/index.vue")
const TagModule = () => import("@/components/pages/dictionary/tag-manager/index.vue")
//文章模块
const ArticleModule = () => import("@/components/pages/article_manager/index.vue")
const ArticleList = () => import("@/components/pages/article_manager/article_list.vue")
const ArticleCreate = () => import("@/components/pages/article_manager/article_add.vue")
const ArticleDetail = () => import("@/components/pages/article_manager/article_detail.vue")
const ArticleEdit = () => import("@/components/pages/article_manager/article_add.vue")

// 工具模块
const UtilModule = () => import("@/components/pages/common-manage/index.vue")
const UtilManage = () => import("@/components/pages/common-manage/util-manage/index.vue")
const TaskManage = () => import("@/components/pages/common-manage/task-manage/index.vue")
// 评论模块
const CommentModule = () => import("@/components/pages/comment_manager/index.vue")
const CommentList = () => import("@/components/pages/comment_manager/comment_list/index.vue")
const LeaveMessageList = () => import("@/components/pages/comment_manager/leaveMessage_manager/index.vue")
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
    redirect: "/app/dashboard",
    children: [
      {
        path: '/app/dashboard',
        component: Dashboard,
      },
      {
        path: "/app/webmanager",
        meta: {
          name: "前台管理"
        },
        redirect: "/app/webmanager/admin",
        component: WebManagerModule,
        children: [
          {
            path: "/app/webmanager/notice",
            meta: {
              name: "web通知管理"
            },
            component: NoticeManage,
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
          {
            path: "/app/webManager/adminlist",
            component: AdminListManage,
            meta: { name: "管理员管理" },
          },
          {
            path: "/app/webManager/friendlink",
            component: FriendlyModule,
            meta: { name: "友情链接管理" },
            redirect: "/app/webManager/friendlink/list",
            children: [
              {
                path: "/app/webManager/friendlink/list",
                component: FriendlyLinkList,
                meta: { name: "友情链接列表" },
              },
              {
                path: "/app/webManager/friendlink/add",
                component: FriendlyLinkEditAdd,
                meta: { name: "友情链接新增" },
              },
              {
                path: "/app/webManager/friendlink/edit/:id",
                component: FriendlyLinkEditAdd,
                meta: { name: "友情链接编辑" },
              }
            ]
          }
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
        redirect: "/app/catalog/list",
        component: DictionaryModule,
        children: [
          {
            path: "/app/catalog/list",
            meta: {
              name: "目录管理"
            },
            component: CatalogModule
          },
          {
            path: "/app/tag/list",
            meta: {
              name: "tag管理"
            },
            component: TagModule
          },
        ]
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
            path: "/app/message/list",
            meta: {
              name: "留言列表"
            },
            component: LeaveMessageList
          },
        ]
      },
      {
        path: "/app/manage",
        meta: {
          name: "工具管理"
        },
        component: UtilModule,
        redirect: "/app/manage/util",
        children: [
          {
            path: "/app/manage/util",
            meta: {
              name: "工具操作"
            },
            component: UtilManage
          },
          {
            path: "/app/manage/task",
            meta: {
              name: "任务管理"
            },
            component: TaskManage
          },
        ]
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
  mode: "history",
  routes
})

export default router

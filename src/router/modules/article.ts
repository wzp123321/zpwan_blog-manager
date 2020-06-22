const ArticleList = () => import("@/components/pages/article_manager/article_list.vue")
const ArticleCreate = () => import("@/components/pages/article_manager/article_add.vue")
const ArticleDetail = () => import("@/components/pages/article_manager/article_detail.vue")
const ArticleEdit = () => import("@/components/pages/article_manager/article_add.vue")

export const articleRouter = [
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
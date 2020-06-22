const BannerCreate = () => import("@/components/pages/web_manager/banners/banner_create.vue")
const BannerList = () => import("@/components/pages/web_manager/banners/banner_list.vue")

export const bannerRouter = [
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
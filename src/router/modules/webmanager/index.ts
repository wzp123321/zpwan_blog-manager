import { bannerRouter } from './banner'
import { friendLinkRouter } from './friendlink'
const BannerModule = () => import("@/components/pages/web_manager/banners/index.vue")
const NoticeManage = () => import("@/components/pages/web_manager/notice-manage/index.vue")
const AdminListManage = () => import("@/components/pages/web_manager/admin-manage/index.vue")
const FriendlyModule = () => import("@/components/pages/web_manager/friendly_link/index.vue")
const MusicModule = () => import('@/components/pages/web_manager/music-manage/index.vue')

export const webManageRouter = [
    {
        path: "/app/webmanager/notice",
        meta: {
            name: "web通知管理",
            isAside: true,
        },
        component: NoticeManage,
    },
    {
        path: "/app/webmanager/banner",
        meta: {
            name: "banner管理",
            isAside: true,
        },
        redirect: "/app/webmanager/banner/list",
        component: BannerModule,
        children: bannerRouter
    },
    {
        path: "/app/webManager/adminlist",
        component: AdminListManage,
        meta: { name: "管理员管理", isAside: true },
    },
    {
        path: "/app/webManager/friendlink",
        component: FriendlyModule,
        meta: { name: "友情链接管理", isAside: true },
        redirect: "/app/webManager/friendlink/list",
        children: friendLinkRouter
    },
    {
        path: "/app/webManager/music",
        component: MusicModule,
        meta: { name: "音乐管理", isAside: true },
    }
]
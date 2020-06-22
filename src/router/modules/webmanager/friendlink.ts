const FriendlyLinkList = () => import("@/components/pages/web_manager/friendly_link/friendly_link_list.vue")
const FriendlyLinkEditAdd = () => import("@/components/pages/web_manager/friendly_link/friendly_link_edit_add.vue")
export const friendLinkRouter = [
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
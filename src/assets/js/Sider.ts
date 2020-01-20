export const SiderRouters: Array<MenuInfo> = [
    {
        name: "前台管理",
        en_name: "webManager",
        icon: "user",
        children: [
            {
                name: "用户信息管理",
                en_name: "personal",
                url: "/app/webmanager/admin"
            },
            {
                name: "首页banner管理",
                en_name: "banner",
                url: "/app/webmanager/banner/list"
            },
            {

                name: "管理员列表",
                en_name: "adminList",
                url: "/app/webManager/adminlist"
            },
            {
                name: "友情链接列表",
                en_name: "friendly_link",
                url: "/app/webManager/friendlink"
            }
        ]
    },
    {
        name: "评论管理",
        en_name: "commentManager",
        icon: "edit",
        children: [
            {
                name: "评论列表",
                en_name: "commentlist",
                url: "/app/comment/list"
            },
            {
                name: "留言列表",
                en_name: "leaveMessageList",
                url: "/app/message/list"
            }
        ]
    },
    {
        name: "字典管理",
        icon: "database",
        en_name: "dictionary",
        url: "/app/dictionary",
        children: [
            {
                name: "目录管理",
                en_name: "cataloglist",
                url: "/app/catalog/list"
            },
            {
                name: "tag管理",
                en_name: "taglist",
                url: "/app/tag/list"
            }
        ]
    },
    {
        name: "文章管理",
        icon: "file",
        en_name: "article",
        url: "/app/article/list"
    },
    {
        name: "Util工具",
        icon: "setting",
        en_name: "util",
        url: "/app/util"
    }
];
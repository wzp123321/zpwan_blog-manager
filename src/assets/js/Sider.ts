export const SiderRouters: Array<MenuInfo> = [
    {
        name: "前台管理",
        en_name: "webManager",
        icon: "user",
        children: [
            {
                name: "web通知管理",
                en_name: "notice",
                url: "/app/webmanager/notice"
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
        name: "公共模块",
        icon: "setting",
        en_name: "util",
        url: "/app/manage",
        children: [
            {
                name: "工具管理",
                en_name: "utilmanage",
                url: "/app/manage/util"
            },
            {
                name: "任务管理",
                en_name: "tasklist",
                url: "/app/manage/task"
            },
            {
                name: "图片管理",
                en_name: "picturelist",
                url: "/app/manage/picture"
            }
        ]
    }
];
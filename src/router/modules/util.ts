const UtilManage = () => import("@/components/pages/common-manage/util-manage/index.vue")
const TaskManage = () => import("@/components/pages/common-manage/task-manage/index.vue")
const PictureModule = () => import("@/components/pages/common-manage/picture-manage/index.vue")
export const utilRouter = [
    {
        path: "/app/manage/util",
        meta: {
            name: "工具操作",
            isAside: true,
        },
        component: UtilManage
    },
    {
        path: "/app/manage/task",
        meta: {
            name: "任务管理",
            isAside: true,
        },
        component: TaskManage
    },
    {
        path: "/app/manage/picture",
        meta: {
            name: "图片管理",
            isAside: true,
        },
        component: PictureModule
    },
]
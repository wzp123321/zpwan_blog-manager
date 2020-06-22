const CommentList = () => import("@/components/pages/comment_manager/comment_list/index.vue")
const LeaveMessageList = () => import("@/components/pages/comment_manager/leaveMessage_manager/index.vue")
export const commentRouter = [
    {
        path: "/app/comment/list",
        meta: {
            name: "评论列表",
            isAside: true,
        },
        component: CommentList
    },
    {
        path: "/app/message/list",
        meta: {
            name: "留言列表",
            isAside: true,
        },
        component: LeaveMessageList
    },
]
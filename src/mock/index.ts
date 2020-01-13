export const comments = [
    {
        id: "1111111111111",
        content: "测试一下啊",
        author: {
            name: "张三",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
        },
        ups: [],
        downs: [],
        parent_id: "",
        is_root: true,
        reply_owner: {},
        children: [
            {
                id: "2222222222222",
                content: "测试一下啊qqewqe",
                author: {
                    name: "张三111",
                    avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
                },
                ups: [],
                downs: [],
                parent_id: "1111111111111",
                is_root: false,
                reply_owner: {
                    name: "张三",
                    avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
                }
            },
            {
                id: "44444444444",
                content: "测试一下啊22222222222",
                author: {
                    name: "张三5555",
                    avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
                },
                ups: [],
                downs: [],
                parent_id: "1111111111111",
                is_root: false,
                reply_owner: {
                    name: "张三111",
                    avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
                }
            }
        ]
    },
    {
        id: "3333333333333",
        content: "测试一下啊",
        author: {
            name: "张三",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
        },
        ups: [],
        downs: [],
        parent_id: "",
        is_root: true,
        reply_owner: {}
    },
    {
        id: "55555555555",
        content: "测试一下啊",
        author: {
            name: "张三",
            avatar: "http://127.0.0.1:9898/B4B269BDBD69EF82FE920B2BBB489AFC.jpg"
        },
        ups: [],
        downs: [],
        parent_id: "",
        is_root: true,
        reply_owner: {}
    }
]
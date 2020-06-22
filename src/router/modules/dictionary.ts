const CatalogModule = () => import("@/components/pages/dictionary/catalog-manager/index.vue")
const TagModule = () => import("@/components/pages/dictionary/tag-manager/index.vue")
export const dictionaryRouter = [
    {
        path: "/app/catalog/list",
        meta: {
            name: "目录管理",
            isAside: true,
        },
        component: CatalogModule
    },
    {
        path: "/app/tag/list",
        meta: {
            name: "tag管理",
            isAside: true,
        },
        component: TagModule
    },
] 
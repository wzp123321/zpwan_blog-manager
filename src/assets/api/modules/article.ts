import { getRequest, postRequest } from "@/assets/api/request"

const ArticleModule = {
    async getArticleList(params: { [key: string]: any }) {
        const url = '/article/list'
        return getRequest(url, params);
    },

    async getArticleAdd(params: { [key: string]: any }) {
        const url = '/article/add'
        return postRequest(url, params);
    },

    async getArticleUpdate(params: { [key: string]: any }) {
        const url = '/article/update'
        return postRequest(url, params);
    },

    async getArticleInfoById(params: { [key: string]: any }) {
        const url = '/article/getById'
        return getRequest(url, params);
    },

    async getArticleTop(params: { [key: string]: any }) {
        const url = '/article/top'
        return getRequest(url, params);
    },

    async getArticleDelete(params: { [key: string]: any }) {
        const url = '/article/delete'
        return getRequest(url, params);
    },

    async getArticleRecommend(params: { [key: string]: any }) {
        const url = '/article/recommend'
        return getRequest(url, params);
    },

    async getArticleShelves(params: { [key: string]: any }) {
        const url = '/article/shelves'
        return getRequest(url, params);
    },
}

export default ArticleModule
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

    async getArticleInfoById(params: { [key: string]: any }) {
        const url = '/article/getById'
        return getRequest(url, params);
    }
}

export default ArticleModule
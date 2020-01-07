import { getRequest, postRequest } from "@/assets/api/request"

const ArticleModule = {
    async getArticleList(params: { [key: string]: any }) {
        const url = '/article/list'
        return getRequest(url, params);
    }
}

export default ArticleModule
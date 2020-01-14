import { getRequest, postRequest } from '../request'

export default {
    /**
     * 
     * @param params 测试专用
     */
    async getCommentCreate(params: { [key: string]: any }) {
        const url = "/comment/add";
        return postRequest(url, params);
    },

    async getCommentList(params: { [key: string]: any }) {
        const url = "/comment/list";
        return getRequest(url, params);
    },

    async getCommentDelete(params: { [key: string]: any }) {
        const url = "/comment/delete";
        return postRequest(url, params);
    },

    async getCommentArticleType(params: { [key: string]: any }) {
        const url = "/comment/articletype";
        return postRequest(url, params);
    }
}
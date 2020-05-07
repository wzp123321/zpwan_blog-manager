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
    },

    async getLeaveMessageList(params: { [key: string]: any }) {
        const url = "/leavemessage/web/list";
        return getRequest(url, params);
    },

    async getLeaveMessageShelves(params: { [key: string]: any }) {
        const url = "/leavemessage/isShelves";
        return postRequest(url, params);
    },

    async getLeaveMessageGood(params: { [key: string]: any }) {
        const url = "/leavemessage/isGood";
        return postRequest(url, params);
    },

    async getLeaveMessageDelete(params: { [key: string]: any }) {
        const url = "/leavemessage/delete";
        return postRequest(url, params);
    },

}
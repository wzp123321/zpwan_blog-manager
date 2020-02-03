import { getRequest, postRequest } from '../request'
export default {
    async getTokenByUserId(params: { [key: string]: any }) {
        const url = "/token/getById";
        return postRequest(url, params);
    },

    async getAdminLogin(params: { [key: string]: any }) {
        const url = "/admin/login";
        return postRequest(url, params);
    },


    async geTouristList(params: { [key: string]: any }) {
        const url = "/admin/list";
        return getRequest(url, params);
    },

    async getAdminLoginConfirm(params: { [key: string]: any }) {
        const url = "/login/confirm";
        return getRequest(url, params);
    },

    async getAdminDelete(params: { [key: string]: any }) {
        const url = "/admin/delete";
        return getRequest(url, params);
    },

    async getAdminCreate(params: { [key: string]: any }) {
        const url = "/admin/add";
        return postRequest(url, params);
    },

    async getAdminInfoById(params: { [key: string]: any }) {
        const url = "/admin/getById";
        return getRequest(url, params);
    },

    async getAdminUpdateById(params: { [key: string]: any }) {
        const url = "/admin/update";
        return postRequest(url, params);
    }
}
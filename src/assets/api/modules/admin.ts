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
        const url = "/tourist/list";
        return getRequest(url, params);
    },

}
import { getRequest, postRequest } from '../request'

export default {
    async getPictureList(params: { [key: string]: any }) {
        const url = "/picture/list";
        return getRequest(url, params);
    },

    async getPictureDelete(params: { [key: string]: any }) {
        const url = "/picture/delete";
        return postRequest(url, params);
    }
}
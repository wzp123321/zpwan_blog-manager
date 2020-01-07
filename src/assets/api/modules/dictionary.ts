import { getRequest, postRequest } from '../request'

export default {
    async getDictionaryList(params: { [key: string]: any }) {
        const url = '/dictionary/list';
        return getRequest(url, params);
    },

    async getDictionaryDelete(params: { [key: string]: any }) {
        const url = '/dictionary/delete';
        return getRequest(url, params);
    },

    async getDictionaryAdd(params: { [key: string]: any }) {
        const url = '/dictionary/add';
        return postRequest(url, params);
    }
}
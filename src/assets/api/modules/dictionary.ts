import { getRequest, postRequest } from '../request'

export default {
    async getCatalogList(params: { [key: string]: any }) {
        const url = '/dictionary/list';
        return getRequest(url, params);
    },

    async getCatalogDelete(params: { [key: string]: any }) {
        const url = '/dictionary/delete';
        return getRequest(url, params);
    },

    async getCatalogAdd(params: { [key: string]: any }) {
        const url = '/dictionary/add';
        return postRequest(url, params);
    },

    async getCatalogInfoById(params: { [key: string]: any }) {
        const url = '/dictionary/getById';
        return getRequest(url, params);
    },

    async getCatalogInfoUpdate(params: { [key: string]: any }) {
        const url = '/dictionary/update';
        return postRequest(url, params);
    },

    // tag
    async getTagList(params: { [key: string]: any }) {
        const url = '/tag/list';
        return getRequest(url, params);
    },

    async getTagAdd(params: { [key: string]: any }) {
        const url = '/tag/add';
        return postRequest(url, params);
    },

    async getTagDelete(params: { [key: string]: any }) {
        const url = '/tag/delete';
        return postRequest(url, params);
    },
}
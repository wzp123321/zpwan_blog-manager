import { getRequest, postRequest } from "../request"

const FriendlyLinkModule = {
    async getFriendlyLinkList(params: { [key: string]: any }) {
        const url = "/friendlylink/list";
        return getRequest(url, params);
    },

    async getFriendlyLinkAdd(params: { [key: string]: any }) {
        const url = "/friendlylink/add";
        return postRequest(url, params);
    },

    async getFriendlyLinkUpdate(params: { [key: string]: any }) {
        const url = "/friendlylink/update";
        return postRequest(url, params);
    },

    async getFriendlyLinkInfoById(params: { [key: string]: any }) {
        const url = "/friendlylink/getById";
        return getRequest(url, params);
    }
}

export default FriendlyLinkModule
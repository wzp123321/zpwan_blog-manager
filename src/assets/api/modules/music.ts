import { getRequest, postRequest } from '../request'
const MusicModule = {
    async getMusicList(params: { [key: string]: any }) {
        const url = "/music/list";
        return getRequest(url, params);
    },
    async getMusicCreate(params: { [key: string]: any }) {
        const url = "/music/add";
        return postRequest(url, params);
    },
    async getMusicUpdate(params: { [key: string]: any }) {
        const url = "/music/update";
        return postRequest(url, params);
    },
    async getMusicInfoById(params: { [key: string]: any }) {
        const url = "/music/getById";
        return getRequest(url, params);
    },
    async getMusicDelete(params: { [key: string]: any }) {
        const url = "/music/delete";
        return postRequest(url, params);
    },
}

export default MusicModule
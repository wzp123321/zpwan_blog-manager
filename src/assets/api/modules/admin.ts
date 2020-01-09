import { getRequest, postRequest } from '../request'
export default {
    async handleUserLoginByGithub(params: { [key: string]: any }) {
        const url = "/login/github";
        return postRequest(url, params);
    }
}
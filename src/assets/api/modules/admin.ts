import { getRequest, postRequest } from '../request'
export default {
    async getTokenByUserId(params:{[key:string]:any}){
        const url = "/token/getById";
        return postRequest(url,params);
    }
}
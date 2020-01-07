import {getRequest ,postRequest} from '../request'

export default {
    async getDictionaryList(params:{[key:string]:any}){
        const url = '';
        return getRequest(url,params);
    }
}
import { fielUploadRequest } from '../request'
export default {
    async handleFileUploader(params: { [key: string]: any }) {
        const url = '/filemodule/upload';
        return fielUploadRequest(url,params);
     }
}
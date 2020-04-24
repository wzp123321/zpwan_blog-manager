import axios from 'axios'
import { AxiosResponse } from 'axios'
const env = process.env.NODE_ENV;
const url = env === 'production' ? "http://132.232.66.140:9898/blogManage/filemodule/upload" : "http://127.0.0.1:9898/blogManage/filemodule/upload";

export const handleFileUpload = async (file: File, callback: Function) => {

    const res: AxiosResponse<ApiResponse<FileInfo>> = await axios({
        url,
        method: "post",
        headers: {
            "Content-Type": "multipart/form-data",
            'token': localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
        },
        data: {
            file: file
        },
        transformRequest: [
            function (oldData) {
                var form = new FormData();
                for (let item in oldData) {
                    form.append(item, oldData[item]);
                }
                return form;
            }
        ]
    })

    if (res.data.code === 403) {
        window.location.href = "/blogManageWeb/#/signin";
        localStorage.clear();
    }
    callback(res.data);
}
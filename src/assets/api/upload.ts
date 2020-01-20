import axios from 'axios'
import { AxiosResponse } from 'axios'
export const handleFileUpload = async (file: File, callback: Function) => {

    const res: AxiosResponse<ApiResponse<FileInfo>> = await axios({
        url: "http://127.0.0.1:9898/blogManage/filemodule/upload",
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
        window.location.href = "/signin";
        localStorage.clear();
    }
    callback(res.data);
}
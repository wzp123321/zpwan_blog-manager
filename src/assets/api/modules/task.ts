import { getRequest, postRequest } from "../request"

const TaskModule = {
    async getTaskAdd(params: { [key: string]: any }) {
        const url = "/task/add";
        return postRequest(url, params);
    },
    async getTaskList(params: { [key: string]: any }) {
        const url = "/task/list";
        return getRequest(url, params);
    },

    async getTaskUpdate(params: { [key: string]: any }) {
        const url = "/task/update";
        return postRequest(url, params);
    },

    async getTaskBathComplete(params: { [key: string]: any }) {
        const url = "/task/bathComplete";
        return getRequest(url, params);
    },

    async getTaskInfoById(params: { [key: string]: any }) {
        const url = "/task/getById";
        return getRequest(url, params);
    },

    async getTaskDeleteById(params: { [key: string]: any }) {
        const url = "/task/delete";
        return getRequest(url, params);
    }
}
export default TaskModule
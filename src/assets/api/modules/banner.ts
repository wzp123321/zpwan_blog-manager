import {
  getRequest,
  postRequest
} from "../request"

export default {
  async getBannerList(params: { [key: string]: any }) {
    const url = "/banner/list"
    return getRequest(url, params)
  },

  async getBannerAdd(params: { [key: string]: any }) {
    const url = "/banner/add"
    return postRequest(url, params)
  },

  async getBannerUpdate(params: { [key: string]: any }) {
    const url = "/banner/update"
    return postRequest(url, params)
  },

  async getBannerInfoById(params: { [key: string]: any }) {
    const url = "/banner/getById"
    return getRequest(url, params)
  }
}

import {
  getRequest,
  postRequest
} from "../request.js"

export default {
  async getBannerList(params) {
    const url = "/mock/banner/list"
    return getRequest(url, params)
  }
}

import {
  getRequest,
  postRequest
} from "../request"

export default {
  async getBannerList(params: { [key: string]: any }) {
    const url = "/mock/banner/list"
    return getRequest(url, params)
  }
}

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

// timeout 10min
const Global_Delay = 10 * 60 * 1000;

const BASE_URL = 'http://127.0.0.1:9898/blogManage';
// 定义一个空的数组，用于存放请求中的参数

// 创建axios实例
const axiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: Global_Delay,
  });
  return instance;
};


// 请求实例
const publicReq = async (params: { [key: string]: any }) => {
  const {
    url,
    method,
    param
  } = params;
  const instance = axiosInstance();
  return await instance({
    url,
    method,
    // 在请求头里面添加token 如果没有则为空字符串
    headers: {
      'token': localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
    },
    [method === 'post' ? 'data' : 'params']: param || {},
    transformRequest: [function (data) {
      let ret = ''
      let index = 0;
      for (let key in data) {
        if (data[key] === null) {
          ret += `${index === 0 ? '' : '&'}key=&`
        } else {
          ret += `${index === 0 ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        }
        index += 1;
      }
      return ret
    }]
  }).then((res: AxiosResponse) => {
    if (res) {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data;
    }
  });
};

// 请求超时函数
const timeoutfn = (delay: number, url: string) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('请求超时');
    }, delay);
  });
};

// 单个请求 存在请求超时
export async function req(params: { [key: string]: any }, delay = Global_Delay) {
  try {
    const response: any = await Promise.race([
      timeoutfn(delay, params.url),
      publicReq(params),
    ]);
    if (response.data.code === 401) {
      localStorage.removeItem("token");
      location.href = '/';
    }
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// GET request
export async function getRequest(url: string, param: { [key: string]: any }) {
  try {
    const response = await req({
      url,
      method: 'get',
      param,
    });
    return response;
  } catch (err) {
    // 这里走本地模拟数据
    console.log(err);
  }
}

// POST request
export async function postRequest(url: string, param: { [key: string]: any }) {
  try {
    const response = await req({
      url,
      method: 'post',
      param,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}


// 文件上传请求实例
const fileReq = async (params: { [key: string]: any }) => {
  const {
    url,
    method,
    param
  } = params;
  const instance = axiosInstance();
  return await instance({
    url,
    method,
    // 在请求头里面添加token 如果没有则为空字符串
    headers: {
      "Content-Type": "multipart/form-data",
      'token': localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
    },
    data: param,
    transformRequest: [
      function (oldData) {
        var form = new FormData();
        for (let item in oldData) {
          form.append(item, oldData[item]);
        }
        return form;
      }
    ]
  }).then((res: AxiosResponse) => {
    if (res) {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.data;
    }
  });
};

// file request
export async function fielUploadRequest(url: string, param: { [key: string]: any }) {
  try {
    const response = await fileReq({
      url,
      method: 'post',
      param
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

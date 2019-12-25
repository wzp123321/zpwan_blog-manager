import axios from 'axios';
const env = process.env.NODE_ENV;
// timeout 10min
const Global_Delay = 10 * 60 * 1000;
// timeout 24h
const Special_Delay = 1000 * 60 * 30;


const BASE_URL = '/blogManage';
// 定义一个空的数组，用于存放请求中的参数

// 创建axios实例
const axiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL
  });
  return instance;
};

/**
 *
 * axios 请求的中间件,可根据需求，修改header
 * @param {Object} instance axios实例
 */
const reqmiddleware = instance => {
  instance.interceptors.request.use(
    config => {
      const reqUrl = config.url.split('/');
      const reqType = reqUrl[reqUrl.length - 1];

      config.headers = {
        'Content-Type':
          reqType === 'uploadfile' ||
            reqType === 'createSingleVersion' ||
            reqType === 'prepare' ||
            reqType === 'complete'
            ? 'multipart/form-data'
            : (reqType === 'create' ? 'application/json' : 'application/x-www-form-urlencoded'),
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-store',
        'Cache-Control': 'must-revalidate'
      };
      // set delay time 24h in uploadfile request -> \/f/\**\/k/\
      config.timeout =
        reqType === 'uploadfile' ||
          reqType === 'createSingleVersion' ||
          reqType === 'prepare' ||
          reqType === 'complete'
          ? Special_Delay
          : Global_Delay;
      return config;
    },
    err => {
      throw new Error(err);
    },
  );
};

/**
 *
 * axios 请求成功后响应的中间件
 * @param {Object} instance axios实例
 */
const resMiddleware = instance => {
  instance.interceptors.response.use(
    res => {
      if (res) {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res;
      } else {
        console.log('木有回应');
      }
    },
    err => {
      if (err.response) {
        switch (err.response.status) {
          case 999:
            localStorage.clear();
            window.location.href ='/#/signin';
            // window.location.reload();
            break;
          case 401:
              localStorage.clear();
              window.location.href ='/#/signin'
            break;
          case 403:
            window.location.href ='/#/signin'
            break;
          case 404:
            throw new Error(
              '请求路径不存在',
              err.response.data.msg,
            );
          default:
            return err;
        }
      } else {
        return Promise.reject(err);
      }
    },
  );
};

// 请求实例
const publicReq = async params => {
  const { url, method, param } = params;
  const instance = axiosInstance();
  reqmiddleware(instance);
  resMiddleware(instance);

  return await instance({
    url,
    method,
    [method === 'post' ? 'data' : 'params']: param || {},
    transformRequest: [
      function (oldData) {
        const form = new FormData();
        for (let item in oldData) {
          form.append(item, oldData[item]);
        }
        return method === 'post' && (url !== '/application/uploadfile' && url !== '/application/editFile') ? form : oldData
      }
    ]
  }).then(res => {
    if (res) {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    }
  }).catch(err => {
    return err;
  })
};

// 请求超时函数
const timeoutfn = (delay, url) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('请求超时');
    }, delay);
  });
};

// 单个请求 存在请求超时
export async function req(params, delay = Global_Delay) {
  try {
    const response = await Promise.race([
      timeoutfn(delay, params.url),
      publicReq(params),
    ]);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

// 多请求 async loop
export async function multiRequest(reqArr) {
  let res = [];
  if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
    throw new Error(`please set ${reqArr} to Array`);
  }
  try {
    const proms = reqArr.map(ele =>
      publicReq({
        url: ele.url,
        method: ele.method || '',
        param: ele.param || {},
      }),
    );

    for (let promise of proms) {
      const response = await promise;
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      res.push(response);
    }
    return Promise.resolve(res);
  } catch (error) {
    throw new Error(error);
  }
}

// 多请求 promise
export async function multiRequestWithPromise(reqArr) {
  if (typeof reqArr !== 'object' && !(reqArr instanceof Array)) {
    throw new Error(`please set ${reqArr} to Array`);
  }
  try {
    const proms = reqArr.map(ele =>
      publicReq({
        url: ele.url,
        method: ele.method || '',
        param: ele.param || {},
      }),
    );
    const res = await Promise.all(proms);
    return res;
  } catch (error) {
    console.log(error);
  }
}

// GET request
export async function getRequest(url, param) {
  try {
    const response = await req({
      url,
      method: 'get',
      param,
    });
    return response;
  } catch (err) {
    console.log('err', err);
    // return Promise.reject(err);
  }
}

// POST request
export async function postRequest(url, param) {
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




import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/utils/auth'

const errorCode = {
  '400':'参数不正确！',
  '401':'您未登录，或者登录已经超时，请先登录！',
  '403':'您没有权限操作！',
  '404':'请求地址出错: ',
  '408': '请求超时！',
  '500':'服务器内部错误！',
  'default': '异常问题，请联系管理员！'
}

// 创建 axios 请求实例
const request = axios.create({
  timeout: 10000, // 请求超时设置
});

// 创建请求拦截
request.interceptors.request.use(
  (config) => {
    // 设置请求头
    if (!config.headers['content-type']) {
      // 如果没有设置请求头
      if (config.method === 'post') {
        config.headers['content-type'] = 'application/x-www-form-urlencoded'; // post 请求
        config.data = qs.stringify(config.data); // 序列化,比如表单数据
      } else {
        config.headers['content-type'] = 'application/json'; // 默认类型
      }
    }
    // 如果开启 token 认证并且需要携带 token
    if ( config.withToken) {
      config.headers['Authorization'] = getToken(); // 请求头携带 token
    }
    console.log('请求配置', config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 创建响应拦截
request.interceptors.response.use(
  (res) => {
    let data = res.data;
    // 处理自己的业务逻辑，比如判断 token 是否过期等等
    // 代码块
    return data;
  },
  (error) => {
    const message =  errorCode[error.response.status] || errorCode['default']
    return Promise.reject(message);
  }
);

export function uploadFile(config, params) {
  const formData = new FormData();
  const customFilename = params.name || 'file';
  if (params.filename) {
    formData.append(customFilename, params.file, params.filename);
  } else {
    formData.append(customFilename, params.file);
  }
  if (params.data) {
    Object.keys(params.data).forEach((key) => {
      const value = params.data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
        return;
      }
      formData.append(key, params.data[key]);
    });
  }
  return request({
    ...config,
    method: 'POST',
    data: formData,
    headers: {
      'Content-type': 'multipart/form-data'
    },
  });
}

export default request;

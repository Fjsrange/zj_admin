// 封装axios
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import baseURL from '@/apis/config'

interface LoadingInstance {
  close: () => void;
}


const request = axios.create({
  method: 'get', // 默认请求方式
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
});

let loadingInstance: LoadingInstance | null = null; // loading实例，初始化为null

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前启动加载动画
    loadingInstance = ElLoading.service({
      fullscreen: true,
      text: '加载中...',
    }) as LoadingInstance;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
    // 请求完成后关闭加载动画
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null; // 重置loadingInstance
    }
    // 根据响应状态码显示消息
    // if (response.status === 200) {
    //   ElMessage({
    //     message: '请求成功',
    //     type: 'success',
    //   });
    // }
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
    // 请求失败后关闭加载动画
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null; // 重置loadingInstance
    }
  return Promise.reject(error);
});

export default request;
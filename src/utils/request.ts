import axios, { AxiosError, type Method } from "axios";
import { useUserStore } from "@/stores";
import { showToast } from "vant";
import router from "@/router";

// const userStore = useUserStore(); // 在这里使用会导致pinia还没有初始化完成就使用报错
const baseURL: string = 'https://consult-api.itheima.net';

// 基础配置
const service = axios.create({
   baseURL,
   timeout: 5000
});

// 请求拦截
service.interceptors.request.use(config => {
   const userStore = useUserStore();
   if (userStore.user_info?.token && config.headers) {
      config.headers['Authorization'] = `Bearer ${userStore.user_info.token}`
   }
   return config
}, err => Promise.reject(err));

// 响应拦截
service.interceptors.response.use(res => {
   // 后台约定，响应成功，但是code不是10000，是业务逻辑失败
   if (res.data?.code !== 10000) {
      showToast({ 'type': 'fail', 'message': '业务失败' })
      return Promise.reject(res.data)
   }
   // 业务逻辑成功，返回响应数据，作为 axios 成功的结果
   return res.data
}, err => {
   if (err.response.status === 401) {
      const userStore = useUserStore();
      // 删除用户信息
      userStore.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
         path: '/login',
         query: { returnUrl: router.currentRoute.value.fullPath }
      })
   }
   return Promise.reject(err)
});

type Data<T> = {
   code: number
   message: string
   data: T
};
function request<T>(url: string, method: Method = 'GET', submitData?: object) {
   return service.request<T, Data<T>>({
      url, method,
      [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
   })
};

export default service;
export { baseURL, request };
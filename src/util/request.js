/**
 * @file fetch.js
 * @author deo
 */
import axios from 'axios';

// axios 配置
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = '/api';

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// http response 拦截器
axios.interceptors.response.use(
    res => res,
    error => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
                // case 401:
                // 返回 401 清除token信息并跳转到登录页面
                // store.commit(types.LOGOUT);
                // router.replace({
                //     path: 'login',
                //     query: {redirect: router.currentRoute.fullPath}
                // })
            }
        }

        // 返回接口返回的错误信息
        return Promise.reject(error.response.data);
    }
);

const send = (url, params, type) => axios[type](url, params);

export const get = (url, params) => send(url, params, 'get');

export const post = (url, params) => send(url, params, 'post');

export default axios;

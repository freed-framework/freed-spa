/**
 * @file service.js
 * @author denglingbo
 *
 * 业务模块 service 封装
 */

import Http from 'freed-spa/src/util/http';
import LoginLayout from './views/login/LoginLayout';

const http = new Http();

/**
 * http response 拦截器
 */
http.response(
    res => {
        if (res.data.code === 401) {
            LoginLayout();
            return Promise.reject(res);
        } else if (res.data.code !== 200) {
            /*
            // Local Error > Server Error
            const { code, message } = res.data;
            const errText = ERRORTEXT[code];
            if (typeof message === 'string' || errText) {
                const err = errText || message;
                message.error(err);
            }
            */
        }
        return Promise.resolve(res);
    },
    err => {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) {
                LoginLayout();
            }
        }
        return Promise.reject(err);
    }
);

/**
 * 登录 Api
 */
export const login = () => http.post('/login');

/**
 * 获取用户信息
 */
export const fetchUser = () => http.get('/user');

/**
 * Others
 */
export const fetchBookList = () => http.get('/book');

export const fetchBookDetail = (params) => http.get('/bookDetail', params);

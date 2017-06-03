/**
 * @file http.js
 * @author deo
 */

import axios from 'axios';
import * as util from './util';
import { handleResult, createLoading, handleError } from './httpUtil';

// axios 配置
axios.defaults.timeout = 10000;
/* eslint-disable no-undef */
axios.defaults.baseURL = typeof config !== 'undefined' && config.apiHost ? config.apiHost : '';
/* eslint-enable no-undef */

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

export default class http {
    constructor() {
        this.axios = axios;
    }

    /**
     * 请求拦截器
     *
     * @param {Function} success 成功回调
     * @param {Function} error 失败回调
     */
    request(success, error) {
        this.axios.interceptors.request.use(success, error);
    }

    /**
     * 响应拦截器
     *
     * @param {Function} success 成功回调
     * @param {Function} error 失败回调
     */
    response(success, error) {
        this.axios.interceptors.response.use(success, error);
    }

    /**
     * 统一处理请求方法
     *
     * @param {string} type 请求类型
     * @param {string} url 请求的url
     * @param {Object} options 请求数据对象
     * @param {Function} closeLoading 关闭提示方法
     */

    fetchData(type, url, options, closeLoading) {
        return this.axios[type](url, options)
            .then((res) => {
                closeLoading();
                return handleResult(res.data);
            })
            .catch((error) => {
                closeLoading();
                return handleError(error);
            })
    }

    /**
     * http get请求封装
     *
     * @param {string} url 请求链接
     * @param {Object} query 查询数据对象
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    get(url, query = {}, noloading = false) {
        let closeLoading = () => {};
        let newUrl = url;
        const newQuery = {};

        Object.assign(newQuery, query);

        if (!noloading) {
            closeLoading = createLoading(newUrl);
        }

        // 产生一个随机数防止get请求被缓存
        newQuery[`b${new Date().getTime()}`] = 1;
        const queryString = util.parseQuerystring(newQuery);

        newUrl = newUrl.indexOf('?') > 0
            ? `${encodeURI(newUrl)}&${queryString}`
            : `${encodeURI(newUrl)}?${queryString}`;

        return this.fetchData('get', newUrl, {}, closeLoading);
    }

    /**
     * http post请求封装
     *
     * @param {string} url 请求链接
     * @param {Object} options post数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    post(url, options, noloading = false) {
        let closeLoading = () => {};

        if (!noloading) {
            closeLoading = createLoading(url);
        }

        return this.fetchData('post', url, options, closeLoading);
    }

    /**
     * http put请求封装
     *
     * @param {string} url 请求链接
     * @param {Object} options put数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    put(url, options, noloading = false) {
        let closeLoading = () => {};

        if (!noloading) {
            closeLoading = createLoading(url);
        }

        return this.fetchData('put', url, options, closeLoading);
    }

    /**
     * http delete请求封装
     *
     * @param {string} url 请求链接
     * @param {Object} options delete数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    delete(url, options, noloading = false) {
        let closeLoading = () => {};

        if (!noloading) {
            closeLoading = createLoading(url);
        }

        return this.fetchData('delete', url, options, closeLoading);
    }
}

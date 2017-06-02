/**
 * @file http.js
 * @author deo
 */

import axios from 'axios';

import * as util from './util';

import { handleResult, createLoading, handleError, showError } from './httpUtil';

const baseURL = (typeof config !== 'undefined') ? config.host + ':' + config.port : '';
// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = `${baseURL}/api`;

export default class http {
    /**
     * http get请求封装
     * 
     * @param {string} url 请求链接
     * @param {Object} query 查询数据对象
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    static get(url, query = {}, noloading = false) {
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        // 产生一个随机数防止get请求被缓存
        query[`b${new Date().getTime()}`] = 1;
        let queryString = util.parseQuerystring(query);
        url = url.indexOf('?') > 0 ?
            encodeURI(url) + '&' + queryString
            :
            encodeURI(url) + '?' + queryString;
        return axios.get(url).then((res) => {
            closeLoading();
            return handleResult(res.data);
        }).catch((error) => {
            closeLoading();
            return handleError(error);
        })
    };

    /**
     * http post请求封装
     * 
     * @param {string} url 请求链接
     * @param {Object} options post数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    static post(url, options, noloading = false) {
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        return axios.post(url, options).then((res) => {
            closeLoading();
            return handleResult(res.data);
        }).catch((error) => {
            closeLoading();
            return handleError(error);
        })
    }

    /**
     * http put请求封装
     * 
     * @param {string} url 请求链接
     * @param {Object} options put数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    static put(url, options, noloading = false) {
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        return axios.put(url, options).then((res) => {
            closeLoading();
            return handleResult(res.data);
        }).catch((error) => {
            closeLoading();
            return handleError(error);
        })
    }

    /**
     * http delete请求封装
     * 
     * @param {string} url 请求链接
     * @param {Object} options delete数据
     * @param {Boolean} noloading 是否需要显示加载状态
     */
    static delete(url, options, noloading = false) {
        let closeLoading = () => { };
        if (!noloading) {
            closeLoading = createLoading(url);
        }
        return axios.delete(url, { body: JSON.stringify(options) }).then((res) => {
            closeLoading();
            return handleResult(res.data);
        }).catch((error) => {
            closeLoading();
            return handleError(error);
        })
    }
}

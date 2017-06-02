/**
 * @file http.js
 * @author deo
 */

import axios from 'axios';
import { message, Modal } from 'antd';

import * as util from './util';

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


/**
 * 处理请求结果
 * 
 * @param { Object } res 请求返回数据
 * @param { Function } resolve Promise resolve
 * @param { Function } reject Promise Reject
 */
function handleResult(res) {
    const { code } = res;
    if (code === 200) {
        return Promise.resolve(res);
    } else if (code === 401) {
        return Promise.reject(res);
    } else {
        return Promise.reject(res);
    }
}

//是够显示后端错误提示
let errorIsShow = false;
// 是否正在显示加载中
let loading = null;
// timeout 对象
let timeoutClose = null;
// 请求列表数组
let requestingList = [];
// message 提示显示位置
message.config({ top: 50 });

/**
 * 加载中提示
 * 
 * @param { string } url 当前请求的URL
 * @return { Function } 关闭提示回调
 */
function createLoading(url) {
    requestingList.push(url);
    let timeoutShow = null;
    if (!loading) {
        timeoutShow = setTimeout(function () {
            if (requestingList.length > 0 && !loading) {
                loading = message.loading('数据加载中...', 0);
            }
        }, 500);
    }
    if (timeoutClose) {
        clearTimeout(timeoutClose);
        timeoutClose = null;
    }
    return function () {
        if (timeoutShow) {
            clearTimeout(timeoutShow);
            timeoutShow = null;
        }
        if (requestingList.indexOf(url) > -1) {
            requestingList.splice(requestingList.indexOf(url), 1);
        }
        if (requestingList.length === 0) {
            timeoutClose = setTimeout(function () {
                if (requestingList.length === 0 && loading) {
                    loading();
                    loading = null;
                }
            }, 500);
        }
    }
}

/**
 * 处理报错信息
 * 
 * @param {Object} error 报错信息
 */
function handleError(error) {
    showError('程序异常，请刷新...');
    return Promise.reject(error);
}

/**
 * 显示错误信息
 * 
 * @param {string} message 错误信息
 */
function showError(message) {
    if (!errorIsShow) {
        errorIsShow = true;
        Modal.error({
            "title": '提示',
            "content": message,
            "onOk": () => {
                errorIsShow = false;
            },
            "okText": '关闭'
        });
    }
    return;
}

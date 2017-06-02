/**
 * @file httpUtil.js
 * 
 * @author shijh
 * http 类处理方法
 */

import { message, Modal } from 'antd';

/**
 * 处理请求结果
 * 
 * @param { Object } res 请求返回数据
 * @param { Function } resolve Promise resolve
 * @param { Function } reject Promise Reject
 */
export const handleResult = (res) => {
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
export const createLoading = (url) => {
    requestingList.push(url);
    let timeoutShow = null;
    if (!loading) {
        timeoutShow = setTimeout(() => {
            if (requestingList.length > 0 && !loading) {
                loading = message.loading('数据加载中...', 0);
            }
        }, 500);
    }
    if (timeoutClose) {
        clearTimeout(timeoutClose);
        timeoutClose = null;
    }
    return () => {
        if (timeoutShow) {
            clearTimeout(timeoutShow);
            timeoutShow = null;
        }
        if (requestingList.indexOf(url) > -1) {
            requestingList.splice(requestingList.indexOf(url), 1);
        }
        if (requestingList.length === 0) {
            timeoutClose = setTimeout(() => {
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
export const handleError = (error) => {
    showError('程序异常，请刷新...');
    return Promise.reject(error);
}

/**
 * 显示错误信息
 * 
 * @param {string} message 错误信息
 */
export const showError = (message) => {
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
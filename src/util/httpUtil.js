/**
 * @file httpUtil.js
 *
 * @author shijh
 * http 类处理方法
 */

import { message, Modal } from 'antd';

import { getLocaleMsg } from './util';

/**
 * 处理请求结果
 *
 * @param { Object } res 请求返回数据
 * @param { Function } resolve Promise resolve
 * @param { Function } reject Promise Reject
 */
export const handleResult = (res) => {
    const response = res;
    response.code = parseInt(response.code, 10);

    const { code } = response;

    if (code === 200) {
        return Promise.resolve(response);
    }

    return Promise.reject(response);
}

// 是够显示后端错误提示
let errorIsShow = false;
// 是否正在显示加载中
let loading = null;
// timeout 对象
let timeoutClose = null;
// 请求列表数组
const requestingList = [];
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
                loading = message.loading(getLocaleMsg('loading'), 0);
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
 * 显示错误信息
 *
 * @param {string} mes 错误信息
 */
export const showError = () => {
    const mes = getLocaleMsg('error');
    if (!errorIsShow) {
        errorIsShow = true;
        Modal.error({
            title: getLocaleMsg('tip'),
            content: mes,
            onOk: () => {
                errorIsShow = false;
            },
            okText: getLocaleMsg('close')
        });
    }
}

/**
 * 处理报错信息
 *
 * @param {Object} error 报错信息
 */
export const handleError = (error) => Promise.reject(error);

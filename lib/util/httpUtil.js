'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleError = exports.showError = exports.createLoading = exports.handleResult = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _antd = require('antd');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 处理请求结果
 *
 * @param { Object } res 请求返回数据
 * @param { Function } resolve Promise resolve
 * @param { Function } reject Promise Reject
 */
/**
 * @file httpUtil.js
 *
 * @author shijh
 * http 类处理方法
 */

var handleResult = exports.handleResult = function handleResult(res) {
    var code = res.code;

    if (code === 200) {
        return _promise2.default.resolve(res);
    } else if (code === 401) {
        return _promise2.default.reject(res);
    }
    return _promise2.default.reject(res);
};

// 是够显示后端错误提示
var errorIsShow = false;
// 是否正在显示加载中
var loading = null;
// timeout 对象
var timeoutClose = null;
// 请求列表数组
var requestingList = [];
// message 提示显示位置
_antd.message.config({ top: 50 });

/**
 * 加载中提示
 *
 * @param { string } url 当前请求的URL
 * @return { Function } 关闭提示回调
 */
var createLoading = exports.createLoading = function createLoading(url) {
    requestingList.push(url);
    var timeoutShow = null;
    if (!loading) {
        timeoutShow = setTimeout(function () {
            if (requestingList.length > 0 && !loading) {
                loading = _antd.message.loading((0, _util.getLocaleMsg)('loading'), 0);
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
    };
};

/**
 * 显示错误信息
 *
 * @param {string} mes 错误信息
 */
var showError = exports.showError = function showError(mes) {
    if (!errorIsShow) {
        errorIsShow = true;
        _antd.Modal.error({
            title: (0, _util.getLocaleMsg)('tip'),
            content: mes,
            onOk: function onOk() {
                errorIsShow = false;
            },
            okText: (0, _util.getLocaleMsg)('close')
        });
    }
};

/**
 * 处理报错信息
 *
 * @param {Object} error 报错信息
 */
var handleError = exports.handleError = function handleError(error) {
    var code = error.code;

    if (code && code !== 401) {
        showError((0, _util.getLocaleMsg)('error'));
    }
    return _promise2.default.reject(error);
};
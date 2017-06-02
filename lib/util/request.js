'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.post = exports.get = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios 配置
_axios2.default.defaults.timeout = 10000;
// axios.defaults.baseURL = '/api';

/**
 * @file fetch.js
 * @author deo
 */
_axios2.default.defaults.headers = {
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
alert(1)
// http response 拦截器
_axios2.default.interceptors.response.use(function (res) {
    return res;
}, function (error) {
    if (error.response) {
        var status = error.response.status;
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
    return _promise2.default.reject(error.response.data);
});

var send = function send(url, params, type) {
    return _axios2.default[type](url, params);
};

var get = exports.get = function get(url, params) {
    return send(url, params, 'get');
};

var post = exports.post = function post(url, params) {
    return send(url, params, 'post');
};

exports.default = _axios2.default;
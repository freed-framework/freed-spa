'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _httpUtil = require('./httpUtil');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios 配置
_axios2.default.defaults.timeout = 10000;
/* eslint-disable no-undef */
/**
 * @file http.js
 * @author deo
 */

_axios2.default.defaults.baseURL = typeof config !== 'undefined' && config.apiHost ? config.apiHost : '';
/* eslint-enable no-undef */

_axios2.default.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
};

var http = function () {
    function http() {
        (0, _classCallCheck3.default)(this, http);

        this.axios = _axios2.default;
    }

    /**
     * 请求拦截器
     *
     * @param {Function} success 成功回调
     * @param {Function} error 失败回调
     */


    (0, _createClass3.default)(http, [{
        key: 'request',
        value: function request(success, error) {
            this.axios.interceptors.request.use(success, error);
        }

        /**
         * 响应拦截器
         *
         * @param {Function} success 成功回调
         * @param {Function} error 失败回调
         */

    }, {
        key: 'response',
        value: function response(success, error) {
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

    }, {
        key: 'fetchData',
        value: function fetchData(type, url, options, closeLoading) {
            return this.axios[type](url, options).then(function (res) {
                closeLoading();
                return (0, _httpUtil.handleResult)(res.data);
            }).catch(function (error) {
                if (error.response) {
                    var status = error.response.status;
                    // @Shijinhua 之后修改为使用过滤器来判断哪些code 情况不show error

                    if (status !== 200 && status !== 401) {
                        (0, _httpUtil.showError)();
                    }
                }
                closeLoading();
                return (0, _httpUtil.handleError)(error);
            });
        }

        /**
         * http get请求封装
         *
         * @param {string} url 请求链接
         * @param {Object} query 查询数据对象
         * @param {Boolean} noloading 是否需要显示加载状态
         */

    }, {
        key: 'get',
        value: function get(url) {
            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var closeLoading = function closeLoading() {};
            var newUrl = url;
            var newQuery = {};

            (0, _assign2.default)(newQuery, query);

            if (!noloading) {
                closeLoading = (0, _httpUtil.createLoading)(newUrl);
            }

            // 产生一个随机数防止get请求被缓存
            newQuery['b' + new Date().getTime()] = 1;
            var queryString = util.parseQuerystring(newQuery);

            newUrl = newUrl.indexOf('?') > 0 ? encodeURI(newUrl) + '&' + queryString : encodeURI(newUrl) + '?' + queryString;

            return this.fetchData('get', newUrl, {}, closeLoading);
        }

        /**
         * http post请求封装
         *
         * @param {string} url 请求链接
         * @param {Object} options post数据
         * @param {Boolean} noloading 是否需要显示加载状态
         */

    }, {
        key: 'post',
        value: function post(url, options) {
            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var closeLoading = function closeLoading() {};

            if (!noloading) {
                closeLoading = (0, _httpUtil.createLoading)(url);
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

    }, {
        key: 'put',
        value: function put(url, options) {
            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var closeLoading = function closeLoading() {};

            if (!noloading) {
                closeLoading = (0, _httpUtil.createLoading)(url);
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

    }, {
        key: 'delete',
        value: function _delete(url, options) {
            var noloading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var closeLoading = function closeLoading() {};

            if (!noloading) {
                closeLoading = (0, _httpUtil.createLoading)(url);
            }

            return this.fetchData('delete', url, options, closeLoading);
        }
    }]);
    return http;
}();

exports.default = http;
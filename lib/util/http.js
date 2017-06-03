'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

/* eslint-disable no-undef */
var baseURL = typeof config !== 'undefined' ? config.host + ': ' + config.port : '';
/* eslint-enable no-undef */

// axios 配置
/**
 * @file http.js
 * @author deo
 */

_axios2.default.defaults.timeout = 10000;
_axios2.default.defaults.baseURL = baseURL + '/api';

var http = function () {
    function http() {
        (0, _classCallCheck3.default)(this, http);
    }

    (0, _createClass3.default)(http, null, [{
        key: 'get',

        /**
         * http get请求封装
         *
         * @param {string} url 请求链接
         * @param {Object} query 查询数据对象
         * @param {Boolean} noloading 是否需要显示加载状态
         */
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
            return _axios2.default.get(newUrl).then(function (res) {
                closeLoading();
                return (0, _httpUtil.handleResult)(res.data);
            }).catch(function (error) {
                closeLoading();
                return (0, _httpUtil.handleError)(error);
            });
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
            return _axios2.default.post(url, options).then(function (res) {
                closeLoading();
                return (0, _httpUtil.handleResult)(res.data);
            }).catch(function (error) {
                closeLoading();
                return (0, _httpUtil.handleError)(error);
            });
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
            return _axios2.default.put(url, options).then(function (res) {
                closeLoading();
                return (0, _httpUtil.handleResult)(res.data);
            }).catch(function (error) {
                closeLoading();
                return (0, _httpUtil.handleError)(error);
            });
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
            return _axios2.default.delete(url, { body: (0, _stringify2.default)(options) }).then(function (res) {
                closeLoading();
                return (0, _httpUtil.handleResult)(res.data);
            }).catch(function (error) {
                closeLoading();
                return (0, _httpUtil.handleError)(error);
            });
        }
    }]);
    return http;
}();

exports.default = http;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLocaleMsg = exports.parseQuerystring = undefined;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _locale = require('../locale');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 拼接查询字符串
 *
 * @param {Object} obj 查询数据对象
 * @return {string} 拼接后的字符串
 */
var parseQuerystring = exports.parseQuerystring = function parseQuerystring(obj) {
    var result = '';
    if (obj) {
        var tmp = [];
        var entries = (0, _entries2.default)(obj);
        entries.forEach(function (item) {
            var key = item[0];
            var value = item[1];
            if (value instanceof Array && value.length) {
                value.forEach(function (v) {
                    tmp.push(key + '=' + encodeURIComponent(v));
                });
            } else {
                tmp.push(key + '=' + encodeURIComponent(value));
            }
        });
        result = tmp.join('&');
    }

    return result;
};

/**
 * 通过变量获取文字
 *
 * @param {string} key 对应语言名
 */
/**
 * @file util.js
 *
 * @author shijh
 * 公共工具
 */

var getLocaleMsg = exports.getLocaleMsg = function getLocaleMsg(key) {
    return _locale.zhCn[key];
};
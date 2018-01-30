'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createReducer;

var _reduxImmutable = require('redux-immutable');

var _routerReducer = require('./routerReducer');

var _routerReducer2 = _interopRequireDefault(_routerReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 加入一些基础的 reducers */

/**
 * 注册 reducer，每个自定义的 reducer 都要来这里注册！！！不注册会报错。
 * @param asyncReducers
 * @returns {Reducer<S>}
 */
/**
 * @file index.js
 * @author deo
 *
 *
 */

function createReducer() {
    var asyncReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var reducers = (0, _extends3.default)({
        routing: _routerReducer2.default
    }, asyncReducers);

    return (0, _reduxImmutable.combineReducers)(reducers);
}
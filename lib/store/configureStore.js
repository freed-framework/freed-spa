'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.history = undefined;
exports.default = configureStore;
exports.updateAsyncReducers = updateAsyncReducers;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouterRedux = require('react-router-redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// redux logger

// import createHistory from 'history/createBrowserHistory';
/**
 * @file configureStore.js
 * @author deo
 */

var logger = (0, _reduxLogger.createLogger)({ collapsed: true });

var history = (0, _createHashHistory2.default)({
    // 相当于 rootPath
    basename: '',
    // 去除随机标识符
    queryKey: true
});
var historyMiddleware = (0, _reactRouterRedux.routerMiddleware)(history);

var middlewareStore = process.env.NODE_ENV === 'production' ? _redux.applyMiddleware.apply(undefined, [_reduxThunk2.default]) : (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(undefined, [historyMiddleware, _reduxThunk2.default, logger]));

function configureStore() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _immutable2.default.fromJS({});

    var store = (0, _redux.createStore)((0, _reducers2.default)(), initialState, middlewareStore);

    store.asyncReducers = _immutable2.default.fromJS({});

    return store;
}

exports.history = history;

/**
 * 异步更新 reducers
 * @param {Immutable} newReducers
 */

function updateAsyncReducers(store, newReducers) {
    store.asyncReducers = store.asyncReducers.merge(newReducers);

    var reducers = (0, _reducers2.default)(store.asyncReducers.toJS());
    store.replaceReducer(reducers);
}
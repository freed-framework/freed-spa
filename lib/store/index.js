'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = exports.updateAsyncReducers = undefined;

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _configureStore2.default)(); /**
                                              * @file index.js
                                              * @author deo
                                              */

exports.default = store;
exports.updateAsyncReducers = _configureStore.updateAsyncReducers;
exports.history = _configureStore.history;
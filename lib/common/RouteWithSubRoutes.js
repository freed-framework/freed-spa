'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 在需要使用 <Route> 的地方使用 <RouteWithSubRoutes key={index} {...route} />
 * @param route
 * @constructor
 */
/**
 * @file RouteWithSubRoutes.js
 * @author denglingbo
 *
 */

exports.default = function (_ref) {
  var route = (0, _objectWithoutProperties3.default)(_ref, []);
  return _react2.default.createElement(_reactRouterDom.Route, {
    path: route.path,
    render: function render(props) {
      return _react2.default.createElement(route.component, (0, _extends3.default)({}, props, { routes: route.routes }));
    }
  });
};
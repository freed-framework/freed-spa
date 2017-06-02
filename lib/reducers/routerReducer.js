'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file rootReducer.js
 * @author denglingbo
 *
 */
var initialState = _immutable2.default.fromJS({
    locationBeforeTransitions: null
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _reactRouterRedux.LOCATION_CHANGE:
            return state.set('locationBeforeTransitions', action.payload);

        default:
            return state;
    }
};
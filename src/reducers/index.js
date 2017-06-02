/**
 * @file index.js
 * @author deo
 *
 *
 */

import { combineReducers } from 'redux-immutable';
import routerReducer from './routerReducer';

/* 加入一些基础的 reducers */


/**
 * 注册 reducer，每个自定义的 reducer 都要来这里注册！！！不注册会报错。
 * @param asyncReducers
 * @returns {Reducer<S>}
 */
export default function createReducer(asyncReducers = {}) {
    const reducers = {
        routing: routerReducer,
        ...asyncReducers
    };

    return combineReducers(reducers);
}

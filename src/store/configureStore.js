/**
 * @file configureStore.js
 * @author deo
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';
import createHistory from 'history/createHashHistory';
// import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createReducer from '../reducers';

// redux logger
const logger = createLogger({ collapsed: true });

const history = createHistory({
    // 相当于 rootPath
    basename: '',
    // 去除随机标识符
    queryKey: true,
});
const historyMiddleware = routerMiddleware(history);

const middlewareStore = process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...[historyMiddleware, thunk, logger]));

export default function configureStore(initialState = Immutable.fromJS({})) {
    const store = createStore(
        createReducer(),
        initialState,
        middlewareStore
    );

    store.asyncReducers = Immutable.fromJS({});

    return store;
}

export {
    history
};

/**
 * 异步更新 reducers
 * @param {Immutable} newReducers
 */
export function updateAsyncReducers(store, newReducers) {
    store.asyncReducers = store.asyncReducers.merge(newReducers);

    const reducers = createReducer(store.asyncReducers.toJS());
    store.replaceReducer(reducers);
}

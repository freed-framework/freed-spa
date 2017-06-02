/**
 * @file index.js
 * @author deo
 */

import configureStore, { updateAsyncReducers, history } from './configureStore';

const store = configureStore();

export default store;

export {
    updateAsyncReducers,
    history,
}

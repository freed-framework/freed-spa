/**
 * @file index.jsx
 * @author deo
 *
 */
import React from 'react';
import ReactDOM from 'react-dom';
import FrameApp from 'freed-spa/src/App';
import store from 'freed-spa/src/store';
import App from './App';
import reducers from './reducers';
import { checkUser } from './actions/user';

/**
 * 启动 App
 */
const startApp = (data) => {
    ReactDOM.render(
        <FrameApp
            asyncReducers={reducers}
        >
            <App user={data} />
        </FrameApp>,
        document.getElementById('root')
    );
}

/**
 * 首先检查该用户是否 401
 */
checkUser()
    .then(data => {
        startApp(data);
    })
    .catch(err => {
        startApp();
    });

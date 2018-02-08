/**
 * @file App
 * @author deo
 *
 */
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store, { updateAsyncReducers, history } from './store/index';

const getConfirmation = (message: string, callback: Function): void => {
    const allowTransition = window.confirm(message);
    callback(allowTransition);
};

const supportsHistory: boolean = 'pushState' in history;

interface AppProps {
    asyncReducers: any;
    children: JSX.Element,
}

export default class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
        super(props);
    }

    componentWillMount() {
        // this.unsubscribe = store.subscribe(() => {});

        // 监听路由变化
        // history.listen(location => {
        //     console.log(location.pathname)
        // });

        // 动态更新 reducers
        updateAsyncReducers(store, this.props.asyncReducers);
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter
                    forceRefresh={!supportsHistory}
                    getUserConfirmation={getConfirmation}
                    keyLength={12}
                >
                    {this.props.children}
                </BrowserRouter>
            </Provider>
        );
    }
}

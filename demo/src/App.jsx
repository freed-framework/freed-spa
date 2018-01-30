/**
 * @file App.js
 * @author denglingbo
 *
 * 此处调用 framework 的 App.js
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { Layout } from 'antd';
import { receiveUser } from './actions/user';
import AuthLayout from './views/layout/AuthLayout';
import LoginLayout from './views/login/LoginLayout';
import './style/common.scss';

/**
 * Fix path
 * @param location
 */
const pathListener = (location, history) => {
    try {
        const expr = /(.+)\/$/.exec(location.pathname);
        if (expr) {
            history.replace(expr[1]);
        }

        if (location.hash === '#/') {
            history.replace(location.pathname);
        }
    } catch (ex) {
        // Do nothing
    }
}

@connect(
    state => ({}),
    dispatch => bindActionCreators({ receiveUser }, dispatch)
)
class App extends PureComponent {
    componentWillMount() {
        // 此处 user 从后端数据返回, 此处进行 dispatch
        const { user, history, location } = this.props;

        if (user != null) {
            this.props.receiveUser(user);
        }

        // 监听当前的地址变换
        this.unlisten = history.listen(loc => pathListener(loc, history));

        // pathListener(history.location, history);

        // 如果当前 pathname 为 login，则跳转到到 index
        if (user && location.pathname === '/login') {
            history.replace('/');
        }
    }

    componentWillReceiveProps() {}

    componentWillUnmount() {
        this.unlisten();
    }

    // shouldComponentUpdate(nextProps) {
    //     console.log(nextProps === this.props)
    // }

    render() {
        const { user } = this.props;

        return (
            <Layout>
                {user ?
                    <AuthLayout /> :
                    <LoginLayout />
                }
            </Layout>
        );
    }
}

App.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    location: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
}

export default withRouter(App);

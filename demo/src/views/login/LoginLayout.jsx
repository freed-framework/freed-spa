/**
 * @file LoginLayout.jsx
 * @author denglingbo
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import Login from './Login';

const LOGIN_PATH = '/login';

const LoginLayout = (props) => {
    let redirectToReferrer = null;

    if (props.location.pathname !== LOGIN_PATH) {
        redirectToReferrer = {
            from: props.location
        }
    }

    return (
        <div>
            <Redirect
                to={{
                    pathname: LOGIN_PATH,
                    state: redirectToReferrer
                }}
            />
            <Route
                path={LOGIN_PATH}
                component={Login}
            />
        </div>
    );
}

// import { Modal } from 'antd';
//
// const confirm = Modal.confirm;
//
// let index = 0;
//
// const LoginLayout = () => {
//     if (!index) {
//         index++;
//         confirm({
//             title: '登录过期',
//             content: '您的登录已过期，是否重新登录?',
//             okText: '是',
//             cancelText: '否',
//             closable: true,
//             maskClosable: true,
//             onOk() {
//                 index = 0;
//                 /* eslint-disable */
//                 location.href = `${config.loginLink}?origin=${encodeURIComponent(location.href)}`;
//                 /* eslint-enable */
//             },
//             onCancel() { index = 0; },
//             afterClose() {
//                 index = 0;
//             }
//         })
//         return null;
//     }
//     return null;
// }

LoginLayout.propTypes = {
    location: PropTypes.objectOf(PropTypes.any)
}

LoginLayout.defaultProps = {
    location: {
        pathname: LOGIN_PATH
    }
}

export default withRouter(LoginLayout);

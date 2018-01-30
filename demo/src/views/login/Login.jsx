/**
 * @file Login.jsx
 * @author denglingbo
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { loginAction } from '../../actions/user';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = ::this.handleLogin;
    }

    componentWillMount() {}

    handleLogin() {

        loginAction({
                login: 'admin',
                password: '123456',
            })
            .then(() => {
                // success
            })
            .catch(err => {
                // error
            });

        // const { from } = this.props.location.state || { from: { pathname: '/' } };
        //
        // window.location.href = from.pathname;
    }

    render() {
        return (
            <div>
                <input type="text" defaultValue="admin" />
                <input type="password" defaultValue="123456" />
                <button onClick={this.handleLogin}>Login!!</button>
            </div>
        )
    }
}

App.propTypes = {
    location: PropTypes.objectOf(PropTypes.any)
}

export default withRouter(App);

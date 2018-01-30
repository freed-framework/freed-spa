/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect(
    state => ({
        user: state.toJS().user.data,
    })
)
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {}

    componentDidMount() {}

    render() {
        const { user } = this.props;

        return (
            <div>
                <h4>Hello {user.name}</h4>
            </div>
        )
    }
}

App.propTypes = {
    user: PropTypes.objectOf(PropTypes.string),
}

App.defaultProps = {
    user: {
        name: 'Who?'
    }
}

export default withRouter(App);

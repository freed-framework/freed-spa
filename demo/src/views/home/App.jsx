/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './app.scss';

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
                <div className="test-content">
                    <h4>Hello {user.name}</h4>
                </div>

                <div className="warp">
                    <div className="box">
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                        1<br />
                    </div>
                    <div className="box box2">2</div>
                    <div className="box">3</div>
                </div>
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

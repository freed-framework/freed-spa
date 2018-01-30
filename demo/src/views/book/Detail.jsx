/**
 * @file Detail.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bookDetailAction } from '../../actions/book';
import '../../style/common.scss';

@connect(
    state => ({
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({ bookDetailAction }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);

        this.handleBack = ::this.handleBack;
    }

    componentDidMount() {
        this.fetchDetail({
            id: this.props.match.params.id
        });
    }

    handleBack() {
        this.props.history.goBack();
    }

    fetchDetail(params) {
        this.props.bookDetailAction(params);
    }

    render() {
        const { match, book } = this.props;

        return (
            <div>
                <h3>Book Detail</h3>
                <a className="link-goback" onClick={this.handleBack}>Gooooooo Back</a>
                <div>Book ID: {match.params.id}</div>
                <div>Book Detail: {book.detail.content}</div>
            </div>
        )
    }
}

App.propTypes = {
    book: PropTypes.objectOf(PropTypes.any),
    match: PropTypes.objectOf(PropTypes.any),
    history: PropTypes.objectOf(PropTypes.any),
    bookDetailAction: PropTypes.func,
}

export default withRouter(App);

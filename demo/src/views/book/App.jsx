/**
 * @file App.jsx
 * @author denglingbo
 *
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import {
    bookListAction,
    bookDetailAction,
} from '../../actions/book';

@connect(
    state => ({
        user: state.toJS().user.data,
        book: state.toJS().book,
    }),
    dispatch => bindActionCreators({
        bookListAction, bookDetailAction
    }, dispatch)
)
class App extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.bookListAction();
    }

    render() {
        const { book, user } = this.props;

        return (
            <div>
                <div>books {user.name}</div>

                {book.list && book.list.map(item => (
                    <div key={item.id}>
                        {item.name} <Link to={`/book/detail/${item.id}`}>详情</Link>
                    </div>
                ))}

                <Modal
                    title={`Title ${book.detail.title}`}
                    visible={book.visible}
                    onCancel={this.handleClose}
                    footer={false}
                >
                    <p>some contents...</p>
                    <p>{book.detail.content}</p>
                </Modal>
            </div>
        )
    }
}

App.propTypes = {
    user: PropTypes.objectOf(PropTypes.any),
    book: PropTypes.objectOf(PropTypes.any),
    bookListAction: PropTypes.func,
    bookDetailAction: PropTypes.func,
}

export default withRouter(App);

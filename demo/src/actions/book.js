/**
 * @file book.js
 * @author denglingbo
 *
 * <DEMO>
 */
import { fetchBookList, fetchBookDetail } from '../service';
import ActionType from './ActionType';

const receiveBookList = (data) => ({
    type: ActionType.RECEIVE_BOOK_LIST,
    payload: data.map(d => d)
});

export const bookListAction = () => dispatch => (
    fetchBookList()
        .then(res => {
            dispatch(receiveBookList(res.data));
        })
        .catch(err => Promise.reject(err))
)

const receiveBookDetail = (data) => ({
    type: ActionType.RECEIVE_BOOK_DETAIL,
    payload: data
});

export const bookDetailAction = (params) => dispatch => (
    new Promise((resolve, reject) => {
        fetchBookDetail(params)
            .then(res => {
                // 这里强行 Mock 一下
                const data = res.data;
                data.content += ` <<Mock ID: ${params.id}>>`;

                dispatch(receiveBookDetail(data));

                return resolve();
            })
            .catch(err => reject(err))
    })
)

/**
 * @file book.js
 * @author denglingbo
 *
 * <DEMO>
 */

import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    list: [],
    detail: {},
});

export default function (state = initState, action) {
    switch (action.type) {
        case ActionType.RECEIVE_BOOK_LIST:
            return state.set('list', action.payload);

        case ActionType.RECEIVE_BOOK_DETAIL:
            return state.set('detail', action.payload);

        default:
            return state;
    }
}

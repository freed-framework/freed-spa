/**
 * @file pub.js
 * @author denglingbo
 *
 * 交互展示，不涉及异步 Action
 */
import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    // 导航是否收拢
    collapsed: false,
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.PUB_COLLAPSED:
            return state.set('collapsed', action.payload);

        default:
            return state;
    }
}

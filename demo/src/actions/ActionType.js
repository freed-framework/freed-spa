/**
 * @file ActionType.js
 * @author denglingbo
 *
 * RECEIVE_* 代表 get 请求
 * REQUEST_* 代表 post 请求
 * PUB_* 代表非 Ajax 的页面可共用
 */

export default {
    // 用户信息
    RECEIVE_USER: 'RECEIVE_USER',

    // 导航状态
    PUB_COLLAPSED: 'PUB_COLLAPSED',

    /**
     * Others Type
     */
    RECEIVE_BOOK_LIST: 'RECEIVE_BOOK_LIST',
    RECEIVE_BOOK_DETAIL: 'RECEIVE_BOOK_DETAIL',
}

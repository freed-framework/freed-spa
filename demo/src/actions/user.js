/**
 * @file user.js
 * @author denglingbo
 *
 * 用户信息 Action
 */
import { fetchUser, login } from '../service';
import ActionType from './ActionType';

export const receiveUser = (data) => ({
    type: ActionType.RECEIVE_USER,
    payload: data,
});

export const receiveLogout = () => ({
    type: ActionType.RECEIVE_USER,
    payload: null,
});

/**
 * 获取用户信息
 * 1. 成功则设置为登录状态
 * 2. 失败则设置为登出状态
 */
export const checkUser = () => (
    new Promise((resolve, reject) => {
        fetchUser()
            .then(res => resolve(res.data))
            .catch(err => reject(err))
    })
)

/**
 * 登录接口
 * 该接口只设置用户 isAuth
 * @param params
 */
export const loginAction = (params) => (
    login(params)
        .then(() => Promise.resolve())
        .catch(err => Promise.reject(err))
)

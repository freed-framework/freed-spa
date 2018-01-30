/**
 * @file routes.js
 * @author denglingbo
 *
 * App 所有的路由配置
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Bundle from 'freed-spa/src/bundle';

/* eslint-disable */
import Home from 'bundle-loader?lazy!../views/home/App';
import Book from 'bundle-loader?lazy!../views/book/App';
import BookDetail from 'bundle-loader?lazy!../views/book/Detail';
/* eslint-enable */

/**
 * 路由配置
 * 目前后端提供 导航名，此处由 key 进行 map 对应
 * @type {[*]}
 *
 * key 用于和后端的 code 做对应关系
 * 后端提供 code, id, name
 * 前端 使用 key 从后端数据中拿相应的数据进行展示
 */
const routes = [
    {
        key: 'home',
        exact: true,
        path: '/',
        component: () => (
            <Route
                path="/"
                exact
                render={() => <Bundle load={Home}>{(App) => <App />}</Bundle>}
            />
        )
    },
    // 商品管理
    {
        key: 'spgl',
        iconType: 'mail',
        routes: [
            // 在售商品管理
            {
                path: '/book',
                parent: 'spgl',
                key: 'zsspgl',
                component: () => (
                    <Switch>
                        <Route
                            path="/book"
                            exact
                            render={() => <Bundle load={Book}>{(App) => <App />}</Bundle>}
                        />
                        <Route
                            path="/book/detail/:id"
                            render={() => <Bundle load={BookDetail}>{(App) => <App />}</Bundle>}
                        />
                    </Switch>
                )
            }
        ]
    },
];

export default routes;

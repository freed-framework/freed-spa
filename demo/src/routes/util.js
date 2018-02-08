/**
 * @file route.js
 * @author denglingbo
 *
 * 路由数据中获取相应属性包
 */
import React from 'react';
import { Route } from 'react-router-dom';
import routes from './index';

/**
 * 此处把 routes 对应的每项所有的配置都返回
 * @param key, 此处的 key 是后端返回的数据的 key or Others
 * @returns {*}
 */
export const getMatchRoute = (key, type = 'key') => findItem(routes, key, type);

/**
 * 遍历查询
 * @param arr 要查询的 数组
 * @param key 要查询的 key
 * @param findKey 从 arr 的某个属性中匹配
 * @param subArrKey 子节点
 * @returns {*}
 */
export const findItem = (arr = [], key, findKey = 'path', subArrKey = 'routes') => {
    let match = null;

    arr.forEach(item => {
        if (item[findKey] === key) {
            match = item;
        }

        const nextArr = item[subArrKey];

        if (match == null && nextArr != null && nextArr.length > 0) {
            const finder = nextArr.find(sub => sub[findKey] === key);
            if (finder) {
                match = finder;
            }
        }
    });

    return match;
}

/**
 * Breadcrumb List
 * @param pathname
 * @param menu
 * @returns {*}
 */
export const getBreadcrumb = (pathname, menu) => {
    const matchCurRoutes = [];

    if (pathname === '/') {
        return null;
    }

    // 切割当前的 pathname
    const pathArr = pathname.split('/').map(item => `/${item}`);

    // 从路由中先把匹配的 route 配置拿出来
    pathArr.forEach(path => {
        const finder = findItem(routes, path, 'path', 'routes');
        if (finder) {
            matchCurRoutes.push(finder);
        }
    });

    const breadList = [];

    matchCurRoutes.forEach(route => {
        if (route.path === '/') {
            breadList.push({
                path: '/',
                name: '首页',
            })
        } else {
            console.log('matchCurRoutes: ', menu, route.parent);
            // 获取当前路由名
            const mainMenu = findItem(menu, route.parent, 'code');
            // 获取当前路由名
            const subMenu = findItem(menu, route.key, 'code', 'submenu');

            if (mainMenu === null || subMenu === null) {
                return null;
            }

            breadList.push({
                name: mainMenu.name
            });

            breadList.push({
                name: subMenu.name
            });
        }
    });

    return breadList;
}

/**
 * 通过 key 返回 path
 * @param key
 * @returns {string}
 */
export const getPath = (key) => {
    const matchRoute = getMatchRoute(key);

    if (matchRoute == null) {
        return '';
    }

    return matchRoute.path;
}

/**
 * 此处获取主导航 icon 类型
 * @param key
 * @returns {null}
 */
export const getIconType = (key) => {
    const matchRoute = getMatchRoute(key);

    if (matchRoute == null) {
        return null;
    }

    return matchRoute.iconType;
}

/**
 * 渲染 路由
 * @param route
 * @constructor
 */
export const WidthRoutes = (route) => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => {
            return <route.component {...props} routes={route.routes} />
        }}
    />
)

/**
 * 根据后端权限获取可用的路由
 * @param menu, 后端的 menu 数据
 */
const getUsableRoutes = (menu) => {
    if (menu == null) {
        return [];
    }

    let list = [];

    menu.map(route => {
        const findRoute = routes.find(item => (
            item.key === route.code
        ));

        if (findRoute && findRoute.routes) {
            list = list.concat(findRoute.routes);
        }
    })

    return list;
}

/**
 * 非权限可访问的路由
 */
const getStaticRoutes = () => {
    const list = [];

    routes.forEach(route => {
        if (route.path && route.component) {
            list.push(route);
        }
    });

    return list;
}

/**
 * 获取当前所有路由
 * @param menu
 * @returns {Array.<*>|Iterable<K, V>}
 */
export const getRoutes = (menu) => {
    return []
        .concat(getStaticRoutes())
        .concat(getUsableRoutes(menu));
}

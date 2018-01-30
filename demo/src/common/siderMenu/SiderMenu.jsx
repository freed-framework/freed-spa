/**
 * @file SiderMenu
 * @author denglingbo
 *
 * 左侧菜单根据 后端数据进行 render
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { menuCollapsed } from '../../actions/pub';
import {
    getPath,
    getMatchRoute,
    getIconType
} from '../../routes/util';
import './siderMenu.scss';

const SubMenu = Menu.SubMenu;

@connect(
    state => ({
        pub: state.toJS().pub
    }),
    dispatch => bindActionCreators({ menuCollapsed }, dispatch)
)
class SiderMenu extends Component {
    constructor(props) {
        super(props);

        this.handleCollapseChange = ::this.handleCollapseChange;
    }

    handleCollapseChange() {
        const { pub } = this.props;
        this.props.menuCollapsed(!pub.collapsed);
    }

    /**
     * 渲染主菜单
     * @param item
     * @param index
     * @returns {XML}
     */
    renderMainMenu(item) {
        return (
            <SubMenu
                key={`menu-${item.code}`}
                title={<span><Icon type={getIconType(item.code)} /><span>{item.name}</span></span>}
            >
                {item.submenu && this.renderSubMenu(item.submenu)}
            </SubMenu>
        )
    }

    /**
     * 渲染子菜单
     * @param items, item.submenu
     */
    renderSubMenu(items) {
        return items.map(item => (
            <Menu.Item key={`submenu-${item.code}`}>
                <NavLink to={getPath(item.code)}>
                    {item.name}
                </NavLink>
            </Menu.Item>
        ));
    }

    render() {
        const { menu, pub, location } = this.props;

        if (!menu || menu.length === 0) {
            return null;
        }

        // 暂时只勾选二级菜单，通过父级 pathname 获取 要勾选的和展开的
        const pathname = `/${location.pathname.split('/')[1]}`;
        const matchRoute = getMatchRoute(pathname, 'path');

        // 此处判断如果无路由匹配，不再渲染
        if (matchRoute == null) {
            return null;
        }

        const defOpen = matchRoute.parent;
        const defSelected = matchRoute.key;
        let openMenu = [];
        let selectedMenu = [];

        if (defOpen !== undefined) {
            openMenu = [`menu-${defOpen}`];
            selectedMenu = [`submenu-${defSelected}`];
        }

        return (
            <div className="ant-layout-menu">
                {/* 主菜单 */}
                <Menu
                    theme="dark"
                    mode={pub.collapsed ? 'vertical' : 'inline'}
                    defaultOpenKeys={openMenu}
                    selectedKeys={selectedMenu}
                    defaultSelectedKeys={selectedMenu}
                >
                    {menu.map(item => (
                        this.renderMainMenu(item)
                    ))}
                </Menu>

                {/* 收缩按钮 */}
                <div
                    className="ant-side-collapse-button"
                    onClick={this.handleCollapseChange}
                >
                    {<Icon
                        className="trigger"
                        type={pub.collapsed ? 'menu-unfold' : 'menu-fold'}
                    />}
                </div>
            </div>
        );
    }
}

SiderMenu.propTypes = {
    menuCollapsed: PropTypes.func,
    location: PropTypes.objectOf(PropTypes.any),
    menu: PropTypes.arrayOf(PropTypes.object),
    pub: PropTypes.objectOf(PropTypes.string)
}

export default withRouter(SiderMenu);

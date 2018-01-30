/**
 * @file Breadcrumb.jsx
 * @author denglingbo
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb, Icon } from 'antd';
import { getBreadcrumb } from '../../routes/util';
import './breadcrumb.scss';

class App extends PureComponent {
    render() {
        const { menu, location } = this.props;
        const breadList = getBreadcrumb(location.pathname, menu);

        // 首页会返回 null
        if (breadList === null) {
            return null;
        }

        return (
            <div className="breadcrumb">
                <Breadcrumb>
                    {breadList.map((item, index) => (
                        <Breadcrumb.Item key={`breadcrumb-${index}`}>
                            {item.path && item.path === '/' ?
                                <Link to="/"><Icon type="home" /></Link> :
                                <span>{item.name}</span>
                            }
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
        )
    }
}

App.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.objectOf(PropTypes.any),
}

export default withRouter(App);

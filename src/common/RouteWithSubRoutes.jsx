/**
 * @file RouteWithSubRoutes.js
 * @author denglingbo
 *
 */

import React from 'react';
import { Route } from 'react-router-dom';

/**
 * 在需要使用 <Route> 的地方使用 <RouteWithSubRoutes key={index} {...route} />
 * @param route
 * @constructor
 */
export default ({...route}) => (
    <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
    />
)

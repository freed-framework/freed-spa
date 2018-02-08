/**
 * @file Route.js
 * @author denglingbo
 *
 * Route 被 framework 引入，用于创建路由
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import Bundle from 'freed-spa/tssrc/bundle';
import { getRoutes, WidthRoutes } from './routes/util';
import Home from 'bundle-loader?lazy!./views/home/App';

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            return <Component {...props} />
        }} />
    )
}

const App = (props) => {
    // const menu = props.menu;

    // if (menu.length === 0) {
    //     return null;
    // }
console.log('Route', props)
    return (
        <Switch>
            <AuthRoute 
                path="/"
                exact
                component={() => <Bundle load={Home}>{Mod => <Mod />}</Bundle>}
            />
            <AuthRoute 
                path="/home"
                component={() => <Bundle load={Home}>{Mod => <Mod />}</Bundle>}
            />
            <Route 
                component={() => <div>404</div>}
            />
        </Switch>
    )
}

App.propTypes = {
    menu: PropTypes.arrayOf(PropTypes.object)
}

App.defaultProps = {
    menu: [],
}

export default App;

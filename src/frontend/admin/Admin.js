import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminList from './admin-list/AdminList';
import AdminAdd from './admin-list/AdminAdd';
import AdminEdit from './admin-list/AdminEdit';

import './Admin.css';

export default function Admin({ match, loginInfo }) {
    return loginInfo.isAdmin ?
        (<div className='Admin'>
            <h1 className='Title'>Welcome back, {loginInfo.username}.</h1>
            <Switch>
                <Route
                    exact path={`${match.path}/list`}
                    component={AdminList} />
                <Route
                    exact path={`${match.path}/add`}
                    component={AdminAdd} />
                <Route
                    exact path={`${match.path}/edit/:tvshow`}
                    component={AdminEdit} />
                <Route render={() => <Redirect to='/not-found' />} />
            </Switch>
        </div>) :
        <Redirect to='/not-found' />;
}
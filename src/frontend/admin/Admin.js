import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminList from './admin-list/AdminList';
import AdminAdd from './admin-list/AdminAdd';
import AdminEdit from './admin-list/AdminEdit';

export default function Admin({ match }) {
    return (
        <Switch>
            <Route exact path={`${match.path}/list`} component={AdminList} />
            <Route exact path={`${match.path}/add`} component={AdminAdd} />
            <Route exact path={`${match.path}/edit`} component={AdminEdit} />
            <Route render={() => <Redirect to='/not-found' /> } />
        </Switch>
    );
}
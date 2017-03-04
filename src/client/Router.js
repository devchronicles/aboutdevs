import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

// pages
import App from './pages/App';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

const RouterPage = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexPage} />
        </Route>
        <Route path="/login" component={LoginPage} />
    </Router>
);

export default RouterPage;

import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import App from './pages/App';
import IndexPage from './pages/IndexPage';

const RouterPage = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={IndexPage} />
        </Route>
    </Router>
);

export default RouterPage;

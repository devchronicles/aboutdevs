import * as React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

// pages
import { App } from './pages/App';
import { LoginPage } from './pages/LoginPage';

const RouterPage = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/login" component={LoginPage} />
            <Route path="/" component={App} />
            <Route path="/s/:location/:professional" component={App} />
        </Switch>
    </BrowserRouter>);

export default RouterPage;

import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

// pages
import App from './pages/App';
import LoginPage from './pages/LoginPage';

const RouterPage = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    </BrowserRouter>);

export default RouterPage;

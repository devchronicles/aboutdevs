import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import configureStore from './redux/store';
import App from './pages/App';
import IndexPage from './pages/IndexPage';
import '../../node_modules/normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

if (module.hot) {
    module.hot.accept();
}

/* global document:true */
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={IndexPage} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

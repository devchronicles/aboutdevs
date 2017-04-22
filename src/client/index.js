import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from './Router';
import configureStore from './redux/store';

import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../../node_modules/react-activity/dist/react-activity.css';
import './styles/styles.scss';

/* eslint-disable */
const store = configureStore(window.__PRELOADED_STATE__);
/* eslint-enable */

if (module.hot) {
    module.hot.accept();
}

/* global document:true */
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('app')
);

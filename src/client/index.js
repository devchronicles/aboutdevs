import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    <Provider store={store}>
        <div>Fuck this shit</div>
    </Provider>,
    document.getElementById('app')
);
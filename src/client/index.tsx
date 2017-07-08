import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as clientTypes from './typings';

import Router from './Router';
import configureStore from './redux/store';

require('../../node_modules/normalize.css/normalize.css');
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/react-activity/dist/react-activity.css');
require('./styles/styles.scss');

const store = configureStore((window as any).__PRELOADED_STATE__);

if ((module as any).hot) {
    (module as any).hot.accept();
}

ReactDOM.render(
    <Provider store={store} >
        <Router />
    </Provider>,
    document.getElementById('app')
)

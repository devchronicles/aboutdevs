import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../common/redux/store';
import {ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import {App} from './pages/App';
import {LoginPage} from './pages/LoginPage';
import {Route, Switch} from "react-router";

require('../../node_modules/normalize.css/normalize.css');
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/react-activity/dist/react-activity.css');
require('../client/styles/styles.scss');

const history = createHistory();
const store = configureStore((window as any).__PRELOADED_STATE__, history);

if ((module as any).hot) {
    (module as any).hot.accept();
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact={true} path="/login" component={LoginPage}/>
                <Route path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "../common/redux/store";
import { createBrowserHistory } from "history";
import { App } from "./pages/App";
import { LoginPage } from "./pages/LoginPage";
import { Route, Router, Switch } from "react-router";

require("../../node_modules/normalize.css/normalize.css");
require("../../node_modules/font-awesome/css/font-awesome.css");
require("../../node_modules/react-activity/dist/react-activity.css");
require("../client/styles/styles.scss");

const history = createBrowserHistory();
const store = configureStore((window as any).__PRELOADED_STATE__, history);

if ((module as any).hot) {
    (module as any).hot.accept();
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route exact={true} path="/login" component={LoginPage}/>
                <Route path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("app"),
);

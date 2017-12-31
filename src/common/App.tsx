import * as React from "react";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./pages/Layout";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router";

interface AppProps {
    store: any;
    history: any;
}

export const App: React.SFC<AppProps> = (props: AppProps) => {
    const {store, history} = props;
    return (
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route exact={true} path="/login" component={LoginPage}/>
                    <Route path="/" component={Layout}/>
                </Switch>
            </Router>
        </Provider>
    );
};

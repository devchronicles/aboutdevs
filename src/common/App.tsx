import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { Routes } from "./Routes";

interface AppProps {
    store: any;
    history: any;
}

export const App: React.SFC<AppProps> = (props: AppProps) => {
    const {store, history} = props;
    return (
        <Provider store={store}>
            <Router history={history}>
                <Routes/>
            </Router>
        </Provider>
    );
};

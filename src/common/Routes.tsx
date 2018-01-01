import * as React from "react";
import { Layout } from "./pages/Layout";
import { LoginPage } from "./pages/LoginPage";
import { Route, Switch } from "react-router";

interface RoutesProps {
}

export const Routes: React.SFC<RoutesProps> = (props: RoutesProps) => {
    return (
        <Switch>
            <Route exact={true} path="/login" component={LoginPage}/>
            <Route path="/" component={Layout}/>
        </Switch>
    );
};

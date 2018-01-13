import * as React from "react";
import { Layout } from "./pages/Layout";
import { Route, Switch } from "react-router";

interface RoutesProps {
}

export const Routes: React.SFC<RoutesProps> = (props: RoutesProps) => {
    return (
        <Switch>
            <Route path="/" component={Layout}/>
        </Switch>
    );
};

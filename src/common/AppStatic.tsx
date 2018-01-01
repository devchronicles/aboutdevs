import * as React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { Routes } from "./Routes";

interface AppStaticProps {
    store: any;
    location: string;
}

export const AppStatic: React.SFC<AppStaticProps> = (props) => {
    const {store, location} = props;
    return (
        <Provider store={store}>
            <StaticRouter location={location}>
                <Routes/>
            </StaticRouter>
        </Provider>
    );
};

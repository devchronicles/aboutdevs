import * as React from "react";
import { render } from "react-dom";
import configureStore from "../common/redux/store";
import { createBrowserHistory } from "history";
import { App } from "./App";

require("../../node_modules/normalize.css/normalize.css");
require("../../node_modules/font-awesome/css/font-awesome.css");
require("../../node_modules/react-activity/dist/react-activity.css");
require("../client/styles/styles.scss");

const history = createBrowserHistory();
const store = configureStore((window as any).__PRELOADED_STATE__, history);

if ((module as any).hot) {
    (module as any).hot.accept();
}

render(<App history={history} store={store}/>, document.getElementById("app"));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const store_1 = require("./redux/store");
const history_1 = require("history");
const App_1 = require("./App");
require("../../node_modules/normalize.css/normalize.css");
require("../../node_modules/font-awesome/css/font-awesome.css");
require("../../node_modules/react-activity/dist/react-activity.css");
require("../client/styles/styles.scss");
const history = history_1.createBrowserHistory();
const store = store_1.configureStore(window.__PRELOADED_STATE__);
if (module.hot) {
    module.hot.accept();
}
const appElement = document.getElementById("app");
const app = React.createElement(App_1.App, { history: history, store: store });
if (appElement.childNodes.length) {
    react_dom_1.hydrate(app, appElement);
}
else {
    react_dom_1.render(app, appElement);
}
//# sourceMappingURL=index.js.map
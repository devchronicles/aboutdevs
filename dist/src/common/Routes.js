"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Layout_1 = require("./pages/Layout");
const react_router_1 = require("react-router");
exports.Routes = (props) => {
    return (React.createElement(react_router_1.Switch, null,
        React.createElement(react_router_1.Route, { path: "/", component: Layout_1.Layout })));
};
//# sourceMappingURL=Routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const Routes_1 = require("./Routes");
exports.AppStatic = (props) => {
    const { store, location } = props;
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(react_router_1.StaticRouter, { location: location, context: {} },
            React.createElement(Routes_1.Routes, null))));
};
//# sourceMappingURL=AppStatic.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_1 = require("react-router");
const Routes_1 = require("./Routes");
exports.App = (props) => {
    const { store, history } = props;
    return (React.createElement(react_redux_1.Provider, { store: store },
        React.createElement(react_router_1.Router, { history: history },
            React.createElement(Routes_1.Routes, null))));
};
//# sourceMappingURL=App.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const LoggedUserDropdown_1 = require("./LoggedUserDropdown");
const TopMenu = (props) => (React.createElement("ul", { className: "top-menu" },
    React.createElement("li", null,
        React.createElement(LoggedUserDropdown_1.LoggedUserDropdown, { loggedUser: props.loggedUser }))));
exports.TopMenu = TopMenu;
//# sourceMappingURL=TopMenu.js.map
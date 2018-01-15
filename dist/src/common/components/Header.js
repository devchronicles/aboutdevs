"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const LoggedUserDropdown_1 = require("./LoggedUserDropdown");
const Logo_1 = require("./Logo");
const Header = ({ loggedUser }) => {
    const rightComponent = loggedUser.id
        ? React.createElement(LoggedUserDropdown_1.LoggedUserDropdown, { loggedUser: loggedUser })
        : React.createElement("a", { href: "/auth/linkedin", className: "button vibrant" }, "Sign in");
    return (React.createElement("div", { className: "main-header-wrapper" },
        React.createElement("header", { className: "header" },
            React.createElement("div", { className: "header-content" },
                React.createElement(react_router_dom_1.Link, { to: "/", className: "logo-wrapper" },
                    React.createElement(Logo_1.Logo, null)),
                React.createElement("ul", { className: "header-content-list" },
                    React.createElement("li", null,
                        React.createElement(react_router_dom_1.Link, { to: "/d/docs" }, "About")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "/d/docs#how-much-does-aboutdevs-cost" }, "Pricing")),
                    React.createElement("li", null,
                        React.createElement("a", { href: "/d/docs#community" }, "Community")),
                    React.createElement("li", { className: "important-item" }, rightComponent))))));
};
exports.Header = Header;
//# sourceMappingURL=Header.js.map
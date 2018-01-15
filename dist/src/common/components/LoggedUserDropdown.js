"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Dropdown_1 = require("./Dropdown");
class LoggedUserDropdown extends React.Component {
    render() {
        const { loggedUser: { displayName, photoUrl, name } } = this.props;
        return (React.createElement(Dropdown_1.Dropdown, { button: React.createElement("img", { className: "avatar", src: photoUrl }) },
            React.createElement(Dropdown_1.DropdownHeader, null,
                "Signed in as ",
                React.createElement("strong", { className: "css-truncate-target" }, displayName)),
            React.createElement(Dropdown_1.DropdownDivider, null),
            React.createElement(Dropdown_1.DropdownItem, { linkTo: `/${name}`, text: "Your profile" }),
            React.createElement(Dropdown_1.DropdownItem, { linkTo: `/config/edituserprofile`, text: "Edit your profile" }),
            React.createElement(Dropdown_1.DropdownDivider, null),
            React.createElement(Dropdown_1.DropdownItem, { href: "/auth/logout", text: "Sign out" })));
    }
}
exports.LoggedUserDropdown = LoggedUserDropdown;
//# sourceMappingURL=LoggedUserDropdown.js.map
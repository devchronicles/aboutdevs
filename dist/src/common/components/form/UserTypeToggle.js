"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const commonTypes = require("../../typings/commonTypes");
const UserTypeToggle = (field) => {
    const { value, onChange } = field.input;
    const checkComponent = React.createElement("i", { className: "fa fa-check" });
    const developerProps = {
        className: value === commonTypes.UserProfileType.DEVELOPER ? "pushed" : null,
        onClick: (event) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.DEVELOPER);
        },
    };
    const recruiterProps = {
        className: value === commonTypes.UserProfileType.RECRUITER ? "pushed" : null,
        onClick: (event) => {
            event.preventDefault();
            onChange(commonTypes.UserProfileType.RECRUITER);
        },
    };
    return (React.createElement("div", { className: "button-group user-type-toggle" },
        React.createElement("button", Object.assign({}, developerProps),
            checkComponent,
            "I'm a developer"),
        React.createElement("button", Object.assign({}, recruiterProps),
            checkComponent,
            React.createElement("span", null, "I'm a recruiter"))));
};
exports.UserTypeToggle = UserTypeToggle;
//# sourceMappingURL=UserTypeToggle.js.map
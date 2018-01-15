"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const FormGroup = ({ label, labelFor, help, error, children }) => {
    let labelComponent = null;
    let helpComponent = null;
    if (label) {
        labelComponent = React.createElement("label", { htmlFor: labelFor }, label);
    }
    if (error) {
        helpComponent = React.createElement("small", { className: "form-help error" },
            error,
            " ");
    }
    else if (help) {
        helpComponent = React.createElement("small", { className: "form-help" },
            help,
            " ");
    }
    return (React.createElement("div", { className: "form-group" },
        labelComponent,
        children,
        helpComponent));
};
exports.FormGroup = FormGroup;
//# sourceMappingURL=FormGroup.js.map
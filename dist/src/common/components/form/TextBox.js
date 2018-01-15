"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.TextBox = (props) => {
    const { meta: { invalid, touched }, input, disabled } = props;
    const classes = ["form-control"];
    if (invalid && touched) {
        classes.push("invalid");
    }
    return (React.createElement("input", Object.assign({}, input, { disabled: disabled, autoComplete: "off", autoCorrect: "off", spellCheck: false, className: classes.join(" "), type: "text" })));
};
exports.TextBox.defaultProps = {
    disabled: false,
};
//# sourceMappingURL=TextBox.js.map
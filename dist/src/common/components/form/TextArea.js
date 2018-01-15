"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TextArea = (props) => {
    const { meta: { invalid, touched } } = props;
    const classes = ["form-control"];
    if (invalid && touched) {
        classes.push("invalid");
    }
    return React.createElement("textarea", Object.assign({ rows: 8 }, props.input, { className: classes.join(" ") }));
};
exports.TextArea = TextArea;
//# sourceMappingURL=TextArea.js.map
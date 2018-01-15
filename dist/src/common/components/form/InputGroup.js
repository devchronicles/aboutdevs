"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const InputGroup = (props) => {
    const { addOnBefore, addOnBeforeClassName, addOnAfter, addOnAfterClassName, children } = props;
    const addOnBeforeComponent = addOnBefore
        ? React.createElement("span", { className: `input-group-addon-before ${addOnBeforeClassName}` },
            " ",
            addOnBefore,
            " ")
        : null;
    const addOnAfterComponent = addOnAfter
        ? React.createElement("span", { className: `input-group-addon-after ${addOnAfterClassName}` },
            " ",
            addOnAfter,
            " ")
        : null;
    return (React.createElement("div", { className: "input-group" },
        addOnBeforeComponent,
        children,
        addOnAfterComponent));
};
exports.InputGroup = InputGroup;
InputGroup.defaultProps = {
    addOnBefore: null,
    addOnAfter: null,
};
//# sourceMappingURL=InputGroup.js.map
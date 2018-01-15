"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const fieldValidationMessageHelper = require("../../../common/helpers/fieldValidationMessageHelper");
const FormGroup_1 = require("./FormGroup");
const InputGroup_1 = require("./InputGroup");
const FormField = (props) => {
    const { name, label, help, addOnBefore, addOnAfter, innerComponent, } = props;
    if (!innerComponent) {
        throw Error("Inner component is required");
    }
    const innerComponentProps = Object.assign({ input: props.input, meta: props.meta }, props.innerComponentProps);
    const errorMessage = props.meta.touched ? fieldValidationMessageHelper.getErrorMessage(props.meta.error) : null;
    return (React.createElement(FormGroup_1.FormGroup, { label: label, labelFor: name, help: help, error: errorMessage },
        React.createElement(InputGroup_1.InputGroup, { addOnBefore: addOnBefore, addOnAfter: addOnAfter }, React.createElement(innerComponent, innerComponentProps))));
};
exports.FormField = FormField;
FormField.defaultProps = {
    help: "",
    addOnBefore: undefined,
    addOnAfter: undefined,
    validate: [],
    placeHolder: "",
};
//# sourceMappingURL=FormField.js.map
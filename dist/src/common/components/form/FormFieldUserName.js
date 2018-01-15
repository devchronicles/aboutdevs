"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactActivity = require("react-activity");
const index_1 = require("./index");
const FaIcon_1 = require("../FaIcon");
const fieldValidationMessageHelper = require("../../../common/helpers/fieldValidationMessageHelper");
const Spinner = ReactActivity.Spinner;
class FormFieldUserName extends React.Component {
    getAddOnAfterComponent() {
        const { meta } = this.props;
        if (meta.asyncValidating)
            return React.createElement(Spinner, { size: 10 });
        if (meta.error)
            return React.createElement(FaIcon_1.FaIcon, { icon: "exclamation-triangle", className: "error" });
        return React.createElement(FaIcon_1.FaIcon, { icon: "check", className: "ok" });
    }
    render() {
        const { input, meta } = this.props;
        const innerComponentProps = {
            input,
            meta,
        };
        const errorMessage = meta.touched ? fieldValidationMessageHelper.getErrorMessage(meta.error) : null;
        const validationComponent = this.getAddOnAfterComponent();
        return (React.createElement(index_1.FormGroup, { label: "User name", labelFor: "name", error: errorMessage },
            React.createElement(index_1.InputGroup, { addOnBefore: "aboutdevs.com/", addOnAfter: validationComponent, addOnBeforeClassName: "input-group-addon-before-username" },
                React.createElement(index_1.TextBox, Object.assign({}, innerComponentProps)))));
    }
}
exports.FormFieldUserName = FormFieldUserName;
//# sourceMappingURL=FormFieldUserName.js.map
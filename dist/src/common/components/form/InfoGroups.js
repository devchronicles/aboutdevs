"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const index_1 = require("./index");
const FaIcon_1 = require("../FaIcon");
const FormRow_1 = require("./FormRow");
const FieldArray_1 = require("./FieldArray");
const TextArea_1 = require("./TextArea");
const SelectTags_1 = require("./SelectTags");
const fieldValidationMessageHelper = require("../../helpers/fieldValidationMessageHelper");
class InfoGroups extends React.Component {
    constructor() {
        super(...arguments);
        this.renderControls = (fields, index, disableDeleteLast) => {
            return (React.createElement("div", { className: "controls" },
                React.createElement("button", { type: "button", disabled: index === 0, onClick: (e) => {
                        fields.swap(index, index - 1);
                        e.stopPropagation();
                    } },
                    React.createElement("i", { className: "fa fa-caret-up" })),
                React.createElement("button", { type: "button", disabled: fields.length === (index + 1), onClick: (e) => {
                        fields.swap(index, index + 1);
                        e.stopPropagation();
                    } },
                    React.createElement("i", { className: "fa fa-caret-down" })),
                React.createElement("button", { type: "button", disabled: disableDeleteLast ? fields.length === 1 : false, onClick: (e) => {
                        fields.remove(index);
                        e.stopPropagation();
                    } },
                    React.createElement("i", { className: "fa fa-trash" }))));
        };
        this.renderGroup = ({ fields, meta }) => {
            return (React.createElement("div", { className: "field-array" },
                React.createElement("ul", null, fields.map((groupItem, index) => (React.createElement("li", { className: "multi-line child", key: `social-link-${index}` },
                    React.createElement("div", { className: "item" },
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${groupItem}.title`, label: "Item title", component: index_1.FormField, innerComponent: index_1.TextBox })),
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${groupItem}.url`, label: "URL", component: index_1.FormField, innerComponent: index_1.TextBox, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "link" }) })),
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${groupItem}.description`, label: "Description", component: index_1.FormField, innerComponent: TextArea_1.TextArea })),
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${groupItem}.tags`, label: "Tags", component: index_1.FormField, innerComponent: SelectTags_1.SelectTags, help: "Data by Stackoverflow", addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "tags" }) }))),
                    this.renderControls(fields, index, true))))),
                React.createElement("div", { className: "field-array-button-bar" },
                    React.createElement("button", { type: "button", onClick: () => fields.push({}) }, "+ Item"))));
        };
        this.renderGroups = (fields) => {
            return (React.createElement("div", { className: "field-array" },
                React.createElement("ul", null, fields.map((group, index) => (React.createElement("li", { className: "multi-line", key: `social-link-${index}` },
                    React.createElement("div", { className: "item" },
                        React.createElement(FormRow_1.FormRow, null,
                            React.createElement(index_1.Field, { name: `${group}.title`, label: "List title", component: index_1.FormField, innerComponent: index_1.TextBox })),
                        React.createElement(FieldArray_1.FieldArray, { name: `${group}.items`, component: this.renderGroup })),
                    this.renderControls(fields, index, false))))),
                React.createElement("div", { className: "field-array-button-bar" },
                    React.createElement("button", { type: "button", onClick: () => fields.push({ items: [{}] }) }, "+ List"))));
        };
    }
    render() {
        const { fields, meta: { error } } = this.props;
        return (React.createElement(index_1.FormGroup, null,
            this.renderGroups(fields),
            error &&
                React.createElement("small", { className: "form-help error" }, fieldValidationMessageHelper.getErrorMessage(error))));
    }
}
exports.InfoGroups = InfoGroups;
//# sourceMappingURL=InfoGroups.js.map
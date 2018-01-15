"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const form_1 = require("./form");
const ReduxForm = require("redux-form");
const SelectTags_1 = require("./form/SelectTags");
const IndexSearchForm = (props) => {
    const { handleSubmit, onSubmit, } = props;
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit), className: "flex-column flex-align-items-center " },
        React.createElement(form_1.FormRow, null,
            React.createElement(form_1.FormGroup, null,
                React.createElement(form_1.Field, { name: "searchTags", component: form_1.FormField, innerComponent: SelectTags_1.SelectTags, innerComponentProps: {
                        placeholder: "Developers with this expertise...",
                    } }))),
        React.createElement(form_1.FormRow, null,
            React.createElement(form_1.FormGroup, null,
                React.createElement(form_1.Field, { name: "searchFormattedAddress", placeholder: "Located at", component: form_1.FormField, innerComponent: form_1.SelectLocation, innerComponentProps: {
                        placeholder: "Located at or near...",
                    } }))),
        React.createElement("button", { type: "submit", className: "search vibrant" },
            React.createElement("i", { className: "fa fa-search", "aria-hidden": "true" }),
            React.createElement("span", null, "Discover Developers"))));
};
// Decorate with redux-form
const FormDecoratedSearchForm = ReduxForm.reduxForm({
    form: "search",
    destroyOnUnmount: false,
    enableReinitialize: true,
})(IndexSearchForm);
exports.SearchForm = FormDecoratedSearchForm;
//# sourceMappingURL=SearchForm.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const FaIcon_1 = require("./FaIcon");
const form_1 = require("./form");
const DocumentSection_1 = require("./DocumentSection");
const asyncValidation_1 = require("../lib/redux-form/asyncValidation");
const ReduxForm = require("redux-form");
const ReactRedux = require("react-redux");
const SelectTags_1 = require("./form/SelectTags");
const ColorPicker_1 = require("./form/ColorPicker");
const SocialLinks_1 = require("./form/SocialLinks");
const InfoGroups_1 = require("./form/InfoGroups");
const MarkdownEditor_1 = require("./form/MarkdownEditor");
class ProfileEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleCancel = (event) => {
            const { onCancel } = this.props;
            event.preventDefault();
            onCancel();
        };
        this.handleToggleCollapsed = (sectionId) => {
            const newState = Object.assign({}, this.state);
            newState.openSections[sectionId] = this.state.openSections[sectionId] === undefined
                ? true
                : !this.state.openSections[sectionId];
            this.setState(newState);
        };
        this.state = {
            openSections: {
                basicInfo: true,
            },
        };
    }
    render() {
        const { formValues, formSyncErrors, formSubmitErrors, handleSubmit, pristine, submitting, loggedUser, onSubmit, onCancel, } = this.props;
        return (React.createElement("div", { className: "document" },
            React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                React.createElement("div", { className: "document-section-wrapper" },
                    React.createElement(DocumentSection_1.DocumentSection, { id: "basicInfo", title: "Basic info", onToggleCollapsed: this.handleToggleCollapsed, open: this.state.openSections && this.state.openSections.basicInfo },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "type", component: form_1.UserTypeToggle })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "name", component: form_1.FormFieldUserName })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "displayName", label: "Display name", component: form_1.FormField, innerComponent: form_1.TextBox, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "user" }) })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "title", label: "Title", component: form_1.FormField, innerComponent: form_1.TextBox, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "briefcase" }) })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "companyName", label: "Company name", component: form_1.FormField, innerComponent: form_1.TextBox, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "building" }) })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "companyUrl", label: "Company URL", component: form_1.FormField, innerComponent: form_1.TextBox, addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "link" }) })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "formattedAddress", label: "Location", component: form_1.FormField, innerComponent: form_1.SelectLocation, help: "Data by Google Places", addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "map-marker" }) })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "tags", label: "Expertise", component: form_1.FormField, innerComponent: SelectTags_1.SelectTags, help: "Data by StackOverflow", addOnBefore: React.createElement(FaIcon_1.FaIcon, { icon: "tags" }) }))),
                    React.createElement(DocumentSection_1.DocumentSection, { id: "socialLinks", title: "Social links", onToggleCollapsed: this.handleToggleCollapsed, open: this.state.openSections && this.state.openSections.socialLinks },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.FieldArray, { name: "socialLinks", component: SocialLinks_1.SocialLinks, socialLinks: formValues ? formValues.socialLinks : undefined }))),
                    React.createElement(DocumentSection_1.DocumentSection, { id: "bio", title: "Bio", onToggleCollapsed: this.handleToggleCollapsed, open: this.state.openSections && this.state.openSections.bio },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "bio", component: form_1.FormField, innerComponent: MarkdownEditor_1.MarkdownEditor }))),
                    React.createElement(DocumentSection_1.DocumentSection, { id: "infoGroups", title: "Lists", onToggleCollapsed: this.handleToggleCollapsed, open: this.state.openSections && this.state.openSections.infoGroups },
                        React.createElement(form_1.FieldArray, { name: "infoGroups", component: InfoGroups_1.InfoGroups })),
                    React.createElement(DocumentSection_1.DocumentSection, { id: "colors", title: "Colors", onToggleCollapsed: this.handleToggleCollapsed, open: this.state.openSections && this.state.openSections.colors },
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "colors.headerBackground", label: "Header background", component: form_1.FormField, innerComponent: ColorPicker_1.ColorPicker })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "colors.headerText", label: "Header text", component: form_1.FormField, innerComponent: ColorPicker_1.ColorPicker })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "colors.bodyBackground", label: "Body background", component: form_1.FormField, innerComponent: ColorPicker_1.ColorPicker })),
                        React.createElement(form_1.FormRow, null,
                            React.createElement(form_1.Field, { name: "colors.bodyText", label: "Body text", component: form_1.FormField, innerComponent: ColorPicker_1.ColorPicker })))),
                React.createElement("div", { className: "button-bar" },
                    React.createElement("button", { onClick: this.handleCancel }, "Discard"),
                    React.createElement("button", { type: "submit", className: "vibrant", disabled: pristine || submitting }, "Save")))));
    }
}
const FORM_NAME = "profileEdit";
// Decorate with connect to read form values
const mapStateToProps = (state) => ({
    formValues: ReduxForm.getFormValues(FORM_NAME)(state),
    formSyncErrors: ReduxForm.getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: ReduxForm.getFormSubmitErrors(FORM_NAME)(state),
    loggedUser: state.loggedUser,
});
const mapDispatchToProps = (dispatch) => ({});
const ConnectedProfileEditForm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm);
// Decorate with redux-form
const FormDecoratedProfileEditForm = ReduxForm.reduxForm({
    form: FORM_NAME,
    asyncValidate: asyncValidation_1.default,
    asyncBlurFields: ["name"],
})(ConnectedProfileEditForm);
exports.ProfileEditForm = FormDecoratedProfileEditForm;
//# sourceMappingURL=ProfileEditForm.js.map
import * as React from "react";
import { FaIcon } from "./FaIcon";
import {
    Field, FieldArray, FormField, FormFieldUserName, FormRow, SelectLocation, TextBox,
    UserTypeToggle,
} from "./form";
import { DocumentSection } from "./DocumentSection";
import asyncValidation from "../lib/redux-form/asyncValidation";
import * as ReduxForm from "redux-form";
import * as ReactRedux from "react-redux";
import * as commonTypes from "../typings/commonTypes";
import { SelectTags } from "./form/SelectTags";
import { ColorPicker } from "./form/ColorPicker";
import { SocialLinks } from "./form/SocialLinks";
import { InfoGroups } from "./form/InfoGroups";
import { MarkdownEditor } from "./form/MarkdownEditor";
import { UserProfile } from "../typings";

interface ProfileEditFormStateProps {
    formValues: any;
    formSyncErrors: any;
    formSubmitErrors: any;
    loggedUser: commonTypes.CurrentUserProfile;
}

interface ProfileEditFormDispatchProps {

}

interface ProfileEditFormOwnProps {
    onSubmit?: (formValues: UserProfile) => any;

    onCancel?(): void;
}

declare type ProfileEditorFormProps =
    ProfileEditFormStateProps
    & ProfileEditFormDispatchProps
    & ProfileEditFormOwnProps
    & ReduxForm.InjectedFormProps<UserProfile>;

interface ProfileEditFormState {
    // The ids of the open sections
    openSections: {
        [key: string]: boolean;
    };
}

class ProfileEditForm extends React.Component<ProfileEditorFormProps, ProfileEditFormState> {

    handleCancel = (event: React.FormEvent<any>) => {
        const {onCancel} = this.props;
        event.preventDefault();

        onCancel();
    }

    handleToggleCollapsed = (sectionId: string) => {
        const newState = {...this.state};
        newState.openSections[sectionId] = this.state.openSections[sectionId] === undefined
            ? true
            : !this.state.openSections[sectionId];
        this.setState(newState);
    }

    constructor(props: ProfileEditorFormProps) {
        super(props);
        this.state = {
            openSections: {
                basicInfo: true,
            },
        };
    }

    render() {
        const {
            formValues,
            formSyncErrors,
            formSubmitErrors,
            handleSubmit,
            pristine,
            submitting,
            loggedUser,
            onSubmit,
            onCancel,
        } = this.props;

        return (
            <div className="document">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="document-section-wrapper">
                        <DocumentSection
                            id={"basicInfo"}
                            title={"Basic info"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.basicInfo}
                        >
                            <FormRow>
                                <Field
                                    name="type"
                                    component={UserTypeToggle}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="name"
                                    component={FormFieldUserName}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="displayName"
                                    label="Display name"
                                    component={FormField}
                                    innerComponent={TextBox}
                                    addOnBefore={<FaIcon icon="user"/>}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="title"
                                    label="Title"
                                    component={FormField}
                                    innerComponent={TextBox}
                                    addOnBefore={<FaIcon icon="briefcase"/>}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="companyName"
                                    label="Company name"
                                    component={FormField}
                                    innerComponent={TextBox}
                                    addOnBefore={<FaIcon icon="building"/>}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="companyUrl"
                                    label="Company URL"
                                    component={FormField}
                                    innerComponent={TextBox}
                                    addOnBefore={<FaIcon icon="link"/>}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="formattedAddress"
                                    label="Location"
                                    component={FormField}
                                    innerComponent={SelectLocation}
                                    help="Data by Google Places"
                                    addOnBefore={<FaIcon icon="map-marker"/>}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="tags"
                                    label="Expertise"
                                    component={FormField}
                                    innerComponent={SelectTags}
                                    help="Data by StackOverflow"
                                    addOnBefore={<FaIcon icon="tags"/>}
                                />
                            </FormRow>
                        </DocumentSection>
                        <DocumentSection
                            id={"socialLinks"}
                            title={"Social links"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.socialLinks}
                        >
                            <FormRow>
                                <FieldArray
                                    name="socialLinks"
                                    component={SocialLinks}
                                    socialLinks={formValues ? formValues.socialLinks : undefined}
                                />
                            </FormRow>
                        </DocumentSection>
                        <DocumentSection
                            id={"bio"}
                            title={"Bio"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.bio}
                        >
                            <FormRow>
                                <Field
                                    name="bio"
                                    component={FormField}
                                    innerComponent={MarkdownEditor}
                                />
                            </FormRow>
                        </DocumentSection>
                        <DocumentSection
                            id={"infoGroups"}
                            title={"Lists"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.infoGroups}
                        >
                            <FieldArray name={"infoGroups"} component={InfoGroups}/>
                        </DocumentSection>
                        <DocumentSection
                            id={"colors"}
                            title={"Colors"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.colors}
                        >
                            <FormRow>
                                <Field
                                    name="colors.headerBackground"
                                    label="Header background"
                                    component={FormField}
                                    innerComponent={ColorPicker}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="colors.headerText"
                                    label="Header text"
                                    component={FormField}
                                    innerComponent={ColorPicker}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="colors.bodyBackground"
                                    label="Body background"
                                    component={FormField}
                                    innerComponent={ColorPicker}
                                />
                            </FormRow>
                            <FormRow>
                                <Field
                                    name="colors.bodyText"
                                    label="Body text"
                                    component={FormField}
                                    innerComponent={ColorPicker}
                                />
                            </FormRow>
                        </DocumentSection>
                    </div>
                    <div className="button-bar">
                        <button onClick={this.handleCancel}>Discard</button>
                        <button type="submit" className="vibrant" disabled={pristine || submitting}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

const FORM_NAME = "profileEdit";

// Decorate with connect to read form values

const mapStateToProps = (state: commonTypes.ReduxState): ProfileEditFormStateProps => ({
    formValues: ReduxForm.getFormValues(FORM_NAME)(state),
    formSyncErrors: ReduxForm.getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: ReduxForm.getFormSubmitErrors(FORM_NAME)(state),
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): ProfileEditFormDispatchProps => ({});

const ConnectedProfileEditForm = ReactRedux.connect<ProfileEditFormStateProps, ProfileEditFormDispatchProps, ProfileEditFormOwnProps, ProfileEditorFormProps>(
    mapStateToProps,
    mapDispatchToProps,
)(ProfileEditForm);

// Decorate with redux-form
const FormDecoratedProfileEditForm = ReduxForm.reduxForm<UserProfile, ProfileEditFormOwnProps>({
    form: FORM_NAME, // a unique identifier for this form,
    asyncValidate: asyncValidation,
    asyncBlurFields: ["name"],
})(ConnectedProfileEditForm);

export { FormDecoratedProfileEditForm as ProfileEditForm };

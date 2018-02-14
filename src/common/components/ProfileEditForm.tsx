import * as React from "react";
import { FaIcon } from "./FaIcon";
import { Field, FieldArray, FormField, FormFieldUserName, FormRow, SelectLocation, TextBox } from "./form";
import { DocumentSection } from "./DocumentSection";
import asyncValidation from "../lib/redux-form/asyncValidation";
import * as ReduxForm from "redux-form";
import * as ReactRedux from "react-redux";
import * as commonTypes from "../typings/commonTypes";
import { SelectTags } from "./form/SelectTags";
import { ColorPicker } from "./form/ColorPicker";
import { SocialLinks } from "./form/SocialLinks";
import { InfoGroups } from "./form/InfoGroups";
import { UserProfile } from "../typings";
import { ProfilePictureComponent } from "./ProfilePictureComponent";
import { Toggle } from "./form/Toggle";
import { DropzoneInput } from "./form/DropzoneInput";
import { TextArea } from "./form/TextArea";

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
                socialLinks: true,
                cv: true,
                expertise: true,
                bio: true,
                infoGroups: true,
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
                                    label={"Profile picture"}
                                    component={FormField}
                                    innerComponent={ProfilePictureComponent}
                                    addOnBefore={<FaIcon icon="camera"/>}
                                    help={"Changes in the Gravatar picture will not reflect instantly on the preview"}
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
                            id={"cv"}
                            title={"Curriculum Vitae"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.cv}
                        >
                            <FormRow>
                                <Field
                                    name="cv"
                                    component={FormField}
                                    innerComponent={DropzoneInput}
                                    help={"Only PDF files are supported. Max size: 500KB. The CV download button might not appear in your profile preview."}
                                />
                            </FormRow>
                        </DocumentSection>
                        <DocumentSection
                            id={"expertise"}
                            title={"Expertise"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.expertise}
                        >
                            <FormRow>
                                <Field
                                    name="tags"
                                    component={FormField}
                                    innerComponent={SelectTags}
                                    help="Data by StackOverflow. You can pick up to 12 tags."
                                    addOnBefore={<FaIcon icon="tags"/>}
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
                                    innerComponent={TextArea}
                                    innerComponentProps={{
                                        rows: 60,
                                    }}
                                    help={"Markdown supported. Don't forget to use absolute URLs in links. Example: like https://foo.com"}
                                />
                            </FormRow>
                        </DocumentSection>
                        <DocumentSection
                            id={"infoGroups"}
                            title={"Lists"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.infoGroups}
                        >
                            <small className="form-help-top">
                                Create lists for your education, professional experience, certifications, open-source
                                projects, books... The sky is the limit.
                                Tags added to list items are not associated with your profile, search-wise.
                            </small>
                            <FieldArray name={"infoGroups"} component={InfoGroups}/>
                        </DocumentSection>
                        <DocumentSection
                            id={"settings"}
                            title={"Settings"}
                            onToggleCollapsed={this.handleToggleCollapsed}
                            open={this.state.openSections && this.state.openSections.settings}
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
                            <FormRow>
                                <Field
                                    name="settingsEnabled"
                                    label="Profile visibility"
                                    component={FormField}
                                    innerComponent={Toggle}
                                    help={"Disabled profiles will not searchable or visible for other users."}
                                />

                            </FormRow>
                            <FormRow>
                                <Field
                                    name="settingsSearchable"
                                    label="Profile search visibility"
                                    component={FormField}
                                    innerComponent={Toggle}
                                    help={"Disabling search will make your profile not visible in searches inside AboutDevs but it does not affect search engines like Google."}
                                />
                            </FormRow>
                        </DocumentSection>
                    </div>
                    <div className="button-bar">
                        <button onClick={this.handleCancel}>Close</button>
                        <button type="submit" className="vibrant" disabled={submitting}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
}

const
    FORM_NAME = "profileEdit";

// Decorate with connect to read form values

const
    mapStateToProps = (state: commonTypes.ReduxState): ProfileEditFormStateProps => ({
        formValues: ReduxForm.getFormValues(FORM_NAME)(state),
        formSyncErrors: ReduxForm.getFormSyncErrors(FORM_NAME)(state),
        formSubmitErrors: ReduxForm.getFormSubmitErrors(FORM_NAME)(state),
        loggedUser: state.loggedUser,
    });

const
    mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): ProfileEditFormDispatchProps => ({});

const
    ConnectedProfileEditForm = ReactRedux.connect<ProfileEditFormStateProps, ProfileEditFormDispatchProps, ProfileEditFormOwnProps, ProfileEditorFormProps>(
        mapStateToProps,
        mapDispatchToProps,
    )(ProfileEditForm);

// Decorate with redux-form
const
    FormDecoratedProfileEditForm = ReduxForm.reduxForm<UserProfile, ProfileEditFormOwnProps>({
        form: FORM_NAME, // a unique identifier for this form,
        asyncValidate: asyncValidation,
        asyncBlurFields: ["name"],
    })(ConnectedProfileEditForm);

export {
    FormDecoratedProfileEditForm
        as
            ProfileEditForm,
};

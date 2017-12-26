import * as React from "react";
import { FaIcon } from "./FaIcon";
import {
    Field, FieldArray, FormField, FormFieldUserName, FormGroup, FormRow, SelectLocation, TextArea, TextBox,
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

interface ProfileEditFormStateProps {
    formValues: any;
    formSyncErrors: any;
    formSubmitErrors: any;
    loggedUser: commonTypes.CurrentUserProfile;
}

interface ProfileEditFormDispatchProps {

}

interface ProfileEditFormOwnProps extends ReduxForm.FormProps<any, any, any> {
    onSubmit: (formValues: any) => any;
    onCancel: () => void;
}

declare type ProfileEditorFormProps =
    ProfileEditFormStateProps
    & ProfileEditFormDispatchProps
    & ProfileEditFormOwnProps;

let ProfileEditForm: React.SFC<ProfileEditorFormProps> = (props) => {
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
    } = props;

    return (
        <div className="document">
            <form onSubmit={handleSubmit(onSubmit)}>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <FormGroup
                            labelFor="displayName"
                        >
                            <Field
                                name="type"
                                component={UserTypeToggle}
                            />
                        </FormGroup>
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
                            addOnBefore={<FaIcon icon="map-marker"/>}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <FieldArray
                            name="socialLinks"
                            component={SocialLinks}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection
                    visible={formValues ? formValues.type === commonTypes.UserProfileType.DEVELOPER : true}
                    className="flex-column flex-align-items-center"
                >
                    <FormRow>
                        <Field
                            name="tags"
                            label="Expertise"
                            component={FormField}
                            innerComponent={SelectTags}
                            help="Data provided by Stackoverflow"
                            addOnBefore={<FaIcon icon="tags"/>}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="bio"
                            label="Bio"
                            component={FormField}
                            innerComponent={TextArea}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection
                    visible={formValues ? formValues.type === commonTypes.UserProfileType.DEVELOPER : true}
                    className="flex-column flex-align-items-center"
                >
                    <FieldArray name={"infoGroups"} component={InfoGroups}/>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="colorPrimary"
                            label="Color Primary"
                            component={FormField}
                            innerComponent={ColorPicker}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="colorSecondary"
                            label="Color Secondary"
                            component={FormField}
                            innerComponent={ColorPicker}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="colorNegative"
                            label="Color Negative"
                            component={FormField}
                            innerComponent={ColorPicker}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-row-reverse button-bar">
                    <button onClick={() => onCancel()}>Cancel</button>
                    <button type="submit" className="vibrant" disabled={pristine || submitting}>Save</button>
                </DocumentSection>
            </form>
        </div>
    );
};

const FORM_NAME = "profileEdit";

// Decorate with redux-form
ProfileEditForm = ReduxForm.reduxForm({
    form: FORM_NAME, // a unique identifier for this form,
    asyncValidate: asyncValidation,
    asyncBlurFields: ["name"],
})(ProfileEditForm);

// Decorate with connect to read form values

const mapStateToProps = (state: commonTypes.ReduxState): ProfileEditFormStateProps => ({
    formValues: ReduxForm.getFormValues(FORM_NAME)(state),
    formSyncErrors: ReduxForm.getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: ReduxForm.getFormSubmitErrors(FORM_NAME)(state),
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): ProfileEditFormDispatchProps => ({});

const mergeProps = (stateProps: ProfileEditFormStateProps, dispatchProps: ProfileEditFormDispatchProps, ownProps: ProfileEditFormOwnProps): ProfileEditorFormProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedProfileEditForm = ReactRedux.connect<ProfileEditFormStateProps, ProfileEditFormDispatchProps, ProfileEditFormOwnProps, ProfileEditorFormProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ProfileEditForm);

export { ConnectedProfileEditForm as ProfileEditForm };

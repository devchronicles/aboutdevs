import * as React from "react";
import { FaIcon } from "./FaIcon";
import {
    Field, FieldArray, FormField, FormFieldUserName, FormGroup, FormRow, SelectLocation, Services, TextArea,
    TextBox, UserTypeToggle,
} from "./form";
import { DocumentSection } from "./DocumentSection";
import asyncValidation from "../lib/redux-form/asyncValidation";
import * as ReduxForm from "redux-form";
import * as ReactRedux from "react-redux";
import * as commonTypes from "../typings/commonTypes";
import { SelectTags } from "./form/SelectTags";
import { ColorPicker } from "./form/ColorPicker";
import { SocialLinks } from "./form/SocialLinks";

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
                        <FieldArray
                            name="socialLinks"
                            component={SocialLinks}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection
                    visible={formValues ? formValues.type === commonTypes.UserProfileType.RECRUITER : true}
                    className="flex-column flex-align-items-center"
                >
                    <FormRow>
                        <Field
                            name="profession"
                            label="Technologies"
                            component={FormField}
                            innerComponent={SelectTags}
                            help="Data is provided by Stackoverflow"
                            addOnBefore={<FaIcon icon="tags"/>}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="bio"
                            label="Biografia"
                            component={FormField}
                            innerComponent={TextArea}
                            help="Fale um pouco sobre você, sua formação e sua carreira. Tamanho máximo: 500 caracteres."
                        />
                    </FormRow>
                    <FormRow>
                        <FieldArray
                            name="services"
                            component={Services}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="address"
                            label="Endereço"
                            component={FormField}
                            innerComponent={SelectLocation}
                            help="Seu endereço não será exibido. Este campo é usado somente para geo-localização."
                            addOnBefore={<FaIcon icon="map-marker"/>}
                        />
                    </FormRow>
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

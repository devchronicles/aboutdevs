import * as React from "react";
import * as ReduxForm from "redux-form";
import { getFormSubmitErrors, getFormSyncErrors, getFormValues, reduxForm } from "redux-form";
import * as ReactRedux from "react-redux";
import { connect } from "react-redux";
import { FaIcon } from "./FaIcon";
import {
    Field,
    FieldArray,
    FormField,
    FormFieldUserName,
    FormGroup,
    FormRow,
    SelectLocation,
    SelectProfession,
    Services,
    TextArea,
    TextBox,
    UserTypeToggle,
} from "./form/index";
import { DocumentSection } from "./DocumentSection";
import normalizePhone from "../lib/redux-form/normalizePhone";
import asyncValidation from "../lib/redux-form/asyncValidation";
import * as commonTypes from "../typings/commonTypes";

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

declare type ProfileEditorFormProps = ProfileEditFormStateProps & ProfileEditFormDispatchProps & ProfileEditFormOwnProps;

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
                    <div className="image" style={{ backgroundImage: `url(${loggedUser.photoUrl})` }} />
                    <FormRow>
                        <Field
                            name="name"
                            component={FormFieldUserName}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="displayName"
                            label="Nome de exibição"
                            component={FormField}
                            innerComponent={TextBox}
                            help="É assim que seu nome será exibido aos outros."
                            addOnBefore={<FaIcon icon="user" />}
                        />
                    </FormRow>
                    <FormRow>
                        <FormGroup
                            label="Tipo de usuário"
                            labelFor="displayName"
                            help="Selecione 'Sou um profissional' se você tem interesse em criar um perfil público para divulgar seus serviços. Caso contrário, selecione 'Estou em busca de profissionais."
                        >
                            <Field
                                name="type"
                                component={UserTypeToggle}
                            />
                        </FormGroup>
                    </FormRow>
                </DocumentSection>
                <DocumentSection visible={formValues ? formValues.type === commonTypes.UserProfileType.PROFESSIONAL : true} className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="profession"
                            label="Profissão"
                            component={FormField}
                            innerComponent={SelectProfession}
                            help="Escreva o que melhor descreve a sua profissão."
                            addOnBefore={<FaIcon icon="briefcase" />}
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
                            addOnBefore={<FaIcon icon="map-marker" />}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="phoneWhatsapp"
                            label="Whatsapp"
                            component={FormField}
                            innerComponent={TextBox}
                            help="Seu Whatsapp será exibido somente aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="whatsapp" />}
                            normalize={normalizePhone}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="phoneAlternative"
                            label="Telefone alternativo"
                            component={FormField}
                            innerComponent={TextBox}
                            help="Seu telefone alternativo será exibido somente aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="phone" />}
                            normalize={normalizePhone}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-row-reverse button-bar">
                    <button onClick={() => onCancel()}>Cancelar</button>
                    <button type="submit" className="vibrant" disabled={pristine || submitting}>Salvar</button>
                </DocumentSection>
            </form >
        </div >
    );
};

const FORM_NAME = "profileEdit";

// Decorate with redux-form
ProfileEditForm = reduxForm({
    form: FORM_NAME, // a unique identifier for this form,
    asyncValidate: asyncValidation,
    asyncBlurFields: ["name"],
})(ProfileEditForm);

// Decorate with connect to read form values

const mapStateToProps = (state: commonTypes.ReduxState): ProfileEditFormStateProps => ({
    formValues: getFormValues(FORM_NAME)(state),
    formSyncErrors: getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: getFormSubmitErrors(FORM_NAME)(state),
    loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch: ReactRedux.Dispatch<commonTypes.ReduxState>): ProfileEditFormDispatchProps => ({

});

const mergeProps = (stateProps: ProfileEditFormStateProps, dispatchProps: ProfileEditFormDispatchProps, ownProps: ProfileEditFormOwnProps): ProfileEditorFormProps => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
});

const ConnectedProfileEditForm = connect<ProfileEditFormStateProps, ProfileEditFormDispatchProps, ProfileEditFormOwnProps, ProfileEditorFormProps>(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ProfileEditForm);

export { ConnectedProfileEditForm as ProfileEditForm };

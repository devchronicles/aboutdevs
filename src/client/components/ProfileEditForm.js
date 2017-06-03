import React from 'react';
import { Field, reduxForm, getFormValues, getFormSyncErrors, getFormSubmitErrors, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import FaIcon from './FaIcon';
import { TextBox, TextArea, FormField, FormGroup, FormFieldUserName, FormRow, SelectLocation, SelectProfession } from './form/index';
import UserTypeToggle from './UserTypeToggle';
import DocumentSection from './DocumentSection';
import normalizePhone from '../lib/redux-form/normalizePhone';
import * as fieldValidation from '../lib/redux-form/fieldValidation';
import asyncValidation from '../lib/redux-form/asyncValidation';

function submit(values) {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    return sleep(1000)
        .then(() => {
            throw new SubmissionError({
                displayName: 'invalid-phone'
            });
        });
}

let ProfileEditForm = (props) => {
    const {
        formValues,
        formSyncErrors,
        formSubmitErrors,
        handleSubmit,
        pristine,
        submitting,
        loggedUser
    } = props;

    return (
        <div className="document">
            <form onSubmit={handleSubmit(submit)}>
                <DocumentSection className="flex-column flex-align-items-center">
                    <div className="image" style={{ backgroundImage: `url(${loggedUser.photoUrl})` }} />
                    <div className="edit-profile-image-button-wrapper">
                        <button className="edit-profile-image-button">
                            <FaIcon icon="camera" />
                            Alterar imagem de perfil
                        </button>
                    </div>
                    <FormRow>
                        <FormGroup
                            label="Tipo de usuário"
                            labelFor="displayName"
                            help={"Selecione 'Sou um profissional' se você tem interesse em criar um perfil público " +
                                "para divulgar seus serviços. Caso contrário, selecione 'Estou em busca de profissionais'."
                            }
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
                            validate={[fieldValidation.validateRequired, fieldValidation.validateMaxLength50]}
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
                            validate={[fieldValidation.validateRequired, fieldValidation.validateMaxLength50]}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection visible={formValues ? formValues.type === 0 : true} className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="profession"
                            label="Profissão"
                            component={FormField}
                            innerComponent={SelectProfession}
                            help="Escreva o que melhor descreve a sua profissão."
                            addOnBefore={<FaIcon icon="briefcase" />}
                            validate={[fieldValidation.validationRequiredIfProfessional, fieldValidation.validateMaxLength80]}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="bio"
                            label="Biografia"
                            component={FormField}
                            innerComponent={TextArea}
                            help="Fale um pouco sobre você, sua formação e sua carreira. Tamanho máximo: 500 caracteres."
                            validate={[fieldValidation.validationRequiredIfProfessional, fieldValidation.validateMaxLength500]}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="activities"
                            label="Serviços que você presta"
                            component={FormField}
                            innerComponent={TextArea}
                            help="Descreva, brevemente, os tipos de serviço que você presta. Tamanho máximo: 500 caracteres."
                            validate={[fieldValidation.validationRequiredIfProfessional, fieldValidation.validateMaxLength500]}
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
                            help="Seu endereço não será exibido. Ele será usado somente para geo-localização."
                            addOnBefore={<FaIcon icon="map-marker" />}
                            validate={[fieldValidation.validateRequired]}
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
                            help="Seu Whatsapp será exibido aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="whatsapp" />}
                            validate={[fieldValidation.validateAtLeastOnePhone, fieldValidation.validatePhone]}
                            normalize={normalizePhone}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="phoneAlternative"
                            label="Telefone alternativo"
                            component={FormField}
                            innerComponent={TextBox}
                            help="Seu telefone alternativo será exibido aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="phone" />}
                            validate={[fieldValidation.validateAtLeastOnePhone, fieldValidation.validatePhone]}
                            normalize={normalizePhone}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-row-reverse button-bar">
                    <a className="button" href="/">Cancelar</a>
                    <button type="submit" className="vibrant" disabled={pristine || submitting}>Salvar</button>
                </DocumentSection>
            </form >
        </div >
    );
};

const FORM_NAME = 'profile-edit';

// Decorate with redux-form
ProfileEditForm = reduxForm({
    form: FORM_NAME, // a unique identifier for this form,
    asyncValidate: asyncValidation,
    asyncBlurFields: ['name']
})(ProfileEditForm);

// Decorate with connect to read form values


ProfileEditForm = connect(state => ({
    formValues: getFormValues(FORM_NAME)(state),
    formSyncErrors: getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: getFormSubmitErrors(FORM_NAME)(state)
}))(ProfileEditForm);

export default ProfileEditForm;

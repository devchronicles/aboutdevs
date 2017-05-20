import React from 'react';
import { Field, reduxForm, getFormValues, getFormSyncErrors, getFormSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import FormGroup from './form/FormGroup';
import FormRow from './form/FormRow';
import FaIcon from './FaIcon';
import { TextBox, TextArea, FormField } from './form/index';
import InputGroup from './form/InputGroup';
import UserTypeToggle from './UserTypeToggle';
import SelectLocation from './SelectLocation';
import SelectProfession from './SelectProfession';
import DocumentSection from './DocumentSection';
import normalizePhone from '../lib/redux-form/normalizePhone';
import { validateRequired, validatePhone, validateAtLeastOnePhone } from '../lib/redux-form/fieldValidation';

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
            <form onSubmit={handleSubmit}>
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
                            label="Nome do usuário"
                            component={FormField}
                            innerComponent={TextBox}
                            help="A URL acima será publicamente visível se você for um profissional."
                            addOnBefore="indiejobs.com.br/"
                            validate={[validateRequired]}
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
                            validate={[validateRequired]}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection visible={formValues ? formValues.type === 0 : true} className="flex-column flex-align-items-center">
                    <FormRow>
                        <FormGroup label="Profissão" labelFor="profession" help="Escreva o que melhor descreve a sua profissão." >
                            <InputGroup addOnBefore={<FaIcon icon="briefcase" />}>
                                <Field
                                    name="profession"
                                    component={SelectProfession}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <Field
                            name="bio"
                            label="Biografia"
                            component={FormField}
                            innerComponent={TextArea}
                            help="Fale um pouco sobre você, sua formação e sua carreira."
                            validate={[validateRequired]}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="activities"
                            label="Servições que você presta"
                            component={FormField}
                            innerComponent={TextArea}
                            help="Descreva, brevemente, os tipos de serviço que você presta."
                            validate={[validateRequired]}
                        />
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <FormGroup label="Endereço" labelFor="address" help="Seu endereço não será exibido. Ele será usado somente para geo-localização." >
                            <InputGroup addOnBefore={<FaIcon icon="map-marker" />}>
                                <Field
                                    name="address"
                                    component={SelectLocation}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormRow>
                </DocumentSection>
                <DocumentSection className="flex-column flex-align-items-center">
                    <FormRow>
                        <Field
                            name="whatsapp"
                            label="Whatsapp"
                            component={FormField}
                            innerComponent={TextBox}
                            help="Seu Whatsapp será exibido aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="whatsapp" />}
                            validate={[validateAtLeastOnePhone, validatePhone]}
                            normalize={normalizePhone}
                        />
                    </FormRow>
                    <FormRow>
                        <Field
                            name="alternatePhone"
                            label="Telefone alternativo"
                            component={FormField}
                            innerComponent={TextBox}
                            help="Seu telefone alternativo será exibido aos usuários com os quais você se conectar."
                            addOnBefore={<FaIcon icon="phone" />}
                            validate={[validateAtLeastOnePhone, validatePhone]}
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
    form: FORM_NAME // a unique identifier for this form,
})(ProfileEditForm);

// Decorate with connect to read form values


ProfileEditForm = connect(state => ({
    formValues: getFormValues(FORM_NAME)(state),
    formSyncErrors: getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: getFormSubmitErrors(FORM_NAME)(state)
}))(ProfileEditForm);

export default ProfileEditForm;

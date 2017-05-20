import React from 'react';
import { Field, reduxForm, getFormValues, getFormSyncErrors, getFormSubmitErrors } from 'redux-form';
import { connect } from 'react-redux';
import FormGroup from './form/FormGroup';
import FormRow from './form/FormRow';
import FaIcon from './FaIcon';
import TextBox from './form/TextBox';
import InputGroup from './form/InputGroup';
import UserTypeToggle from './UserTypeToggle';
import SelectLocation from './SelectLocation';
import SelectProfession from './SelectProfession';
import DocumentSection from './DocumentSection';
import normalizePhone from '../lib/redux-form/normalizePhone';
import { required } from '../lib/redux-form/fieldValidation';
import { FormField } from './form/index';

let ProfileEditForm = (props) => {
    const {
        formValues,
        formSyncErrors,
        formSubmitErrors,
        handleSubmit,
        pristine,
        reset,
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
                            validate={[required]}
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
                            validate={[required]}
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
                        <FormGroup label="Biografia" labelFor="displayName" help="Fale um pouco sobre você, sua formação e sua carreira." >
                            <Field
                                name="bio"
                                component="textarea"
                                rows={6}
                                type="text"
                                className="form-control"
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup
                            label="Servições que você presta"
                            labelFor="activities"
                            help="Descreva, brevemente, os tipos de serviço que você presta."
                        >
                            <Field
                                name="activities"
                                component="textarea"
                                rows={6}
                                type="text"
                                className="form-control"
                            />
                        </FormGroup>
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
                        <FormGroup label="Whatsapp" labelFor="whatsapp" help="Seu Whatsapp será exibido aos usuários com os quais você se conectar" >
                            <InputGroup addOnBefore={<FaIcon icon="whatsapp" />}>
                                <Field
                                    name="whatsapp"
                                    component="input"
                                    type="text"
                                    className="form-control"
                                    normalize={normalizePhone}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup label="Telefone alternativo" labelFor="alternatePhone" help="Seu telefone alternativo será exibido aos usuários com os quais você se conectar " >
                            <InputGroup addOnBefore={<FaIcon icon="phone" />}>
                                <Field
                                    name="alternatePhone"
                                    component="input"
                                    type="text"
                                    className="form-control"
                                    normalize={normalizePhone}
                                />
                            </InputGroup>
                        </FormGroup>
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

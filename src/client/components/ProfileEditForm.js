import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormGroup from './FormGroup';
import FormRow from './FormRow';
import InputGroup from './InputGroup';
import UserTypeToggle from './UserTypeToggle';
import SelectAddress from './SelectAddress';


const SimpleForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, loggedUser } = props;

    return (
        <div className="document">
            <form onSubmit={handleSubmit}>
                <div className="document-section flex-column flex-align-items-center">
                    <div className="image" style={{ backgroundImage: `url(${loggedUser.photoUrl})` }} />
                    <div className="edit-profile-image-button-wrapper">
                        <button className="edit-profile-image-button">Alterar imagem de perfil</button>
                    </div>
                    <FormRow>
                        <FormGroup label="Nome do usuário" labelFor="name" help="A URL acima será publicamente visível se você for um profissional.">
                            <InputGroup addOnBefore="http://indiejobs.com.br/">
                                <Field
                                    name="name"
                                    component="input"
                                    type="text"
                                    placeholder="name"
                                    className="form-control"
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup label="Nome de exibição" labelFor="displayName" help="É assim que seu nome será exibido aos outros." >
                            <InputGroup>
                                <Field
                                    name="displayName"
                                    component="input"
                                    type="text"
                                    placeholder="Nome de exibição"
                                    className="form-control"
                                />
                            </InputGroup>
                        </FormGroup>
                    </FormRow>
                </div>
                <div className="document-section flex-column flex-align-items-center">
                    <FormRow>
                        <FormGroup label="Tipo de usuário" labelFor="displayName" help="Selecione 'Sou um profissional' se você tem interesse em criar um perfil público para divulgar seus serviços. Caso contrário, selecione 'Estou em busca de profissionais'." >
                            <Field
                                name="type"
                                component={UserTypeToggle}
                            />
                        </FormGroup>
                    </FormRow>
                    <FormRow>
                        <FormGroup label="Profissão" labelFor="profession" help="Escreva o que melhor descreve a sua profissão." >
                            <InputGroup>
                                <Field
                                    name="profession"
                                    component="input"
                                    type="text"
                                    className="form-control"
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
                        <FormGroup label="Servições que você presta" labelFor="activities" help="Descreva, brevemente, os tipos de serviço que você presta." >
                            <Field
                                name="activities"
                                component="textarea"
                                rows={6}
                                type="text"
                                className="form-control"
                            />
                        </FormGroup>
                    </FormRow>
                </div>
                <div className="document-section flex-column flex-align-items-center">
                    <FormRow>
                        <FormGroup label="Endereço" labelFor="address" help="Selecione seu endereço." >
                            <Field
                                name="address"
                                component={SelectAddress}
                            />
                        </FormGroup>
                    </FormRow>
                </div>
                <div className="document-section flex-row-reverse button-bar">
                    <a className="button" href="/">Cancelar</a>
                    <button type="submit" className="vibrant" disabled={pristine || submitting}>Salvar</button>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'profile-edit' // a unique identifier for this form
})(SimpleForm);

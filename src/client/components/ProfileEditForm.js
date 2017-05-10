import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormGroup from './FormGroup';
import FormRow from './FormRow';
import InputGroup from './InputGroup';


const SimpleForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, loggedUser } = props;

    return (
        <div className="document">
            <form onSubmit={handleSubmit}>

                <div className="document-edit-header">
                    <div className="document-section flex-v-center">
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
                </div>
                <div className="document-section">
                    <div>
                        <label htmlFor="photoUrl">Last Name</label>
                        <div>
                            <Field
                                name="photoUrl"
                                component="input"
                                type="text"
                                placeholder="photo url"
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={pristine || submitting}>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'profile-edit' // a unique identifier for this form
})(SimpleForm);

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import FormGroup from './FormGroup';


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
                        <FormGroup label="Seu nome de usuário / URL" labelFor="name">
                            <Field
                                name="name"
                                component="input"
                                type="text"
                                placeholder="name"
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="document-section">
                    <div>
                        <label htmlFor="displayName">Last Name</label>
                        <div>
                            <Field
                                name="displayName"
                                component="input"
                                type="text"
                                placeholder="display name"
                            />
                        </div>
                    </div>
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

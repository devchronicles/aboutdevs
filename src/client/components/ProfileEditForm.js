import React from 'react';
import { Field, reduxForm } from 'redux-form';


const SimpleForm = (props) => {
    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">First Name</label>
                <div>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        placeholder="name"
                    />
                </div>
            </div>
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
        </form>
    );
};

export default reduxForm({
    form: 'profile-edit' // a unique identifier for this form
})(SimpleForm);

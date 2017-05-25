import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { SelectLocation, FormRow, FormGroup } from './form/index';

let IndexSearchForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit} className="flex-column flex-align-items-center ">
            <FormRow>
                <FormGroup>
                    <Field
                        name="professional"
                        component="input"
                        type="text"
                        className="form-control"
                        placeholder="Profissional ou serviço"
                    />
                </FormGroup>
            </FormRow>
            <FormRow>
                <FormGroup>
                    <Field
                        name="location"
                        component={SelectLocation}
                        allowCities
                        placeholder="Localizado próximo a..."
                    />
                </FormGroup>
            </FormRow>
            <button type="submit" className="vibrant">
                <i className="fa fa-search" aria-hidden="true" />
                <span>Encontrar profissionais</span>
            </button>
        </form>
    );
};

IndexSearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

// Decorate with redux-form
IndexSearchForm = reduxForm({
    form: 'search' // a unique identifier for this form
})(IndexSearchForm);

export default IndexSearchForm;

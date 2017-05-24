import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { SelectLocation, FormRow, FormColumn, FormGroup } from './form/index';

let SearchForm = (props) => {
    const { handleSubmit } = props;
    return (<div className="search-criteria">
        <form onSubmit={handleSubmit}>
            <FormRow>
                <FormColumn eq>
                    <FormGroup>
                        <Field
                            name="professional"
                            component="input"
                            type="text"
                            className="form-control"
                            placeholder="Profissional ou serviço"
                        />
                    </FormGroup>
                </FormColumn>
            </FormRow>
            <FormRow>
                <FormColumn eq>
                    <FormGroup>
                        <Field
                            name="location"
                            component={SelectLocation}
                            allowCities
                            placeholder="Localizado próximo a..."
                        />
                    </FormGroup>
                </FormColumn>
            </FormRow>
            <button type="submit" className="vibrant">
                <i className="fa fa-search" aria-hidden="true" />
                <span>Pesquisar</span>
            </button>
        </form>
    </div>);
};

SearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

// Decorate with redux-form
SearchForm = reduxForm({
    form: 'search' // a unique identifier for this form
})(SearchForm);

export default SearchForm;

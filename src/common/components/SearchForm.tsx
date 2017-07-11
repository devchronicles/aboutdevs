import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SelectLocation, FormRow, FormColumn, FormGroup } from './form/index';

interface SearchFormProps {
    handleSubmit: (arg: any) => any;
}

let SearchForm: React.SFC<SearchFormProps> = (props) => {
    const { handleSubmit } = props;
    return (<div className="search-criteria">
        <form onSubmit={handleSubmit}>
            <FormRow>
                <FormColumn eq={true}>
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

// Decorate with redux-form
SearchForm = reduxForm({
    form: 'search' // a unique identifier for this form
})(SearchForm);

export { SearchForm };

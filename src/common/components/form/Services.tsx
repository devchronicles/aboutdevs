import * as React from 'react';
import * as ReduxForm from 'redux-form';
import * as commonTypes from '../../typings';
import { Field, FormField, TextBox, FormGroup, FormRow } from './index';

interface ServicesProps extends ReduxForm.WrappedFieldArrayProps<{}> {
}

export const Services: React.SFC<ServicesProps> = (props) => {
    const { fields, meta: { error } } = props;
    return (
        <FormGroup label="Serviços que você presta" help="Clique em + SERVIÇO para adicionar cada serviço que você presta, em ordem de importância.">
            <div className="field-array">
                <ul >
                    {
                        fields.map((service, index) => (
                            <li key={`service-${index}`}>
                                <span className="counter">
                                    {Number(index + 1)}
                                </span>
                                <Field
                                    name={`${service}.service`}
                                    label=""
                                    component={FormField}
                                    innerComponent={TextBox}
                                    help=""
                                />
                                <button className="delete" onClick={() => fields.remove(index)}>
                                    <i className="fa fa-trash" aria-hidden="true" />
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <div className="field-array-button-bar">
                    <button type="button" onClick={() => fields.push({})}>
                        + Serviço
                </button>
                </div>
            </div>
        </FormGroup>
    );
};

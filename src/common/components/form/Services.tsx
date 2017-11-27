import * as React from "react";
import * as ReduxForm from "redux-form";
import { Field, FormField, FormGroup, TextBox } from "./index";
import { validateMaxLength60 } from "../../helpers/fieldValidationHelper";

interface ServicesProps extends ReduxForm.WrappedFieldArrayProps<{}> {
}

export class Services extends React.Component<ServicesProps> {

    public render() {
        const { fields, meta: { error } } = this.props;
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
                                        validate={[validateMaxLength60]}
                                        help=""
                                    />
                                    <button className="delete" disabled={fields.length === 1} onClick={(e) => { fields.remove(index); e.stopPropagation(); }}>
                                        <i className="fa fa-trash" />
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
    }
}


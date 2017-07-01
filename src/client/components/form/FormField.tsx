import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as fieldValidationMessageHelper from '../../../common/helpers/fieldValidationMessageHelper';
import FormGroup from './FormGroup';
import InputGroup from './InputGroup';

interface IFormFieldProps {
    name: string;
    label: string;
    input: any;
    meta: any;
    innerComponent: any;
    help: any;
    addOnBefore: any;
    addOnAfter: any;
    validate: any[];
    placeHolder: string;
}

const FormField: React.SFC<IFormFieldProps> = (field) => {

    const {
        name,
        label,
        help,
        addOnBefore,
        addOnAfter,
        innerComponent,
    } = field;

    const innerComponentProps = {
        input: field.input,
        meta: field.meta,
    };

    const errorMessage = field.meta.touched ? fieldValidationMessageHelper.getErrorMessage(field.meta.error) : null;

    return (
        <FormGroup
            label={label}
            labelFor={name}
            help={help}
            error={errorMessage}
        >
            <InputGroup addOnBefore={addOnBefore} addOnAfter={addOnAfter}>
                {React.createElement(innerComponent, innerComponentProps)}
            </InputGroup>
        </FormGroup>
    );
};

FormField.defaultProps = {
    help: '',
    addOnBefore: undefined,
    addOnAfter: undefined,
    validate: [],
    placeHolder: '',
};

export default FormField;

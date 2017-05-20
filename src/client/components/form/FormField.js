import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup } from './index';

const FormField = (field) => {
    const {
        name,
        label,
        help,
        addOnBefore,
        addOnAfter,
        innerComponent
    } = field;

    const innerComponentProps = {
        input: field.input,
        meta: field.meta
    };

    let errorMessage;
    switch (field.meta.error) {
        case 'required':
            errorMessage = 'Campo obrigatório.';
            break;
        default:
            errorMessage = undefined;
    }

    return (<FormGroup
        label={label}
        labelFor={name}
        help={help}
        error={errorMessage}
    >
        <InputGroup addOnBefore={addOnBefore} addOnAfter={addOnAfter}>
            {React.createElement(innerComponent, innerComponentProps)}
        </InputGroup>
    </FormGroup>);
};

FormField.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    innerComponent: PropTypes.any.isRequired,
    help: PropTypes.string,
    addOnBefore: PropTypes.any,
    addOnAfter: PropTypes.any,
    validate: PropTypes.array,
    placeHolder: PropTypes.string
};

FormField.defaultProps = {
    help: '',
    addOnBefore: undefined,
    addOnAfter: undefined,
    validate: [],
    placeHolder: ''
};

export default FormField;

import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ label, labelFor, help, error, children }) => {
    let helpComponent;
    if (error) {
        helpComponent = <small className="form-help error">{error} </small>;
    } else if (help) {
        helpComponent = <small className="form-help">{help} </small>;
    } else {
        helpComponent = null;
    }

    return (<div className="form-group">
        <label htmlFor={labelFor}>{label}</label>
        {children}
        {helpComponent}
    </div>);
};

FormGroup.propTypes = {
    label: PropTypes.string.isRequired,
    labelFor: PropTypes.string,
    help: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

FormGroup.defaultProps = {
    help: null,
    error: null,
    labelFor: null,
    children: null
};

export default FormGroup;

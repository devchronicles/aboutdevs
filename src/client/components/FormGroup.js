import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ label, labelFor, help, children }) => {
    const helpComponent = help ? <small className="form-text">{help} </small> : null;
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
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

FormGroup.defaultProps = {
    labelFor: null,
    children: null
};

export default FormGroup;

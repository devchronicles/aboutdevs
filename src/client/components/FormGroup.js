import React, { PropTypes } from 'react';

const FormGroup = ({ label, labelFor, children }) => (
    <div className="form-group">
        <label htmlFor={labelFor}>{label}</label>
        {children}
    </div>
);

FormGroup.propTypes = {
    label: PropTypes.string.isRequired,
    labelFor: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};

export default FormGroup;

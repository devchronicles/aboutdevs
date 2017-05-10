import React from 'react';
import PropTypes from 'prop-types';

const FormRow = ({ children }) => (
    <div className="form-row">
        {children}
    </div>
);

FormRow.propTypes = {
    children: PropTypes.object.isRequired
};

export default FormRow;

import React from 'react';
import PropTypes from 'prop-types';

const FormColumn = ({ eq, style, children }) => (
    <div className={`form-column ${eq ? 'eq' : ''}`} style={style}>
        {children}
    </div>
);

FormColumn.propTypes = {
    children: PropTypes.object.isRequired,
    style: PropTypes.object,
    eq: PropTypes.bool
};

FormColumn.defaultProps = {
    style: null,
    eq: null
};

export default FormColumn;

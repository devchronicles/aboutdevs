import React from 'react';
import PropTypes from 'prop-types';

const ButtonGroup = ({ children }) => (
    <div className="button-group">
        { children }
    </div>
);

ButtonGroup.propTypes = {
    children: PropTypes.array.isRequired
};

export default ButtonGroup;

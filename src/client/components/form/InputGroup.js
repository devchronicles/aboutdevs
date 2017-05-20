import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({ addOnBefore, addOnAfter, children }) => {
    const addOnBeforeComponent = addOnBefore ? <span className="input-group-addon">{addOnBefore}</span> : null;
    const addOnAfterComponent = addOnAfter ? <span className="input-group-addon">{addOnAfter}</span> : null;

    return (
        <div className="input-group">
            {addOnBeforeComponent}
            {children}
            {addOnAfterComponent}
        </div>
    );
};

InputGroup.propTypes = {
    addOnBefore: PropTypes.any,
    addOnAfter: PropTypes.any
};

export default InputGroup;

import React from 'react';

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

export default InputGroup;

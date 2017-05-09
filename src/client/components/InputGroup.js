import React from 'react';

const InputGroup = ({ label, addOnBefore, children }) => {

    const addOnBeforeComponent = addOnBefore ? <span className="input-group-addon">https://example.com/users/</span> : null;
    return (
        <div className="input-group">
            <addOnBeforeComponent />
            {children}
        </div>
    );
};

export default InputGroup;

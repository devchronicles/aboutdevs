import * as PropTypes from 'prop-types';
import * as React from 'react';

interface IInputGroupProps {
    addOnBefore: any;
    addOnAfter: any;
    children?: React.ReactNode;
}

const InputGroup: React.SFC<IInputGroupProps> = (props) => {
    const { addOnBefore, addOnAfter, children } = props;

    const addOnBeforeComponent = addOnBefore ? <span className="input-group-addon" > {addOnBefore} </span> : null;
    const addOnAfterComponent = addOnAfter ? <span className="input-group-addon" > {addOnAfter} </span> : null;

    return (
        <div className="input-group" >
            {addOnBeforeComponent}
            {children}
            {addOnAfterComponent}
        </div>
    );
};

InputGroup.defaultProps = {
    addOnBefore: null,
    addOnAfter: null,
};

export default InputGroup;

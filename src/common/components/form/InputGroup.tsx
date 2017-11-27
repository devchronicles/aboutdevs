import * as React from "react";

interface InputGroupProps {
    addOnBefore: any;
    addOnBeforeClassName?: string;
    addOnAfter: any;
    addOnAfterClassName?: string;
    children?: React.ReactNode;
}

const InputGroup: React.SFC<InputGroupProps> = (props) => {
    const {addOnBefore, addOnBeforeClassName, addOnAfter, addOnAfterClassName, children} = props;

    const addOnBeforeComponent = addOnBefore
        ? <span className={`input-group-addon-before ${addOnBeforeClassName}`}> {addOnBefore} </span>
        : null;

    const addOnAfterComponent = addOnAfter
        ? <span className={`input-group-addon-after ${addOnAfterClassName}`}> {addOnAfter} </span>
        : null;

    return (
        <div className="input-group">
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

export { InputGroup };

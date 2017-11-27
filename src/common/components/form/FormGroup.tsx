import * as React from "react";

interface FormGroupProps {
    label?: string;
    labelFor?: string;
    help?: string;
    error?: string;
    children: string | JSX.Element | JSX.Element[];
}

const FormGroup: React.SFC<FormGroupProps> = ({label, labelFor, help, error, children}) => {
    let labelComponent = null;
    let helpComponent = null;

    if (label) {
        labelComponent = <label htmlFor={labelFor}>{label}</label>;
    }

    if (error) {
        helpComponent = <small className="form-help error">{error} </small>;
    } else if (help) {
        helpComponent = <small className="form-help">{help} </small>;
    }

    return (
        <div className="form-group">
            {labelComponent}
            {children}
            {helpComponent}
        </div>
    );
};

export { FormGroup };

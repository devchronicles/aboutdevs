import * as React from "react";
import * as ReduxForm from "redux-form";
import * as fieldValidationMessageHelper from "../../../common/helpers/fieldValidationMessageHelper";
import { FormGroup } from "./FormGroup";
import { InputGroup } from "./ListsEditor";

interface FormFieldProps extends ReduxForm.WrappedFieldProps {
    name: string;
    label: string;
    innerComponentProps?: any;
    innerComponent: any;
    help: any;
    addOnBefore: any;
    addOnAfter: any;
    validate: any[];
    placeHolder: string;
}

const FormField: React.SFC<FormFieldProps> = (props) => {

    const {
        name,
        label,
        help,
        addOnBefore,
        addOnAfter,
        innerComponent,
    } = props;

    if (!innerComponent) {
        throw Error("Inner component is required");
    }

    const innerComponentProps = {
        input: props.input,
        meta: props.meta,
        ...props.innerComponentProps,
    };

    const errorMessage = props.meta.touched ? fieldValidationMessageHelper.getErrorMessage(props.meta.error) : null;

    return (
        <FormGroup
            label={label}
            labelFor={name}
            help={help}
            error={errorMessage}
        >
            <InputGroup addOnBefore={addOnBefore} addOnAfter={addOnAfter}>
                {React.createElement(innerComponent, innerComponentProps)}
            </InputGroup>
        </FormGroup>
    );
};

FormField.defaultProps = {
    help: "",
    addOnBefore: undefined,
    addOnAfter: undefined,
    validate: [],
    placeHolder: "",
};

export { FormField };

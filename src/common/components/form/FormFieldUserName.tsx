import * as React from "react";
import * as ReduxForm from "redux-form";
import * as ReactActivity from "react-activity";
import { FormGroup, InputGroup, TextBox } from "./index";
import { FaIcon } from "../FaIcon";
import * as fieldValidationMessageHelper from "../../../common/helpers/fieldValidationMessageHelper";

const Spinner = ReactActivity.Spinner;

interface FormFieldUserNameProps extends ReduxForm.WrappedFieldProps<{}> {
}

export class FormFieldUserName extends React.Component<FormFieldUserNameProps> {

    getAddOnAfterComponent() {
        const {meta} = this.props;

        if (meta.asyncValidating) return <Spinner size={10}/>;
        if (meta.error) return <FaIcon icon="exclamation-triangle" className="error"/>;
        return <FaIcon icon="check" className="ok"/>;
    }

    public render() {

        const {input, meta} = this.props;

        const innerComponentProps = {
            input,
            meta,
        };

        const errorMessage = meta.touched ? fieldValidationMessageHelper.getErrorMessage(meta.error) : null;

        const validationComponent = this.getAddOnAfterComponent();

        return (
            <FormGroup
                label="User name"
                labelFor="name"
                error={errorMessage}
            >
                <InputGroup
                    addOnBefore="aboutdevs.com/"
                    addOnAfter={validationComponent}
                    addOnBeforeClassName="input-group-addon-before-username"
                >
                    <TextBox {...innerComponentProps} />
                </InputGroup>
            </FormGroup>
        );
    }
}

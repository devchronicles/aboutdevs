import * as React from 'react';
import * as ReduxForm from 'redux-form';
import activity from 'react-activity';
import { FormGroup, InputGroup, TextBox } from './index';
import FaIcon from '../FaIcon';
import * as fieldValidationMessageHelper from '../../../common/helpers/fieldValidationMessageHelper';

const Spinner = activity.Spinner;

const FormFieldUserName: React.SFC<ReduxForm.WrappedFieldProps<{}>> = (props) => {
    const innerComponentProps = {
        input: props.input,
        meta: props.meta,
    };

    const errorMessage = props.meta.touched ? fieldValidationMessageHelper.getErrorMessage(props.meta.error) : null;

    function getAddOnAfterComponent(f) {
        if (f.meta.asyncValidating) return <Spinner size={10} />;
        if (f.meta.error) return <FaIcon icon="exclamation-triangle" className="error" />;
        return <FaIcon icon="check" className="ok" />;
    }
    const validationComponent = getAddOnAfterComponent(props);

    return (
        <FormGroup
            label="Nome do usuário"
            labelFor="name"
            help="A URL acima será publicamente visível se você for um profissional"
            error={errorMessage}
        >
            <InputGroup addOnBefore="indiejobs.com.br/" addOnAfter={validationComponent}>
                <TextBox {...innerComponentProps} />
            </InputGroup>
        </FormGroup>
    );
};

export default FormFieldUserName;

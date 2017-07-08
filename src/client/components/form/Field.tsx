import * as React from 'react';
import * as ReduxForm from 'redux-form';
import { Field as RfField } from 'redux-form';
import * as fieldValidationHelper from '../../../common/helpers/fieldValidationHelper';

interface IFieldProps extends ReduxForm.BaseFieldProps {
    
}

const Field: React.SFC<IFieldProps> = (props) => (
    <RfField {...props} validate={fieldValidationHelper.getValidatorsForField(props.name)} />
);

export { Field };

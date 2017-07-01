import * as React from 'react';
import * as ReduxForm from 'redux-form';
import { Field as RfField } from 'redux-form';
import * as fieldValidationHelper from '../../../common/helpers/fieldValidationHelper';

const Field: React.SFC<ReduxForm.BaseFieldProps> = (props) => (
    <RfField {...props} validate={fieldValidationHelper.getValidatorsForField(props.name)} />
);

export default Field;

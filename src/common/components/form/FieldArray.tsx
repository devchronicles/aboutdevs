import * as React from 'react';
import * as ReduxForm from 'redux-form';
import { FieldArray as RfFieldArray } from 'redux-form';
import * as fieldValidationHelper from '../../../common/helpers/fieldValidationHelper';

interface IFieldProps extends ReduxForm.BaseFieldsProps {
}

declare type IFinalFieldProps = IFieldProps & any;

const FieldArray: React.SFC<IFinalFieldProps> = (props) => (
    <RfFieldArray {...props} />
);

export { FieldArray };

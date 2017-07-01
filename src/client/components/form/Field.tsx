import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Field as RfField } from 'redux-form';
import * as fieldValidationHelper from '../../../common/helpers/fieldValidationHelper';

export interface IFieldProps {
    name: string;
}

const Field: React.SFC<IFieldProps> = (props) => (
    <RfField {...props} validate={fieldValidationHelper.getValidatorsForField(props.name)} />
);

export default Field;

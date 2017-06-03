import React from 'react';
import PropTypes from 'prop-types';
import { Field as RfField } from 'redux-form';
import * as fieldValidationHelper from '../../../common/helpers/fieldValidationHelper';

const Field = props => (
    <RfField {...props} validate={fieldValidationHelper.getValidatorsForField(props.name)} />
);

Field.propTypes = {
    name: PropTypes.string.isRequired
};


export default Field;

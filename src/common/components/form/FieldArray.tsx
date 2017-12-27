import * as React from "react";
import { BaseFieldsProps, FieldArray as RfFieldArray } from "redux-form";
import * as fieldValidationHelper from "../../helpers/fieldValidationHelper";

interface FieldProps extends BaseFieldsProps {
}

declare type IFinalFieldProps = FieldProps & any;

const FieldArray: React.SFC<IFinalFieldProps> = (props) => (
    <RfFieldArray {...props} validate={props.validate || fieldValidationHelper.getValidatorsForField(props.name)}/>
);

export { FieldArray };
